import { browser } from './browser';
import { searchOperators } from './operators';

browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  if ( text === '' ) {
    return;
  }

  const keyword = text.match(/([^\s\n]+?)$/)[1];

  searchOperators(keyword).then(items => {
    addSuggestions(items.map(operator => ({
      content: operator.operator,
      description: operator.description,
    })));
  });
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
  const baseURL = 'https://google.com/search';
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
