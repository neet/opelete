import React from 'react';
import PropTypes from 'prop-types';
import GeneralSettingsContainer from '../containers/GeneralSettingsContainer';
import OperatorManager from '../components/OperatorManager';

export default class Preferences extends React.PureComponent {

  static propTypes = {
    onMount: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div className='preferences'>
        <GeneralSettingsContainer />
        <OperatorManager />
      </div>
    );
  }

}
