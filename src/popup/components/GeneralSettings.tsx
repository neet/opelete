import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
import { operators } from '../../opelete/operators';
import { stores } from '../stores';
import { Checkbox } from './Checkbox';

interface Props {
  storage?: typeof stores.storage;
}

@inject('storage')
@observer
export class GeneralSettings extends React.PureComponent<Props> {

  public handleToggleDescriptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    this.props.storage!.toggleDescriptions(checked);
  }

  public handleChangeMaxSuggestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }   = e.target;
    const suggestions = Number(value);

    if ( suggestions < 0 ) {
      return;
    }

    this.props.storage!.changeMaxSuggestions(suggestions);
  }

  public render () {
    const { storage } = this.props;

    return (
      <div className='preference-category'>
        <h2 className='preference-title'>
          <Fa icon={faCogs} />
          {browser.i18n.getMessage('preference_generalSettings')}
        </h2>

        <div className='preference-item'>
          <Checkbox
            text={browser.i18n.getMessage('preference_generalSettings_hideDescriptions')}
            checked={storage!.hideDescriptions || false}
            onChange={this.handleToggleDescriptions}
          />
        </div>

        <div className='preference-item'>
          <label className='preference-modifier'>
            <span className='preference-modifier__label'>
              {browser.i18n.getMessage('preference_generalSettings_maximunNumberOfSuggestions')}
            </span>

            <input
              type='number'
              value={storage!.maxSuggestions || 0}
              aria-valuemin={0}
              aria-valuemax={operators.length}
              aria-valuenow={storage!.maxSuggestions || 0}
              onChange={this.handleChangeMaxSuggestions}
            />
          </label>
        </div>
      </div>
    );
  }
}
