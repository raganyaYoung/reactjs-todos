/**
 *
 * Shadow singleton UI component
 *
 * @Author Kelven Yang
 *
 */
import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {registerComponent, getComponentState, getBlankReducerState, dispatch} from '../../util/redux-enhancer'

import styles from './shadow.css'

export class Shadow extends Component {
    static statePath = "shadow";
    static defaultInstanceState() {
        return ({
            visible: false
        });
    }

    render() {
        let {hidden} = this.props;
        let style;
        if(hidden)
            style = {display: 'none'};
        else
            style = {display: 'block'};

        return (
            <div className={styles.shadow} style={style}></div>
        )
    }
}

const shadowReducer = (state = getBlankReducerState(true, Shadow.defaultInstanceState()), action) => {
    switch(action.type) {
        case "Shadow.SHOW":
            return {...state, visible: true};

        case "Shadow.HIDE" :
            return {...state, visible: false};

        default :
            return state;
    }
}

const mapStateToProps = (state) => {

    let componentState = getComponentState(state, Shadow);

    return ({
        hidden: !componentState.visible
    });
};

Shadow = connect(mapStateToProps)(Shadow);
registerComponent(Shadow, shadowReducer);

// pass-through exports for actions
export {showAction, hideAction} from './actions'
