/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @fullSyntaxTransform
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _possibleConstructorReturn3 = _interopRequireDefault(require('babel-runtime/helpers/possibleConstructorReturn'));

var _inherits3 = _interopRequireDefault(require('babel-runtime/helpers/inherits'));

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLRelayDirective'),
    GraphQLRelayDirective = _require.GraphQLRelayDirective;

var _require2 = require('./RelayQLNodeInterface'),
    ID = _require2.ID;

var _require3 = require('graphql'),
    GraphQLBoolean = _require3.GraphQLBoolean,
    GraphQLEnumType = _require3.GraphQLEnumType,
    GraphQLFloat = _require3.GraphQLFloat,
    GraphQLID = _require3.GraphQLID,
    GraphQLInputObjectType = _require3.GraphQLInputObjectType,
    GraphQLInt = _require3.GraphQLInt,
    GraphQLInterfaceType = _require3.GraphQLInterfaceType,
    GraphQLList = _require3.GraphQLList,
    GraphQLNonNull = _require3.GraphQLNonNull,
    GraphQLObjectType = _require3.GraphQLObjectType,
    GraphQLScalarType = _require3.GraphQLScalarType,
    GraphQLString = _require3.GraphQLString,
    GraphQLUnionType = _require3.GraphQLUnionType,
    isAbstractType = _require3.isAbstractType,
    SchemaMetaFieldDef = _require3.SchemaMetaFieldDef,
    TypeMetaFieldDef = _require3.TypeMetaFieldDef,
    TypeNameMetaFieldDef = _require3.TypeNameMetaFieldDef;

// TODO: Import types from `graphql`.


// prettier-ignore


var RelayQLNode = function () {
  function RelayQLNode(context, ast) {
    (0, _classCallCheck3['default'])(this, RelayQLNode);

    this.ast = ast;
    this.context = context;
  }

  RelayQLNode.prototype.getLocation = function getLocation() {
    return this.ast.loc;
  };

  RelayQLNode.prototype.getType = function getType() {
    require('./invariant')(false, 'Missing Implementation');
  };

  RelayQLNode.prototype.getField = function getField(fieldName) {
    return require('./find')(this.getFields(), function (field) {
      return field.getName() === fieldName;
    });
  };

  RelayQLNode.prototype.getFields = function getFields() {
    var fields = [];
    this.getSelections().forEach(function (selection) {
      if (selection instanceof RelayQLField) {
        fields.push(selection);
      }
    });
    return fields;
  };

  RelayQLNode.prototype.getSelections = function getSelections() {
    var _this = this;

    if (!this.ast.selectionSet) {
      return [];
    }
    // $FlowFixMe
    return this.ast.selectionSet.selections.map(function (selection) {
      if (selection.kind === 'Field') {
        return new RelayQLField(_this.context, selection, _this.getType());
      } else if (selection.kind === 'FragmentSpread') {
        return new RelayQLFragmentSpread(_this.context, selection);
      } else if (selection.kind === 'InlineFragment') {
        return new RelayQLInlineFragment(_this.context, selection, _this.getType());
      } else {
        throw new (require('./RelayTransformError'))(require('util').format('Unexpected selection kind: %s', selection.kind), _this.getLocation());
      }
    });
  };

  RelayQLNode.prototype.getDirectives = function getDirectives() {
    var _this2 = this;

    // $FlowFixMe
    return (this.ast.directives || []).filter(function (directive) {
      return directive.name.value !== 'fb_native_field';
    }).map(function (directive) {
      return new RelayQLDirective(_this2.context, directive);
    });
  };

  RelayQLNode.prototype.hasDirective = function hasDirective(name) {
    // $FlowFixMe
    return (this.ast.directives || []).some(function (d) {
      return d.name.value === name;
    });
  };

  RelayQLNode.prototype.isPattern = function isPattern() {
    return this.context.isPattern;
  };

  return RelayQLNode;
}();

var RelayQLDefinition = function (_RelayQLNode) {
  (0, _inherits3['default'])(RelayQLDefinition, _RelayQLNode);

  function RelayQLDefinition() {
    (0, _classCallCheck3['default'])(this, RelayQLDefinition);
    return (0, _possibleConstructorReturn3['default'])(this, _RelayQLNode.apply(this, arguments));
  }

  RelayQLDefinition.prototype.getName = function getName() {
    // TODO: this.context.definitionName;
    return this.ast.name ? // $FlowFixMe
    this.ast.name.value : this.getType().getName({ modifiers: false });
  };

  return RelayQLDefinition;
}(RelayQLNode);

