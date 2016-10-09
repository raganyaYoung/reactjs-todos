import * as types from '../constants/ActionTypes'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]
  

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TODO:
      console.log('text', action.text)
      return [
        {
          id: state.length,
          completed: false,
          text: action.text
        },
        ...state
      ]

    case types.DELETE_TODO:
      console.log('id', action.id)
      return state.filter(todo =>
        todo.id != action.id
      )

    case types.EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case types.COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case types.COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case types.CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}

