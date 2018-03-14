import Fuse from 'fuse.js';
import operators from './operators';

const baseURL = 'https://google.com/search';

const fuse = new Fuse(operators, {
  findAllMatches: true,
  threshold: 0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['operator'],
});

browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  if ( text === '' ) {
    return;
  }

  const key = text.match(/([^\s\n]+?)$/)[1];
  const results = fuse.search(key);

  addSuggestions(buildSuggestResultsFromOperators(results));
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
  let url = text;

  if (!text.startsWith(baseURL)) {
    url = `${baseURL}?q=${text}`;
  }

  switch (disposition) {
  case 'currentTab':
    browser.tabs.update({ url });
    break;
  case 'newForegroundTab':
    browser.tabs.create({ url });
    break;
  case 'newBackgroundTab':
    browser.tabs.create({ url, active: false });
    break;
  }
});

function buildSuggestResultsFromOperators(operators) {
  return operators.map(operator => ({
    content: operator.operator,
    description: operator.description,
  }));
}
