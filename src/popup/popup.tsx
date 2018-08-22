import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Popup } from './components/Popup';
import { stores } from './stores';

(() => {
  ReactDOM.render(
    (
      <Provider {...stores}>
        <Popup />
      </Provider>
    ),
    document.getElementById('root'),
  );
})();
