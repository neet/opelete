import { searchOperators } from './operators';
import {
  INPUT_QUERY,
  SUGGESTION_QUERY,
  SUGGESTION_CONTAINER_QUERY,
} from './constants';

export default class Opelete {

  results = [];

  focusedResultIndex = 0;

  constructor () {
    this.inputNode      = document.querySelector(INPUT_QUERY);
    this.suggestionNode = document.querySelector(SUGGESTION_QUERY);

    // Overwrite Google's event listener!
    this.inputNode.addEventListener('input', this.handleInput, true);
    this.inputNode.addEventListener('keydown', this.handleKeyDown, true);
    document.addEventListener('keydown', this.handleKeyDown, true);

    // Create Opelete container element
    // and insert before of original suggestion's wrapepr
    const node = document.createElement('div');
    node.setAttribute('class', 'opelete');
    node.setAttribute('dir', 'ltr');
    this.opeleteNode = this.suggestionNode.insertBefore(node, this.suggestionNode.firstChild);
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
    const keyword = value.match(/([^\s\n]+?)$/)[1];
    this.results  = searchOperators(keyword);

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
      this.focusedResultIndex = Math.min(this.focusedResultIndex + 1, this.results.length - 1);
      this.updateSuggestion();
      break;

    case 'ArrowUp':
      e.preventDefault();
      e.stopImmediatePropagation();
      this.focusedResultIndex = Math.max(this.focusedResultIndex - 1, 0);
      this.updateSuggestion();
      break;

    case 'Enter':
      e.preventDefault();
      e.stopImmediatePropagation();

      const focusedResult = this.results[this.focusedResultIndex];
      this.inputNode.value = this.inputNode.value.replace(/([^\s\n]+?)$/, focusedResult.operator);

      if ( focusedResult.cursorPosition ) {
        const cursorPosition = this.inputNode.value.length - focusedResult.operator.length + focusedResult.cursorPosition;
        this.inputNode.setSelectionRange(cursorPosition, cursorPosition);
      }

      if ( focusedResult.insertWhiteSpace ) {
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
      listItem.classList.add('opelete-list-item');

      if ( i === this.focusedResultIndex ) {
        listItem.classList.add('opelete-list-item--selected');
      }

      const operator = document.createElement('code');
      operator.classList.add('opelete-list-item__query');
      operator.textContent = result.operator;

      const description = document.createElement('p');
      description.classList.add('opelete-list-item__description');
      description.textContent = result.description;

      listItem.appendChild(operator);
      listItem.appendChild(description);

      return listItem;
    });

    const list = document.createElement('ul');
    list.classList.add('opelete-list');
    listItems.forEach(item => {
      list.appendChild(item);
    });

    if ( this.opeleteNode.firstChild ) {
      this.opeleteNode.removeChild(this.opeleteNode.firstChild);
    }

    this.opeleteNode.appendChild(list);
  }

  clearSuggestion = () => {
    this.results = [];
    this.focusedResultIndex = 0;
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
