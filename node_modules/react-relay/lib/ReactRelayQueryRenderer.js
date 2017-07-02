/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactRelayQueryRenderer
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

var _possibleConstructorReturn3 = _interopRequireDefault(require('babel-runtime/helpers/possibleConstructorReturn'));

var _inherits3 = _interopRequireDefault(require('babel-runtime/helpers/inherits'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @public
 *
 * Orchestrates fetching and rendering data for a single view or view hierarchy:
 * - Fetches the query/variables using the given network implementation.
 * - Normalizes the response(s) to that query, publishing them to the given
 *   store.
 * - Renders the pending/fail/success states with the provided render function.
 * - Subscribes for updates to the root data and re-renders with any changes.
 */
var ReactRelayQueryRenderer = function (_React$Component) {
  (0, _inherits3['default'])(ReactRelayQueryRenderer, _React$Component);

  function ReactRelayQueryRenderer(props, context) {
    (0, _classCallCheck3['default'])(this, ReactRelayQueryRenderer);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));

    _this._onChange = function (snapshot) {
      _this.setState({
        readyState: (0, _extends3['default'])({}, _this.state.readyState, {
          props: snapshot.data
        })
      });
    };

    var query = props.query,
        variables = props.variables;
    // TODO (#16225453) QueryRenderer works with old and new environment, but
    // the flow typing doesn't quite work abstracted.
    // $FlowFixMe

    var environment = props.environment;
    var operation = null;
    if (query) {
      var _environment$unstable = environment.unstable_internal,
          createOperationSelector = _environment$unstable.createOperationSelector,
          getOperation = _environment$unstable.getOperation;

      query = getOperation(query);
      operation = createOperationSelector(query, variables);
      variables = operation.variables;
    }

    _this._pendingFetch = null;
    _this._relayContext = {
      environment: environment,
      variables: variables
    };
    _this._rootSubscription = null;
    _this._selectionReference = null;
    if (query) {
      _this.state = {
        readyState: getDefaultState()
      };
    } else {
      _this.state = {
        readyState: {
          error: null,
          props: {},
          retry: null
        }
      };
    }

    if (operation) {
      var _readyState = _this._fetch(operation, props.cacheConfig);
      if (_readyState) {
        _this.state = { readyState: _readyState };
      }
    }
    return _this;
  }

  ReactRelayQueryRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query || nextProps.environment !== this.props.environment || !require('fbjs/lib/areEqual')(nextProps.variables, this.props.variables)) {
      var _query = nextProps.query,
          _variables = nextProps.variables;
      // TODO (#16225453) QueryRenderer works with old and new environment, but
      // the flow typing doesn't quite work abstracted.
      // $FlowFixMe

      var _environment = nextProps.environment;
      if (_query) {
        var _environment$unstable2 = _environment.unstable_internal,
            createOperationSelector = _environment$unstable2.createOperationSelector,
            getOperation = _environment$unstable2.getOperation;

        var operation = createOperationSelector(getOperation(_query), _variables);
        this._relayContext = {
          environment: _environment,
          variables: operation.variables
        };
        var _readyState2 = this._fetch(operation, nextProps.cacheConfig);
        this.setState({
          readyState: _readyState2 || getDefaultState()
        });
      } else {
        this._relayContext = {
          environment: _environment,
          variables: _variables
        };
        this._release();
        this.setState({
          readyState: {
            error: null,
            props: {},
            retry: null
          }
        });
      }
    }
  };

  ReactRelayQueryRenderer.prototype.componentWillUnmount = function componentWillUnmount() {
    this._release();
  };

  ReactRelayQueryRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.render !== this.props.render || nextState.readyState !== this.state.readyState;
  };

  ReactRelayQueryRenderer.prototype._release = function _release() {
    if (this._pendingFetch) {
      this._pendingFetch.dispose();
      this._pendingFetch = null;
    }
    if (this._rootSubscription) {
      this._rootSubscription.dispose();
      this._rootSubscription = null;
    }
    if (this._selectionReference) {
      this._selectionReference.dispose();
      this._selectionReference = null;
    }
  };

  ReactRelayQueryRenderer.prototype._fetch = function _fetch(operation, cacheConfig) {
    var _this2 = this;

    var environment = this._relayContext.environment;

    // Immediately retain the results of the new query to prevent relevant data
    // from being freed. This is not strictly required if all new data is
    // fetched in a single step, but is necessary if the network could attempt
    // to incrementally load data (ex: multiple query entries or incrementally
    // loading records from disk cache).

    var nextReference = environment.retain(operation.root);

    var readyState = getDefaultState();
    var snapshot = void 0; // results of the root fragment
    var isOnNextCalled = false;
    var isFunctionReturned = false;
    var onCompleted = function onCompleted() {
      _this2._pendingFetch = null;
    };
    var onError = function onError(error) {
      readyState = {
        error: error,
        props: null,
        retry: function retry() {
          _this2._fetch(operation, cacheConfig);
        }
      };
      if (_this2._selectionReference) {
        _this2._selectionReference.dispose();
      }
      _this2._pendingFetch = null;
      _this2._selectionReference = nextReference;
      _this2.setState({ readyState: readyState });
    };
    var onNext = function onNext() {
      // `onNext` can be called multiple times by network layers that support
      // data subscriptions. Wait until the first payload to render `props` and
      // subscribe for data updates.
      if (snapshot) {
        return;
      }
      snapshot = environment.lookup(operation.fragment);
      readyState = {
        error: null,
        props: snapshot.data,
        retry: function retry() {
          _this2._fetch(operation, cacheConfig);
        }
      };

      if (_this2._selectionReference) {
        _this2._selectionReference.dispose();
      }
      _this2._rootSubscription = environment.subscribe(snapshot, _this2._onChange);
      _this2._selectionReference = nextReference;
      // This line should be called only once.
      isOnNextCalled = true;
      if (isFunctionReturned) {
        _this2.setState({ readyState: readyState });
      }
    };

    if (this._pendingFetch) {
      this._pendingFetch.dispose();
    }
    if (this._rootSubscription) {
      this._rootSubscription.dispose();
    }
    var request = environment.streamQuery({
      cacheConfig: cacheConfig,
      onCompleted: onCompleted,
      onError: onError,
      onNext: onNext,
      operation: operation
    });
    this._pendingFetch = {
      dispose: function dispose() {
        request.dispose();
        nextReference.dispose();
      }
    };
    isFunctionReturned = true;
    return isOnNextCalled ? readyState : null;
  };

  ReactRelayQueryRenderer.prototype.getChildContext = function getChildContext() {
    return {
      relay: this._relayContext
    };
  };

  ReactRelayQueryRenderer.prototype.render = function render() {
    // Note that the root fragment results in `readyState.props` is already
    // frozen by the store; this call is to freeze the readyState object and
    // error property if set.
    if (process.env.NODE_ENV !== 'production') {
      require('./deepFreeze')(this.state.readyState);
    }
    return this.props.render(this.state.readyState);
  };

  return ReactRelayQueryRenderer;
}(require('react').Component);

ReactRelayQueryRenderer.childContextTypes = {
  relay: require('./RelayPropTypes').Relay
};

function getDefaultState() {
  return {
    error: null,
    props: null,
    retry: null
  };
}

module.exports = ReactRelayQueryRenderer;