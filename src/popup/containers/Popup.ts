import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import PreferencesContainer from './PreferencesContainer';

export const store = configureStore();

export default class Popup extends React.PureComponent {

  render() {
    return (
      <Provider store={store} >
        <div className='opelete-popup'>
          <PreferencesContainer />
        </div>
      </Provider>
    );
  }

}
