import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import React from 'react';
import { browser } from 'webextension-polyfill-ts';
import { Checkbox } from './Checkbox';

export interface Props {
  isHiddenDescriptions?: boolean;
  maxSuggestions?: number;
  onChangeDescriptionVisibility: (value: boolean) => void;
  onChangeMaxSuggestions: (value: number) => void;
}

export class GeneralSettings extends React.PureComponent {

  public handleChangeDescriptionVisibility = (e) => {
    const { checked } = e.target;

    this.props.onChangeDescriptionVisibility(checked);
  }

  public handleChangeMaxSuggestions = (e) => {
    let { value } = e.target;

    if ( typeof value !== 'number' ) {
      value = Number(value);
    }

    if ( value < 0 ) {
      return;
    }

    this.props.onChangeMaxSuggestions(value);
  }

  public render () {
    const { isHiddenDescriptions, maxSuggestions } = this.props;

    return (
      <div className='preference-category'>
        <h2 className='preference-title'>
          <Fa icon={faCogs} />
          {browser.i18n.getMessage('preference_generalSettings')}
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
              {browser.i18n.getMessage('preference_generalSettings_maximunNumberOfSuggestions')}
            </span>

            <input
              type='number'
              value={maxSuggestions}
              aria-valuemin={0}
              aria-valuemax={9999}
              aria-valuenow={maxSuggestions}
              onChange={this.handleChangeMaxSuggestions}
            />
          </label>
        </div>
      </div>
    );
  }

}