var RelayQLFragment = function (_RelayQLDefinition) {
  (0, _inherits3['default'])(RelayQLFragment, _RelayQLDefinition);

  function RelayQLFragment(context, ast, parentType) {
    (0, _classCallCheck3['default'])(this, RelayQLFragment);

    var relayDirectiveArgs = {};
    var relayDirective = require('./find')(ast.directives || [], function (directive) {
      return directive.name.value === 'relay';
    });
    if (relayDirective) {
      (relayDirective.arguments || []).forEach(function (arg) {
        relayDirectiveArgs[arg.name.value] = arg.value;
      });
    }

    // @relay(pattern: true)
    var isPattern = relayDirectiveArgs.pattern && relayDirectiveArgs.pattern.kind === 'BooleanValue' && relayDirectiveArgs.pattern.value;

    var _this4 = (0, _possibleConstructorReturn3['default'])(this, _RelayQLDefinition.call(this, (0, _extends3['default'])({}, context, { isPattern: isPattern }), ast));

    _this4.parentType = parentType;
    return _this4;
  }

  RelayQLFragment.prototype.getType = function getType() {
    var type = this.ast.typeCondition;
    if (type) {
      // Convert `ListType` and `NonNullType` into `NamedType`.
      while (type.kind !== 'NamedType') {
        type = type.type;
      }
      return new RelayQLType(this.context, this.context.schema.getType(type.name.value));
    } else if (this.ast.kind === 'InlineFragment') {
      // Inline fragments without type conditions fall back to parent type.
      if (!this.parentType) {
        throw new (require('./RelayTransformError'))('Cannot get type of typeless inline fragment without parent type.', this.getLocation());
      }
      return this.parentType;
    } else {
      throw new (require('./RelayTransformError'))(require('util').format('Unexpected fragment kind: %s', this.ast.kind), this.getLocation());
    }
  };

  return RelayQLFragment;
}(RelayQLDefinition);

var RelayQLMutation = function (_RelayQLDefinition2) {
  (0, _inherits3['default'])(RelayQLMutation, _RelayQLDefinition2);

  function RelayQLMutation() {
    (0, _classCallCheck3['default'])(this, RelayQLMutation);
    return (0, _possibleConstructorReturn3['default'])(this, _RelayQLDefinition2.apply(this, arguments));
  }

  RelayQLMutation.prototype.getType = function getType() {
    return new RelayQLType(this.context, this.context.schema.getMutationType());
  };

  return RelayQLMutation;
}(RelayQLDefinition);

var RelayQLQuery = function (_RelayQLDefinition3) {
  (0, _inherits3['default'])(RelayQLQuery, _RelayQLDefinition3);

  function RelayQLQuery() {
    (0, _classCallCheck3['default'])(this, RelayQLQuery);
    return (0, _possibleConstructorReturn3['default'])(this, _RelayQLDefinition3.apply(this, arguments));
  }

  RelayQLQuery.prototype.getType = function getType() {
    return new RelayQLType(this.context, this.context.schema.getQueryType());
  };

  return RelayQLQuery;
}(RelayQLDefinition);

var RelayQLSubscription = function (_RelayQLDefinition4) {
  (0, _inherits3['default'])(RelayQLSubscription, _RelayQLDefinition4);

  function RelayQLSubscription() {
    (0, _classCallCheck3['default'])(this, RelayQLSubscription);
    return (0, _possibleConstructorReturn3['default'])(this, _RelayQLDefinition4.apply(this, arguments));
  }

  RelayQLSubscription.prototype.getType = function getType() {
    return new RelayQLType(this.context, this.context.schema.getSubscriptionType());
  };

  return RelayQLSubscription;
}(RelayQLDefinition);

