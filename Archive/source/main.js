// React
import React, {Component} from 'react'
import {render} from 'react-dom'

// Redux
import {applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import {browserHistory} from 'react-router'
import {syncHistoryWithStore, routerMiddleware, routerReducer} from 'react-router-redux'

import {bindLocaleLoader} from './util/locale'
import {loadLocaleResource} from './locale/resource-loader'
import {getInitState, getReducers, registerComponent, createStore} from './util/redux-enhancer'
import actionInterceptor from './util/action-interceptor'

import Root from './root'


//
// Create store and launch (Standard)
//
bindLocaleLoader(loadLocaleResource);
registerComponent('routing', routerReducer);

export const store = createStore(
    getReducers(),
    getInitState(),
    applyMiddleware(
        thunk,
        actionInterceptor.getMiddleware(),
        routerMiddleware(browserHistory)        // allow navigation through React action
    )
);

export const history = syncHistoryWithStore(browserHistory, store);
history.listen(location=> { console.log('go to location ' + location.pathname); });

render(<Root store={store} history={history} />, document.getElementById('root'));
