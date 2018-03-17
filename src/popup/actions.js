import { browser } from '../opelete/browser';

// browser.storage.sync.clear();

export const STORAGE_FETCH_REQUEST = 'STORAGE_FETCH_REQUEST';
export const STORAGE_FETCH_SUCCESS = 'STORAGE_FETCH_SUCCESS';
export const STORAGE_FETCH_FAIL = 'STORAGE_FETCH_FAIL';

export function fetchStorage() {
  return (dispatch) => {
    dispatch(fetchStorageRequest());

    try {
      browser.storage.sync.get(null, (items) => {
        dispatch(fetchStorageSuccess(items));
      });
    } catch(error) {
      dispatch(fetchStorageFail(error));
    }
  };
}

export function fetchStorageRequest() {
  return {
    type: STORAGE_FETCH_REQUEST,
  };
}

export function fetchStorageSuccess(items) {
  return {
    type: STORAGE_FETCH_SUCCESS,
    items,
  };
}

export function fetchStorageFail(error) {
  return {
    type: STORAGE_FETCH_FAIL,
    error,
  };
}

export const MAX_SUGGESTIONS_CHANGE_REQUEST = 'MAX_SUGGESTIONS_CHANGE_REQUEST';
export const MAX_SUGGESTIONS_CHANGE_SUCCESS = 'MAX_SUGGESTIONS_CHANGE_SUCCESS';
export const MAX_SUGGESTIONS_CHANGE_FAIL = 'MAX_SUGGESTIONS_CHANGE_FAIL';

export function changeMaxSuggestions(value) {
  return (dispatch) => {
    dispatch(changeMaxSuggestionsRequest(value));

    try {
      browser.storage.sync.set({ max_suggestions: value }, () => {
        browser.storage.sync.get('max_suggestions', ({ max_suggestions }) => {
          dispatch(changeMaxSuggestionsSuccess(max_suggestions));
        });
      });
    } catch(error) {
      dispatch(changeMaxSuggestionsFail(error));
    }
  };
}

export function changeMaxSuggestionsRequest(value) {
  return {
    type: MAX_SUGGESTIONS_CHANGE_REQUEST,
    value,
  };
}

export function changeMaxSuggestionsSuccess(value) {
  return {
    type: MAX_SUGGESTIONS_CHANGE_SUCCESS,
    value,
  };
}

export function changeMaxSuggestionsFail(error) {
  return {
    type: MAX_SUGGESTIONS_CHANGE_FAIL,
    error,
  };
}

export const DESCRIPTION_VISIBILITY_CHANGE_REQUEST = 'DESCRIPTION_VISIBILITY_CHANGE_REQUEST';
export const DESCRIPTION_VISIBILITY_CHANGE_SUCCESS = 'DESCRIPTION_VISIBILITY_CHANGE_SUCCESS';
export const DESCRIPTION_VISIBILITY_CHANGE_FAIL = 'DESCRIPTION_VISIBILITY_CHANGE_FAIL';

export function changeDescriptionVisibility(value) {
  return (dispatch) => {
    dispatch(changeDescriptionVisibilityRequest(value));

    try {
      browser.storage.sync.set({ hide_descriptions: value }, () => {
        browser.storage.sync.get('hide_descriptions', ({ hide_descriptions }) => {
          dispatch(changeDescriptionVisibilitySuccess(hide_descriptions));
        });
      });
    } catch(error) {
      dispatch(changeDescriptionVisibilityFail(error));
    }
  };
}

export function changeDescriptionVisibilityRequest(value) {
  return {
    type: DESCRIPTION_VISIBILITY_CHANGE_REQUEST,
    value,
  };
}

export function changeDescriptionVisibilitySuccess(value) {
  return {
    type: DESCRIPTION_VISIBILITY_CHANGE_SUCCESS,
    value,
  };
}

export function changeDescriptionVisibilityFail(error) {
  return {
    type: DESCRIPTION_VISIBILITY_CHANGE_FAIL,
    error,
  };
}

export const OPERATOR_ADD_TO_BLACKLIST_REQUEST = 'OPERATOR_ADD_TO_BLACKLIST_REQUEST';
export const OPERATOR_ADD_TO_BLACKLIST_SUCCESS = 'OPERATOR_ADD_TO_BLACKLIST_SUCCESS';
export const OPERATOR_ADD_TO_BLACKLIST_FAIL = 'OPERATOR_ADD_TO_BLACKLIST_FAIL';

export function addOperatorToBlacklist(id) {
  return (dispatch, getState) => {
    addOperatorToBlacklistRequest(id);

    try {
      const value = getState().getIn(['storage', 'operator_blacklist']).push(id).toJS();

      browser.storage.sync.set({ operator_blacklist: value }, () => {
        browser.storage.sync.get('operator_blacklist', ({ operator_blacklist }) => {
          dispatch(addOperatorToBlacklistSuccess(operator_blacklist));
        });
      });
    } catch(error) {
      dispatch(addOperatorToBlacklistFail(error));
    }
  };
}

export function addOperatorToBlacklistRequest(id) {
  return {
    type: OPERATOR_ADD_TO_BLACKLIST_REQUEST,
    id,
  };
}

export function addOperatorToBlacklistSuccess(operator_blacklist) {
  return {
    type: OPERATOR_ADD_TO_BLACKLIST_SUCCESS,
    operator_blacklist,
  };
}

export function addOperatorToBlacklistFail(error) {
  return {
    type: OPERATOR_ADD_TO_BLACKLIST_FAIL,
    error,
  };
}

export const OPERATOR_REMOVE_FROM_BLACKLIST_REQUEST = 'OPERATOR_REMOVE_FROM_BLACKLIST_REQUEST';
export const OPERATOR_REMOVE_FROM_BLACKLIST_SUCCESS = 'OPERATOR_REMOVE_FROM_BLACKLIST_SUCCESS';
export const OPERATOR_REMOVE_FROM_BLACKLIST_FAIL = 'OPERATOR_REMOVE_FROM_BLACKLIST_FAIL';

export function removeOperatorFromBlacklist(id) {
  return (dispatch, getState) => {
    removeOperatorFromBlacklistRequest(id);

    try {
      const value = getState().getIn(['storage', 'operator_blacklist']).filterNot(value => value === id).toJS();

      browser.storage.sync.set({ operator_blacklist: value }, () => {
        browser.storage.sync.get('operator_blacklist', ({ operator_blacklist }) => {
          dispatch(removeOperatorFromBlacklistSuccess(operator_blacklist));
        });
      });
    } catch(error) {
      dispatch(removeOperatorFromBlacklistFail(error));
    }
  };
}

export function removeOperatorFromBlacklistRequest(id) {
  return {
    type: OPERATOR_REMOVE_FROM_BLACKLIST_REQUEST,
    id,
  };
}

export function removeOperatorFromBlacklistSuccess(operator_blacklist) {
  return {
    type: OPERATOR_REMOVE_FROM_BLACKLIST_SUCCESS,
    operator_blacklist,
  };
}

export function removeOperatorFromBlacklistFail(error) {
  return {
    type: OPERATOR_REMOVE_FROM_BLACKLIST_FAIL,
    error,
  };
}
