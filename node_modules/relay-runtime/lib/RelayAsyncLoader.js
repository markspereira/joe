/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayAsyncLoader
 * 
 * @format
 */

'use strict';

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CONDITION = require('./RelayConcreteNode').CONDITION,
    INLINE_FRAGMENT = require('./RelayConcreteNode').INLINE_FRAGMENT,
    LINKED_FIELD = require('./RelayConcreteNode').LINKED_FIELD,
    LINKED_HANDLE = require('./RelayConcreteNode').LINKED_HANDLE,
    SCALAR_FIELD = require('./RelayConcreteNode').SCALAR_FIELD;

var getStorageKey = require('./RelayStoreUtils').getStorageKey;

/**
 * Attempts to synchronously check whether the records required to fulfill the
 * given `selector` are present in `source` (synchronous checks, for example,
 * are possible with the `RelayInMemoryRecordSource`).
 *
 * If so, returns `true`, and the records will be present in `target`;
 * otherwise `false`.
 */


function check(source, target, selector) {
  var state = null;
  var dataID = selector.dataID,
      node = selector.node,
      variables = selector.variables;

  function callback(loadingState) {
    state = loadingState;
  }
  var loader = new RelayAsyncLoader(source, target, variables, callback);
  var disposable = loader.load(node, dataID);
  disposable.dispose();
  return !!(state && state.status === 'complete');
}

/**
 * Load the records required to fulfill the given `selector` from `source` and add
 * them to `target`, calling the provided callback exactly once with an argument
 * as follows:
 * - {status: 'aborted'}: If `dispose()` was called on the Disposable returned
 *   by `load` before loading the required records could be completed.
 * - {status: 'complete'}: If a cached value/record was found for all fields in
 *   the selector.
 * - {status: 'error', error}: If an error occured loading any record from
 *   source.
 * - {status: 'missing'}: If any value/record was missing.
 *
 * Note that the callback may be called synchronously *or* asynchronously.
 */
function load(source, target, selector, callback) {
  var dataID = selector.dataID,
      node = selector.node,
      variables = selector.variables;

  var loader = new RelayAsyncLoader(source, target, variables, callback);
  return loader.load(node, dataID);
}

/**
 * @private
 */

