import React, { PropTypes, Component} from 'react'

import {Accordion} from '../components/accordion'

export class AccordionTest extends Component {
    render() {
        let items = [
            {sectionName: "User Management", sectionItems: [
                {description: "Add User"},
                {description: "Delete User"},
                {description: "Move User"}
            ]},
            {sectionName: "Group Management", sectionItems: [
                {description: "Add Group"},
                {description: "Delete Group"},
                {description: "Move Group"}
            ]}
        ];

        return (
            <div style={{padding: '8px', width: '200px', height: '100%'}}>
                <Accordion instanceKey="accordion1" items={items}/>
            </div>
        );
    }
}
