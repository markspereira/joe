/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule printRelayQuery
 * 
 * @format
 */

'use strict';

/**
 * To support legacy behavior, allow the classic relay printer to be injectable.
 * Requiring printRelayOSSQuery directly guarantees printing with modern GraphQL
 * (circa 2015+) syntax, while using this module may use an injected
 * implementation which can introduce printing legacy GraphQL syntax.
 */
var printRelayQueryImpl = require('./printRelayOSSQuery');

module.exports = function printRelayQuery(node) {
  return printRelayQueryImpl(node);
};

module.exports.injectImpl = function injectImpl(impl) {
  printRelayQueryImpl = impl;
};