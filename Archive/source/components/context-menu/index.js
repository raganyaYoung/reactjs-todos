/**
 *
 * ContextMenu singleton UI component
 *
 * @Author Kelven Yang
 *
 */

import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import {localeString} from '../../util/locale'
import {registerComponent, getComponentState, getBlankReducerState, dispatch} from '../../util/redux-enhancer'
import actionInterceptor from '../../util/action-interceptor'

import {hideAction} from './actions'
import styles from './context-menu.css'

/**
 * ContextMenu props
 *  items: [{description: string, action}] array of menu item
 */
export class ContextMenu extends Component {
    static statePath = "context_menu";
    static defaultInstanceState() {
        return ({
            visible: false,
            position: {x: 0, y: 0},
            items: []
        });
    }

    constructor(props) {
        super(props);

        this.onItemClick = this.onItemClick.bind(this);
        this.onEventAction = this.onEventAction.bind(this);

        this.containsElement = this.containsElement(this);
    }

    render() {
        let {hidden, position, items} = this.props;

        if(!hidden) {
            let positionStyle = {
                left: `${position.x}px`,
                top: `${position.y}px`
            };

            return (
                <div className={styles.menuBox} style={positionStyle} ref={(element)=> {this.rootElement = element}}>
                    <ul className={styles.menuList}>
                        {items.map((item, index)=> {return <li onClick={this.onItemClick} key={index} data-itemid={index}>{item.description}</li>})}
                    </ul>
                </div>
            )
        }
        return null;
    }

    componentDidMount() {
        actionInterceptor.subscribe(this);
    }

    componentWillUnmount() {
        actionInterceptor.unsubscribe(this);
    }

    onEventAction(action) {
        switch(action.type) {
            case "ContextMenu.DISMISS":
                dispatch(hideAction());
                return true;

            default:
                break;
        }

        return false;
    }

    onItemClick(e) {
        let itemId = e.target.getAttribute('data-itemid');
        let componentState = getComponentState(null, ContextMenu);

        // alert(componentState.items[itemId].description);
        dispatch(hideAction());

        if(componentState.items[itemId].action)
            dispatch(componentState.items[itemId].action);

        e.preventDefault();
        e.stopPropagation();
    }

    containsElement(element) {
        let elem = element;
        while(elem && elem != document.body) {
            if(elem == this.rootElement)
                return true;

            elem = elem.parentElement;
        }

        return false;
    }

    isVisible() {
        let componentState = getComponentState(null, ContextMenu);
        return componentState.visible;
    }
}

ContextMenu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({description: PropTypes.string, action: PropTypes.object}))
}

const contextMenuReducer = (state = getBlankReducerState(true, ContextMenu.defaultInstanceState()), action) => {
    switch(action.type) {
        case "ContextMenu.SHOW":
            return {...state, visible: true, position: action.position, items: action.items};

        case "ContextMenu.HIDE" :
            return {...state, visible: false};

        default :
            return state;
    }
}

const mapStateToProps = (state) => {

    let componentState = getComponentState(state, ContextMenu);

    return ({
        hidden: !componentState.visible,
        position: componentState.position,
        items: componentState.items
    });
};

ContextMenu = connect(mapStateToProps)(ContextMenu);
registerComponent(ContextMenu, contextMenuReducer);

// pass-through exports for actions
export {showAction, hideAction, dismissAction} from './actions'
