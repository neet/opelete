import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../opelete/ready';
import Popup from './components/Popup';

(function () {
  ready(() => {
    ReactDOM.render(
      <Popup />,
      document.getElementById('root'),
    );
  });
}());
