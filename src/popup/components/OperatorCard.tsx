import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
import { Operator } from '../../opelete/operators';
import { stores } from '../stores';
import { Button } from './Button';

interface Props {
  storage?: typeof stores.storage;
  operator: Operator;
}

@inject('storage')
@observer
export class OperatorCard extends React.Component<Props> {

  private handleClick = () => {
    const { storage, operator } = this.props;

    if (!storage || !storage.operatorBlacklist) {
      return;
    }

    if (storage.operatorBlacklist.includes(operator.id)) {
      storage!.removeOperatorsFromBlacklist(operator.id);
    } else {
      storage!.addOperatorsToBlacklist(operator.id);
    }
  }

  public render () {
    const { storage, operator } = this.props;

    if (!storage) {
      return null;
    }

    const isHidden = !!(storage.operatorBlacklist && storage.operatorBlacklist.includes(operator.id));

    return (
      <div className={`operator-list-item ${isHidden ? 'operator-list-item--hidden' : ''}`}>
        <Button
          className='operator-list-item__hide-button'
          text={browser.i18n.getMessage('preference_manageOperators__excludeOperator')}
          onClick={this.handleClick}
        >
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
