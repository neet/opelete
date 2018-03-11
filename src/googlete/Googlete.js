import Fuse from 'fuse.js';
import autocompleteList from './autocomplete_list';
import { INPUT_QUERY, SUGGESTION_LIST_QUERY } from './constants';

export default class Googlete {

  constructor () {
    setTimeout(() => {
      this.input = document.querySelector(INPUT_QUERY);

      if ( this.input !== null ) {
        this.input.onkeydown = this.handleChange;

        const googleteNode = document.createElement('div');
        googleteNode.setAttribute('class', 'googlete');
        googleteNode.setAttribute('dir', 'ltr');

        this.suggestionContainer = document.querySelector(SUGGESTION_LIST_QUERY);
        this.googleteNode = this.suggestionContainer.insertBefore(googleteNode, this.suggestionContainer.firstElementChild);
      }
    }, 200);
  }

  handleChange = e => {
    if ( e.target.value === '' ) {
      return;
    }

    const key = e.target.value.split(' ').pop();
    const autocompletes = this.searchAutocompletes(key);

    if ( autocompletes.length !== 0 ) {
      const HTMLstring = this.buildAutocompleteElement(autocompletes);
      this.setAsSuggestion(HTMLstring);
      this.showSuggestion();
    }
  }

  searchAutocompletes = value => {
    const options = {
      shouldSort: false,
      threshold: 0.1,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['query'],
    };

    var fuse = new Fuse(autocompleteList, options);

    return fuse.search(value);
  }

  buildAutocompleteElement = autocompletes => {
    let items = '';

    autocompletes.forEach(autocomplete => {
      items += `
        <li class='googlete-list-item'>
          <code class='googlete-list-item__query'>
            <i class='far fa-keyboard' aria-hidden='true'></i>
            ${ autocomplete.query }
          </code>

          <p class='googlete-list-item__description'>
            ${ autocomplete.description }
          </p>
        </li>
      `;
    });

    return `
      <ul class='googlete-list'>
        ${ items }
      </ul>
    `;
  }

  setAsSuggestion = HTMLstring => {
    this.googleteNode.innerHTML = HTMLstring;
  }

  showSuggestion = () => {
    this.suggestionContainer.style.display = 'block';
  }

}
