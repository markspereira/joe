/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactRelayPublic
 * 
 * @format
 */

'use strict';

var _require = require('relay-runtime'),
    commitLocalUpdate = _require.commitLocalUpdate,
    commitMutation = _require.commitMutation,
    fetchQuery = _require.fetchQuery,
    graphql = _require.graphql,
    requestSubscription = _require.requestSubscription;

/**
 * The public interface to React Relay.
 */
module.exports = {
  QueryRenderer: require('./ReactRelayQueryRenderer'),
  createFragmentContainer: require('./ReactRelayFragmentContainer').createContainer,
  createPaginationContainer: require('./ReactRelayPaginationContainer').createContainer,
  createRefetchContainer: require('./ReactRelayRefetchContainer').createContainer,
  commitLocalUpdate: commitLocalUpdate,
  commitMutation: commitMutation,
  fetchQuery: fetchQuery,
  graphql: graphql,
  requestSubscription: requestSubscription
};