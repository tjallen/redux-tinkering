import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
  }
  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <div>
        <p>Clicked: {value} times</p>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    );
  }
}
