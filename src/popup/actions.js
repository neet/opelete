import { browser } from '../opelete/browser';

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
        dispatch(changeMaxSuggestionsSuccess(value));
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
        dispatch(changeDescriptionVisibilitySuccess(value));
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

// export const OPERATOR_UPDATE_VISIBILITY_REQUEST = 'OPERATOR_UPDATE_VISIBILITY_REQUEST';
// export const OPERATOR_UPDATE_VISIBILITY_SUCCESS = 'OPERATOR_UPDATE_VISIBILITY_SUCCESS';
// export const OPERATOR_UPDATE_VISIBILITY_FAIL = 'OPERATOR_UPDATE_VISIBILITY_FAIL';

// export function updateOperatorVisibility(id, isHidden) {
//   return (dispatch) => {
//     updateOperatorVisibilityRequest(id, isHidden);

//     browser.storage.sync.set();
//   };
// }

// export function updateOperatorVisibilityRequest(id, isHidden) {
//   return {
//     type: OPERATOR_UPDATE_VISIBILITY_REQUEST,
//     id,
//     isHidden,
//   };
// }

// export function updateOperatorVisibilitySuccess(id, isHidden) {
//   return {
//     type: OPERATOR_UPDATE_VISIBILITY_SUCCESS,
//     id,
//     isHidden,
//   };
// }

// export function updateOperatorVisibilityFail(error) {
//   return {
//     type: OPERATOR_UPDATE_VISIBILITY_FAIL,
//     error,
//   };
// }