var RelayAsyncLoader = function () {
  function RelayAsyncLoader(source, target, variables, callback) {
    (0, _classCallCheck3['default'])(this, RelayAsyncLoader);

    this._callback = callback;
    this._done = false;
    this._loadingCount = 0;
    this._source = source;
    this._target = target;
    this._variables = variables;
  }

  RelayAsyncLoader.prototype.load = function load(node, dataID) {
    var _this = this;

    var dispose = function dispose() {
      return _this._handleAbort();
    };
    this._traverse(node, dataID);
    return { dispose: dispose };
  };

  RelayAsyncLoader.prototype._getVariableValue = function _getVariableValue(name) {
    require('fbjs/lib/invariant')(this._variables.hasOwnProperty(name), 'RelayAsyncLoader(): Undefined variable `%s`.', name);
    return this._variables[name];
  };

  RelayAsyncLoader.prototype._handleComplete = function _handleComplete() {
    if (!this._done) {
      this._done = true;
      this._callback({ status: 'complete' });
    }
  };

  RelayAsyncLoader.prototype._handleError = function _handleError(error) {
    if (!this._done) {
      this._done = true;
      this._callback({
        error: error,
        status: 'error'
      });
    }
  };

  RelayAsyncLoader.prototype._handleMissing = function _handleMissing() {
    if (!this._done) {
      this._done = true;
      this._callback({ status: 'missing' });
    }
  };

  RelayAsyncLoader.prototype._handleAbort = function _handleAbort() {
    if (!this._done) {
      this._done = true;
      this._callback({ status: 'aborted' });
    }
  };

  RelayAsyncLoader.prototype._traverse = function _traverse(node, dataID) {
    // Don't load the same node twice:
    if (!this._target.has(dataID)) {
      this._loadAndTraverse(node, dataID);
    } else {
      this._loadingCount++;
      var record = this._target.get(dataID);
      if (record) {
        this._traverseSelections(node.selections, record);
      }
      this._loadingCount--;
      if (this._loadingCount === 0) {
        this._handleComplete();
      }
    }
  };

  RelayAsyncLoader.prototype._loadAndTraverse = function _loadAndTraverse(node, dataID) {
    var _this2 = this;

    this._loadingCount++;
    this._source.load(dataID, function (error, record) {
      if (_this2._done) {
        return;
      }
      if (error) {
        _this2._handleError(error);
      } else if (record === undefined) {
        _this2._handleMissing();
      } else {
        if (record === null) {
          _this2._target['delete'](dataID);
        } else {
          _this2._target.set(dataID, record);
          _this2._traverseSelections(node.selections, record);
        }
        _this2._loadingCount--;
        if (_this2._loadingCount === 0) {
          _this2._handleComplete();
        }
      }
    });
  };

  RelayAsyncLoader.prototype._traverseSelections = function _traverseSelections(selections, record) {
    var _this3 = this;

    selections.every(function (selection) {
      switch (selection.kind) {
        case SCALAR_FIELD:
          _this3._prepareScalar(selection, record);
          break;
        case LINKED_FIELD:
          if (selection.plural) {
            _this3._preparePluralLink(selection, record);
          } else {
            _this3._prepareLink(selection, record);
          }
          break;
        case CONDITION:
          var conditionValue = _this3._getVariableValue(selection.condition);
          if (conditionValue === selection.passingValue) {
            _this3._traverseSelections(selection.selections, record);
          }
          break;
        case INLINE_FRAGMENT:
          var typeName = require('./RelayModernRecord').getType(record);
          if (typeName != null && typeName === selection.type) {
            _this3._traverseSelections(selection.selections, record);
          }
          break;
        case LINKED_HANDLE:
          // Handles have no selections themselves; traverse the original field
          // where the handle was set-up instead.
          var handleField = require('./cloneRelayHandleSourceField')(selection, selections, _this3._variables);
          if (handleField.plural) {
            _this3._preparePluralLink(handleField, record);
          } else {
            _this3._prepareLink(handleField, record);
          }
          break;
        default:
          require('fbjs/lib/invariant')(selection.kind === SCALAR_FIELD, 'RelayAsyncLoader(): Unexpected ast kind `%s`.', selection.kind);
      }
      return !_this3._done;
    });
  };

  RelayAsyncLoader.prototype._prepareScalar = function _prepareScalar(field, record) {
    var storageKey = getStorageKey(field, this._variables);
    var fieldValue = require('./RelayModernRecord').getValue(record, storageKey);
    if (fieldValue === undefined) {
      this._handleMissing();
    }
  };

  RelayAsyncLoader.prototype._prepareLink = function _prepareLink(field, record) {
    var storageKey = getStorageKey(field, this._variables);
    var linkedID = require('./RelayModernRecord').getLinkedRecordID(record, storageKey);

    if (linkedID === undefined) {
      this._handleMissing();
    } else if (linkedID != null) {
      this._traverse(field, linkedID);
    }
  };

  RelayAsyncLoader.prototype._preparePluralLink = function _preparePluralLink(field, record) {
    var _this4 = this;

    var storageKey = getStorageKey(field, this._variables);
    var linkedIDs = require('./RelayModernRecord').getLinkedRecordIDs(record, storageKey);

    if (linkedIDs === undefined) {
      this._handleMissing();
    } else if (linkedIDs) {
      linkedIDs.forEach(function (linkedID) {
        if (linkedID != null) {
          _this4._traverse(field, linkedID);
        }
      });
    }
  };

  return RelayAsyncLoader;
}();

module.exports = {
  check: check,
  load: load
};