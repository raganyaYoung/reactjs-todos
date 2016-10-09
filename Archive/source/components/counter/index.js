/**
 *
 * A demonstration non-singleton component
 *
 * @Author Kelven Yang
 *
 */
import React, { PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import {localeString} from '../../util/locale'
import {registerComponent, getComponentState, reduceComponentState, getBlankReducerState} from '../../util/redux-enhancer'

/*
export var Counter = ({val, onIncrementClick, onAsyncClick, onInfoClick, children}) => {
    return (
        <div>
            <p>{val}</p>
        </div>
    );
};
*/
export class Counter extends Component {
    static statePath = "counter";
    static defaultInstanceState() {
        return 1;
    }

    render() {
        let {val} = this.props;

        return (
            <div>
                <p>{val}</p>
            </div>
        );
    }
}

Counter.propTypes = {
    val: PropTypes.number
}

//
// Behavior (reducer)
// reducer operates at its own position
//
const counterReducer = (state = getBlankReducerState(), action) => {
    switch(action.type) {
        case "Counter.INCREMENT": {
            let val = getComponentState(state, Counter, action.instanceKey, true);
            return reduceComponentState(state, val + 1, action.instanceKey);
        }

        default :
            return state;
    }
};

const mapStateToProps = (state, ownProps) => {
    return {val: getComponentState(state, Counter, ownProps.instanceKey)};
};

Counter = connect(mapStateToProps, null)(Counter);
registerComponent(Counter, counterReducer);

export {increaseAction} from './actions.js'
