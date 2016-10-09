/**
 *
 * Navigation pane UI component
 * Supports horizontal and vertical navigation panes
 *
 * @Author Kelven Yang
 *
 */
import React, {PropTypes, Component} from 'react'

import {dispatch} from '../../util/redux-enhancer'

import styles from './nav-pane.css'

/**
 * NavPane props
 *  style: use style to specify width or height of the bar
 *  items: [{description: string, action}]
 *
 */
export class NavPane extends Component {

    constructor(props) {
        super(props);

        this.onItemClick = this.onItemClick.bind(this);
    }

    render() {
        let {items} = this.props;

        return (
            <div className={styles.navBox}>
                <ul>
                    {
                        items.map((item, index)=> {
                            return (
                                <li onClick={this.onItemClick}
                                    key={index}
                                    data-itemid={index}>
                                    <a href="#">{item.description}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    onItemClick(e) {
        let itemId = e.currentTarget.getAttribute('data-itemid');

        if(this.props.items[itemId].action)
            dispatch(this.props.items[itemId].action);

        e.preventDefault();
        e.stopPropagation();
    }
}
