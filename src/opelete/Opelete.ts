import { browser } from 'webextension-polyfill-ts';
import { SUGGESTION_CONTAINER_QUERY } from './constants';
import { Operator, searchOperators } from './operators';

export class Opelete {

  /** Container of root node */
  private opeleteNode: HTMLDivElement|null = null;

  /** Matched suggestions */
  private suggestions: Operator[] = [];

  /** Exclude operator's ids */
  private blacklist: string[] = [];

  /** Index of suggestion which user focused */
  private focusedSuggestionIndex = 0;

  /** Google's input element of search form  */
  private inputNode: HTMLInputElement;

  /** Google's suggesntion element below of search form */
  private suggestionNode: HTMLDivElement;

  /**
   * @param inputNode Node for the input form
   * @param suggestionNode Node for the suggestions container
   */
  constructor (inputNode: HTMLInputElement, suggestionNode: HTMLDivElement) {
    this.inputNode      = inputNode;
    this.suggestionNode = suggestionNode;

    // Overwrite Google's event listener
    this.inputNode.addEventListener('input', this.handleInput, true);
    this.inputNode.addEventListener('keydown', this.handleKeyDown, true);
    document.addEventListener('keydown', this.handleKeyDown, true);

    this.initializeNodes();
  }

  /**
   * Create Opelete container element with preferences in the sync storage
   * and insert before of original suggestion's wrapepr
   * @return Nothing
   */
  private initializeNodes = async (): Promise<void> => {
    if (!this.suggestionNode) {
      return;
    }

    const { hide_descriptions, operator_blacklist } = await browser.storage.sync.get();

    const node = document.createElement('div');
    node.classList.add('opelete');
    node.setAttribute('dir', 'ltr');

    if (hide_descriptions) {
      node.classList.add('opelete--hide-descriptions');
    }

    if (operator_blacklist) {
      this.blacklist = operator_blacklist;
    }

    this.opeleteNode = this.suggestionNode.insertBefore(node, this.suggestionNode.firstChild);
  }

  /**
   * Event listener of the search form
   * @param e Event of the input
   */
  private handleInput = async (e: Event) => {
    const target = e.target as HTMLInputElement;

    if ( target && target.value === '' || /\s$/.test(target.value) ) {
      this.clearSuggestion();
      this.disableForceShowSuggestion();
      return;
    }

    // Split search form's value by whitespace
    // and search operators by the last word
    // e.g. "JavaScript site" to search by "site"
    const [, operator] = target.value.match(/([^\s\n]+?)$/) as string[];

    if ( !operator ) {
      return;
    }

    this.suggestions = await searchOperators(operator);
    this.updateSuggestion();
    this.enableForceShowSuggestion();
  }

  /**
   * Handle the behaviour when user downs keys
   * @param e Keyboard event object
   * @return nothing
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    if ( this.suggestions.length === 0 ) {
      return;
    }

    switch (e.key) {
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

      case 'Escape':
        this.clearSuggestion();
        this.disableForceShowSuggestion();
        break;

      default:
        break;
    }
  }

  /**
   * Handle the behaviour when user selected suggestion
   * @param focusedSuggestion Focused suggestion's Operator object
   * @return nothing
   */
  private handleSelect = (focusedSuggestion: Operator) => {
    if (!this.inputNode) {
      return;
    }

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

  /**
   * Update suggestion with given operators
   * @return Nothing
   */
  private updateSuggestion = (): void => {
    const suggestion = document.createElement('ul');
    suggestion.classList.add('opelete-list');

    this.suggestions.forEach((operator, i) => {
      if ( this.blacklist.indexOf(operator.id) !== -1 ) {
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
      listItem.appendChild(operatorNode);

      const descriptionNode = document.createElement('p');
      descriptionNode.classList.add('opelete-list-item__description');
      descriptionNode.textContent = operator.description;
      listItem.appendChild(descriptionNode);

      // Add item to list wrapper and add click event listener
      const appendedItem = suggestion.appendChild(listItem);

      appendedItem.addEventListener('click', () => {
        this.handleSelect(operator);
      });
    });

    // Remove inner element
    if ( this.opeleteNode && this.opeleteNode.firstChild ) {
      this.opeleteNode.removeChild(this.opeleteNode.firstChild);
    }

    // Add suggestion
    if ( this.opeleteNode ) {
      this.opeleteNode.appendChild(suggestion);
    }
  }

  /**
   * Clear suggestions
   * @return Nothing
   */
  private clearSuggestion = (): void => {
    this.suggestions = [];
    this.focusedSuggestionIndex = 0;
    this.updateSuggestion();
  }

  /**
   * Force hide search form's suggestion node
   * @return Nothing
   */
  private enableForceShowSuggestion = (): void => {
    if (!this.suggestionNode) {
      return;
    }

    this.suggestionNode.classList.add('opelete-force-show');

    const suggestionContainer = document.querySelector(SUGGESTION_CONTAINER_QUERY);

    if (suggestionContainer) {
      suggestionContainer.classList.add('opelete-force-show');
    }
  }

  /**
   * Force hide search form's suggestion node
   * @return Nothing
   */
  private disableForceShowSuggestion = (): void => {
    if (!this.suggestionNode) {
      return;
    }

    this.suggestionNode.classList.add('opelete-force-show');

    const suggestionContainer = document.querySelector(SUGGESTION_CONTAINER_QUERY);

    if (suggestionContainer) {
      suggestionContainer.classList.remove('opelete-force-show');
    }
  }

}
