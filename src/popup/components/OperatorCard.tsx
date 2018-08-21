import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Operator } from '../../opelete/operators';
import { stores } from '../stores';
import { Button } from './Button';

interface Props {
  storage?: typeof stores.storage;
  operator: Operator;
}

export class OperatorCard extends React.PureComponent<Props> {

  private handleClick = () => {
    this.props.storage!.toggleDescriptions(!(this.props.storage!.hideDescriptions));
  }

  public render () {
    const { storage, operator } = this.props;
    const isHidden = storage!.hideDescriptions;

    return (
      <div className={`operator-list-item ${isHidden ? 'operator-list-item--hidden' : ''}`}>
          text={browser.i18n.getMessage('preference_manageOperators__excludeOperator')}
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
