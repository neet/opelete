import { faList, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
import { Operator, operators, searchOperators } from '../../opelete/operators';
import { OperatorCard } from './OperatorCard';

export interface State {
  value: string;
  query: string;
  results: Operator[];
}

export class OperatorManager extends React.PureComponent<{}, State> {

  public state = {
    value: '',
    query: '',
    results: operators,
  };

  public handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ value });

    if ( !value ) {
      this.setState({ query: '', results: operators });
      return;
    }

    const results = await searchOperators(value);
    this.setState({ query: value.trim(), results });
  }

  public render () {
    const { results } = this.state;

    return (
      <div className='opelete-section'>
        <h2>
          <Fa icon={faList} />
          {browser.i18n.getMessage('preference_manageOperators')}
        </h2>

        <div className='operator-manager'>
          <div className='operator-search'>
            <input
              className='operator-search__input'
              type='text'
              value={this.state.value}
              placeholder={browser.i18n.getMessage('preference_manageOperators__searchOperators')}
              onChange={this.handleChange}
            />

            <div className='operator-search__submit'>
              <Fa icon={faSearch} />
            </div>
          </div>

          <ul className='operator-list'>
            {results.map((result) => <OperatorCard key={result.id} operator={result} />)}
          </ul>
        </div>
      </div>
    );
  }

}
