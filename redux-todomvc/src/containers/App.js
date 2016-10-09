import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Main from '../components/Main'
import * as TodoActions from '../actions'
import style from '../components/listbox.css'

import { addTodo } from '../actions'

// const App = ({todos, actions}) => (
//   <div className="panel">
//     <Header addTodo={actions.addTodo} />
//     <Main todos={this.state.todos} actions={actions} />
//   </div>
// )

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {todos, addTodo, ...rest} = this.props
    
    return (
      <div className="panel">
        <Header addTodo = {addTodo}/>
        <Main todos={todos} actions={rest} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos
})

// function mapStateToProps (state) {
//   console.log('state in app', state)
//   return {
//     todos: state.todos
//   }
// }

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...TodoActions}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

