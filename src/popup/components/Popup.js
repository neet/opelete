import React from 'react';
import OperatorManager from './OperatorManager';

export default class Popup extends React.PureComponent {

  render() {
    return (
      <div className='opelete-popup'>
        <div className='opelete-section'>
          <h2>
            <i className='fas fa-cogs' aria-hidden />
          General setting
          </h2>
          <div>
            <label>
              <input type='checkbox' />
            Show description of operator
            </label>
          </div>

          <div>
            <label>
            Maximum number of suggestions
              <input type='number' />
            </label>
          </div>
        </div>

        <div className='opelete-section'>
          <h2>
            <i className='fas fa-list' aria-hidden />
            Manage Operators
          </h2>
          <OperatorManager />
        </div>
      </div>
    );
  }

}
