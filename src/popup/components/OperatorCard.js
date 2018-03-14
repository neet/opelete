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
      <section className={`operator-card ${ isHidden ? 'operator-card--hidden' : ''}`}>
        <Button
          className='operator-card__hide-button'
          text='hide'
        />

        <div className='operator-card__meta'>
          <h3 className='operator-card__operator'>
            <code>{ operator }</code>
          </h3>

          <p className='operator-card__description'>
            { description }
          </p>
        </div>
      </section>
    );
  }

}
