import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../opelete/ready';
import Popup from './containers/Popup';

(function() {
  ready(() => {
    ReactDOM.render(
      <Popup />,
      document.getElementById('root')
    );
  });
}());
