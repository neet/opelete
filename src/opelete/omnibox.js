import { searchOperators } from './operators';

const baseURL = 'https://google.com/search';

browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  if ( text === '' ) {
    return;
  }

  const keyword = text.match(/([^\s\n]+?)$/)[1];
  const results = searchOperators(keyword);

  addSuggestions(buildSuggestResultsFromOperators(results));
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
  const url = !text.startsWith(baseURL) ? `${baseURL}?q=${text}` : text;

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
