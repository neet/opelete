import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class OperatorCard extends React.PureComponent {

  static propTypes = {
    operator: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isHidden: PropTypes.bool,
  }

  render() {
    const { operator, description, isHidden } = this.props;

    return (
      <div className={`operator-list-item ${ isHidden ? 'operator-list-item--hidden' : ''}`}>
        <Button className='operator-list-item__hide-button' onClick={this.handleToggleVisibility}>
          <i className='fas fa-eye-slash' aria-hidden='true' />
        </Button>

        <div className='operator-list-item__meta'>
          <h3 className='operator-list-item__operator'>
            { operator }
          </h3>

          <p className='operator-list-item__description'>
            { description }
          </p>
        </div>
      </div>
    );
  }

}
