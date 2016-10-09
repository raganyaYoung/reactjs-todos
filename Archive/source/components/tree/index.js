/**
 *
 * Tree UI component
 *
 * @Author Kelven Yang
 *
 */
import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import {registerComponent, getComponentState, reduceComponentState, getBlankReducerState, dispatch} from '../../util/redux-enhancer'

import styles from './tree.css'

export class Tree extends Component {
    static statePath = "tree";
    static defaultInstanceState() {
        return ({
        });
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Tree TODO</div>
        )
    }
}

const treeReducer = (state = getBlankReducerState(), action) => {
    switch(action.type) {
        default :
            return state;
    }
}

const mapStateToProps = (state, ownProps) => {
    let componentState = getComponentState(state, Tree, ownProps.instanceKey);

    return ({
    });
};

Tree = connect(mapStateToProps)(Tree);
registerComponent(Tree, treeReducer);
