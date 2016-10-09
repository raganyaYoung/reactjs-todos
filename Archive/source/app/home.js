import React, { PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

import {Router} from 'react-router'
import {push, replace} from 'react-router-redux'

import {localeString} from '../util/locale'
import {registerComponent, dispatch} from '../util/redux-enhancer'

import {ContextMenu, dismissAction} from '../components/context-menu'
import {SplitPane, Pane} from '../components/split-pane'
import {NavPane} from '../components/nav-pane'
import {Accordion} from '../components/accordion'
import {Shadow} from '../components/shadow'

import sharedLayoutStyles from '../shared/style/layout.css'

export class Home extends Component {
    constructor(props) {
        super(props);

        this.onPanelClick = this.onPanelClick.bind(this);
    }

    render() {
        let {children} = this.props;

/*
        let items = [
            {description: "Counter", action: replace('/counter-test')},
            {description: "Context Menu", action: replace('/context-menu-test')},
            {description: "Tab Controll", action: replace('/tab-test')},
            {description: "Accordion", action: replace('/accordion-test')},
            {description: "Tree", action: replace('/tree-test')},
            {description: "Dialog", action: replace('/dialog-test')},
            {description: "CSS Layout", action: replace('/css-test')}
        ]
        return (
            <div onClick={this.onPanelClick} style={{height: '100vh'}}>
                <ContextMenu />
                <SplitPane>
                    <Pane>
                        <NavPane items={items}/>
                    </Pane>
                    <Pane>
                        {children}
                    </Pane>
                </SplitPane>
            </div>
        );
*/
        let accordionItems = [
            {sectionName: "Component Test", sectionItems : [
                {description: "Counter", action: replace('/counter-test')},
                {description: "Context Menu", action: replace('/context-menu-test')},
                {description: "Tab Controll", action: replace('/tab-test')},
                {description: "Accordion", action: replace('/accordion-test')},
                {description: "Tree", action: replace('/tree-test')},
                {description: "Dialog", action: replace('/dialog-test')},
                {description: "Shadow", action: replace('/shadow-test')}
            ]},
            {sectionName: "CSS Test", sectionItems : [
                {description: "Layout", action: replace('/css-test')}
            ]}
        ];

        return (
            <div onClick={this.onPanelClick} style={{height: '100vh'}}>
                <Shadow />
                <ContextMenu />
                <SplitPane>
                    <Pane>
                        <Accordion instanceKey="navAccordion" items={accordionItems}/>
                    </Pane>
                    <Pane>
                        {children}
                    </Pane>
                </SplitPane>
            </div>
        );

    }

    onPanelClick(e) {
        dispatch(dismissAction(e));

        e.preventDefault();
        e.stopPropagation();
    }
}
