// global postcss
require('../styles/style.scss');
// react
import React from 'react';
import ReactDOM from 'react-dom';
// components
import Counter from './components/Counter';
// redux
import { createStore } from 'redux';
import counter from './reducers';

const rootElement = document.getElementById('app');
const store = createStore(counter);

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    rootElement
  );
}

render();
store.subscribe(render);