var RelayQLField = function (_RelayQLNode2) {
  (0, _inherits3['default'])(RelayQLField, _RelayQLNode2);

  function RelayQLField(context, ast, parentType) {
    (0, _classCallCheck3['default'])(this, RelayQLField);

    var _this8 = (0, _possibleConstructorReturn3['default'])(this, _RelayQLNode2.call(this, context, ast));

    var fieldName = _this8.ast.name.value;
    var fieldDef = parentType.getFieldDefinition(fieldName, ast);
    if (!fieldDef) {
      throw new (require('./RelayTransformError'))(require('util').format('You supplied a field named `%s` on type `%s`, but no such field ' + 'exists on that type.', fieldName, parentType.getName({ modifiers: false })), _this8.getLocation());
    }
    _this8.fieldDef = fieldDef;
    return _this8;
  }

  RelayQLField.prototype.getName = function getName() {
    return this.ast.name.value;
  };

  RelayQLField.prototype.getAlias = function getAlias() {
    return this.ast.alias ? this.ast.alias.value : null;
  };

  RelayQLField.prototype.getType = function getType() {
    return this.fieldDef.getType();
  };

  RelayQLField.prototype.hasArgument = function hasArgument(argName) {
    return this.getArguments().some(function (arg) {
      return arg.getName() === argName;
    });
  };

  RelayQLField.prototype.findArgument = function findArgument(argName) {
    return require('./find')(this.getArguments(), function (arg) {
      return arg.getName() === argName;
    });
  };

  RelayQLField.prototype.getArguments = function getArguments() {
    var _this9 = this;

    var argTypes = this.fieldDef.getDeclaredArguments();
    return (this.ast.arguments || []).map(function (arg) {
      var argName = arg.name.value;
      var argType = argTypes[argName];
      if (!argType) {
        throw new (require('./RelayTransformError'))(require('util').format('You supplied an argument named `%s` on field `%s`, but no such ' + 'argument exists on that field.', argName, _this9.getName()), _this9.getLocation());
      }
      return new RelayQLArgument(_this9.context, arg, argType);
    });
  };

  RelayQLField.prototype.hasDeclaredArgument = function hasDeclaredArgument(argName) {
    return this.fieldDef.getDeclaredArguments().hasOwnProperty(argName);
  };

  RelayQLField.prototype.getDeclaredArgument = function getDeclaredArgument(argName) {
    return this.fieldDef.getArgument(argName);
  };

  RelayQLField.prototype.getDeclaredArguments = function getDeclaredArguments() {
    return this.fieldDef.getDeclaredArguments();
  };

  return RelayQLField;
}(RelayQLNode);

var RelayQLFragmentSpread = function (_RelayQLNode3) {
  (0, _inherits3['default'])(RelayQLFragmentSpread, _RelayQLNode3);

  function RelayQLFragmentSpread() {
    (0, _classCallCheck3['default'])(this, RelayQLFragmentSpread);
    return (0, _possibleConstructorReturn3['default'])(this, _RelayQLNode3.apply(this, arguments));
  }

  RelayQLFragmentSpread.prototype.getName = function getName() {
    return this.ast.name.value;
  };

  RelayQLFragmentSpread.prototype.getSelections = function getSelections() {
    throw new (require('./RelayTransformError'))('Cannot get selection of a fragment spread.', this.getLocation());
  };

  return RelayQLFragmentSpread;
}(RelayQLNode);

var RelayQLInlineFragment = function (_RelayQLNode4) {
  (0, _inherits3['default'])(RelayQLInlineFragment, _RelayQLNode4);

  function RelayQLInlineFragment(context, ast, parentType) {
    (0, _classCallCheck3['default'])(this, RelayQLInlineFragment);

    var _this11 = (0, _possibleConstructorReturn3['default'])(this, _RelayQLNode4.call(this, context, ast));

    _this11.parentType = parentType;
    return _this11;
  }

  RelayQLInlineFragment.prototype.getFragment = function getFragment() {
    return new RelayQLFragment(this.context, this.ast, this.parentType);
  };

  return RelayQLInlineFragment;
}(RelayQLNode);

