// todos / todo combined reducer
// to be separated out later
export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        // return the original array of todos
        ...state,
        // with a new todo specified by the action
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    }
    case 'TOGGLE_TODO': {
      // iterate over todos
      return state.map(todo => {
        // if todo doesn't match action id, return as normal
        if (todo.id !== action.id) {
          return todo;
        }
        // but if it matches id, return a new state object
        return {
          // with original properties
          ...todo,
          // but we invert completed to toggle
          completed: !todo.completed,
        };
      });
    }
    default: {
      return state;
    }
  }
}

