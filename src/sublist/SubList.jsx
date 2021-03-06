import React from 'react';

class SubList extends React.Component {
  constructor(prop){
    super(prop);
    var boolDel = this.props.tasks.checked;

    this.state = {
      delDecoration:boolDel,
    }
  }
  handlerMouseOut = () => {
    this.refs.delBtn.style.display = "none";
  };

  handlerMouseOver = () => {
    this.refs.delBtn.style.display = "inline";
  };

  handleRemove = () => {
    this.props.delTask(this.props.taskIndex);
  };

  handleCheck = () => {
    this.props.checkCallBack(this.props.taskIndex);
    var lists = this.props.tasks;
    this.setState({
      delDecoration:!this.state.delDecoration,
    });
  };
  render(){
    var _self = this;
    return (
      <li onMouseOver={_self.handlerMouseOver} onMouseOut={_self.handlerMouseOut}>
        <input checked={this.props.tasks.checked} type="checkbox" name="goodCheck" onChange={_self.handleCheck} data-key={_self.props.taskIndex}/>
        <label ref='conLabel' style={{'textDecoration':this.props.tasks.checked?'line-through':'none'}}>{_self.props.tasksText}</label>
        <button
          className="btn btn-xs btn-default pull-right delBtn"
          ref="delBtn" data-key={_self.props.taskIndex}
          style={{'display':'none'}}
          onClick={_self.handleRemove}
        >delete</button>
      </li>
    )
  }
}

export default SubList;