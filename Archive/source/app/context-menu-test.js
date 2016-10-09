import React, { PropTypes, Component} from 'react'

import {dispatch} from '../util/redux-enhancer'

import {showAction, hideAction} from '../components/context-menu'

export class ContextMenuTest extends Component {
    constructor(props) {
        super(props);

        this.onShowContextMenu = this.onShowContextMenu.bind(this);
        this.onHideContextMenu = this.onHideContextMenu.bind(this);
    }

    render() {
        return (
            <div style={{padding: '8px'}}>
                <button onClick={this.onShowContextMenu} ref={(button) => {this.showMenuButton = button;}}>Show Context Menu</button>
                <button onClick={this.onHideContextMenu}>Hide Context Menu</button>
            </div>
        );
    }

    onShowContextMenu(e) {
        let rc = this.showMenuButton.getBoundingClientRect();

        dispatch(showAction({x: rc.left, y: rc.bottom}, [
            {description: "Menu item1"},
            {description: "Menu item2"},
            {description: "Menu item3"},
            {description: "Menu item4"},
            {description: "Menu item5"}
        ]));

        e.preventDefault();
        e.stopPropagation();
    }

    onHideContextMenu(e) {
        dispatch(hideAction());

        e.preventDefault();
        e.stopPropagation();
    }
}
