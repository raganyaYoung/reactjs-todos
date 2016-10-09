import React, { PropTypes, Component} from 'react'

import {Dialog} from '../components/dialog'

export class DialogTest extends Component {
    render() {
        return (
            <div style={{padding: '8px', width: '100%', height: '100%'}}>
                <Dialog />
            </div>
        );
    }
}
