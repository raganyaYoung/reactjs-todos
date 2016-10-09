import React, {Component} from 'react'

import {dispatch} from '../util/redux-enhancer'
import {showAction, hideAction} from '../components/shadow'

export class ShadowTest extends Component {
    constructor(props) {
        super(props);

        this.onShowShadowClick = this.onShowShadowClick.bind(this);
    }

    render() {
        return (
            <div style={{padding: '8px'}}>
                <button onClick={this.onShowShadowClick}>Show shadow</button>
            </div>
        )
    }

    onShowShadowClick(e) {
        dispatch(showAction());
        setTimeout(()=>dispatch(hideAction()), 3000);
    }
}
