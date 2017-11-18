/**
 * Relay v1.4.1
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule BabelPluginRelay
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Using babel-plugin-relay with only the modern runtime?
	 *
	 *     {
	 *       plugins: [
	 *         "relay"
	 *       ]
	 *     }
	 *
	 * Using babel-plugin-relay in compatability or classic mode?
	 *
	 *     {
	 *       plugins: [
	 *         ["relay", {"compat": true, "schema": "path/to/schema.graphql"}]
	 *       ]
	 *     }
	 *
	 */
	module.exports = function BabelPluginRelay(context) {
	  var t = context.types;

	  if (!t) {
	    throw new Error('BabelPluginRelay: Expected plugin context to include "types", but got:' + String(context));
	  }

	  var visitor = {
	    TaggedTemplateExpression: function TaggedTemplateExpression(path, state) {
	      // Convert graphql`` literals
	      var ast = __webpack_require__(24)(path);
	      if (ast) {
	        __webpack_require__(17)(t, path, state, ast);
	        return;
	      }

	      // Convert Relay.QL`` literals

	      var _getValidRelayQLTag = __webpack_require__(25)(path),
	          quasi = _getValidRelayQLTag[0],
	          tagName = _getValidRelayQLTag[1],
	          propName = _getValidRelayQLTag[2];

	      if (quasi && tagName) {
	        var _schema = state.opts && state.opts.schema;
	        __webpack_require__(3)(_schema, 'babel-plugin-relay: Missing schema option. ' + 'Check your .babelrc file or wherever you configure your Babel ' + 'plugins to ensure the "relay" plugin has a "schema" option.\n' + 'https://facebook.github.io/relay/docs/babel-plugin-relay.html#additional-options');
	        var documentName = __webpack_require__(22)(path, state);
	        path.replaceWith(__webpack_require__(11)(t, path, _schema, quasi, documentName, propName, tagName, true, // enableValidation
	        state));
	      }
	    }
	  };

	  return {
	    visitor: {
	      Program: function Program(path, state) {
	        path.traverse(visitor, state);
	      }
	    }
	  };
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var RelayTransformError = function RelayTransformError(message, loc) {
	  (0, _classCallCheck3['default'])(this, RelayTransformError);

	  this.message = message;
	  this.loc = loc;
	  this.stack = new Error().stack;
	};

	module.exports = RelayTransformError;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("util");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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

	function invariant(condition, format) {
	  if (!condition) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    throw new Error(__webpack_require__(2).format.apply(__webpack_require__(2), [format].concat(args)));
	  }
	}

	module.exports = invariant;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("graphql");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

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

	function find(array, predicate, context) {
	  for (var ii = 0; ii < array.length; ii++) {
	    if (predicate.call(context, array[ii], ii, array)) {
	      return array[ii];
	    }
	  }
	  return undefined;
	}

	module.exports = find;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule getFragmentNameParts
	 * 
	 * @format
	 */

	'use strict';

	var DEFAULT_PROP_NAME = 'data';

	/**
	 * Matches a GraphQL fragment name pattern, extracting the data property key
	 * from the name.
	 */
	function getFragmentNameParts(fragmentName) {
	  var match = fragmentName.match(/^([a-zA-Z][a-zA-Z0-9]*)(?:_([a-zA-Z][_a-zA-Z0-9]*))?$/);
	  if (!match) {
	    throw new Error('BabelPluginGraphQL: Fragments should be named ' + '`ModuleName_fragmentName`, got `' + fragmentName + '`.');
	  }
	  var module = match[1];
	  var propName = match[2];
	  if (propName === DEFAULT_PROP_NAME) {
	    throw new Error('BabelPluginGraphQL: Fragment `' + fragmentName + '` should not end in ' + '`_data` to avoid conflict with a fragment named `' + module + '` ' + 'which also provides resulting data via the React prop `data`. Either ' + 'rename this fragment to `' + module + '` or choose a different ' + 'prop name.');
	  }
	  return [module, propName || DEFAULT_PROP_NAME];
	}

	module.exports = getFragmentNameParts;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _require = __webpack_require__(4),
	    buildSchema = _require.buildSchema;

	// Copy of RelayRelayDirectiveTransform.SCHEMA_EXTENSION due to the build
	// systems.


	var SCHEMA_EXTENSION = 'directive @relay(\n  # Marks a connection field as containing nodes without \'id\' fields.\n  # This is used to silence the warning when diffing connections.\n  isConnectionWithoutNodeID: Boolean,\n\n  # Marks a fragment as intended for pattern matching (as opposed to fetching).\n  # Used in Classic only.\n  pattern: Boolean,\n\n  # Marks a fragment as being backed by a GraphQLList.\n  plural: Boolean,\n\n  # Marks a fragment spread which should be unmasked if provided false\n  mask: Boolean = true,\n\n  # Selectively pass variables down into a fragment. Only used in Classic.\n  variables: [String!],\n) on FRAGMENT_DEFINITION | FRAGMENT_SPREAD | INLINE_FRAGMENT | FIELD';

	var GraphQLRelayDirective = buildSchema(SCHEMA_EXTENSION + '\ntype Query { x: String }').getDirective('relay');

	if (!GraphQLRelayDirective) {
	  throw new Error('Failed to create GraphQLRelayDirective.');
	}

	module.exports = {
	  SCHEMA_EXTENSION: SCHEMA_EXTENSION,
	  GraphQLRelayDirective: GraphQLRelayDirective
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _extends3 = _interopRequireDefault(__webpack_require__(13));

	var _possibleConstructorReturn3 = _interopRequireDefault(__webpack_require__(27));

	var _inherits3 = _interopRequireDefault(__webpack_require__(26));

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(8),
	    GraphQLRelayDirective = _require.GraphQLRelayDirective;

	var _require2 = __webpack_require__(10),
	    ID = _require2.ID;

	var _require3 = __webpack_require__(4),
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
	    __webpack_require__(3)(false, 'Missing Implementation');
	  };

	  RelayQLNode.prototype.getField = function getField(fieldName) {
	    return __webpack_require__(5)(this.getFields(), function (field) {
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
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('Unexpected selection kind: %s', selection.kind), _this.getLocation());
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
	    var relayDirective = __webpack_require__(5)(ast.directives || [], function (directive) {
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
	        throw new (__webpack_require__(1))('Cannot get type of typeless inline fragment without parent type.', this.getLocation());
	      }
	      return this.parentType;
	    } else {
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('Unexpected fragment kind: %s', this.ast.kind), this.getLocation());
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
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('You supplied a field named `%s` on type `%s`, but no such field ' + 'exists on that type.', fieldName, parentType.getName({ modifiers: false })), _this8.getLocation());
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
	    return __webpack_require__(5)(this.getArguments(), function (arg) {
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
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('You supplied an argument named `%s` on field `%s`, but no such ' + 'argument exists on that field.', argName, _this9.getName()), _this9.getLocation());
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
	    throw new (__webpack_require__(1))('Cannot get selection of a fragment spread.', this.getLocation());
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
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('You supplied a directive named `%s`, but no such directive exists.', directiveName), this.getLocation());
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
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('You supplied an argument named `%s` on directive `%s`, but no ' + 'such argument exists on that directive.', argName, _this13.getName()), _this13.getLocation());
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
	      throw new (__webpack_require__(1))('Cannot get variable name of an argument value.', this.getLocation());
	    }
	    return this.ast.value.name.value;
	  };

	  RelayQLArgument.prototype.getValue = function getValue() {
	    var _this14 = this;

	    if (this.isVariable()) {
	      throw new (__webpack_require__(1))('Cannot get value of an argument variable.', this.getLocation());
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
	                return __webpack_require__(5)(possibleField.args, function (argDef) {
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

	    __webpack_require__(3)(this.isAbstract(), 'Cannot get concrete types of a concrete type.');
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
	    var schemaArg = __webpack_require__(5)(this.schemaFieldDef.args, function (arg) {
	      return arg.name === argName;
	    });
	    __webpack_require__(3)(schemaArg, 'You tried to get an argument named `%s` on field `%s`, but no such ' + 'argument exists on that field.', argName, this.getName());
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
	    __webpack_require__(3)(this.isList() || this.isNonNull(), 'Can only get type of list or non-null type.');
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
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('Unexpected nested variable `%s`; variables are supported as top-' + 'level arguments - `node(id: $id)` - or directly within lists - ' + '`nodes(ids: [$id])`.', value.name.value), value.loc);
	    default:
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('Unexpected value kind: %s', value.kind), value.loc);
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

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 * @format
	 */

	'use strict';

	var RelayQLNodeInterface = {
	  ID: 'id'
	};

	module.exports = RelayQLNodeInterface;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule compileRelayQLTag
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Given all the metadata about a found RelayQL tag, compile it and return
	 * the resulting Babel AST.
	 */
	function compileRelayQLTag(t, path, schemaProvider, quasi, documentName, propName, tagName, enableValidation, state) {
	  try {
	    var fileOpts = state.file && state.file.opts || {};
	    var transformer = __webpack_require__(12)(schemaProvider, state.opts || {}, fileOpts);
	    return transformer.transform(t, quasi, {
	      documentName: documentName,
	      propName: propName,
	      tagName: tagName,
	      enableValidation: enableValidation
	    });
	  } catch (error) {
	    throw path.buildCodeFrameError(__webpack_require__(21)(error), Error);
	  }
	}

	module.exports = compileRelayQLTag;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule getClassicTransformer
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(4),
	    buildASTSchema = _require.buildASTSchema,
	    buildClientSchema = _require.buildClientSchema;

	/**
	 * Caches based on the provided schema. Typically this means only one instance
	 * of the RelayQLTransformer will be created, however in some circumstances
	 * (such as in tests) multiple instances can be created given multiple schema.
	 */
	var classicTransformerCache = new Map();
	function getClassicTransformer(schemaProvider, options, fileOptions) {
	  var classicTransformer = classicTransformerCache.get(schemaProvider);
	  if (!classicTransformer) {
	    var schema = getSchema(schemaProvider, fileOptions);
	    classicTransformer = new (__webpack_require__(16))(schema, {
	      inputArgumentName: options.inputArgumentName,
	      snakeCase: Boolean(options.snakeCase),
	      substituteVariables: Boolean(options.substituteVariables),
	      validator: options.validator
	    });
	    classicTransformerCache.set(schemaProvider, classicTransformer);
	  }
	  return classicTransformer;
	}

	function getSchema(schemaProvider, fileOptions) {
	  var schemaReference = typeof schemaProvider === 'function' ? schemaProvider() : schemaProvider;
	  var introspection = typeof schemaReference === 'string' ? __webpack_require__(23)(schemaReference, fileOptions.sourceRoot) : schemaReference;
	  if (introspection.__schema) {
	    return buildClientSchema(introspection);
	  } else if (introspection.data && introspection.data.__schema) {
	    return buildClientSchema(introspection.data);
	  } else if (introspection.kind && introspection.kind === 'Document') {
	    return buildASTSchema(introspection);
	  }

	  throw new Error('Invalid introspection data supplied to the Babel Relay plugin. The ' + 'resulting schema is not an object with a `__schema` property or ' + 'a schema IDL language.');
	}

	module.exports = getClassicTransformer;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _extends3 = _interopRequireDefault(__webpack_require__(13));

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(6));

	var _toConsumableArray3 = _interopRequireDefault(__webpack_require__(28));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(9),
	    RelayQLField = _require.RelayQLField,
	    RelayQLFragment = _require.RelayQLFragment,
	    RelayQLFragmentSpread = _require.RelayQLFragmentSpread,
	    RelayQLInlineFragment = _require.RelayQLInlineFragment,
	    RelayQLMutation = _require.RelayQLMutation,
	    RelayQLQuery = _require.RelayQLQuery,
	    RelayQLSubscription = _require.RelayQLSubscription;

	var _require2 = __webpack_require__(10),
	    ID = _require2.ID;

	module.exports = function (t, options) {
	  var formatFields = options.snakeCase ? function (fields) {
	    var formatted = {};
	    Object.keys(fields).forEach(function (name) {
	      formatted[name] = name.replace(/[A-Z]/g, function (letter) {
	        return '_' + letter.toLowerCase();
	      });
	    });
	    return formatted;
	  } : function (fields) {
	    return fields;
	  };

	  var EMPTY_ARRAY = t.arrayExpression([]);
	  var FIELDS = formatFields({
	    __typename: '__typename',
	    clientMutationId: 'clientMutationId',
	    clientSubscriptionId: 'clientSubscriptionId',
	    cursor: 'cursor',
	    edges: 'edges',
	    hasNextPage: 'hasNextPage',
	    hasPreviousPage: 'hasPreviousPage',
	    node: 'node',
	    pageInfo: 'pageInfo'
	  });
	  var INPUT_ARGUMENT_NAME = options.inputArgumentName || 'input';
	  var NULL = t.nullLiteral();

	  var RelayQLPrinter = function () {
	    function RelayQLPrinter(tagName, variableNames) {
	      (0, _classCallCheck3['default'])(this, RelayQLPrinter);

	      this.tagName = tagName;
	      this.variableNames = variableNames;
	    }

	    RelayQLPrinter.prototype.print = function print(definition, substitutions) {
	      var enableValidation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	      var printedDocument = void 0;
	      if (definition instanceof RelayQLQuery) {
	        printedDocument = this.printQuery(definition, enableValidation);
	      } else if (definition instanceof RelayQLFragment) {
	        printedDocument = this.printFragment(definition);
	      } else if (definition instanceof RelayQLMutation) {
	        printedDocument = this.printMutation(definition, enableValidation);
	      } else if (definition instanceof RelayQLSubscription) {
	        printedDocument = this.printSubscription(definition, enableValidation);
	      } else {
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('Unsupported definition: %s', definition), definition.getLocation());
	      }
	      return t.callExpression(t.functionExpression(null, substitutions.map(function (substitution) {
	        return t.identifier(substitution.name);
	      }), t.blockStatement([t.returnStatement(printedDocument)])), substitutions.map(function (substitution) {
	        return substitution.value;
	      }));
	    };

	    RelayQLPrinter.prototype.printQuery = function printQuery(query, enableValidation) {
	      var rootFields = query.getFields();
	      if (rootFields.length !== 1 && enableValidation) {
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('There are %d fields supplied to the query named `%s`, but queries ' + 'must have exactly one field.', rootFields.length, query.getName()), query.getLocation());
	      }
	      var rootField = rootFields[0];
	      var rootFieldType = rootField.getType();
	      var rootFieldArgs = rootField.getArguments();

	      var requisiteFields = {};
	      var identifyingFieldDef = rootFieldType.getIdentifyingFieldDefinition();
	      if (identifyingFieldDef) {
	        requisiteFields[identifyingFieldDef.getName()] = true;
	      }
	      if (rootFieldType.isAbstract()) {
	        requisiteFields[FIELDS.__typename] = true;
	      }
	      var selections = this.printSelections(rootField, requisiteFields);
	      var metadata = {};
	      if (rootFieldType.isList()) {
	        metadata.isPlural = true;
	      }
	      if (rootFieldType.isAbstract()) {
	        metadata.isAbstract = true;
	      }
	      if (rootFieldArgs.length > 1) {
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('Invalid root field `%s`; Relay only supports root fields with zero ' + 'or one argument.', rootField.getName()), query.getLocation());
	      }

	      var calls = NULL;
	      if (rootFieldArgs.length === 1) {
	        // Until such time as a root field's 'identifying argument' (one that has
	        // a 1-1 correspondence with a Relay record, or null) has a formal type,
	        // assume that the lone arg in a root field's call is the identifying one.
	        var identifyingArg = rootFieldArgs[0];
	        var identifyingArgName = identifyingArg.getName();
	        var identifyingArgType = identifyingArg.getType().getName({ modifiers: true });
	        metadata.identifyingArgName = identifyingArgName;
	        metadata.identifyingArgType = identifyingArgType;
	        calls = t.arrayExpression([codify({
	          kind: t.valueToNode('Call'),
	          metadata: objectify({
	            type: identifyingArgType
	          }),
	          name: t.valueToNode(identifyingArgName),
	          value: this.printArgumentValue(identifyingArg)
	        })]);
	      }

	      return codify({
	        calls: calls,
	        children: selections,
	        directives: this.printDirectives(rootField.getDirectives()),
	        fieldName: t.valueToNode(rootField.getName()),
	        kind: t.valueToNode('Query'),
	        metadata: objectify(metadata),
	        name: t.valueToNode(query.getName()),
	        type: t.valueToNode(rootFieldType.getName({ modifiers: false }))
	      });
	    };

	    RelayQLPrinter.prototype.printFragment = function printFragment(fragment) {
	      var _this = this;

	      var fragmentType = fragment.getType();

	      var requisiteFields = {};
	      var idFragment = void 0;
	      if (fragmentType.hasField(ID)) {
	        requisiteFields[ID] = true;
	      } else if (shouldGenerateIdFragment(fragment)) {
	        idFragment = fragmentType.generateIdFragment();
	      }
	      if (fragmentType.isAbstract()) {
	        requisiteFields[FIELDS.__typename] = true;
	      }
	      var selections = this.printSelections(fragment, requisiteFields, idFragment ? [idFragment] : null, fragment.hasDirective('generated'));

	      var relayDirective = findRelayDirective(fragment);
	      var selectVariables = relayDirective && __webpack_require__(5)(relayDirective.getArguments(), function (arg) {
	        return arg.getName() === 'variables';
	      });

	      var metadata = this.printRelayDirectiveMetadata(fragment, {
	        isAbstract: fragmentType.isAbstract(),
	        isTrackingEnabled: !!selectVariables
	      });

	      var fragmentCode = codify({
	        children: selections,
	        directives: this.printDirectives(fragment.getDirectives()),
	        id: this.printFragmentID(fragment),
	        kind: t.valueToNode('Fragment'),
	        metadata: metadata,
	        name: t.valueToNode(fragment.getName()),
	        type: t.valueToNode(fragmentType.getName({ modifiers: false }))
	      });

	      if (selectVariables) {
	        var selectVariablesValue = selectVariables.getValue();
	        if (!Array.isArray(selectVariablesValue)) {
	          throw new (__webpack_require__(1))('The variables argument to the @relay directive should be an array ' + 'of strings.', fragment.getLocation());
	        }
	        return t.callExpression(t.memberExpression(identify(this.tagName), t.identifier('__createFragment')), [fragmentCode, t.objectExpression(selectVariablesValue.map(function (item) {
	          // $FlowFixMe
	          var value = item.getValue();
	          return property(value, _this.printVariable(value));
	        }))]);
	      }

	      return fragmentCode;
	    };

	    RelayQLPrinter.prototype.printFragmentID = function printFragmentID(fragment) {
	      return t.callExpression(t.memberExpression(identify(this.tagName), t.identifier('__id')), []);
	    };

	    RelayQLPrinter.prototype.printMutation = function printMutation(mutation, enableValidation) {
	      var rootFields = mutation.getFields();
	      if (rootFields.length !== 1 && enableValidation) {
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('There are %d fields supplied to the mutation named `%s`, but ' + 'mutations must have exactly one field.', rootFields.length, mutation.getName()), mutation.getLocation());
	      }
	      var rootField = rootFields[0];
	      var rootFieldType = rootField.getType();
	      validateMutationField(rootField);
	      var requisiteFields = {};
	      if (rootFieldType.hasField(FIELDS.clientMutationId)) {
	        requisiteFields[FIELDS.clientMutationId] = true;
	      }
	      var selections = this.printSelections(rootField, requisiteFields);
	      var metadata = {
	        inputType: this.printArgumentTypeForMetadata(rootField.getDeclaredArgument(INPUT_ARGUMENT_NAME))
	      };

	      return codify({
	        calls: t.arrayExpression([codify({
	          kind: t.valueToNode('Call'),
	          metadata: objectify({}),
	          name: t.valueToNode(rootField.getName()),
	          value: this.printVariable('input')
	        })]),
	        children: selections,
	        directives: this.printDirectives(mutation.getDirectives()),
	        kind: t.valueToNode('Mutation'),
	        metadata: objectify(metadata),
	        name: t.valueToNode(mutation.getName()),
	        responseType: t.valueToNode(rootFieldType.getName({ modifiers: false }))
	      });
	    };

	    RelayQLPrinter.prototype.printSubscription = function printSubscription(subscription, enableValidation) {
	      var rootFields = subscription.getFields();
	      if (rootFields.length !== 1 && enableValidation) {
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('There are %d fields supplied to the subscription named `%s`, but ' + 'subscriptions must have exactly one field.', rootFields.length, subscription.getName()), subscription.getLocation());
	      }
	      var rootField = rootFields[0];
	      var rootFieldType = rootField.getType();
	      validateMutationField(rootField);
	      var requisiteFields = {};
	      if (rootFieldType.hasField(FIELDS.clientSubscriptionId)) {
	        requisiteFields[FIELDS.clientSubscriptionId] = true;
	      }
	      if (rootFieldType.hasField(FIELDS.clientMutationId)) {
	        requisiteFields[FIELDS.clientMutationId] = true;
	      }
	      var selections = this.printSelections(rootField, requisiteFields);
	      var metadata = {
	        inputType: this.printArgumentTypeForMetadata(rootField.getDeclaredArgument(INPUT_ARGUMENT_NAME))
	      };

	      return codify({
	        calls: t.arrayExpression([codify({
	          kind: t.valueToNode('Call'),
	          metadata: objectify({}),
	          name: t.valueToNode(rootField.getName()),
	          value: this.printVariable('input')
	        })]),
	        children: selections,
	        directives: this.printDirectives(subscription.getDirectives()),
	        kind: t.valueToNode('Subscription'),
	        metadata: objectify(metadata),
	        name: t.valueToNode(subscription.getName()),
	        responseType: t.valueToNode(rootFieldType.getName({ modifiers: false }))
	      });
	    };

	    RelayQLPrinter.prototype.printSelections = function printSelections(parent, requisiteFields, extraFragments) {
	      var _this2 = this;

	      var isGeneratedQuery = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      var fields = [];
	      var printedFragments = [];
	      var didPrintFragmentReference = false;
	      parent.getSelections().forEach(function (selection) {
	        if (selection instanceof RelayQLFragmentSpread) {
	          // Assume that all spreads exist via template substitution.
	          if (selection.getDirectives().length !== 0) {
	            throw new (__webpack_require__(1))('Directives are not yet supported for `${fragment}`-style fragment ' + 'references.', selection.getLocation());
	          }
	          printedFragments.push(_this2.printFragmentReference(selection));
	          didPrintFragmentReference = true;
	        } else if (selection instanceof RelayQLInlineFragment) {
	          printedFragments.push(_this2.printFragment(selection.getFragment()));
	        } else if (selection instanceof RelayQLField) {
	          fields.push(selection);
	        } else {
	          throw new (__webpack_require__(1))(__webpack_require__(2).format('Unsupported selection type `%s`.', selection), selection.getLocation());
	        }
	      });
	      if (extraFragments) {
	        extraFragments.forEach(function (fragment) {
	          printedFragments.push(_this2.printFragment(fragment));
	        });
	      }
	      var printedFields = this.printFields(fields, parent, requisiteFields, isGeneratedQuery);
	      var selections = [].concat((0, _toConsumableArray3['default'])(printedFields), printedFragments);

	      if (selections.length) {
	        var arrayExpressionOfSelections = t.arrayExpression(selections);
	        return didPrintFragmentReference ? shallowFlatten(arrayExpressionOfSelections) : arrayExpressionOfSelections;
	      }
	      return NULL;
	    };

	    RelayQLPrinter.prototype.printFields = function printFields(fields, parent, requisiteFields) {
	      var _this3 = this;

	      var isGeneratedQuery = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      var parentType = parent.getType();
	      if (parentType.isConnection() && parentType.hasField(FIELDS.pageInfo) && fields.some(function (field) {
	        return field.getName() === FIELDS.edges;
	      })) {
	        requisiteFields[FIELDS.pageInfo] = true;
	      }

	      var generatedFields = (0, _extends3['default'])({}, requisiteFields);

	      var printedFields = [];
	      fields.forEach(function (field) {
	        delete generatedFields[field.getName()];
	        printedFields.push(_this3.printField(field, parent, requisiteFields, generatedFields, isGeneratedQuery));
	      });

	      Object.keys(generatedFields).forEach(function (fieldName) {
	        var generatedField = parentType.generateField(fieldName);
	        printedFields.push(_this3.printField(generatedField, parent, requisiteFields, generatedFields, isGeneratedQuery));
	      });
	      return printedFields;
	    };

	    RelayQLPrinter.prototype.printField = function printField(field, parent, requisiteSiblings, generatedSiblings) {
	      var _this4 = this;

	      var isGeneratedQuery = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	      var fieldType = field.getType();

	      var metadata = {};
	      var requisiteFields = {};
	      var idFragment = void 0;
	      if (fieldType.hasField(ID)) {
	        requisiteFields[ID] = true;
	      } else if (shouldGenerateIdFragment(field)) {
	        idFragment = fieldType.generateIdFragment();
	      }

	      if (!isGeneratedQuery) {
	        validateField(field, parent.getType());
	      }

	      if (fieldType.canHaveSubselections()) {
	        metadata.canHaveSubselections = true;
	      }
	      // TODO: Generalize to non-`Node` types.
	      if (fieldType.alwaysImplements('Node')) {
	        metadata.inferredRootCallName = 'node';
	        metadata.inferredPrimaryKey = ID;
	      }
	      if (fieldType.isConnection()) {
	        if (field.hasDeclaredArgument('first') || field.hasDeclaredArgument('last')) {
	          if (!isGeneratedQuery) {
	            validateConnectionField(field);
	          }
	          metadata.isConnection = true;
	          if (field.hasDeclaredArgument('find')) {
	            metadata.isFindable = true;
	          }
	        }
	      } else if (fieldType.isConnectionPageInfo()) {
	        requisiteFields[FIELDS.hasNextPage] = true;
	        requisiteFields[FIELDS.hasPreviousPage] = true;
	      } else if (fieldType.isConnectionEdge()) {
	        requisiteFields[FIELDS.cursor] = true;
	        requisiteFields[FIELDS.node] = true;
	      }
	      if (fieldType.isAbstract()) {
	        metadata.isAbstract = true;
	        requisiteFields[FIELDS.__typename] = true;
	      }
	      if (fieldType.isList()) {
	        metadata.isPlural = true;
	      }
	      if (generatedSiblings.hasOwnProperty(field.getName())) {
	        metadata.isGenerated = true;
	      }
	      if (requisiteSiblings.hasOwnProperty(field.getName())) {
	        metadata.isRequisite = true;
	      }

	      var selections = this.printSelections(field, requisiteFields, idFragment ? [idFragment] : null, isGeneratedQuery);
	      var fieldAlias = field.getAlias();
	      var args = field.getArguments();
	      var calls = args.length ? t.arrayExpression(args.map(function (arg) {
	        return _this4.printArgument(arg);
	      })) : NULL;

	      return codify({
	        alias: fieldAlias ? t.valueToNode(fieldAlias) : NULL,
	        calls: calls,
	        children: selections,
	        directives: this.printDirectives(field.getDirectives()),
	        fieldName: t.valueToNode(field.getName()),
	        kind: t.valueToNode('Field'),
	        metadata: this.printRelayDirectiveMetadata(field, metadata),
	        type: t.valueToNode(fieldType.getName({ modifiers: false }))
	      });
	    };

	    RelayQLPrinter.prototype.printFragmentReference = function printFragmentReference(fragmentReference) {
	      return t.callExpression(t.memberExpression(identify(this.tagName), t.identifier('__frag')), [t.identifier(fragmentReference.getName())]);
	    };

	    RelayQLPrinter.prototype.printArgument = function printArgument(arg) {
	      var metadata = {};
	      var inputType = this.printArgumentTypeForMetadata(arg.getType());
	      if (inputType) {
	        metadata.type = inputType;
	      }
	      return codify({
	        kind: t.valueToNode('Call'),
	        metadata: objectify(metadata),
	        name: t.valueToNode(arg.getName()),
	        value: this.printArgumentValue(arg)
	      });
	    };

	    RelayQLPrinter.prototype.printArgumentValue = function printArgumentValue(arg) {
	      if (arg.isVariable()) {
	        return this.printVariable(arg.getVariableName());
	      } else {
	        return this.printValue(arg.getValue());
	      }
	    };

	    RelayQLPrinter.prototype.printVariable = function printVariable(name) {
	      // Assume that variables named like substitutions are substitutions.
	      if (this.variableNames.hasOwnProperty(name)) {
	        return t.callExpression(t.memberExpression(identify(this.tagName), t.identifier('__var')), [t.identifier(name)]);
	      }
	      return codify({
	        kind: t.valueToNode('CallVariable'),
	        callVariableName: t.valueToNode(name)
	      });
	    };

	    RelayQLPrinter.prototype.printValue = function printValue(value) {
	      var _this5 = this;

	      if (Array.isArray(value)) {
	        return t.arrayExpression(
	        // $FlowFixMe
	        value.map(function (element) {
	          return _this5.printArgumentValue(element);
	        }));
	      }
	      return codify({
	        kind: t.valueToNode('CallValue'),
	        // codify() skips properties where value === NULL, but `callValue` is a
	        // required property. Create fresh null literals to force the property
	        // to be printed.
	        callValue: value == null ? t.nullLiteral() : printLiteralValue(value)
	      });
	    };

	    RelayQLPrinter.prototype.printDirectives = function printDirectives(directives) {
	      var _this6 = this;

	      var printedDirectives = [];
	      directives.forEach(function (directive) {
	        if (directive.getName() === 'relay') {
	          return;
	        }
	        printedDirectives.push(t.objectExpression([property('kind', t.valueToNode('Directive')), property('name', t.valueToNode(directive.getName())), property('args', t.arrayExpression(directive.getArguments().map(function (arg) {
	          return t.objectExpression([property('name', t.valueToNode(arg.getName())), property('value', _this6.printArgumentValue(arg))]);
	        })))]));
	      });
	      if (printedDirectives.length) {
	        return t.arrayExpression(printedDirectives);
	      }
	      return NULL;
	    };

	    RelayQLPrinter.prototype.printRelayDirectiveMetadata = function printRelayDirectiveMetadata(node,
	    /* $FlowFixMe(>=0.38.0 site=react_native_fb,oss) - Flow error detected during
	     * the deployment of v0.38.0. To see the error, remove this comment and
	     * run flow */
	    maybeMetadata) {
	      var properties = [];
	      var relayDirective = findRelayDirective(node);
	      if (relayDirective) {
	        relayDirective.getArguments().forEach(function (arg) {
	          if (arg.isVariable()) {
	            throw new (__webpack_require__(1))(__webpack_require__(2).format('You supplied `$%s` as the `%s` argument to the `@relay` ' + 'directive, but `@relay` require scalar argument values.', arg.getVariableName(), arg.getName()), node.getLocation());
	          }
	          if (arg.getName() !== 'variables') {
	            properties.push(property(arg.getName(), t.valueToNode(arg.getValue())));
	          }
	        });
	      }
	      if (maybeMetadata) {
	        var metadata = maybeMetadata;
	        Object.keys(metadata).forEach(function (key) {
	          if (metadata[key]) {
	            properties.push(property(key, t.valueToNode(metadata[key])));
	          }
	        });
	      }
	      return t.objectExpression(properties);
	    };

	    /**
	     * Prints the type for arguments that are transmitted via variables.
	     */


	    RelayQLPrinter.prototype.printArgumentTypeForMetadata = function printArgumentTypeForMetadata(argType) {
	      // Only booleans and strings can be safely inlined, which is indicated to
	      // the runtime by the lack of a `metadata.type` property.
	      // - numbers may be represented as strings in client code due to
	      //   the limitations with JavaScript numeric representations, and a
	      //   string can't be inlined where a number is expected.
	      // - enums are unquoted, unlike JSON.
	      // - input objects have unquoted keys, unlike JSON.
	      // - custom scalars could be objects, in which case input object rules
	      //   apply.
	      if (argType.isBoolean() || argType.isID() || argType.isString()) {
	        return null;
	      }
	      return argType.getName({ modifiers: true });
	    };

	    return RelayQLPrinter;
	  }();

	  /**
	   * Determine if a `... on Node { id }` fragment should be generated for a
	   * field/fragment to allow identification of the response record. This
	   * fragment should be added when some/all implementors of the node's type
	   * also implement `Node` but a `Node` fragment is not already present. If it
	   * is present then `id` would be added as a requisite field.
	   */


	  function shouldGenerateIdFragment(node) {
	    return node.getType().mayImplement('Node') && !node.getSelections().some(function (selection) {
	      return selection instanceof RelayQLInlineFragment && selection.getFragment().getType().getName({ modifiers: false }) === 'Node';
	    });
	  }

	  function validateField(field, parentType) {
	    if (field.getName() === 'node') {
	      var argTypes = field.getDeclaredArguments();
	      var argNames = Object.keys(argTypes);
	      if (!parentType.isQueryType() && argNames.length === 1 && argNames[0] === ID) {
	        throw new (__webpack_require__(1))(__webpack_require__(2).format('You defined a `node(%s: %s)` field on type `%s`, but Relay requires ' + 'the `node` field to be defined on the root type. See the Object ' + 'Identification Guide: \n' + 'http://facebook.github.io/relay/docs/graphql-object-identification.html', ID, argNames[0] && argTypes[argNames[0]].getName({ modifiers: true }), parentType.getName({ modifiers: false })), field.getLocation());
	      }
	    }
	  }

	  function validateConnectionField(field) {
	    var _ref = [field.findArgument('first'), field.findArgument('last'), field.findArgument('before'), field.findArgument('after')],
	        first = _ref[0],
	        last = _ref[1],
	        before = _ref[2],
	        after = _ref[3];

	    var condition = !first || !last || first.isVariable() && last.isVariable();
	    if (!condition) {
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('Connection arguments `%s(first: <count>, last: <count>)` are ' + 'not supported unless both are variables. Use `(first: <count>)`, ' + '`(last: <count>)`, or `(first: $<var>, last: $<var>)`.', field.getName()), field.getLocation());
	    }
	    condition = !first || !before || first.isVariable() && before.isVariable();
	    if (!condition) {
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('Connection arguments `%s(before: <cursor>, first: <count>)` are ' + 'not supported unless both are variables. Use `(first: <count>)`, ' + '`(after: <cursor>, first: <count>)`, `(before: <cursor>, last: <count>)`, ' + 'or `(before: $<var>, first: $<var>)`.', field.getName()), field.getLocation());
	    }
	    condition = !last || !after || last.isVariable() && after.isVariable();
	    if (!condition) {
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('Connection arguments `%s(after: <cursor>, last: <count>)` are ' + 'not supported unless both are variables. Use `(last: <count>)`, ' + '`(before: <cursor>, last: <count>)`, `(after: <cursor>, first: <count>)`, ' + 'or `(after: $<var>, last: $<var>)`.', field.getName()), field.getLocation());
	    }

	    // Use `any` because we already check `isConnection` before validating.
	    var connectionNodeType = field.getType().getFieldDefinition(FIELDS.edges).getType().getFieldDefinition(FIELDS.node).getType();

	    // NOTE: These checks are imperfect because we cannot trace fragment spreads.
	    forEachRecursiveField(field, function (subfield) {
	      if (subfield.getName() === FIELDS.edges || subfield.getName() === FIELDS.pageInfo) {
	        var hasCondition = field.isPattern() || field.hasArgument('find') || field.hasArgument('first') || field.hasArgument('last');

	        if (!hasCondition) {
	          throw new (__webpack_require__(1))(__webpack_require__(2).format('You supplied the `%s` field on a connection named `%s`, but you did ' + 'not supply an argument necessary for Relay to handle the connection. ' + 'Please specify a limit argument like `first`, or `last` or ' + 'fetch a specific item with a `find` argument.', subfield.getName(), field.getName()), field.getLocation());
	        }
	      } else {
	        // Suggest `edges{node{...}}` instead of `nodes{...}`.
	        var subfieldType = subfield.getType();
	        var isNodesLikeField = subfieldType.isList() && subfieldType.getName({ modifiers: false }) === connectionNodeType.getName({ modifiers: false });

	        if (isNodesLikeField) {
	          throw new (__webpack_require__(1))(__webpack_require__(2).format('You supplied a field named `%s` on a connection named `%s`, but ' + 'pagination is not supported on connections without using `%s`. ' + 'Use `%s{%s{%s{...}}}` instead.', subfield.getName(), field.getName(), FIELDS.edges, field.getName(), FIELDS.edges, FIELDS.node), field.getLocation());
	        }
	      }
	    });
	  }

	  function validateMutationField(rootField) {
	    var declaredArgs = rootField.getDeclaredArguments();
	    var declaredArgNames = Object.keys(declaredArgs);
	    if (declaredArgNames.length !== 1) {
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('Your schema defines a mutation field `%s` that takes %d arguments, ' + 'but mutation fields must have exactly one argument named `%s`.', rootField.getName(), declaredArgNames.length, INPUT_ARGUMENT_NAME), rootField.getLocation());
	    }

	    if (declaredArgNames[0] !== INPUT_ARGUMENT_NAME) {
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('Your schema defines a mutation field `%s` that takes an argument ' + 'named `%s`, but mutation fields must have exactly one argument ' + 'named `%s`.', rootField.getName(), declaredArgNames[0], INPUT_ARGUMENT_NAME), rootField.getLocation());
	    }

	    var rootFieldArgs = rootField.getArguments();
	    if (rootFieldArgs.length > 1) {
	      throw new (__webpack_require__(1))(__webpack_require__(2).format('There are %d arguments supplied to the mutation field named `%s`, ' + 'but mutation fields must have exactly one `%s` argument.', rootFieldArgs.length, rootField.getName(), INPUT_ARGUMENT_NAME), rootField.getLocation());
	    }
	  }

	  var forEachRecursiveField = function forEachRecursiveField(parentSelection, callback) {
	    parentSelection.getSelections().forEach(function (selection) {
	      if (selection instanceof RelayQLField) {
	        callback(selection);
	      } else if (selection instanceof RelayQLInlineFragment) {
	        forEachRecursiveField(selection.getFragment(), callback);
	      }
	      // Ignore `RelayQLFragmentSpread` selections.
	    });
	  };

	  function codify(obj) {
	    var properties = [];
	    Object.keys(obj).forEach(function (key) {
	      var value = obj[key];
	      if (value !== NULL) {
	        properties.push(property(key, value));
	      }
	    });
	    return t.objectExpression(properties);
	  }

	  function identify(str) {
	    // $FlowFixMe
	    return str.split('.').reduce(function (acc, name) {
	      if (!acc) {
	        return t.identifier(name);
	      }
	      return t.memberExpression(acc, t.identifier(name));
	    }, null);
	  }

	  function objectify(obj) {
	    var properties = [];
	    Object.keys(obj).forEach(function (key) {
	      var value = obj[key];
	      if (value) {
	        properties.push(property(key, t.valueToNode(value)));
	      }
	    });
	    return t.objectExpression(properties);
	  }

	  function property(name, value) {
	    return t.objectProperty(t.identifier(name), value);
	  }

	  function printLiteralValue(value) {
	    if (value == null) {
	      return NULL;
	    } else if (Array.isArray(value)) {
	      return t.arrayExpression(value.map(printLiteralValue));
	    } else if (typeof value === 'object' && value != null) {
	      var objectValue = value;
	      return t.objectExpression(Object.keys(objectValue).map(function (key) {
	        return property(key, printLiteralValue(objectValue[key]));
	      }));
	    } else {
	      return t.valueToNode(value);
	    }
	  }

	  function shallowFlatten(arr) {
	    return t.callExpression(t.memberExpression(t.memberExpression(EMPTY_ARRAY, t.identifier('concat')), t.identifier('apply')), [EMPTY_ARRAY, arr]);
	  }

	  function findRelayDirective(node) {
	    return __webpack_require__(5)(node.getDirectives(), function (directive) {
	      return directive.getName() === 'relay';
	    });
	  }

	  return RelayQLPrinter;
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _classCallCheck3 = _interopRequireDefault(__webpack_require__(6));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _require = __webpack_require__(9),
	    RelayQLFragment = _require.RelayQLFragment,
	    RelayQLMutation = _require.RelayQLMutation,
	    RelayQLQuery = _require.RelayQLQuery,
	    RelayQLSubscription = _require.RelayQLSubscription;

	var _require2 = __webpack_require__(4),
	    formatError = _require2.formatError,
	    parse = _require2.parse,
	    Source = _require2.Source,
	    validate = _require2.validate,
	    ArgumentsOfCorrectTypeRule = _require2.ArgumentsOfCorrectTypeRule,
	    DefaultValuesOfCorrectTypeRule = _require2.DefaultValuesOfCorrectTypeRule,
	    FieldsOnCorrectTypeRule = _require2.FieldsOnCorrectTypeRule,
	    FragmentsOnCompositeTypesRule = _require2.FragmentsOnCompositeTypesRule,
	    KnownArgumentNamesRule = _require2.KnownArgumentNamesRule,
	    KnownTypeNamesRule = _require2.KnownTypeNamesRule,
	    PossibleFragmentSpreadsRule = _require2.PossibleFragmentSpreadsRule,
	    VariablesInAllowedPositionRule = _require2.VariablesInAllowedPositionRule,
	    ProvidedNonNullArgumentsRule = _require2.ProvidedNonNullArgumentsRule;

	/**
	 * Transforms a TemplateLiteral node into a RelayQLDefinition, which is then
	 * transformed into a Babel AST via RelayQLPrinter.
	 */
	var RelayQLTransformer = function () {
	  function RelayQLTransformer(schema, options) {
	    (0, _classCallCheck3['default'])(this, RelayQLTransformer);

	    this.schema = schema;
	    this.options = options;
	  }

	  RelayQLTransformer.prototype.transform = function transform(t, // Babel
	  node, options) {
	    var _processTemplateLiter = this.processTemplateLiteral(node, options.documentName),
	        substitutions = _processTemplateLiter.substitutions,
	        templateText = _processTemplateLiter.templateText,
	        variableNames = _processTemplateLiter.variableNames;

	    var documentText = this.processTemplateText(templateText, options);
	    var definition = this.processDocumentText(documentText, options);

	    var Printer = __webpack_require__(15)(t, this.options);
	    return new Printer(options.tagName, variableNames).print(definition, substitutions, options.enableValidation);
	  };

	  /**
	   * Convert TemplateLiteral into a single template string with substitution
	   * names, a matching array of substituted values, and a set of substituted
	   * variable names.
	   */


	  RelayQLTransformer.prototype.processTemplateLiteral = function processTemplateLiteral(node, documentName) {
	    var _this = this;

	    var chunks = [];
	    var variableNames = {};
	    var substitutions = [];
	    node.quasis.forEach(function (element, ii) {
	      var chunk = element.value.cooked;
	      chunks.push(chunk);
	      if (!element.tail) {
	        var name = 'RQL_' + ii;
	        var _value = node.expressions[ii];
	        substitutions.push({ name: name, value: _value });
	        if (/:\s*$/.test(chunk)) {
	          __webpack_require__(3)(_this.options.substituteVariables, 'You supplied a GraphQL document named `%s` that uses template ' + 'substitution for an argument value, but variable substitution ' + 'has not been enabled.', documentName);
	          chunks.push('$' + name);
	          variableNames[name] = undefined;
	        } else {
	          chunks.push('...' + name);
	        }
	      }
	    });
	    return { substitutions: substitutions, templateText: chunks.join('').trim(), variableNames: variableNames };
	  };

	  /**
	   * Converts the template string into a valid GraphQL document string.
	   */


	  RelayQLTransformer.prototype.processTemplateText = function processTemplateText(templateText, _ref) {
	    var documentName = _ref.documentName,
	        propName = _ref.propName;

	    var pattern = /^(fragment|mutation|query|subscription)\s*(\w*)?([\s\S]*)/;
	    var matches = pattern.exec(templateText);
	    __webpack_require__(3)(matches, 'You supplied a GraphQL document named `%s` with invalid syntax. It ' + 'must start with `fragment`, `mutation`, `query`, or `subscription`.', documentName);
	    var type = matches[1];
	    var name = matches[2] || documentName;
	    var rest = matches[3];
	    // Allow `fragment on Type {...}`.
	    if (type === 'fragment' && name === 'on') {
	      name = documentName + (propName ? '_' + capitalize(propName) : '') + 'RelayQL';
	      rest = 'on' + rest;
	    }
	    var definitionName = capitalize(name);
	    return type + ' ' + definitionName + ' ' + rest;
	  };

	  /**
	   * Parses the GraphQL document string into a RelayQLDocument.
	   */


	  RelayQLTransformer.prototype.processDocumentText = function processDocumentText(documentText, _ref2) {
	    var documentName = _ref2.documentName,
	        enableValidation = _ref2.enableValidation;

	    var document = parse(new Source(documentText, documentName));
	    var validationErrors = enableValidation ? this.validateDocument(document, documentName) : null;
	    if (validationErrors) {
	      var error = new Error(__webpack_require__(2).format('You supplied a GraphQL document named `%s` with validation errors.', documentName));
	      error.validationErrors = validationErrors;
	      error.sourceText = documentText;
	      throw error;
	    }
	    var definition = document.definitions[0];

	    var context = {
	      definitionName: capitalize(documentName),
	      isPattern: false,
	      generateID: createIDGenerator(),
	      schema: this.schema
	    };
	    if (definition.kind === 'FragmentDefinition') {
	      return new RelayQLFragment(context, definition);
	    } else if (definition.kind === 'OperationDefinition') {
	      if (definition.operation === 'mutation') {
	        return new RelayQLMutation(context, definition);
	      } else if (definition.operation === 'query') {
	        return new RelayQLQuery(context, definition);
	      } else if (definition.operation === 'subscription') {
	        return new RelayQLSubscription(context, definition);
	      } else {
	        __webpack_require__(3)(false, 'Unsupported operation: %s', definition.operation);
	      }
	    } else {
	      __webpack_require__(3)(false, 'Unsupported definition kind: %s', definition.kind);
	    }
	  };

	  RelayQLTransformer.prototype.validateDocument = function validateDocument(document, documentName) {
	    __webpack_require__(3)(document.definitions.length === 1, 'You supplied a GraphQL document named `%s` with %d definitions, but ' + 'it must have exactly one definition.', documentName, document.definitions.length);
	    var definition = document.definitions[0];
	    var isMutation = definition.kind === 'OperationDefinition' && definition.operation === 'mutation';

	    var validator = this.options.validator;
	    var validationErrors = void 0;
	    if (validator) {
	      validationErrors = validator().validate(this.schema, document);
	    } else {
	      var rules = [ArgumentsOfCorrectTypeRule, DefaultValuesOfCorrectTypeRule, FieldsOnCorrectTypeRule, FragmentsOnCompositeTypesRule, KnownArgumentNamesRule, KnownTypeNamesRule, PossibleFragmentSpreadsRule, VariablesInAllowedPositionRule];
	      if (!isMutation) {
	        rules.push(ProvidedNonNullArgumentsRule);
	      }
	      validationErrors = validate(this.schema, document, rules);
	    }

	    if (validationErrors && validationErrors.length > 0) {
	      return validationErrors.map(formatError);
	    }
	    return null;
	  };

	  return RelayQLTransformer;
	}();

	function capitalize(string) {
	  return string[0].toUpperCase() + string.slice(1);
	}

	/**
	 * Utility to generate locally scoped auto-incrementing IDs.
	 */
	function createIDGenerator() {
	  var _id = 0;
	  return function () {
	    return (_id++).toString(32);
	  };
	}

	module.exports = RelayQLTransformer;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule compileGraphQLTag
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Given a graphql`` tagged template literal, replace it with the appropriate
	 * runtime artifact.
	 */
	function compileGraphQLTag(t, path, state, ast) {
	  var mainDefinition = ast.definitions[0];

	  if (mainDefinition.kind === 'FragmentDefinition') {
	    var objPropName = getAssignedObjectPropertyName(t, path);
	    if (objPropName) {
	      if (ast.definitions.length !== 1) {
	        throw new Error('BabelPluginRelay: Expected exactly one fragment in the ' + ('graphql tag referenced by the property ' + objPropName + '.'));
	      }
	      return replaceMemoized(t, path, createAST(t, state, path, mainDefinition));
	    }

	    var nodeMap = {};
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = ast.definitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var definition = _step.value;

	        if (definition.kind !== 'FragmentDefinition') {
	          throw new Error('BabelPluginRelay: Expected only fragments within this ' + 'graphql tag.');
	        }

	        var _getFragmentNameParts = __webpack_require__(7)(definition.name.value),
	            propName = _getFragmentNameParts[1];

	        nodeMap[propName] = createAST(t, state, path, definition);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator['return']) {
	          _iterator['return']();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return replaceMemoized(t, path, createObject(t, nodeMap));
	  }

	  if (mainDefinition.kind === 'OperationDefinition') {
	    if (ast.definitions.length !== 1) {
	      throw new Error('BabelPluginRelay: Expected exactly one operation ' + '(query, mutation, or subscription) per graphql tag.');
	    }
	    return replaceMemoized(t, path, createAST(t, state, path, mainDefinition));
	  }

	  throw new Error('BabelPluginRelay: Expected a fragment, mutation, query, or ' + 'subscription, got `' + mainDefinition.kind + '`.');
	}

	function createAST(t, state, path, graphqlDefinition) {
	  var isCompatMode = Boolean(state.opts && state.opts.compat);
	  var isHasteMode = Boolean(state.opts && state.opts.haste);

	  var modernNode = __webpack_require__(20)(t, graphqlDefinition, isHasteMode);
	  if (isCompatMode) {
	    return __webpack_require__(19)(t, modernNode, __webpack_require__(18)(t, path, graphqlDefinition, state));
	  }
	  return modernNode;
	}

	function replaceMemoized(t, path, ast) {
	  var topScope = path.scope;
	  while (topScope.parent) {
	    topScope = topScope.parent;
	  }

	  if (path.scope === topScope) {
	    path.replaceWith(ast);
	  } else {
	    var id = topScope.generateDeclaredUidIdentifier('graphql');
	    path.replaceWith(t.logicalExpression('||', id, t.assignmentExpression('=', id, ast)));
	  }
	}

	function createObject(t, obj) {
	  return t.objectExpression(Object.keys(obj).map(function (key) {
	    return t.objectProperty(t.identifier(key), obj[key]);
	  }));
	}

	function getAssignedObjectPropertyName(t, path) {
	  var property = path;
	  while (property) {
	    if (t.isObjectProperty(property) && property.node.key.name) {
	      return property.node.key.name;
	    }
	    property = property.parentPath;
	  }
	}

	module.exports = compileGraphQLTag;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule createClassicNode
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Relay Classic transforms to inline generated content.
	 */
	function createClassicNode(t, path, graphqlDefinition, state) {
	  if (graphqlDefinition.kind === 'FragmentDefinition') {
	    return createFragmentConcreteNode(t, path, graphqlDefinition, state);
	  }

	  if (graphqlDefinition.kind === 'OperationDefinition') {
	    return createOperationConcreteNode(t, path, graphqlDefinition, state);
	  }

	  throw new Error('BabelPluginRelay: Expected a fragment, mutation, query, or ' + 'subscription, got `' + graphqlDefinition.kind + '`.');
	}

	function createFragmentConcreteNode(t, path, definition, state) {
	  var _createClassicAST = createClassicAST(t, definition),
	      classicAST = _createClassicAST.classicAST,
	      fragments = _createClassicAST.fragments,
	      variables = _createClassicAST.variables,
	      argumentDefinitions = _createClassicAST.argumentDefinitions;

	  var substitutions = createSubstitutionsForFragmentSpreads(t, path, fragments);

	  var transformedAST = createObject(t, {
	    kind: t.stringLiteral('FragmentDefinition'),
	    argumentDefinitions: createFragmentArguments(t, argumentDefinitions, variables),
	    node: createRelayQLTemplate(t, path, classicAST, state)
	  });

	  return createConcreteNode(t, transformedAST, substitutions, state);
	}

	function createOperationConcreteNode(t, path, definition, state) {
	  var definitionName = definition.name;
	  if (!definitionName) {
	    throw new Error('GraphQL operations must contain names');
	  }

	  var _createClassicAST2 = createClassicAST(t, definition),
	      classicAST = _createClassicAST2.classicAST,
	      fragments = _createClassicAST2.fragments;

	  var substitutions = createSubstitutionsForFragmentSpreads(t, path, fragments);
	  var nodeAST = classicAST.operation === 'query' ? createFragmentForOperation(t, path, classicAST, state) : createRelayQLTemplate(t, path, classicAST, state);
	  var transformedAST = createObject(t, {
	    kind: t.stringLiteral('OperationDefinition'),
	    argumentDefinitions: createOperationArguments(t, definition.variableDefinitions),
	    name: t.stringLiteral(definitionName.value),
	    operation: t.stringLiteral(classicAST.operation),
	    node: nodeAST
	  });

	  return createConcreteNode(t, transformedAST, substitutions, state);
	}

	function createClassicAST(t, definition) {
	  var fragmentID = 0;

	  var fragments = {};
	  var variables = {};
	  var argumentDefinitions = null;

	  var visitors = {
	    Directive: function Directive(node) {
	      switch (node.name.value) {
	        case 'argumentDefinitions':
	          if (argumentDefinitions) {
	            throw new Error('BabelPluginRelay: Expected only one ' + '@argumentDefinitions directive');
	          }
	          argumentDefinitions = node.arguments;
	          return null;
	        case 'connection':
	          return null;
	        default:
	          return node;
	      }
	    },
	    FragmentSpread: function FragmentSpread(node) {
	      var directives = node.directives;

	      var fragmentName = node.name.value;
	      var fragmentArgumentsAST = null;
	      var substitutionName = null;
	      var isMasked = true;

	      if (directives.length === 0) {
	        substitutionName = fragmentName;
	      } else {
	        // TODO: maybe add support when unmasked fragment has arguments.
	        var directive = directives[0];
	        __webpack_require__(3)(directives.length === 1, 'BabelPluginRelay: Cannot use both `@arguments` and `@relay(mask: false)` on the ' + 'same fragment spread when in compat mode.');
	        switch (directive.name.value) {
	          case 'arguments':
	            var fragmentArgumentsObject = {};
	            directive.arguments.forEach(function (argNode) {
	              var argValue = argNode.value;
	              if (argValue.kind === 'Variable') {
	                variables[argValue.name.value] = null;
	              }
	              var arg = convertArgument(t, argNode);
	              fragmentArgumentsObject[arg.name] = arg.ast;
	            });
	            fragmentArgumentsAST = createObject(t, fragmentArgumentsObject);
	            fragmentID++;
	            substitutionName = fragmentName + '_args' + fragmentID;
	            break;
	          case 'relay':
	            var relayArguments = directive.arguments;
	            __webpack_require__(3)(relayArguments.length === 1 && relayArguments[0].name.value === 'mask', 'BabelPluginRelay: Expected `@relay` directive to only have `mask` argument in ' + 'compat mode, but get %s', relayArguments[0].name.value);
	            substitutionName = fragmentName;
	            isMasked = relayArguments[0].value.value !== false;
	            break;
	          default:
	            throw new Error('BabelPluginRelay: Unsupported directive `' + directive.name.value + '` on fragment spread `...' + fragmentName + '`.');
	        }
	      }

	      __webpack_require__(3)(substitutionName, 'BabelPluginRelay: Expected `substitutionName` to be non-null');
	      fragments[substitutionName] = {
	        name: fragmentName,
	        args: fragmentArgumentsAST,
	        isMasked: isMasked
	      };
	      return Object.assign({}, node, {
	        name: { kind: 'Name', value: substitutionName },
	        directives: []
	      });
	    },
	    Variable: function Variable(node) {
	      variables[node.name.value] = null;
	      return node;
	    }
	  };
	  var classicAST = __webpack_require__(4).visit(definition, visitors);

	  return {
	    classicAST: classicAST,
	    fragments: fragments,
	    variables: variables,
	    argumentDefinitions: argumentDefinitions
	  };
	}

	var RELAY_QL_GENERATED = 'RelayQL_GENERATED';

	function createConcreteNode(t, transformedAST, substitutions, state) {
	  var body = [t.returnStatement(transformedAST)];
	  if (substitutions.length > 0) {
	    body.unshift(t.variableDeclaration('const', substitutions));
	  }
	  return t.functionExpression(null, [t.identifier(RELAY_QL_GENERATED)], t.blockStatement(body));
	}

	function createOperationArguments(t, variableDefinitions) {
	  if (!variableDefinitions) {
	    return t.arrayExpression([]);
	  }
	  return t.arrayExpression(variableDefinitions.map(function (definition) {
	    var name = definition.variable.name.value;
	    var defaultValue = definition.defaultValue ? parseValue(t, definition.defaultValue) : t.nullLiteral();
	    return createLocalArgument(t, name, defaultValue);
	  }));
	}

	function createFragmentArguments(t, argumentDefinitions, variables) {
	  var concreteDefinitions = [];
	  Object.keys(variables).forEach(function (name) {
	    var definition = (argumentDefinitions || []).find(function (arg) {
	      return arg.name.value === name;
	    });
	    if (definition) {
	      var defaultValueField = definition.value.fields.find(function (field) {
	        return field.name.value === 'defaultValue';
	      });
	      var defaultValue = defaultValueField ? parseValue(t, defaultValueField.value) : t.nullLiteral();
	      concreteDefinitions.push(createLocalArgument(t, name, defaultValue));
	    } else {
	      concreteDefinitions.push(createRootArgument(t, name));
	    }
	  });
	  return t.arrayExpression(concreteDefinitions);
	}

	function createLocalArgument(t, variableName, defaultValue) {
	  return createObject(t, {
	    defaultValue: defaultValue,
	    kind: t.stringLiteral('LocalArgument'),
	    name: t.stringLiteral(variableName)
	  });
	}

	function createRootArgument(t, variableName) {
	  return t.objectExpression([t.objectProperty(t.identifier('kind'), t.stringLiteral('RootArgument')), t.objectProperty(t.identifier('name'), t.stringLiteral(variableName))]);
	}

	function parseValue(t, value) {
	  switch (value.kind) {
	    case 'BooleanValue':
	      return t.booleanLiteral(value.value);
	    case 'IntValue':
	      return t.numericLiteral(parseInt(value.value, 10));
	    case 'FloatValue':
	      return t.numericLiteral(parseFloat(value.value));
	    case 'StringValue':
	      return t.stringLiteral(value.value);
	    case 'EnumValue':
	      return t.stringLiteral(value.value);
	    case 'ListValue':
	      return t.arrayExpression(value.values.map(function (item) {
	        return parseValue(t, item);
	      }));
	    default:
	      throw new Error('BabelPluginRelay: Unsupported literal type `' + value.kind + '`.');
	  }
	}

	function convertArgument(t, argNode) {
	  var name = argNode.name.value;
	  var value = argNode.value;
	  var ast = null;
	  switch (value.kind) {
	    case 'Variable':
	      var paramName = value.name.value;
	      ast = createObject(t, {
	        kind: t.stringLiteral('CallVariable'),
	        callVariableName: t.stringLiteral(paramName)
	      });
	      break;
	    default:
	      ast = parseValue(t, value);
	  }
	  return { name: name, ast: ast };
	}

	function createObject(t, obj) {
	  return t.objectExpression(Object.keys(obj).map(function (key) {
	    return t.objectProperty(t.identifier(key), obj[key]);
	  }));
	}

	function getSchemaOption(state) {
	  var schema = state.opts && state.opts.schema;
	  __webpack_require__(3)(schema, 'babel-plugin-relay: Missing schema option. ' + 'Check your .babelrc file or wherever you configure your Babel ' + 'plugins to ensure the "relay" plugin has a "schema" option.\n' + 'https://facebook.github.io/relay/docs/babel-plugin-relay.html#additional-options');
	  return schema;
	}

	function createFragmentForOperation(t, path, operation, state) {
	  var type = void 0;
	  var schema = getSchemaOption(state);
	  var fileOpts = state.file && state.file.opts || {};
	  var transformer = __webpack_require__(12)(schema, state.opts || {}, fileOpts);
	  switch (operation.operation) {
	    case 'query':
	      var queryType = transformer.schema.getQueryType();
	      if (!queryType) {
	        throw new Error('Schema does not contain a root query type.');
	      }
	      type = queryType.name;
	      break;
	    case 'mutation':
	      var mutationType = transformer.schema.getMutationType();
	      if (!mutationType) {
	        throw new Error('Schema does not contain a root mutation type.');
	      }
	      type = mutationType.name;
	      break;
	    case 'subscription':
	      var subscriptionType = transformer.schema.getSubscriptionType();
	      if (!subscriptionType) {
	        throw new Error('Schema does not contain a root subscription type.');
	      }
	      type = subscriptionType.name;
	      break;
	    default:
	      throw new Error('BabelPluginRelay: Unexpected operation type: `' + operation.operation + '`.');
	  }
	  var fragmentNode = {
	    kind: 'FragmentDefinition',
	    loc: operation.loc,
	    name: {
	      kind: 'Name',
	      value: operation.name.value
	    },
	    typeCondition: {
	      kind: 'NamedType',
	      name: {
	        kind: 'Name',
	        value: type
	      }
	    },
	    directives: operation.directives,
	    selectionSet: operation.selectionSet
	  };
	  return createRelayQLTemplate(t, path, fragmentNode, state);
	}

	function createRelayQLTemplate(t, path, node, state) {
	  var schema = getSchemaOption(state);

	  var _getFragmentNameParts = __webpack_require__(7)(node.name.value),
	      documentName = _getFragmentNameParts[0],
	      propName = _getFragmentNameParts[1];

	  var text = __webpack_require__(4).print(node);
	  var quasi = t.templateLiteral([t.templateElement({ raw: text, cooked: text }, true)], []);

	  // Disable classic validation rules inside of `graphql` tags which are
	  // validated by the RelayCompiler with less strict rules.
	  var enableValidation = false;

	  return __webpack_require__(11)(t, path, schema, quasi, documentName, propName, RELAY_QL_GENERATED, enableValidation, state);
	}

	function createSubstitutionsForFragmentSpreads(t, path, fragments) {
	  return Object.keys(fragments).map(function (varName) {
	    var fragment = fragments[varName];

	    var _getFragmentNameParts2 = __webpack_require__(7)(fragment.name),
	        module = _getFragmentNameParts2[0],
	        propName = _getFragmentNameParts2[1];

	    if (!fragment.isMasked) {
	      __webpack_require__(3)(path.scope.hasBinding(module) || path.scope.hasBinding(propName), 'BabelPluginRelay: Please make sure module \'' + module + '\' is imported and not renamed or the\n        fragment \'' + fragment.name + '\' is defined and bound to local variable \'' + propName + '\'. ');
	      var fragmentProp = path.scope.hasBinding(propName) ? t.memberExpression(t.identifier(propName), t.identifier(propName)) : t.logicalExpression('||', t.memberExpression(t.memberExpression(t.identifier(module), t.identifier(propName)), t.identifier(propName)), t.memberExpression(t.identifier(module), t.identifier(propName)));

	      return t.variableDeclarator(t.identifier(varName), t.memberExpression(t.callExpression(t.memberExpression(t.identifier(RELAY_QL_GENERATED), t.identifier('__getClassicFragment')), [fragmentProp]),
	      // Hack to extract 'ConcreteFragment' from 'ConcreteFragmentDefinition'
	      t.identifier('node')));
	    } else {
	      return t.variableDeclarator(t.identifier(varName), createGetFragmentCall(t, path, module, propName, fragment.args));
	    }
	  });
	}

	function createGetFragmentCall(t, path, module, propName, fragmentArguments) {
	  var args = [];
	  if (propName) {
	    args.push(t.stringLiteral(propName));
	  }

	  if (fragmentArguments) {
	    args.push(fragmentArguments);
	  }

	  // If "module" is defined locally, then it's unsafe to assume it's a
	  // container. It might be a bound reference to the React class itself.
	  // To be safe, when defined locally, always check the __container__ property
	  // first.
	  var container = isDefinedLocally(path, module) ? t.logicalExpression('||',
	  // __container__ is defined via ReactRelayCompatContainerBuilder.
	  t.memberExpression(t.identifier(module), t.identifier('__container__')), t.identifier(module)) : t.identifier(module);

	  return t.callExpression(t.memberExpression(container, t.identifier('getFragment')), args);
	}

	function isDefinedLocally(path, name) {
	  var binding = path.scope.getBinding(name);
	  if (!binding) {
	    return false;
	  }

	  // Binding comes from import.
	  if (binding.kind === 'module') {
	    return false;
	  }

	  // Binding comes from require.
	  if (binding.path.isVariableDeclarator() && binding.path.get('init').node && binding.path.get('init.callee').isIdentifier({ name: 'require' })) {
	    return false;
	  }

	  // Otherwise, defined locally.
	  return true;
	}

	module.exports = createClassicNode;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule createCompatNode
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Relay Compat transforms graphql definitions into objects with `modern` and
	 * `classic` keys, each containing the resulting transforms.
	 */
	function createCompatNode(t, modernNode, classicNode) {
	  return t.objectExpression([t.objectProperty(t.identifier('modern'), modernNode), t.objectProperty(t.identifier('classic'), classicNode)]);
	}

	module.exports = createCompatNode;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule createModernNode
	 * 
	 * @format
	 */

	'use strict';

	var GENERATED = './__generated__/';

	/**
	 * Relay Modern creates separate generated files, so Babel transforms graphql
	 * definitions to lazy require function calls.
	 */
	function createModernNode(t, graphqlDefinition, isHasteMode) {
	  var definitionName = graphqlDefinition.name;
	  if (!definitionName) {
	    throw new Error('GraphQL operations and fragments must contain names');
	  }
	  var requiredFile = definitionName.value + '.graphql';
	  var requiredPath = isHasteMode ? requiredFile : GENERATED + requiredFile;
	  return t.functionExpression(null, [], t.blockStatement([t.returnStatement(t.callExpression(t.identifier('require'), [t.stringLiteral(requiredPath)]))]));
	}

	module.exports = createModernNode;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule createTransformError
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * In case of an error during transform, determine if it should be logged
	 * to the console and/or printed in the source.
	 */
	function createTransformError(error) {
	  if (error instanceof __webpack_require__(1)) {
	    return 'Relay Transform Error: ' + error.message;
	  }

	  var sourceText = error.sourceText,
	      validationErrors = error.validationErrors;

	  if (validationErrors && sourceText) {
	    var sourceLines = sourceText.split('\n');
	    return validationErrors.map(function (_ref) {
	      var message = _ref.message,
	          locations = _ref.locations;

	      return 'GraphQL Validation Error: ' + message + '\n' + locations.map(function (location) {
	        var preview = sourceLines[location.line - 1];
	        return preview && ['>', '> ' + preview, '> ' + ' '.repeat(location.column - 1) + '^^^'].join('\n');
	      }).filter(Boolean).join('\n');
	    }).join('\n');
	  }

	  return __webpack_require__(2).format('Relay Transform Error: %s\n\n%s', error.message, error.stack);
	}

	module.exports = createTransformError;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule getDocumentName
	 * 
	 * @format
	 */

	'use strict';

	var PROVIDES_MODULE = 'providesModule';

	/**
	 * Given a path anywhere in a document, produce the name of that document.
	 */
	function getDocumentName(path, state) {
	  var topPath = path;
	  while (topPath.parentPath) {
	    topPath = topPath.parentPath;
	  }
	  // Cache the document name onto this top level path.
	  var documentName = topPath.documentName;
	  if (!documentName) {
	    var parent = topPath.parent;
	    if (parent.comments && parent.comments.length) {
	      var docblock = parent.comments[0].value || '';
	      var propertyRegex = /@(\S+) *(\S*)/g;
	      var captures = void 0;
	      while (captures = propertyRegex.exec(docblock)) {
	        var property = captures[1];
	        var value = captures[2];
	        if (property === PROVIDES_MODULE) {
	          documentName = value.replace(/[\.-:]/g, '_');
	          break;
	        }
	      }
	    }
	    var basename = state.file && state.file.opts.basename;
	    if (basename && !documentName) {
	      var _captures = basename.match(/^[_A-Za-z][_0-9A-Za-z]*/);
	      if (_captures) {
	        documentName = _captures[0];
	      }
	    }
	    documentName = documentName || 'UnknownFile';
	    topPath.documentName = documentName;
	  }
	  return documentName;
	}

	module.exports = getDocumentName;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 * @format
	 */

	'use strict';

	var _require = __webpack_require__(8),
	    SCHEMA_EXTENSION = _require.SCHEMA_EXTENSION;

	var _require2 = __webpack_require__(4),
	    parse = _require2.parse;

	function getSchemaIntrospection(schemaPath, basePath) {
	  try {
	    var fullSchemaPath = schemaPath;
	    if (!__webpack_require__(14).existsSync(fullSchemaPath) && basePath) {
	      fullSchemaPath = __webpack_require__(29).join(basePath, schemaPath);
	    }
	    var source = __webpack_require__(14).readFileSync(fullSchemaPath, 'utf8');
	    if (source[0] === '{') {
	      return JSON.parse(source);
	    }
	    return parse(SCHEMA_EXTENSION + '\n' + source);
	  } catch (error) {
	    // Log a more helpful warning (by including the schema path).
	    console.error('Encountered the following error while loading the GraphQL schema: ' + schemaPath + '\n\n' + error.stack.split('\n').map(function (line) {
	      return '> ' + line;
	    }).join('\n'));
	    throw error;
	  }
	}

	module.exports = getSchemaIntrospection;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule getValidGraphQLTag
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Given a babel AST path to a tagged template literal, return an AST if it is
	 * a graphql`` or graphql.experimental`` literal being used in a valid way.
	 * If it is some other type of template literal then return nothing.
	 */
	function getValidGraphQLTag(path) {
	  var tag = path.get('tag');

	  var isGraphQLTag = tag.isIdentifier({ name: 'graphql' }) || tag.matchesPattern('graphql.experimental');

	  if (!isGraphQLTag) {
	    return;
	  }

	  var quasis = path.node.quasi.quasis;

	  if (quasis.length !== 1) {
	    throw new Error('BabelPluginRelay: Substitutions are not allowed in graphql fragments. ' + 'Included fragments should be referenced as `...MyModule_propName`.');
	  }

	  var text = quasis[0].value.raw;

	  var ast = __webpack_require__(4).parse(text);

	  if (ast.definitions.length === 0) {
	    throw new Error('BabelPluginRelay: Unexpected empty graphql tag.');
	  }

	  return ast;
	}

	module.exports = getValidGraphQLTag;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @providesModule getValidRelayQLTag
	 * 
	 * @format
	 */

	'use strict';

	/**
	 * Given a TemplateLiteral path, return the metadata about a RelayQL tag
	 * if one exists.
	 */

	function getValidRelayQLTag(path) {
	  var node = path.node;


	  var tag = path.get('tag');
	  var tagName = tag.matchesPattern('Relay.QL') ? 'Relay.QL' : tag.matchesPattern('RelayClassic.QL') ? 'RelayClassic.QL' : tag.isIdentifier({ name: 'RelayQL' }) ? 'RelayQL' : null;
	  if (!tagName) {
	    return [null, null, null];
	  }

	  var p = path;
	  var propName = null;
	  while (!propName && (p = p.parentPath)) {
	    if (p.isProperty()) {
	      propName = p.node.key.name;
	    }
	  }

	  return [node.quasi, tagName, propName];
	}

	module.exports = getValidRelayQLTag;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ })
/******/ ]);