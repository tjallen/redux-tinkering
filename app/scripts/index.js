// global postcss
require('../styles/style.scss');
// react
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
// components
// import TodoApp from './components/TodoApp';
// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';

const rootElement = document.getElementById('app');
// specify store reducer
const store = createStore(todoApp);

// temp vis stuff for extract later
const FilterLink = ({
  filter,
  children,
  currentFilter,
}) => {
  // if filter is selected, replace the link
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      // dispatch a vis filter action with own filter prop
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter,
        });
      }
    }
    >
      {children}
    </a>
  );
};

// calculate which todos should be visible
const getVisibleTodos = (
  todos,
  filter,
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
    // shouldn't happen
    default:
      return true;
  }
};

// todoapp component for extract later
let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    // destructure this.props
    const {
      todos,
      visibilityFilter,
    } = this.props;
    // array of visible todos returned, used by .map for render
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter,
    );
    return (
      <div>
        <input
          // https://facebook.github.io/react/docs/more-about-refs.html
          ref={node => {
            this.input = node;
          }}
        />
        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++,
            });
            this.input.value = '';
          }}
        >
        Add
        </button>
        <ul>
          {visibleTodos.map(todo =>
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id,
                });
              }}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Display:
          {' '}
          <FilterLink
            filter="SHOW_ALL"
            currentFilter={visibilityFilter}
          >
          All
          </FilterLink>
          {' '}
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={visibilityFilter}
          >
          Active
          </FilterLink>
          {' '}
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={visibilityFilter}
          >
          Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp {...store.getState()} />
    </Provider>,
    rootElement
  );
}

// initial render
render();
// register callback for store to call when action is dispatched
store.subscribe(render);

export default store;
