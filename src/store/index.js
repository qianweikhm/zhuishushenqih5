import { createStore } from 'redux'
const defaultState = {
  counter: 0
}

const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case "increment":
      console.log("increment")
      return {
        counter: state.counter + 1
      }
    case "decrement":
      return {
        counter: state.counter - 1
      }
    default:
      return state
  }
}
const store = createStore(reducers)
export default store