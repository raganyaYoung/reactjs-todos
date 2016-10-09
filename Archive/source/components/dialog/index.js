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

import styles from './dialog.css'

export class Dialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Dialog TODO</div>
        )
    }
}
