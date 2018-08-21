import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ready } from '../opelete/ready';
import { Popup } from './components/Popup';
import { stores } from './stores';

(() => {
  ready(() => {
    ReactDOM.render(
      (
        <Provider {...stores}>
          <Popup />
        </Provider>
      ),
      document.getElementById('root'),
    );
  });
})();
