import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import { stores } from '../stores';
import { GeneralSettings } from './GeneralSettings';
import { OperatorManager } from './OperatorManager';

interface Props {
  storage: typeof stores.storage;
}

export const Popup = observer(
class extends React.PureComponent<Props> {

  public componentDidMount () {
    this.props.storage.fetchStorage();
  }

  public render () {
    const { storage } = this.props;

    if (storage.isLoading) {
      // Simple loading indicator
      return <Fa icon={faCircleNotch} spin />;
    }

    return (
      <Provider {...stores}>
        <div className='preferences'>
          <GeneralSettings />
          <OperatorManager />
        </div>
      </Provider>
    );
  }
});
