/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayOperationSelector
 * 
 * @format
 */

'use strict';

var _require = require('./RelayStoreConstants'),
    ROOT_ID = _require.ROOT_ID;

var _require2 = require('./RelayVariables'),
    getOperationVariables = _require2.getOperationVariables;

/**
 * @public
 *
 * Implementation of `RelayCore#createOperationSelector()` defined in
 * `RelayEnvironmentTypes` for the classic core.
 */
function createOperationSelector(operation, variables) {
  var concreteFragment = require('./QueryBuilder').getFragment(operation.node);
  require('fbjs/lib/invariant')(concreteFragment, 'RelayOperationSelector: Expected a query, got %s `%s`.', operation.node.kind, operation.name);

  var operationVariables = getOperationVariables(operation, variables);
  var fragment = {
    dataID: ROOT_ID,
    node: concreteFragment,
    variables: operationVariables
  };

  return {
    fragment: fragment,
    node: operation,
    root: fragment,
    variables: operationVariables
  };
}

module.exports = {
  createOperationSelector: createOperationSelector
};