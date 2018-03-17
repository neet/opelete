import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

export default class Checkbox extends React.PureComponent {

  static propTypes = {
    text: PropTypes.string,
    value: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: false,
  }

  render() {
    const { text, value, children, onChange } = this.props;

    return (
      <label className='preference-modifier' >
        <div className='preference-modifier__label'>
          { children || text }
        </div>

        <Toggle
          checked={value}
          icons={false}
          onChange={onChange}
        />
      </label>
    );
  }

}
