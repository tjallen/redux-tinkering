import React, { Component, PropTypes } from 'react';

import store from '../index.js';

let nextTodoId = 0;

export default class TodoApp extends Component {
  render() {
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
          {this.props.todos.map(todo =>
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
      </div>
    );
  }
}