var RelayQLDirective = function () {
  function RelayQLDirective(context, ast) {
    var _this12 = this;

    (0, _classCallCheck3['default'])(this, RelayQLDirective);

    this.ast = ast;
    this.context = context;
    this.argTypes = {};

    var directiveName = ast.name.value;
    var schemaDirective = directiveName === GraphQLRelayDirective.name ? GraphQLRelayDirective : context.schema.getDirective(directiveName);
    if (!schemaDirective) {
      throw new (require('./RelayTransformError'))(require('util').format('You supplied a directive named `%s`, but no such directive exists.', directiveName), this.getLocation());
    }
    schemaDirective.args.forEach(function (schemaArg) {
      _this12.argTypes[schemaArg.name] = new RelayQLArgumentType(schemaArg.type);
    });
  }

  RelayQLDirective.prototype.getLocation = function getLocation() {
    return this.ast.loc;
  };

  RelayQLDirective.prototype.getName = function getName() {
    return this.ast.name.value;
  };

  RelayQLDirective.prototype.getArguments = function getArguments() {
    var _this13 = this;

    return (this.ast.arguments || []).map(function (arg) {
      var argName = arg.name.value;
      var argType = _this13.argTypes[argName];
      if (!argType) {
        throw new (require('./RelayTransformError'))(require('util').format('You supplied an argument named `%s` on directive `%s`, but no ' + 'such argument exists on that directive.', argName, _this13.getName()), _this13.getLocation());
      }
      return new RelayQLArgument(_this13.context, arg, argType);
    });
  };

  return RelayQLDirective;
}();

var RelayQLArgument = function () {
  function RelayQLArgument(context, ast, type) {
    (0, _classCallCheck3['default'])(this, RelayQLArgument);

    this.ast = ast;
    this.context = context;
    this.type = type;
  }

  RelayQLArgument.prototype.getLocation = function getLocation() {
    return this.ast.loc;
  };

  RelayQLArgument.prototype.getName = function getName() {
    return this.ast.name.value;
  };

  RelayQLArgument.prototype.getType = function getType() {
    return this.type;
  };

  RelayQLArgument.prototype.isVariable = function isVariable() {
    return this.ast.value.kind === 'Variable';
  };

  RelayQLArgument.prototype.getVariableName = function getVariableName() {
    if (this.ast.value.kind !== 'Variable') {
      throw new (require('./RelayTransformError'))('Cannot get variable name of an argument value.', this.getLocation());
    }
    return this.ast.value.name.value;
  };

  RelayQLArgument.prototype.getValue = function getValue() {
    var _this14 = this;

    if (this.isVariable()) {
      throw new (require('./RelayTransformError'))('Cannot get value of an argument variable.', this.getLocation());
    }

    var value = this.ast.value;
    if (value.kind === 'ListValue') {
      return value.values.map(function (val) {
        return new RelayQLArgument(_this14.context, (0, _extends3['default'])({}, _this14.ast, { value: val }), _this14.type.ofType());
      });
    } else {
      return getLiteralValue(value);
    }
  };

  return RelayQLArgument;
}();

