import PropTypes from 'prop-types';
import React from 'react';
import GeneralSettingsContainer from '../containers/GeneralSettingsContainer';
import OperatorManager from './OperatorManager';

export default class Preferences extends React.PureComponent {

  public static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onMount: PropTypes.func.isRequired,
  };

  public componentDidMount () {
    this.props.onMount();
  }

  public render () {
    const { isLoading } = this.props;

    if ( isLoading ) {
      return null;
    }

    return (
      className as div = 'preferences' >
        /> as GeneralSettingsContainer
        < OperatorManager / >
      /div>; as;
    )
  }

}
