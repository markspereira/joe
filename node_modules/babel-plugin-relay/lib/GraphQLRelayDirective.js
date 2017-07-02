/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @fullSyntaxTransform
 * @format
 */

'use strict';

var _require = require('graphql'),
    buildSchema = _require.buildSchema;

// Copy of RelayRelayDirectiveTransform.SCHEMA_EXTENSION due to the build
// systems.


var SCHEMA_EXTENSION = 'directive @relay(\n  # Marks a connection field as containing nodes without \'id\' fields.\n  # This is used to silence the warning when diffing connections.\n  isConnectionWithoutNodeID: Boolean,\n\n  # Marks a fragment as intended for pattern matching (as opposed to fetching).\n  # Used in Classic only.\n  pattern: Boolean,\n\n  # Marks a fragment as being backed by a GraphQLList.\n  plural: Boolean,\n\n  # Selectively pass variables down into a fragment. Only used in Classic.\n  variables: [String!],\n) on FRAGMENT_DEFINITION | FRAGMENT_SPREAD | INLINE_FRAGMENT | FIELD';

var GraphQLRelayDirective = buildSchema(SCHEMA_EXTENSION + '\ntype Query { x: String }').getDirective('relay');

if (!GraphQLRelayDirective) {
  throw new Error('Failed to create GraphQLRelayDirective.');
}

module.exports = {
  SCHEMA_EXTENSION: SCHEMA_EXTENSION,
  GraphQLRelayDirective: GraphQLRelayDirective
};