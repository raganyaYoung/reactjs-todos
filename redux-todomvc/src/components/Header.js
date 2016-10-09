import React from 'react'
// import TodoInput from './TodoInput'

export default class TodoInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: this.props.text || '',
    };
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  handleSubmit = e => {
    const inputValue = this.state.text.trim()
    if(inputValue) {
      this.props.addTodo(inputValue)
      this.setState({
        text: ''
      })
    }
  }

  keySubmit = e => {
    const inputValue = this.state.text.trim()
    if(e.keyCode == 13 && inputValue) {
      this.props.addTodo(inputValue)
      this.setState({
        text: ''
      })
    }
  }

  render() {
    return (
      <div className="panel-heading">
        <span className="glyphicon glyphicon-plus-sign" onClick={this.handleSubmit}></span>
        <input className="panel-title" placeholder="what's your task?" 
          autoFocus="true" value={this.state.text}
          onChange={this.handleChange} onKeyUp={this.keySubmit}/>
      </div>
    )
  }
}