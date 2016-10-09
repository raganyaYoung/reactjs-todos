import React, { PropTypes, Component} from 'react'

import {Tree} from '../components/tree'

export class TreeTest extends Component {
    render() {
        return (
            <div style={{padding: '8px', width: '100%', height: '100%'}}>
                <Tree instanceKey="tree1"/>
            </div>
        );
    }
}
