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

var _require = require('./GraphQLRelayDirective'),
    SCHEMA_EXTENSION = _require.SCHEMA_EXTENSION;

var _require2 = require('graphql'),
    parse = _require2.parse;

function getSchemaIntrospection(schemaPath, basePath) {
  try {
    var fullSchemaPath = schemaPath;
    if (!require('fs').existsSync(fullSchemaPath) && basePath) {
      fullSchemaPath = require('path').join(basePath, schemaPath);
    }
    var source = require('fs').readFileSync(fullSchemaPath, 'utf8');
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