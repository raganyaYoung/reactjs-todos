// React
import React, {Component} from 'react'
import {render} from 'react-dom'

// React Redux
import {Provider} from 'react-redux'

// React router
import {Router, Route, IndexRedirect} from 'react-router'
import {routerReducer} from 'react-router-redux'

import {Home} from './app/home'
import {CounterTest} from './app/counter-test'
import {ContextMenuTest} from './app/context-menu-test'
import {CssTest} from './app/css-test'
import {TabTest} from './app/tab-test'
import {AccordionTest} from './app/accordion-test'
import {TreeTest} from './app/tree-test'
import {DialogTest} from './app/dialog-test'
import {ShadowTest} from './app/shadow-test'

export default class Root extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history}>
                    <Route path="/" component={Home}>
                        <IndexRedirect to="/counter-test" />
                        <Route path="/counter-test" component={CounterTest} />
                        <Route path="/context-menu-test" component={ContextMenuTest} />
                        <Route path="/css-test" component={CssTest} />
                        <Route path="/tab-test" component={TabTest} />
                        <Route path="/accordion-test" component={AccordionTest} />
                        <Route path="/tree-test" component={TreeTest} />
                        <Route path="/dialog-test" component={DialogTest} />
                        <Route path="/shadow-test" component={ShadowTest} />
                    </Route>
                </Router>
            </Provider>
        )
    }
}