var RelayQLType = function () {
  function RelayQLType(context, schemaModifiedType) {
    (0, _classCallCheck3['default'])(this, RelayQLType);

    this.context = context;

    var _stripMarkerTypes = stripMarkerTypes(schemaModifiedType),
        isListType = _stripMarkerTypes.isListType,
        isNonNullType = _stripMarkerTypes.isNonNullType,
        schemaUnmodifiedType = _stripMarkerTypes.schemaUnmodifiedType;

    this.isListType = isListType;
    this.isNonNullType = isNonNullType;
    this.schemaUnmodifiedType = schemaUnmodifiedType;
    this.schemaModifiedType = schemaModifiedType;
  }

  RelayQLType.prototype.canHaveSubselections = function canHaveSubselections() {
    return !(this.schemaUnmodifiedType instanceof GraphQLScalarType || this.schemaUnmodifiedType instanceof GraphQLEnumType);
  };

  RelayQLType.prototype.getName = function getName(_ref) {
    var modifiers = _ref.modifiers;

    return modifiers ? this.schemaModifiedType.toString() : this.schemaUnmodifiedType.toString();
  };

  RelayQLType.prototype.hasField = function hasField(fieldName) {
    return !!this.getFieldDefinition(fieldName);
  };

  RelayQLType.prototype.getFieldDefinition = function getFieldDefinition(fieldName, fieldAST) {
    var type = this.schemaUnmodifiedType;
    var isQueryType = type === this.context.schema.getQueryType();
    var hasTypeName = type instanceof GraphQLObjectType || type instanceof GraphQLInterfaceType || type instanceof GraphQLUnionType;
    var hasFields = type instanceof GraphQLObjectType || type instanceof GraphQLInterfaceType;

    var schemaFieldDef = void 0;
    if (isQueryType && fieldName === SchemaMetaFieldDef.name) {
      schemaFieldDef = SchemaMetaFieldDef;
    } else if (isQueryType && fieldName === TypeMetaFieldDef.name) {
      schemaFieldDef = TypeMetaFieldDef;
    } else if (hasTypeName && fieldName === TypeNameMetaFieldDef.name) {
      schemaFieldDef = TypeNameMetaFieldDef;
    } else if (hasFields) {
      schemaFieldDef = type.getFields()[fieldName];
    }

    // Temporary workarounds to support legacy schemas
    if (!schemaFieldDef) {
      if (hasTypeName && fieldName === '__type__') {
        schemaFieldDef = {
          name: '__type__',
          type: new GraphQLNonNull(this.context.schema.getType('Type')),
          description: 'The introspected type of this object.',
          deprecatedReason: 'Use __typename',
          args: []
        };
      } else if (isAbstractType(type) && fieldAST && fieldAST.directives && fieldAST.directives.some(function (directive) {
        return directive.name.value === 'fixme_fat_interface';
      })) {
        var possibleTypes = this.context.schema.getPossibleTypes(type);

        var _loop = function _loop(ii) {
          var possibleField = possibleTypes[ii].getFields()[fieldName];
          if (possibleField) {
            // Fat interface fields can have differing arguments. Try to return
            // a field with matching arguments, but still return a field if the
            // arguments do not match.
            schemaFieldDef = possibleField;
            if (fieldAST && fieldAST.arguments) {
              var argumentsAllExist = fieldAST.arguments.every(function (argument) {
                return require('./find')(possibleField.args, function (argDef) {
                  return argDef.name === argument.name.value;
                });
              });
              if (argumentsAllExist) {
                return 'break';
              }
            }
          }
        };

        for (var ii = 0; ii < possibleTypes.length; ii++) {
          var _ret = _loop(ii);

          if (_ret === 'break') break;
        }
      }
    }

    return schemaFieldDef ? new RelayQLFieldDefinition(this.context, schemaFieldDef) : null;
  };

  RelayQLType.prototype.getInterfaces = function getInterfaces() {
    var _this15 = this;

    if (this.schemaUnmodifiedType instanceof GraphQLObjectType) {
      return this.schemaUnmodifiedType.getInterfaces().map(function (schemaInterface) {
        return new RelayQLType(_this15.context, schemaInterface);
      });
    }
    return [];
  };

  RelayQLType.prototype.getConcreteTypes = function getConcreteTypes() {
    var _this16 = this;

    require('./invariant')(this.isAbstract(), 'Cannot get concrete types of a concrete type.');
    return this.context.schema.getPossibleTypes(this.schemaUnmodifiedType).map(function (concreteType) {
      return new RelayQLType(_this16.context, concreteType);
    });
  };

  RelayQLType.prototype.getIdentifyingFieldDefinition = function getIdentifyingFieldDefinition() {
    if (this.alwaysImplements('Node')) {
      return this.getFieldDefinition(ID);
    }
    return null;
  };

  RelayQLType.prototype.isAbstract = function isAbstract() {
    return isAbstractType(this.schemaUnmodifiedType);
  };

  RelayQLType.prototype.isList = function isList() {
    return this.isListType;
  };

  RelayQLType.prototype.isNonNull = function isNonNull() {
    return this.isNonNullType;
  };

  RelayQLType.prototype.isQueryType = function isQueryType() {
    return this.schemaUnmodifiedType === this.context.schema.getQueryType();
  };

  RelayQLType.prototype.isConnection = function isConnection() {
    if (!/Connection$/.test(this.getName({ modifiers: false }))) {
      return false;
    }
    var edges = this.getFieldDefinition('edges');
    if (!edges || !edges.getType().canHaveSubselections()) {
      return false;
    }
    var node = edges.getType().getFieldDefinition('node');
    if (!node || !node.getType().canHaveSubselections()) {
      return false;
    }
    var cursor = edges.getType().getFieldDefinition('cursor');
    if (!cursor || cursor.getType().canHaveSubselections()) {
      return false;
    }
    return true;
  };

  RelayQLType.prototype.isConnectionEdge = function isConnectionEdge() {
    return (/Edge$/.test(this.getName({ modifiers: false })) && this.hasField('node') && this.hasField('cursor')
    );
  };

  RelayQLType.prototype.isConnectionPageInfo = function isConnectionPageInfo() {
    return this.getName({ modifiers: false }) === 'PageInfo';
  };

  RelayQLType.prototype.alwaysImplements = function alwaysImplements(typeName) {
    return this.getName({ modifiers: false }) === typeName || this.getInterfaces().some(function (type) {
      return type.getName({ modifiers: false }) === typeName;
    }) || this.isAbstract() && this.getConcreteTypes().every(function (type) {
      return type.alwaysImplements(typeName);
    });
  };

  RelayQLType.prototype.mayImplement = function mayImplement(typeName) {
    return this.getName({ modifiers: false }) === typeName || this.getInterfaces().some(function (type) {
      return type.getName({ modifiers: false }) === typeName;
    }) || this.isAbstract() && this.getConcreteTypes().some(function (type) {
      return type.alwaysImplements(typeName);
    });
  };

  RelayQLType.prototype.generateField = function generateField(fieldName) {
    var generatedFieldAST = {
      kind: 'Field',
      name: {
        kind: 'Name',
        value: fieldName
      }
    };
    return new RelayQLField(this.context, generatedFieldAST, this);
  };

  RelayQLType.prototype.generateIdFragment = function generateIdFragment() {
    var generatedFragmentAST = {
      kind: 'Fragment',
      name: {
        kind: 'Name',
        value: 'IdFragment'
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          value: 'Node'
        }
      }
      // ID field will be generated by the printer; we won't declare it here.
    };
    return new RelayQLFragment(this.context, generatedFragmentAST, this);
  };

  return RelayQLType;
}();

