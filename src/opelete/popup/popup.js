import React from 'react';
import ReactDOM from 'react-dom';
import ready from '../ready';
import Popup from './components/Popup';

(function() {
  ready(() => {
    ReactDOM.render(<Popup />, document.getElementById('root'));
  });
}());
