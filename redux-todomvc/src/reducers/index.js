import { combineReducers } from 'redux'
import todos from './reducer'

const rootReducer = combineReducers({
  todos
})

export default rootReducer