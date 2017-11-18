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