import { searchOperators } from './operators';
import { browser } from './browser';
import {
  INPUT_QUERY,
  SUGGESTION_QUERY,
  SUGGESTION_CONTAINER_QUERY,
} from './constants';

export default class Opelete {

  suggestions = [];

  blacklist = [];

  focusedSuggestionIndex = 0;

  constructor () {
    this.inputNode      = document.querySelector(INPUT_QUERY);
    this.suggestionNode = document.querySelector(SUGGESTION_QUERY);

    // Overwrite Google's event listener!
    this.inputNode.addEventListener('input', this.handleInput, true);
    this.inputNode.addEventListener('keydown', this.handleKeyDown, true);
    document.addEventListener('keydown', this.handleKeyDown, true);

    // Create Opelete container element with preferences in the sync storage
    // and insert before of original suggestion's wrapepr
    browser.storage.sync.get([
      'hide_descriptions',
      'operator_blacklist',
    ], items => {
      const { hide_descriptions, operator_blacklist } = items;

      const node = document.createElement('div');
      node.classList.add('opelete');
      node.setAttribute('dir', 'ltr');

      if ( hide_descriptions ) {
        node.classList.add('opelete--hide-descriptions');
      }

      this.blacklist = operator_blacklist;
      this.opeleteNode = this.suggestionNode.insertBefore(node, this.suggestionNode.firstChild);
    });
  }

  handleInput = e => {
    if ( e.target.value === '' ) {
      this.clearSuggestion();
      this.disableForceShowSuggestion();
      return;
    }

    // Split search form's value by whitespace
    // and search operators by the last word
    // e.g. "JavaScript site" to search by "site"
    const keyword = e.target.value.match(/([^\s\n]+?)$/)[1];

    searchOperators(keyword).then(suggestions => {
      this.suggestions = suggestions;
      this.updateSuggestion();
      this.enableForceShowSuggestion();
    });
  }

  handleKeyDown = e => {
    if ( this.suggestions.length === 0 ) {
      return;
    }

    switch(e.key) {

    case 'ArrowDown':
      e.preventDefault();
      e.stopImmediatePropagation();
      this.focusedSuggestionIndex = Math.min(this.focusedSuggestionIndex + 1, this.suggestions.length - 1);
      this.updateSuggestion();
      break;

    case 'ArrowUp':
      e.preventDefault();
      e.stopImmediatePropagation();
      this.focusedSuggestionIndex = Math.max(this.focusedSuggestionIndex - 1, 0);
      this.updateSuggestion();
      break;

    case 'Enter':
      e.preventDefault();
      e.stopImmediatePropagation();
      const focusedSuggestion = this.suggestions[this.focusedSuggestionIndex];
      this.handleSelect(focusedSuggestion);
      break;
    }
  }

  handleSelect = focusedSuggestion => {
    this.inputNode.value = this.inputNode.value.replace(/([^\s\n]+?)$/, focusedSuggestion.operator);

    if ( focusedSuggestion.cursorPosition ) {
      const cursorPosition = this.inputNode.value.length - focusedSuggestion.operator.length + focusedSuggestion.cursorPosition;
      this.inputNode.setSelectionRange(cursorPosition, cursorPosition);
    }

    if ( focusedSuggestion.insertWhiteSpace ) {
      this.inputNode.value += ' ';
    }

    this.clearSuggestion();
    this.disableForceShowSuggestion();
  }

  updateSuggestion = () => {
    const suggestion = document.createElement('ul');
    suggestion.classList.add('opelete-list');

    this.suggestions.forEach((operator, i) => {
      if ( this.blacklist.includes(operator.id) ) {
        return;
      }

      const listItem = document.createElement('li');
      listItem.classList.add('opelete-list-item');

      // If result selected, add --focused class
      if ( i === this.focusedSuggestionIndex ) {
        listItem.classList.add('opelete-list-item--focused');
      }

      const operatorNode = document.createElement('code');
      operatorNode.classList.add('opelete-list-item__operator');
      operatorNode.textContent = operator.operator;

      const descriptionNode = document.createElement('p');
      descriptionNode.classList.add('opelete-list-item__description');
      descriptionNode.textContent = operator.description;

      listItem.appendChild(operatorNode);
      listItem.appendChild(descriptionNode);

      // Add item to list wrapper and add click event listener
      const appendedItem = suggestion.appendChild(listItem);
      appendedItem.addEventListener('click', () => {
        this.handleSelect(operator);
      });
    });

    // Remove inner element
    if ( this.opeleteNode.firstChild ) {
      this.opeleteNode.removeChild(this.opeleteNode.firstChild);
    }

    // Add suggestion
    if ( this.opeleteNode ) {
      this.opeleteNode.appendChild(suggestion);
    }
  }

  clearSuggestion = () => {
    this.suggestions = [];
    this.focusedSuggestionIndex = 0;
    this.updateSuggestion();
  }

  enableForceShowSuggestion = () => {
    this.suggestionNode.classList.add('opelete-force-show');
    document.querySelector(SUGGESTION_CONTAINER_QUERY).classList.add('opelete-force-show');
  }

  disableForceShowSuggestion = () => {
    this.suggestionNode.classList.remove('opelete-force-show');
    document.querySelector(SUGGESTION_CONTAINER_QUERY).classList.remove('opelete-force-show');
  }

}
