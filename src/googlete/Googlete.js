import Fuse from 'fuse.js';
import operators from './operators';

import {
  INPUT_QUERY,
  SUGGESTION_QUERY,
  SUGGESTION_CONTAINER_QUERY,
} from './constants';

export default class Googlete {

  results = [];

  selectedResult = 0;

  constructor () {
    this.inputNode      = document.querySelector(INPUT_QUERY);
    this.suggestionNode = document.querySelector(SUGGESTION_QUERY);

    // Instantiation Fuse with options
    this.fuse = new Fuse(operators, {
      shouldSort: false,
      threshold: 0.0,
      findAllMatches: true,
      minMatchCharLength: 1,
      keys: ['query'],
    });

    // Overwrite Google's event listener
    this.inputNode.addEventListener('input', this.handleInput, true);
    this.inputNode.addEventListener('keydown', this.handleKeyDown, true);
    document.addEventListener('keydown', this.handleKeyDown, true);

    // Create Googlete container element
    // and insert before of default suggestion wrapepr
    const googleteNode = document.createElement('div');
    googleteNode.setAttribute('class', 'googlete');
    googleteNode.setAttribute('dir', 'ltr');
    this.googleteNode = this.suggestionNode.insertBefore(googleteNode, this.suggestionNode.firstChild);
  }

  handleInput = e => {
    const { value } = e.target;

    if ( value === '' ) {
      return;
    }

    // Split search form's value by whitespace
    // and search operators by the last word
    // e.g. "JavaScript site:mozilla.org" to search by "site:mozilla.org"
    const key = value.match(/([^\s\n]+?)$/)[1];
    this.results = this.fuse.search(key);

    this.updateSuggestion();
    this.forceShowSuggestionContainer();
  }

  handleKeyDown = e => {
    if ( this.results.length === 0 ) {
      return;
    }

    switch(e.key) {

    case 'ArrowDown':
      e.preventDefault();
      e.stopImmediatePropagation();
      this.selectedResult = Math.min(this.selectedResult + 1, this.results.length - 1);
      this.updateSuggestion();
      break;

    case 'ArrowUp':
      e.preventDefault();
      e.stopImmediatePropagation();
      this.selectedResult = Math.max(this.selectedResult - 1, 0);
      this.updateSuggestion();
      break;

    case 'Enter':
      e.preventDefault();
      e.stopImmediatePropagation();

      const operator = this.results[this.selectedResult];
      this.inputNode.value = this.inputNode.value.replace(/([^\s\n]+?)$/, operator.query);

      if ( operator.cursorPosition ) {
        const cursorPosition = this.inputNode.value.length - operator.query.length + operator.cursorPosition;
        this.inputNode.setSelectionRange(cursorPosition, cursorPosition);
      }

      if ( operator.insertWhiteSpace ) {
        this.inputNode.value += ' ';
      }

      this.results = [];
      this.selectedResult = 0;
      this.updateSuggestion();
      break;
    }
  }

  updateSuggestion = () => {
    let items = '';

    this.results.forEach((result, i) => {
      items += `
        <li class='googlete-list-item ${ i === this.selectedResult ? 'googlete-list-item--selected' : '' }'>
          <code class='googlete-list-item__query'>
            ${ result.query }
          </code>

          <p class='googlete-list-item__description'>
            ${ result.description }
          </p>
        </li>
      `;
    });

    this.googleteNode.innerHTML = `
      <ul class='googlete-list'>
        ${ items }
      </ul>
    `;
  }

  forceShowSuggestionContainer = () => {
    document.querySelector(SUGGESTION_CONTAINER_QUERY).style.display = 'block';
  }

}
