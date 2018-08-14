import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  }

  handleClick = () => {
    if ( this.props.href ) {
      window.location.href = this.props.href;
    } else if ( this.props.onClick ) {
      this.props.onClick();
    }
  }

  render() {
    const { text, children, className } = this.props;

    return (
      <button className={`button ${className}`} aria-label={text} onClick={this.handleClick}>
        { children || text }
      </button>
    );
  }

}
