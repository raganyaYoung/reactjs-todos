/**
 *
 * Tab UI component
 *
 * @Author Kelven Yang
 *
 */
import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import {registerComponent, getComponentState, reduceComponentState, getBlankReducerState, dispatch} from '../../util/redux-enhancer'
import {setCurrentItemAction} from './actions'

import styles from './tab.css'

/**
 *
 * Tab props
 *      items: [{description: string, component: ReactComponent(JSX)}]
 *      currentItemIndex: 0-based index
 *      backgroundColor: string panel background color
 *
 */
export class Tab extends Component {
    static statePath = "tab";
    static defaultInstanceState() {
        return ({
            currentItemIndex: 0
        });
    }

    constructor(props) {
        super(props);

        if(!props.instanceKey)
            throw new Error('Missing instanceKey in <Tab>');

        if(!props.items)
            throw new Error('Missing items in <Tab>');

        this.onItemClick = this.onItemClick.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    render() {
        let {items, currentItemIndex, backgroundColor='white'} = this.props;

        return (
          <div className={styles.tabBox} ref={(domElement) => this.domContainer = domElement}>
              <ul className={styles.tabCaption} ref={(domElement) => this.domCaption = domElement}>
                  {
                    items.map((item, index) => {
                        if(index == currentItemIndex)
                            return (<li className={styles.tabCaptionCurrentItem}
                                        key={index}
                                        data-itemid={index}
                                        onClick={this.onItemClick}
                                        style={{borderBottomColor: backgroundColor}}
                                    >
                                        {item.description}
                                    </li>);
                        else
                            return (<li className={styles.tabCaptionItem}
                                        key={index}
                                        data-itemid={index}
                                        onClick={this.onItemClick}
                                >
                                {item.description}
                            </li>);
                    })
                  }
              </ul>
              <div className={styles.tabPagePanel} ref={(domElement)=>this.domPagePanel=domElement}>
                  {
                      items.map((item, index)=> {
                          let props = {key: index};

                          if(currentItemIndex == index) {
                              return React.cloneElement(item.component, props);
                          } else {
                              return null;
                          }
                      })
                  }
              </div>
          </div>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
        this.layout();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        this.layout();
    }

    layout() {
        let rcContainer = this.domContainer.getBoundingClientRect();
        let rcCaption = this.domCaption.getBoundingClientRect();
        let rcPagePanel = this.domPagePanel.getBoundingClientRect();

        let pagePanelHeight = rcContainer.height - rcPagePanel.top;
        this.domPagePanel.style.height = `${pagePanelHeight}px`;
    }

    onItemClick(e) {
        let itemId = e.target.getAttribute('data-itemid');

        dispatch(setCurrentItemAction(this.props.instanceKey, itemId));

        e.preventDefault();
        e.stopPropagation();
    }

    onResize(e) {
        this.forceUpdate();
    }
}

const tabReducer = (state = getBlankReducerState(), action) => {
    switch(action.type) {
        case "Tab.SETCURRENT": {
                let val = getComponentState(state, Tab, action.instanceKey, true);
                return reduceComponentState(state, {currentItemIndex: action.currentItemIndex}, action.instanceKey);
            }

        default :
            return state;
    }
}

const mapStateToProps = (state, ownProps) => {
    let componentState = getComponentState(state, Tab, ownProps.instanceKey);

    return ({
        currentItemIndex: componentState.currentItemIndex
    });
};

Tab = connect(mapStateToProps)(Tab);
registerComponent(Tab, tabReducer);

export {setCurrentItemAction} from './actions'
