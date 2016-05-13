// global postcss
require('../styles/style.scss');
// react
import React from 'react';
import ReactDOM from 'react-dom';
// components
import TodoApp from './components/TodoApp';
// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';

const rootElement = document.getElementById('app');
// specify store reducer
const store = createStore(todoApp);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp todos={store.getState().todos} />
    </Provider>,
    rootElement
  );
}

// initial render
render();
// register callback for store to call when action is dispatched
store.subscribe(render);

export default store;
