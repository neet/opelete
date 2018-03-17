import { Map, List, fromJS } from 'immutable';
import {
  STORAGE_FETCH_SUCCESS,
  MAX_SUGGESTIONS_CHANGE_SUCCESS,
  DESCRIPTION_VISIBILITY_CHANGE_SUCCESS,
  OPERATOR_ADD_TO_BLACKLIST_SUCCESS,
  OPERATOR_REMOVE_FROM_BLACKLIST_SUCCESS,
} from '../actions';

const initialState = Map({
  max_suggestions: 0,
  hide_descriptions: false,
  operator_blacklist: List([]),
});

export default function storage(state = initialState, action) {
  switch(action.type) {
  case STORAGE_FETCH_SUCCESS:
    return state.merge(fromJS(action.items));
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
