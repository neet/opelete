import { Map, List, fromJS } from 'immutable';
import {
  STORAGE_FETCH_REQUEST,
  STORAGE_FETCH_SUCCESS,
  STORAGE_FETCH_FAIL,
  MAX_SUGGESTIONS_CHANGE_SUCCESS,
  DESCRIPTION_VISIBILITY_CHANGE_SUCCESS,
  OPERATOR_ADD_TO_BLACKLIST_SUCCESS,
  OPERATOR_REMOVE_FROM_BLACKLIST_SUCCESS,
} from '../actions';

const initialState = Map({
  is_loading: true, // only in redux store
  max_suggestions: 0,
  hide_descriptions: false,
  operator_blacklist: List([]),
});

export default function storage(state = initialState, action) {
  switch(action.type) {
  case STORAGE_FETCH_REQUEST:
    return state.set('is_loading', true);
  case STORAGE_FETCH_SUCCESS:
    return state
      .set('is_loading', false)
      .merge(fromJS(action.items));
  case STORAGE_FETCH_FAIL:
    return state.set('is_loading', false);
  case MAX_SUGGESTIONS_CHANGE_SUCCESS:
    return state.set('max_suggestions', action.value);
  case DESCRIPTION_VISIBILITY_CHANGE_SUCCESS:
    return state.set('hide_descriptions', action.value);
  case OPERATOR_ADD_TO_BLACKLIST_SUCCESS:
  case OPERATOR_REMOVE_FROM_BLACKLIST_SUCCESS:
    return state.set('operator_blacklist', fromJS(action.operator_blacklist));
  default:
    return state;
  }
}
