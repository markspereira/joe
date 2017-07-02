/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayNetworkLogger
 * 
 * @format
 */

'use strict';

/* eslint-disable no-console-disallow */

var queryID = 1;

var RelayNetworkLogger = {
  wrapFetch: function wrapFetch(fetch, graphiQLPrinter) {
    return function (operation, variables, cacheConfig, uploadables) {
      var id = queryID++;
      var name = operation.name;

      var idName = '[' + id + '] Relay Modern: ' + name;

      console.time && console.time(idName);

      var onSettled = function onSettled(error, response) {
        console.groupCollapsed('%c' + idName, error ? 'color:red' : '');
        console.timeEnd && console.timeEnd(idName);
        if (graphiQLPrinter) {
          console.log('GraphiQL:', graphiQLPrinter(operation, variables));
        }
        console.log('Cache Config:', cacheConfig);
        console.log('Variables:', require('./prettyStringify')(variables));
        if (error) {
          console.log('Error:', error);
        }
        if (response) {
          console.log('Response:', response);
        }
        console.groupEnd();
      };

      var request = fetch(operation, variables, cacheConfig, uploadables);
      if (require('./isPromise')(request)) {
        request.then(function (response) {
          onSettled(null, response);
        }, function (error) {
          onSettled(error, null);
        });
      } else if (request instanceof Error) {
        onSettled(request, null);
      } else {
        onSettled(null, request);
      }
      return request;
    };
  },
  wrapSubscribe: function wrapSubscribe(subscribe, graphiQLPrinter) {
    return function (operation, variables, cacheConfig, _ref) {
      var _onCompleted = _ref.onCompleted,
          _onNext = _ref.onNext,
          _onError = _ref.onError;

      var id = queryID++;
      var name = operation.name;

      var idName = '[' + id + '] Relay Modern: ' + name;

      var onResponse = function onResponse(error, response, status) {
        console.groupCollapsed('%c' + idName, error ? 'color:red' : '');
        if (graphiQLPrinter) {
          console.log('GraphiQL:', graphiQLPrinter(operation, variables));
        }
        console.log('Cache Config:', cacheConfig);
        console.log('Variables:', require('./prettyStringify')(variables));
        if (status) {
          console.log('Status:', status);
        }
        if (error) {
          console.log('Error:', error);
        }
        if (response) {
          console.log('Response:', response);
        }
        console.groupEnd();
      };

      var subscription = subscribe(operation, variables, cacheConfig, {
        onCompleted: function onCompleted() {
          _onCompleted && _onCompleted();
          onResponse(null, null, 'subscription is unsubscribed.');
        },
        onNext: function onNext(payload) {
          _onNext && _onNext(payload);
          onResponse(null, payload, 'subscription receives update');
        },
        onError: function onError(error) {
          _onError && _onError(error);
          onResponse(error, null);
        }
      });
      onResponse(null, null, 'subscription is sent');
      return subscription;
    };
  }
};

module.exports = RelayNetworkLogger;