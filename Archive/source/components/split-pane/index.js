/**
 *
 * Split pane UI component
 * Supports horizontal and vertical split of panes
 *
 * @Author Kelven Yang
 *
 */
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'

import styles from './split-pane.css'

/**
 *
 * SplitPane props
 *
 *      splitDirection: [horizontal | vertical]
 *
 */
export class SplitPane extends Component {
    constructor(props) {
        super(props);

        if(props.splitDirection) {
            if(props.splitDirection != "horizontal" && props.splitDirection != "vertical") {
                throw new Error('value of splitDirection should be one of "horizontal" or "vertical"');
            }

            if(props.splitDirection == "horizontal")
                this.horizontalSplit = true;
            else
                this.horizontalSplit = false;
        } else {
            this.horizontalSplit = true;
        }

        // setup bindings
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMoveCapture = this.onMouseMoveCapture.bind(this);
        this.onMouseUpCapture = this.onMouseUpCapture.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    render() {
        //
        // Note: CSS-MODULES will mangle names in .css file, we will need to get the real name
        // from imported CSS style object
        //

        if(React.Children.count(this.props.children) != 2)
            throw new Error('SplitPane is only valid for having 2 child panes');

        let index = 1;
        let children = React.Children.map(this.props.children, (child) => {
            let props = {ref: 'pane' + index++};

            if(this.horizontalSplit) {
                props = {...props, className: styles.splitHPane};
            } else {
                props = {...props, className: styles.splitVPane};
            }

            return React.cloneElement(child, props);
        });

        let containerClassName = styles.splitHContainer;
        if(!this.horizontalSplit)
            containerClassName = styles.splitVContainer;

        return (
          <div className={containerClassName}
               ref={(element) => {this.containerElement = element;}}
               onMouseDown={this.onMouseDown}
               onMouseMoveCapture={this.onMouseMoveCapture}
               onMouseUpCapture={this.onMouseUpCapture}
              >
              {children}
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
        let domContainer = ReactDOM.findDOMNode(this.containerElement);
        let domPane1 = ReactDOM.findDOMNode(this.refs.pane1);
        let domPane2 = ReactDOM.findDOMNode(this.refs.pane2);
        let rcContainer = domContainer.getBoundingClientRect();
        let rcPane1 = domPane1.getBoundingClientRect();
        let rcPane2 = domPane2.getBoundingClientRect();

        if(!this.marginSize) {
            if(this.horizontalSplit)
                this.marginSize = rcPane2.left - rcPane1.right;
            else
                this.marginSize = rcPane2.top - rcPane1.bottom;
        }

        if(this.horizontalSplit) {
            let pane2Width = rcContainer.width - rcPane1.width - this.marginSize;
            domPane2.style.width = `${pane2Width}px`;
        } else {
            let pane2Height = rcContainer.height - rcPane1.height - this.marginSize;
            domPane2.style.height = `${pane2Height}px`;
        }
    }

    onMouseDown(e) {
        if(!this.captured && e.currentTarget == e.target) {
            this.captured = true;

            let domPane1 = ReactDOM.findDOMNode(this.refs.pane1);
            let domPane2 = ReactDOM.findDOMNode(this.refs.pane2);

            if(this.horizontalSplit) {
                this.capturedPos = e.screenX;
                this.capturedSize1 = domPane1.getBoundingClientRect().width;
                this.capturedSize2 = domPane2.getBoundingClientRect().width;
            } else {
                this.capturedPos = e.screenY;
                this.capturedSize1 = domPane1.getBoundingClientRect().height;
                this.capturedSize2 = domPane2.getBoundingClientRect().height;
            }

            e.preventDefault();
            e.stopPropagation();
        }
    }

    onMouseMoveCapture(e) {
        if(this.captured) {
            let domContainer = ReactDOM.findDOMNode(this.containerElement);
            let rcContainer = domContainer.getBoundingClientRect();
            let domPane1 = ReactDOM.findDOMNode(this.refs.pane1);
            let domPane2 = ReactDOM.findDOMNode(this.refs.pane2);

            if(this.horizontalSplit) {
                let delta = e.screenX - this.capturedPos;

                let width1 = this.capturedSize1 + delta;
                width1 = Math.max(this.marginSize, width1);
                width1 = Math.min(rcContainer.width - this.marginSize * 2, width1);

                let width2 = this.capturedSize2 - delta;
                width2 = Math.max(this.marginSize, width2)
                width2 = Math.min(rcContainer.width - this.marginSize * 2, width2);

                domPane1.style.width = `${width1}px`;
                domPane2.style.width = `${width2}px`;
            } else {
                let delta = e.screenY - this.capturedPos;

                let height1 = this.capturedSize1 + delta;
                height1 = Math.max(this.marginSize, height1);
                height1 = Math.min(rcContainer.height - this.marginSize * 2, height1);

                let height2 = this.capturedSize2 - delta;
                height2 = Math.max(this.marginSize, height2)
                height2 = Math.min(rcContainer.height - this.marginSize * 2, height2);

                domPane1.style.height = `${height1}px`;
                domPane2.style.height = `${height2}px`;
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }

    onMouseUpCapture(e) {
        if(this.captured) {
            this.captured = false;

            e.preventDefault();
            e.stopPropagation();
        }
    }

    onResize(e) {
        this.forceUpdate();
    }
}

/**
 *
 * Pane props
 *      className: implicitly passed from SplitPane component, don't set it manually at JSX!
 *
 */
export class Pane extends Component {
    render() {
        let {children, className} = this.props;

        return (
            <div className={className}>{children}</div>
        );
    }
}
