import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ready } from '../opelete/ready';
import { Popup } from './components/Popup';

(() => {
  ready(() => {
    ReactDOM.render(
      <Popup />,
      document.getElementById('root'),
    );
  });
})();
