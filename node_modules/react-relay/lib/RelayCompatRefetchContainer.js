/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayCompatRefetchContainer
 * 
 * @format
 */

'use strict';

var _require = require('./ReactRelayCompatContainerBuilder'),
    buildCompatContainer = _require.buildCompatContainer;

/**
 * Wrap the basic `createContainer()` function with logic to adapt to the
 * `context.relay.environment` in which it is rendered. Specifically, the
 * extraction of the environment-specific version of fragments in the
 * `fragmentSpec` is memoized once per environment, rather than once per
 * instance of the container constructed/rendered.
 */
function createContainer(Component, fragmentSpec, taggedNode) {
  var Container = buildCompatContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
    return require('./ReactRelayRefetchContainer').createContainerWithFragments(ComponentClass, fragments, taggedNode);
  });
  Container.childContextTypes = {
    relay: require('./RelayPropTypes').Relay
  };
  return Container;
}

module.exports = { createContainer: createContainer };