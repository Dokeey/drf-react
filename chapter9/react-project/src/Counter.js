import React from 'react';
import PropTypes from 'prop-types';

export class TestCounter extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  };
  state = {};

  render() {
    return <div onClick={this.props.onClick}>Counter</div>;
  }
}

class Counter extends React.Component {
  static defaultProps = {
    color: 'red',
  };

  static propTypes = {
    color: PropTypes.string,
  };
  state = {
    color: this.props.color,
    value: 0,
  };

  onClick = () => {
    this.setState(({ value: prevValue }) => ({
      value: prevValue + 1,
    }));
  };

  onContextMenu = (e) => {
    e.preventDefault();

    this.setState(({ value: prevValue }) => ({
      value: prevValue >= 1 ? prevValue - 1 : 0,
    }));
  };
  render() {
    const { color, value } = this.state;
    return (
      <div
        onContextMenu={this.onContextMenu}
        onClick={this.onClick}
        style={{ ...style, backgroundColor: color }}
      >
        {value}
      </div>
    );
  }
}

const style = {
  width: '100px',
  height: '100px',
  display: 'inline-block',
  borderRadius: '50px',
  textAlign: 'center',
  lineHeight: '100px',
  userSelect: 'none',
  fontSize: '3rem',
  margin: '1rem',
};

export default Counter;
