/**
 *
 * Accordion UI component
 *
 * @Author Kelven Yang
 *
 */
import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import {registerComponent, getComponentState, reduceComponentState, getBlankReducerState, dispatch} from '../../util/redux-enhancer'
import {setCurrentSectionAction} from './actions'

import styles from './accordion.css'

/**
 * Accordion props
 *  items: [{sectionName: string, sectionItems: [{itemDescription: string, action}]]
 *
 */
export class Accordion extends Component {
    static statePath = "accordion";
    static defaultInstanceState() {
        return ({
            currentSectionIndex: 0,
            sectionCurrentItemIndices: {}
        });
    }

    constructor(props) {
        super(props);

        if(!this.props.instanceKey)
            throw new Error('Missing instanceKey in <Accordion>');

        if(!this.props.items)
            throw new Error('Missing items in <Accordion>');

        this.onCaptionClick = this.onCaptionClick.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    getCurrentSectionIndex() {
        let componentState = getComponentState(null, Accordion, this.props.instanceKey, false);
        return componentState.currentSectionIndex;
    }

    render() {
        let {items} = this.props;

        // final rendered content example
        /*
        <div className={styles.accordionBox}>
            <div className={styles.accordionSection}>
                <span>User Management</span>
                <ul>
                    <li><a href="#">Add User</a></li>
                    <li><a href="#">Remove User</a></li>
                    <li><a href="#">Move User</a></li>
                </ul>
            </div>
            <div className={styles.accordionSection}>
                <span>Group Management</span>
                <ul>
                    <li><a href="#">Add Group</a></li>
                    <li><a href="#">Remove Group</a></li>
                    <li><a href="#">Move Group</a></li>
                </ul>
            </div>
        </div>
        */

        return (
            <div className={styles.accordionBox}>
                {items.map((section, sectionIndex) => this.renderSection(section, sectionIndex))}
            </div>
        )
    }

    renderSection(section, sectionIndex) {
        let style = {display: 'block'};

        if(sectionIndex != this.getCurrentSectionIndex())
            style = {display: 'none'};

        return (
            <div className={styles.accordionSection} key={sectionIndex}>
                <span onClick={this.onCaptionClick} data-sectionid={sectionIndex}>{section.sectionName}</span>
                <ul style={style}>
                    {section.sectionItems.map((item, itemIndex) => this.renderItem(sectionIndex, item, itemIndex))}
                </ul>
            </div>
        );
    }

    renderItem(sectionIndex, item, itemIndex) {
        return (
            <li key={itemIndex} onClick={this.onItemClick} data-sectionid={sectionIndex} data-itemid={itemIndex}><a href="#">{item.description}</a></li>
        );
    }

    onCaptionClick(e) {
        let sectionId = e.currentTarget.getAttribute('data-sectionid');
        if(sectionId != this.getCurrentSectionIndex())
            dispatch(setCurrentSectionAction(this.props.instanceKey, sectionId));

        e.preventDefault();
        e.stopPropagation();
    }

    onItemClick(e) {
        let sectionId = e.currentTarget.getAttribute('data-sectionid');
        let itemId = e.currentTarget.getAttribute('data-itemid');

        let section = this.props.items[sectionId];

        if(section.sectionItems && section.sectionItems[itemId]
            && section.sectionItems[itemId].action)
            dispatch(section.sectionItems[itemId].action);

        e.preventDefault();
        e.stopPropagation();
    }
}

const accordionReducer = (state = getBlankReducerState(), action) => {
    switch(action.type) {
        case "Accordion.SETCURRENT_SECTION": {
            let val = getComponentState(state, Accordion, action.instanceKey, true);
            return reduceComponentState(state, {currentSectionIndex: action.currentSectionIndex}, action.instanceKey);
        }

        default :
            return state;
    }
}

const mapStateToProps = (state, ownProps) => {
    let componentState = getComponentState(state, Accordion, ownProps.instanceKey);

    return ({
        currentSectionIndex: componentState.currentSectionIndex
    });
};

Accordion = connect(mapStateToProps)(Accordion);
registerComponent(Accordion, accordionReducer);

export {setCurrentSectionAction} from './actions'
