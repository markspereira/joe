/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule writeRelayGeneratedFile
 * 
 * @format
 */

'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

/**
 * Generate a module for the given document name/text.
 */
let writeRelayGeneratedFile = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (codegenDir, generatedNode, formatModule, flowText, persistQuery, platform, relayRuntimeModule) {
    var moduleName = generatedNode.name + '.graphql';
    var platformName = platform ? moduleName + '.' + platform : moduleName;
    var filename = platformName + '.js';
    var flowTypeName = generatedNode.kind === 'Batch' ? 'ConcreteBatch' : 'ConcreteFragment';

    var text = null;
    var hash = null;
    if (generatedNode.kind === 'Batch') {
      text = generatedNode.text;
      require('fbjs/lib/invariant')(text, 'codegen-runner: Expected query to have text before persisting.');
      var oldContent = codegenDir.read(filename);
      // Hash the concrete node including the query text.
      hash = md5(JSON.stringify(generatedNode) + (persistQuery ? 'persisted' : '') + 'cache-breaker-5');
      if (hash === extractHash(oldContent)) {
        codegenDir.markUnchanged(filename);
        return null;
      }
      if (codegenDir.onlyValidate) {
        codegenDir.markUpdated(filename);
        return null;
      }
      if (persistQuery) {
        generatedNode = (0, _extends3['default'])({}, generatedNode, {
          text: null,
          id: yield persistQuery(text)
        });
      }
    }

    var moduleText = formatModule({
      moduleName: moduleName,
      documentType: flowTypeName,
      docText: text,
      flowText: flowText,
      hash: hash ? '@relayHash ' + hash : null,
      concreteText: require('./prettyStringify')(generatedNode),
      relayRuntimeModule: relayRuntimeModule
    });

    codegenDir.writeFile(filename, moduleText);
    return generatedNode;
  });

  return function writeRelayGeneratedFile(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
})();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function extractHash(text) {
  if (!text) {
    return null;
  }
  if (/<<<<<|>>>>>/.test(text)) {
    // looks like a merge conflict
    return null;
  }
  var match = text.match(/@relayHash (\w{32})\b/m);
  return match && match[1];
}

function md5(text) {
  return require('crypto').createHash('md5').update(text).digest('hex');
}

module.exports = writeRelayGeneratedFile;