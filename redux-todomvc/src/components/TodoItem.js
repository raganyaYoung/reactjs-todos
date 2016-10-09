import React from 'react'

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handlerMouseOut = () => {
    this.refs.delBtn.style.display = "none";
  };

  handlerMouseOver = () => {
    this.refs.delBtn.style.display = "inline";
  };

  render() {
    const { todo, completeTodo, deleteTodo } = this.props
    console.log('props in todoitem', this.props)
    return (
      <li onMouseOver={this.handlerMouseOver} onMouseOut={this.handlerMouseOut}>
        <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)} />&nbsp;&nbsp;&nbsp;&nbsp;
        <label ref='conLabel' style={{ 'textDecoration': todo.completed ? 'line-through' : 'none' }}>{todo.text}</label>
        <button
          ref="delBtn" data-key={todo.id}
          style={{'display':'none'}}
          className="btn btn-xs btn-default pull-right delBtn"
          onClick={() => deleteTodo(todo.id)}
        >delete</button>
      </li>
    )
  }
}
