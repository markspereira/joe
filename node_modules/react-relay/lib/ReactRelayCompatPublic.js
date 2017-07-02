/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactRelayCompatPublic
 * 
 * @format
 */

'use strict';

var _require = require('relay-runtime'),
    graphql = _require.graphql,
    fetchQuery = _require.fetchQuery;

/**
 * The public interface to React Relay which supports a compatibility mode to
 * continue to work with the classic React runtime.
 */
module.exports = {
  QueryRenderer: require('./ReactRelayQueryRenderer'),
  commitMutation: require('./RelayCompatMutations').commitUpdate,
  createFragmentContainer: require('./RelayCompatContainer').createContainer,
  createPaginationContainer: require('./RelayCompatPaginationContainer').createContainer,
  createRefetchContainer: require('./RelayCompatRefetchContainer').createContainer,
  fetchQuery: fetchQuery,
  graphql: graphql,
  injectDefaultVariablesProvider: require('./ReactRelayCompatContainerBuilder').injectDefaultVariablesProvider
};