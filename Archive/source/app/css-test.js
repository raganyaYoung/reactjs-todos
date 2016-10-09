import React, { PropTypes, Component} from 'react'

export class CssTest extends Component {
    render() {
        return (
            <div style={{width:'100%', height: '100%'}}>
                <div style={{border: '1px solid red', padding: '8px', width: '100%', height: '100%'}}>
                    <div style={{border: '1px solid yellow', padding: '8px', width: '100%', height: '100%'}}></div>
                </div>
            </div>
        );
    }
}
