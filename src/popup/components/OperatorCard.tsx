import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class OperatorCard extends React.PureComponent {

  static propTypes = {
    operator: PropTypes.object.isRequired,
    isHidden: PropTypes.bool.isRequired,
    onAddToBlacklist: PropTypes.func.isRequired,
    onRemoveFromBlacklist: PropTypes.func.isRequired,
  }

  handleAddToBlacklist = () => {
    this.props.onAddToBlacklist();
  }

  handleRemoveFromBlacklist = () => {
    this.props.onRemoveFromBlacklist();
  }

  render() {
    const { operator, isHidden } = this.props;

    return (
      <div className={`operator-list-item ${ isHidden ? 'operator-list-item--hidden' : ''}`}>
        <Button className='operator-list-item__hide-button' onClick={isHidden ? this.handleRemoveFromBlacklist : this.handleAddToBlacklist}>
          <i className='fas fa-eye-slash' aria-hidden='true' />
        </Button>

        <div className='operator-list-item__meta'>
          <h3 className='operator-list-item__operator'>
            { operator.operator }
          </h3>

          <p className='operator-list-item__description'>
            { operator.description }
          </p>
        </div>
      </div>
    );
  }

}
