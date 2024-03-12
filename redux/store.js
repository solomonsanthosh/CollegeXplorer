// store.js
import { createStore } from 'redux';

// Define initial state
const initialState = {
  user: null 
};

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload // Update user with payload from action
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(reducer);

export default store;
