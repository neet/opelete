import React from 'react';
import OperatorCard from '../components/OperatorCard';
import { operators, searchOperators } from '../../opelete/operators';

export default class OperatorManager extends React.PureComponent {

  state = {
    query: '',
    list: operators,
  }

  handleChange = e => {
    const { value } = e.target;
    const result = value.length === 0 ? operators : searchOperators(value);

    this.setState({ query: value, list: result });
  }

  render() {
    const { list } = this.state;

    return (
      <div className='operator-manager'>
        <div className='operator-search'>
          <input
            className='operator-search__input'
            type='text'
            value={this.state.value}
            placeholder='Search operators'
            onChange={this.handleChange}
          />

          <div className='operator-search__submit'>
            <i class='fas fa-search' aria-hidden />
          </div>
        </div>

        <ul className='operator-list'>
          {
            list.map(({ operator, description }) => (
              <OperatorCard
                operator={operator}
                description={description}
              />
            ))
          }
        </ul>
      </div>
    );
  }

}
