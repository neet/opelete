import React from 'react';
import { GeneralSettings } from './GeneralSettings';
import { OperatorManager } from './OperatorManager';

export interface Props {
  isLoading: boolean;
  onMount: () => void;
}

export class Preferences extends React.PureComponent<Props> {

  public componentDidMount () {
    this.props.onMount();
  }

  public render () {
    const { isLoading } = this.props;

    if ( isLoading ) {
      return;
    }

    return (
      <div className='preferences'>
        <GeneralSettings />
        <OperatorManager />
      </div>
    );
  }

}
