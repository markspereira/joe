/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayGraphQLTag
 * 
 * @format
 */

'use strict';

/**
 * Runtime function to correspond to the `graphql` tagged template function.
 * All calls to this function should be transformed by the plugin.
 */
function graphql() {
  require('fbjs/lib/invariant')(false, 'graphql: Unexpected invocation at runtime. Either the Babel transform ' + 'was not set up, or it failed to identify this call site. Make sure it ' + 'is being used verbatim as `graphql`.');
}

/**
 * Variant of the `graphql` tag that enables experimental features.
 */
graphql.experimental = function () {
  require('fbjs/lib/invariant')(false, 'graphql.experimental: Unexpected invocation at runtime. Either the ' + 'Babel transform was not set up, or it failed to identify this call ' + 'site. Make sure it is being used verbatim as `graphql.experimental`.');
};

var CLASSIC_NODE = '__classic_node__';

/**
 * Memoizes the results of executing the `.classic()` functions on
 * graphql`...` tagged expressions. Memoization allows the framework to use
 * object equality checks to compare fragments (useful, for example, when
 * comparing two `Selector`s to see if they select the same data).
 */
function getClassicNode(taggedNode) {
  var concreteNode = taggedNode[CLASSIC_NODE];
  if (concreteNode == null) {
    var fn = taggedNode.classic;
    require('fbjs/lib/invariant')(typeof fn === 'function', 'RelayGraphQLTag: Expected a graphql literal, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', JSON.stringify(taggedNode));
    concreteNode = fn(require('./RelayQL'));
    taggedNode[CLASSIC_NODE] = concreteNode;
  }
  return concreteNode;
}

function getClassicFragment(taggedNode) {
  var concreteNode = getClassicNode(taggedNode);
  var fragment = require('./QueryBuilder').getFragmentDefinition(concreteNode);
  require('fbjs/lib/invariant')(fragment, 'RelayGraphQLTag: Expected a fragment, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', concreteNode);
  return fragment;
}

function getClassicOperation(taggedNode) {
  var concreteNode = getClassicNode(taggedNode);
  var operation = require('./QueryBuilder').getOperationDefinition(concreteNode);
  require('fbjs/lib/invariant')(operation, 'RelayGraphQLTag: Expected an operation, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', concreteNode);
  return operation;
}

module.exports = {
  getClassicFragment: getClassicFragment,
  getClassicOperation: getClassicOperation,
  graphql: graphql
};