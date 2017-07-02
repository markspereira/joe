/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayCompatEnvironment
 * 
 * @format
 */

'use strict';

var _require = require('relay-runtime'),
    isRelayModernEnvironment = _require.isRelayModernEnvironment;

function getRelayModernEnvironment(environment) {
  if (isRelayModernEnvironment(environment)) {
    return environment;
  }
}

function getRelayClassicEnvironment(environment) {
  if (require('./isClassicRelayEnvironment')(environment)) {
    return environment;
  }
}

module.exports = {
  getRelayClassicEnvironment: getRelayClassicEnvironment,
  getRelayModernEnvironment: getRelayModernEnvironment
};