/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule assertFragmentMap
 * 
 * @format
 */

'use strict';

/**
 * Fail fast if the user supplies invalid fragments as input.
 */
function assertFragmentMap(componentName, fragments) {
  require('fbjs/lib/invariant')(fragments && typeof fragments === 'object', 'Could not create Relay Container for `%s`. ' + 'Expected a set of GraphQL fragments, got `%s` instead.', componentName, fragments);

  require('fbjs/lib/forEachObject')(fragments, function (fragment, key) {
    require('fbjs/lib/invariant')(fragment && (typeof fragment === 'object' || typeof fragment === 'function'), 'Could not create Relay Container for `%s`. ' + 'The value of fragment `%s` was expected to be a fragment, got `%s` instead.', componentName, key, fragment);
  });
}

module.exports = assertFragmentMap;