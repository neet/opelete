import { Map, fromJS } from 'immutable';
import {
  STORAGE_FETCH_SUCCESS,
  MAX_SUGGESTIONS_CHANGE_SUCCESS,
  DESCRIPTION_VISIBILITY_CHANGE_SUCCESS,
} from '../actions';

const initialState = Map({});

export default function storage(state = initialState, action) {
  switch(action.type) {
  case STORAGE_FETCH_SUCCESS:
    return state.merge(fromJS(action.items));
  case MAX_SUGGESTIONS_CHANGE_SUCCESS:
    return state.set('max_suggestions', action.value);
  case DESCRIPTION_VISIBILITY_CHANGE_SUCCESS:
    return state.set('hide_descriptions', action.value);
  default:
    return state;
  }
}