var RelayQLFieldDefinition = function () {
  function RelayQLFieldDefinition(context, schemaFieldDef) {
    (0, _classCallCheck3['default'])(this, RelayQLFieldDefinition);

    this.context = context;
    this.schemaFieldDef = schemaFieldDef;
  }

  RelayQLFieldDefinition.prototype.getName = function getName() {
    return this.schemaFieldDef.name;
  };

  RelayQLFieldDefinition.prototype.getType = function getType() {
    return new RelayQLType(this.context, this.schemaFieldDef.type);
  };

  RelayQLFieldDefinition.prototype.hasArgument = function hasArgument(argName) {
    return this.schemaFieldDef.args.some(function (schemaArg) {
      return schemaArg.name === argName;
    });
  };

  RelayQLFieldDefinition.prototype.getArgument = function getArgument(argName) {
    var schemaArg = require('./find')(this.schemaFieldDef.args, function (arg) {
      return arg.name === argName;
    });
    require('./invariant')(schemaArg, 'You tried to get an argument named `%s` on field `%s`, but no such ' + 'argument exists on that field.', argName, this.getName());
    return new RelayQLArgumentType(schemaArg.type);
  };

  RelayQLFieldDefinition.prototype.getDeclaredArguments = function getDeclaredArguments() {
    var args = {};
    this.schemaFieldDef.args.forEach(function (schemaArg) {
      args[schemaArg.name] = new RelayQLArgumentType(schemaArg.type);
    });
    return args;
  };

  return RelayQLFieldDefinition;
}();

