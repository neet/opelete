import React from 'react';
import OperatorCardContainer from '../containers/OperatorCardContainer';
import { operators, searchOperators } from '../../opelete/operators';
import { browser } from '../../opelete/browser';

export default class OperatorManager extends React.PureComponent {

  state = {
    query: '',
    results: operators,
  }

  handleChange = e => {
    const { value } = e.target;

    if ( value === '' ) {
      this.setState({ query: value, results: operators });
    } else {
      searchOperators(value).then(results => {
        this.setState({ query: value, results });
      });
    }
  }

  render() {
    const { results } = this.state;

    return (
      <div className='opelete-section'>
        <h2>
          <i className='fas fa-list' aria-hidden />
          { browser.i18n.getMessage('preference_manageOperators') }
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
              <i className='fas fa-search' aria-hidden />
            </div>
          </div>

          <ul className='operator-list'>
            {
              results.map(result => <OperatorCardContainer key={result.id} operator={result} />)
            }
          </ul>
        </div>
      </div>
    );
  }

}
