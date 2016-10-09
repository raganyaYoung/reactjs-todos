import React, { PropTypes, Component} from 'react'

import {Tab} from '../components/tab'
import {About} from './about'
import {Profile} from './profile'
import {Help} from './help'

export class TabTest extends Component {
    render() {
        let items = [
            {description: 'About', component: <About/>},
            {description: 'Profile', component: <Profile/>},
            {description: 'Help', component: <Help/>}
        ];

        return (
            <div style={{padding: '8px', width: '100%', height: '100%'}}>
                <Tab instanceKey="tab1" items={items}/>
            </div>
        );
    }
}
