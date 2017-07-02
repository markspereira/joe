/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule requestRelaySubscription
 * 
 * @format
 */

'use strict';

function requestRelaySubscription(environment, config) {
  var _environment$unstable = environment.unstable_internal,
      createOperationSelector = _environment$unstable.createOperationSelector,
      getOperation = _environment$unstable.getOperation;

  var subscription = getOperation(config.subscription);
  var onCompleted = config.onCompleted,
      onError = config.onError,
      onNext = config.onNext,
      updater = config.updater,
      variables = config.variables;

  var operation = createOperationSelector(subscription, variables);
  return environment.sendSubscription({
    onCompleted: onCompleted,
    onError: onError,
    onNext: function (_onNext) {
      function onNext(_x) {
        return _onNext.apply(this, arguments);
      }

      onNext.toString = function () {
        return _onNext.toString();
      };

      return onNext;
    }(function (payload) {
      if (onNext) {
        var snapshot = environment.lookup(operation.fragment);
        onNext(snapshot.data);
      }
    }),

    updater: updater,
    operation: operation
  });
}

module.exports = requestRelaySubscription;