import { browser } from 'webextension-polyfill-ts';
import { searchOperators } from './operators';

browser.omnibox.onInputChanged.addListener(async (text, addSuggestions) => {
  if ( text === '' ) {
    return;
  }

  const keyword = (text.match(/([^\s\n]+?)$/) as string[])[1];
  const items   = await searchOperators(keyword);

  addSuggestions(items.map(({operator, description}) => ({
    content: operator,
    description,
  })));
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
  const baseURL     = 'https://google.com/search';
  const replacedURL = !text.startsWith(baseURL) ? `${baseURL}?q=${text}` : text;

  switch (disposition) {
    case 'currentTab':
      browser.tabs.update({ url: replacedURL });
      break;

    case 'newForegroundTab':
      browser.tabs.create({ url: replacedURL });
      break;

    case 'newBackgroundTab':
      browser.tabs.create({ url: replacedURL, active: false });
      break;

    default:
      break;
  }
});
