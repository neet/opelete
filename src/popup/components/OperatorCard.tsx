import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Operator } from '../../opelete/operators';
import { Button } from './Button';

interface Props {
  operator: Operator;
  isHidden: boolean;
  onAddToBlacklist: () => void;
  onRemoveFromBlacklist: () => void;
}

export class OperatorCard extends React.PureComponent<Props> {

  public handleAddToBlacklist = () => {
    this.props.onAddToBlacklist();
  }

  public handleRemoveFromBlacklist = () => {
    this.props.onRemoveFromBlacklist();
  }

  public render () {
    const { operator, isHidden } = this.props;

    return (
      <div className={`operator-list-item ${isHidden ? 'operator-list-item--hidden' : ''}`}>
        <Button className='operator-list-item__hide-button' onClick={isHidden ? this.handleRemoveFromBlacklist : this.handleAddToBlacklist}>
          <Fa icon={isHidden ? faEyeSlash : faEye} />
        </Button>

        <div className='operator-list-item__meta'>
          <h3 className='operator-list-item__operator'>
            {operator.operator}
          </h3>

          <p className='operator-list-item__description'>
            {operator.description}
          </p>
        </div>
      </div>
    );
  }

}
