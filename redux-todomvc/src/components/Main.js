import React from 'react'
// import * as types from ''
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/ActionTypes'
import TodoItem from './TodoItem'
import Footer from './Footer'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: SHOW_ALL
    };
  }

  showFiltered = (filterState) => {
    this.setState({
      filter: filterState
    })
  }

  show

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state
    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    // const completedCount = todos.reduce((count, todo) =>
    //   todo.completed ? count + 1 : count,
    //   0
    // )
    
    console.log('props in main', this.props)
    return (
      <div>
        <ul className="panel-body">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        <Footer {...actions} filter={filter} showFiltered={this.showFiltered}/>
      </div>
    )
  }
}