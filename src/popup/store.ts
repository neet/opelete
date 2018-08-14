import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export function configureStore () {
  return createStore(reducers, compose(applyMiddleware(
    thunk,
  )));
}
