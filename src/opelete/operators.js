import { browser } from './browser';
import Fuse from 'fuse.js';

export const operators = [
  {
    id: 'or',
    operator: 'OR',
    description: browser.i18n.getMessage('googleOperators_or'),
    insertWhiteSpace: true,
  },

  {
    id: 'around',
    operator: 'AROUND()',
    description: browser.i18n.getMessage('googleOperators_around'),
    cursorPosition: 7,
  },

  {
    id: 'group',
    operator: 'group:',
    description: browser.i18n.getMessage('googleOperators_group'),
  },

  {
    id: 'site',
    operator: 'site:',
    description: browser.i18n.getMessage('googleOperators_site'),
  },

  {
    id: 'exclude_site',
    operator: '-site:',
    description: browser.i18n.getMessage('googleOperators_excludeSite'),
  },

  {
    id: 'related',
    operator: 'related:',
    description: browser.i18n.getMessage('googleOperators_related'),
  },

  {
    id: 'info',
    operator: 'info:',
    description: browser.i18n.getMessage('googleOperators_info'),
  },

  {
    id: 'id',
    operator: 'id:',
    description: browser.i18n.getMessage('googleOperators_info'),
  },

  {
    id: 'cache',
    operator: 'cache:',
    description: browser.i18n.getMessage('googleOperators_cache'),
  },

  {
    id: 'link',
    operator: 'link:',
    description: browser.i18n.getMessage('googleOperators_link'),
  },

  {
    id: 'filetype',
    operator: 'filetype:',
    description: browser.i18n.getMessage('googleOperators_filetype'),
  },

  {
    id: 'ext',
    operator: 'ext:',
    description: browser.i18n.getMessage('googleOperators_filetype'),
  },

  {
    id: 'intitle',
    operator: 'intitle:',
    description: browser.i18n.getMessage('googleOperators_intitle'),
  },

  {
    id: 'insubject',
    operator: 'insubject:',
    description: browser.i18n.getMessage('googleOperators_intitle'),
  },

  {
    id: 'allintitle',
    operator: 'allintitle:',
    description: browser.i18n.getMessage('googleOperators_allintitle'),
  },

  {
    id: 'inurl',
    operator: 'inurl:',
    description: browser.i18n.getMessage('googleOperators_inurl'),
  },

  {
    id: 'allinurl',
    operator: 'allinurl:',
    description: browser.i18n.getMessage('googleOperators_allinurl'),
  },

  {
    id: 'intext',
    operator: 'intext:',
    description: browser.i18n.getMessage('googleOperators_intext'),
  },

  {
    id: 'allintext',
    operator: 'allintext:',
    description: browser.i18n.getMessage('googleOperators_allintext'),
  },

  {
    id: 'inanchor',
    operator: 'inanchor:',
    description: browser.i18n.getMessage('googleOperators_inanchor'),
  },

  {
    id: 'allinanchor',
    operator: 'allinanchor:',
    description: browser.i18n.getMessage('googleOperators_allinanchor'),
  },

  {
    id: 'author',
    operator: 'author:',
    description: browser.i18n.getMessage('googleOperators_author'),
  },

  {
    id: 'weather',
    operator: 'weather:',
    description: browser.i18n.getMessage('googleOperators_weather'),
  },

  {
    id: 'location',
    operator: 'location:',
    description: browser.i18n.getMessage('googleOperators_location'),
  },

  {
    id: 'define',
    operator: 'define:',
    description: browser.i18n.getMessage('googleOperators_define'),
  },

  {
    id: 'source',
    operator: 'source:',
    description: browser.i18n.getMessage('googleOperators_source'),
  },

  {
    id: 'movie',
    operator: 'movie:',
    description: browser.i18n.getMessage('googleOperators_movie'),
  },

  {
    id: 'twitter',
    operator: '@twitter',
    description: browser.i18n.getMessage('googleOperators_twitter'),
    insertWhiteSpace: true,
  },

  {
    id: 'facebook',
    operator: '@facebook',
    description: browser.i18n.getMessage('googleOperators_facebook'),
    insertWhiteSpace: true,
  },

  {
    id: 'exact',
    operator: '""',
    description: browser.i18n.getMessage('googleOperators_exact'),
    cursorPosition: 1,
  },

  {
    id: 'exclude',
    operator: '-""',
    description: browser.i18n.getMessage('googleOperators_exclude'),
    cursorPosition: 2,
  },

  {
    id: 'wildcard',
    operator: '" * "',
    description: browser.i18n.getMessage('googleOperators_wildcard'),
    cursorPosition: 1,
  },

  {
    id: 'range_of_numbers',
    operator: '...',
    description: browser.i18n.getMessage('googleOperators_rangeOfNumbers'),
    cursorPosition: 0,
  },
];

export function searchOperators(keyword) {
  const fuse = new Fuse(operators, {
    threshold: 0,
    location: 0,
    distance: 100,
    findAllMatches: true,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['operator'],
  });

  return new Promise((resolve) => {
    browser.storage.sync.get('max_suggestions', items => {
      const { max_suggestions } = items;
      const result = fuse.search(keyword);

      if ( max_suggestions > 0 ) {
        resolve(result.slice(0, max_suggestions));
      }

      resolve(result);
    });
  });
}
