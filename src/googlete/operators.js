export default [
  {
    operator:    '""',
    description: 'Search for an exact match',
    cursorPosition: 1,
  },

  {
    operator:    '-""',
    description: 'Exclude specific word from your search',
    cursorPosition: 2,
  },

  {
    operator:    '" * "',
    description: 'Search for wildcards or unknown words',
    cursorPosition: 1,
  },

  {
    operator:    '...',
    description: 'Search within a range of numbers',
    cursorPosition: 0,
  },

  {
    operator:    'OR',
    description: 'Combine searches',
    insertWhiteSpace: true,
  },

  {
    operator:    'group:',
    description: 'Search Google Groups',
  },

  {
    operator:    'AROUND()',
    description: 'Search for where the two phrases are within n words of each other',
    cursorPosition: 7,
  },

  {
    operator:    'site:',
    description: 'Search for a specific site',
  },

  {
    operator:    '-site:',
    description: 'Exclude specific site from your search',
  },

  {
    operator:    'related:',
    description: 'Search for related sites of the URL',
  },

  {
    operator:    'info:',
    description: 'Get details about a site',
  },

  {
    operator:    'id:',
    description: 'Get details about a site',
  },

  {
    operator:    'cache:',
    description: 'See Google’s cached version of a site',
  },

  {
    operator:    'link:',
    description: 'Search for pages that point to that URL',
  },

  {
    operator:    'filetype:',
    description: 'Search for a specific file extension',
  },

  {
    operator:    'ext:',
    description: 'Search for a specific file extension',
  },

  {
    operator:    'intitle:',
    description: 'Search for pages contains the term in the title',
  },

  {
    operator:    'insubject:',
    description: 'Search for pages contains the term in the title',
  },

  {
    operator:    'allintitle:',
    description: 'Search for pages contains all the terms in the title',
  },

  {
    operator:    'inurl:',
    description: 'Search for pages contains the term in the URL',
  },

  {
    operator:    'allinurl:',
    description: 'Search for pages contains all the terms in the URL',
  },

  {
    operator:    'intext:',
    description: 'Search for pages contains the term in the text',
  },

  {
    operator:    'allintext:',
    description: 'Search for pages contains all the terms in the text',
  },

  {
    operator:    'inanchor:',
    description: 'Search for pages contains the term in the anchor',
  },

  {
    operator:    'allinanchor:',
    description: 'Search for pages contains all the terms in the anchor',
  },

  {
    operator:    'author:',
    description: 'Search for pages contains term in the author',
  },

  {
    operator:    'weather:',
    description: 'Show weather forecast of the place',
  },

  {
    operator:    'location:',
    description: 'Search for articles from the location',
  },

  {
    operator:    'define:',
    description: 'Search for definition of the word',
  },

  {
    operator:    'source:',
    description: 'Search for articles from the news source',
  },

  {
    operator:    'movie:',
    description: 'Get information about the movie',
  },

  {
    operator:    '@twitter',
    description: 'Search Twitter',
    insertWhiteSpace: true,
  },

  {
    operator:    '@facebook',
    description: 'Search Facebook',
    insertWhiteSpace: true,
  },
];
