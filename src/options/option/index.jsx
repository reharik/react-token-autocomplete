import React from 'react';
import styles from './styles.css';
import {noop, identity} from 'lodash';

export default class Option extends React.Component {

  static displayName = 'Option';

  static propTypes = {
    selected: React.PropTypes.bool,
    index: React.PropTypes.number,
    handleSelect: React.PropTypes.func,
    handleClick: React.PropTypes.func,
    parse: React.PropTypes.func
  }

  static defaultProps = {
    handleSelect: noop,
    handleClick: noop,
    selected: false,
    index: 0,
    parse: identity
  }

  onMouseEnter = () => {
    this.props.handleSelect(this.props.index);
  }

  onClick = () => {
    this.props.handleClick(this.props.index);
  }

  render() {
    return (
      <div
        className={ styles.wrapper }
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        style={[this.props.style.wrapper, this.props.selected && this.props.style.selected]}>
          {this.props.parse(this.props.value)}
      </div>
    );
  }
}
