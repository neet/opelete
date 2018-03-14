import React from 'react';
import OperatorCard from '../components/OperatorCard';
import operators from '../../opelete/operators';

export default class Popup extends React.PureComponent {

  render() {
    return (
      <div className='opelete-popup'>
        <h1>Preferences</h1>

        <h2>Manage Operators</h2>
        {
          operators.map(({ operator, description }) => (
            <OperatorCard
              operator={operator}
              description={description}
            />
          ))
        }
      </div>
    );
  }

}
