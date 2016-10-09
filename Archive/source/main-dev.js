// React
import React, {Component} from 'react'
import {render} from 'react-dom'

// Redux
import {applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'

import {browserHistory} from 'react-router'
import {syncHistoryWithStore, routerMiddleware, routerReducer} from 'react-router-redux'

import {bindLocaleLoader} from './util/locale'
import {loadLocaleResource} from './locale/resource-loader'
import {getInitState, getReducers, registerComponent, createStore} from './util/redux-enhancer'
import actionInterceptor from './util/action-interceptor'

import createLogger from 'redux-logger'
import DevTools from './dev-tools'

import Root from './root'

//
// Create store and launch (Standard)
//
bindLocaleLoader(loadLocaleResource);
registerComponent('routing', routerReducer);

export const store = createStore(
    getReducers(),
    getInitState(),
    compose(
        applyMiddleware(
            thunk,
            actionInterceptor.getMiddleware(),
            routerMiddleware(browserHistory),        // allow navigation through React action
            createLogger()
        ),
        DevTools.instrument()
    )
);

export const history = syncHistoryWithStore(browserHistory, store);
history.listen(location=> { console.log('go to location ' + location.pathname); });

render(
    <div>
        <Root store={store} history={history} />
        <DevTools store={store} />
    </div>,
    document.getElementById('root')
);
