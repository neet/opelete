import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { stores } from '../stores';
import { GeneralSettings } from './GeneralSettings';
import { OperatorManager } from './OperatorManager';

interface Props {
  storage?: typeof stores.storage;
}

@inject('storage')
@observer
export class Popup extends React.Component<Props> {

  public componentDidMount () {
    this.props.storage!.fetchStorage();
  }

  public render () {
    const { storage } = this.props;

    if (storage!.isLoading) {
      // Simple loading indicator
      return <Fa icon={faCircleNotch} spin />;
    }

    return (
      <main className='opelete-popup'>
        <div className='preferences'>
          <GeneralSettings />
          <OperatorManager />
        </div>
      </main>
    );
  }
}
