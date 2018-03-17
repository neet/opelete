import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import { browser } from '../../opelete/browser';

export default class GeneralSettings extends React.PureComponent {

  static propTypes = {
    isHiddenDescriptions: PropTypes.bool,
    maxSuggestions: PropTypes.number,
    onChangeDescriptionVisibility: PropTypes.func.isRequired,
    onChangeMaxSuggestions: PropTypes.func.isRequired,
  }

  handleChangeDescriptionVisibility = e => {
    const { checked } = e.target;

    this.props.onChangeDescriptionVisibility(checked);
  }

  handleChangeMaxSuggestions = e => {
    let { value } = e.target;

    if ( typeof value !== 'number' ) {
      value = parseInt(value);
    }

    if ( value < 0 ) {
      return;
    }

    this.props.onChangeMaxSuggestions(value);
  }

  render() {
    const { isHiddenDescriptions, maxSuggestions } = this.props;

    return (
      <div className='preference-category'>
        <h2 className='preference-title'>
          <i className='fas fa-cogs' aria-hidden />
          { browser.i18n.getMessage('preference_generalSettings') }
        </h2>

        <div className='preference-item'>
          <Checkbox
            text={browser.i18n.getMessage('preference_generalSettings_hideDescriptions')}
            value={isHiddenDescriptions}
            onChange={this.handleChangeDescriptionVisibility}
          />
        </div>

        <div className='preference-item'>
          <label className='preference-modifier'>
            <span className='preference-modifier__label'>
              { browser.i18n.getMessage('preference_generalSettings_maximunNumberOfSuggestions') }
            </span>

            <input
              type='number'
              value={maxSuggestions}
              onChange={this.handleChangeMaxSuggestions}
            />
          </label>
        </div>
      </div>
    );
  }

}
