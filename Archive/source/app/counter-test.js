import React, { PropTypes, Component} from 'react'

import {dispatch} from '../util/redux-enhancer'
import {Counter, increaseAction} from '../components/counter'

export class CounterTest extends Component {
    constructor(props) {
        super(props);

        this.onCounter1Increment = this.onCounter1Increment.bind(this);
        this.onCounter2Increment = this.onCounter2Increment.bind(this);
    }

    render() {
        return (
            <div style={{padding: '8px'}}>
                <Counter instanceKey="counter1" />
                <Counter instanceKey="counter2" />

                <button onClick={this.onCounter1Increment}>Counter1 Increment</button>
                <button onClick={this.onCounter2Increment}>Counter2 Increment</button>
            </div>
        );
    }

    onCounter1Increment(e) {
        dispatch(increaseAction("counter1"));

        e.preventDefault();
        e.stopPropagation();

    }

    onCounter2Increment(e) {
        dispatch(increaseAction("counter2"));

        e.preventDefault();
        e.stopPropagation();
    }
}