var RelayQLArgumentType = function () {
  function RelayQLArgumentType(schemaModifiedArgType) {
    (0, _classCallCheck3['default'])(this, RelayQLArgumentType);

    var _stripMarkerTypes2 = stripMarkerTypes(schemaModifiedArgType),
        isListType = _stripMarkerTypes2.isListType,
        isNonNullType = _stripMarkerTypes2.isNonNullType,
        schemaUnmodifiedType = _stripMarkerTypes2.schemaUnmodifiedType;

    this.isListType = isListType;
    this.isNonNullType = isNonNullType;
    this.schemaUnmodifiedArgType = schemaUnmodifiedType;
    this.schemaModifiedArgType = schemaModifiedArgType;
  }

  RelayQLArgumentType.prototype.getName = function getName(_ref2) {
    var modifiers = _ref2.modifiers;

    return modifiers ? this.schemaModifiedArgType.toString() : this.schemaUnmodifiedArgType.toString();
  };

  RelayQLArgumentType.prototype.ofType = function ofType() {
    require('./invariant')(this.isList() || this.isNonNull(), 'Can only get type of list or non-null type.');
    return new RelayQLArgumentType(this.schemaUnmodifiedArgType);
  };

  RelayQLArgumentType.prototype.isCustomScalar = function isCustomScalar() {
    return this.isScalar() && !(this.schemaUnmodifiedArgType === GraphQLBoolean || this.schemaUnmodifiedArgType === GraphQLFloat || this.schemaUnmodifiedArgType === GraphQLID || this.schemaUnmodifiedArgType === GraphQLInt || this.schemaUnmodifiedArgType === GraphQLString);
  };

  RelayQLArgumentType.prototype.isBoolean = function isBoolean() {
    return this.schemaUnmodifiedArgType === GraphQLBoolean;
  };

  RelayQLArgumentType.prototype.isEnum = function isEnum() {
    return this.schemaUnmodifiedArgType instanceof GraphQLEnumType;
  };

  RelayQLArgumentType.prototype.isID = function isID() {
    return this.schemaUnmodifiedArgType === GraphQLID;
  };

  RelayQLArgumentType.prototype.isList = function isList() {
    return this.isListType;
  };

  RelayQLArgumentType.prototype.isNonNull = function isNonNull() {
    return this.isNonNullType;
  };

  RelayQLArgumentType.prototype.isNumber = function isNumber() {
    return this.schemaUnmodifiedArgType === GraphQLFloat || this.schemaUnmodifiedArgType === GraphQLInt;
  };

  RelayQLArgumentType.prototype.isObject = function isObject() {
    return this.schemaUnmodifiedArgType instanceof GraphQLInputObjectType;
  };

  RelayQLArgumentType.prototype.isScalar = function isScalar() {
    return this.schemaUnmodifiedArgType instanceof GraphQLScalarType;
  };

  RelayQLArgumentType.prototype.isString = function isString() {
    return this.schemaUnmodifiedArgType === GraphQLString;
  };

  return RelayQLArgumentType;
}();

function stripMarkerTypes(schemaModifiedType) {
  var isListType = false;
  var isNonNullType = false;
  var schemaUnmodifiedType = schemaModifiedType;
  while (true) {
    if (schemaUnmodifiedType instanceof GraphQLList) {
      isListType = true;
    } else if (schemaUnmodifiedType instanceof GraphQLNonNull) {
      isNonNullType = true;
    } else {
      break;
    }
    schemaUnmodifiedType = schemaUnmodifiedType.ofType;
  }
  return { isListType: isListType, isNonNullType: isNonNullType, schemaUnmodifiedType: schemaUnmodifiedType };
}

function getLiteralValue(value) {
  switch (value.kind) {
    case 'IntValue':
      return parseInt(value.value, 10);
    case 'FloatValue':
      return parseFloat(value.value);
    case 'StringValue':
    case 'BooleanValue':
    case 'EnumValue':
      return value.value;
    case 'ListValue':
      return value.values.map(getLiteralValue);
    case 'NullValue':
      return null;
    case 'ObjectValue':
      var object = {};
      value.fields.forEach(function (field) {
        object[field.name.value] = getLiteralValue(field.value);
      });
      return object;
    case 'Variable':
      throw new (require('./RelayTransformError'))(require('util').format('Unexpected nested variable `%s`; variables are supported as top-' + 'level arguments - `node(id: $id)` - or directly within lists - ' + '`nodes(ids: [$id])`.', value.name.value), value.loc);
    default:
      throw new (require('./RelayTransformError'))(require('util').format('Unexpected value kind: %s', value.kind), value.loc);
  }
}

module.exports = {
  RelayQLArgument: RelayQLArgument,
  RelayQLArgumentType: RelayQLArgumentType,
  RelayQLDefinition: RelayQLDefinition,
  RelayQLDirective: RelayQLDirective,
  RelayQLField: RelayQLField,
  RelayQLFieldDefinition: RelayQLFieldDefinition,
  RelayQLFragment: RelayQLFragment,
  RelayQLFragmentSpread: RelayQLFragmentSpread,
  RelayQLInlineFragment: RelayQLInlineFragment,
  RelayQLMutation: RelayQLMutation,
  RelayQLNode: RelayQLNode,
  RelayQLQuery: RelayQLQuery,
  RelayQLSubscription: RelayQLSubscription,
  RelayQLType: RelayQLType
};