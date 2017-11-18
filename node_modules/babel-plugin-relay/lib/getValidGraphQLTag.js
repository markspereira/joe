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

  var ast = require('graphql').parse(text);

  if (ast.definitions.length === 0) {
    throw new Error('BabelPluginRelay: Unexpected empty graphql tag.');
  }

  return ast;
}

module.exports = getValidGraphQLTag;