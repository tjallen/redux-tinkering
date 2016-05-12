// global postcss
require('../styles/style.scss');
// react
import React from 'react';
import ReactDOM from 'react-dom';
// components
import Todos from './components/Todos';
// redux
import { createStore } from 'redux';
import todos from './reducers';

const rootElement = document.getElementById('app');
// specify store reducer
const store = createStore(todos);

function render() {
  ReactDOM.render(
    <Todos />,
    rootElement
  );
}

// initial render
render();
// register callback for store to call when action is dispatched
store.subscribe(render);
