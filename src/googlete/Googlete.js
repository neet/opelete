import Fuse from 'fuse.js';
import operators from './operators';
import {
  INPUT_QUERY,
  SUGGESTION_QUERY,
  SUGGESTION_CONTAINER_QUERY,
} from './constants';

export default class Googlete {

  results = [];

  selectedResultIndex = 0;

  constructor () {
    this.inputNode      = document.querySelector(INPUT_QUERY);
    this.suggestionNode = document.querySelector(SUGGESTION_QUERY);

    // Instantiation Fuse with options
    this.fuse = new Fuse(operators, {
      findAllMatches: true,
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['operator'],
    });

    // Overwrite Google's event listener
    this.inputNode.addEventListener('input', this.handleInput, true);
    this.inputNode.addEventListener('keydown', this.handleKeyDown, true);
    document.addEventListener('keydown', this.handleKeyDown, true);

    // Create Googlete container element
    // and insert before of original suggestion's wrapepr
    const node = document.createElement('div');
    node.setAttribute('class', 'googlete');
    node.setAttribute('dir', 'ltr');
    this.googleteNode = this.suggestionNode.insertBefore(node, this.suggestionNode.firstChild);
  }

  handleInput = e => {
    const { value } = e.target;

    if ( value === '' ) {
      this.clearSuggestion();
      this.disableForceShowSuggestion();
      return;
    }

    // Split search form's value by whitespace
    // and search operators by the last word
    // e.g. "JavaScript site" to search by "site"
    const key = value.match(/([^\s\n]+?)$/)[1];
    this.results = this.fuse.search(key);

    this.updateSuggestion();
    this.enableForceShowSuggestion();
  }

  handleKeyDown = e => {
    if ( this.results.length === 0 ) {
      return;
    }

    switch(e.key) {

    case 'ArrowDown':
      e.preventDefault();
      e.stopImmediatePropagation();
      this.selectedResultIndex = Math.min(this.selectedResultIndex + 1, this.results.length - 1);
      this.updateSuggestion();
      break;

    case 'ArrowUp':
      e.preventDefault();
      e.stopImmediatePropagation();
      this.selectedResultIndex = Math.max(this.selectedResultIndex - 1, 0);
      this.updateSuggestion();
      break;

    case 'Enter':
      e.preventDefault();
      e.stopImmediatePropagation();

      const selectedResult = this.results[this.selectedResultIndex];
      this.inputNode.value = this.inputNode.value.replace(/([^\s\n]+?)$/, selectedResult.operator);

      if ( selectedResult.cursorPosition ) {
        const cursorPosition = this.inputNode.value.length - selectedResult.operator.length + selectedResult.cursorPosition;
        this.inputNode.setSelectionRange(cursorPosition, cursorPosition);
      }

      if ( selectedResult.insertWhiteSpace ) {
        this.inputNode.value += ' ';
      }

      this.clearSuggestion();
      this.disableForceShowSuggestion();
      break;
    }
  }

  updateSuggestion = () => {
    const listItems = this.results.map((result, i) => {
      const listItem = document.createElement('li');
      listItem.classList.add('googlete-list-item');

      if ( i === this.selectedResultIndex ) {
        listItem.classList.add('googlete-list-item--selected');
      }

      const operator = document.createElement('code');
      operator.classList.add('googlete-list-item__query');
      operator.textContent = result.operator;

      const description = document.createElement('p');
      description.classList.add('googlete-list-item__description');
      description.textContent = result.textContent;

      listItem.appendChild(operator);
      listItem.appendChild(description);

      return listItem;
    });

    const list = document.createElement('ul');
    list.classList.add('googlete-list');
    listItems.forEach(item => {
      list.appendChild(item);
    });

    if ( this.googleteNode.firstChild ) {
      this.googleteNode.removeChild(this.googleteNode.firstChild);
    }

    this.googleteNode.appendChild(list);
  }

  clearSuggestion = () => {
    this.results = [];
    this.selectedResultIndex = 0;
    this.updateSuggestion();
  }

  enableForceShowSuggestion = () => {
    this.suggestionNode.classList.add('googlete-force-show');
    document.querySelector(SUGGESTION_CONTAINER_QUERY).classList.add('googlete-force-show');
  }

  disableForceShowSuggestion = () => {
    this.suggestionNode.classList.remove('googlete-force-show');
    document.querySelector(SUGGESTION_CONTAINER_QUERY).classList.remove('googlete-force-show');
  }

}
