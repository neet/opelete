export default [
  {
    query:       '""',
    description: 'Search for an exact match',
    cursorPosition: 1,
  },

  {
    query:       '-""',
    description: '',
    cursorPosition: 2,
  },

  {
    query:       '" * "',
    description: 'Search for wildcards or unknown words',
    cursorPosition: 1,
  },

  {
    query:       '...',
    description: 'Search within a range of numbers',
  },

  {
    query:       'OR',
    description: 'Combine searches',
    insertWhiteSpace: true,
  },

  {
    query:       'AROUND()',
    description: '',
    cursorPosition: 7,
  },

  {
    query:       '( OR )',
    description: 'Combine searches',
    cursorPosition: 1,
  },

  {
    query:       'site:',
    description: 'Search for a specific site',
  },

  {
    query:       '-site:',
    description: 'Exclude specific site from your search',
  },

  {
    query:       'related:',
    description: 'Search for related sites',
  },

  {
    query:       'info:',
    description: 'Get details about a site',
  },

  {
    query:       'cache:',
    description: 'See Google’s cached version of a site',
  },

  {
    query:       'link:',
    description: '',
  },

  {
    query:       '-link:',
    description: '',
  },

  {
    query:       'linkdomain:',
    description: '',
  },

  {
    query:       '-linkdomain:',
    description: '',
  },

  {
    query:       'filetype:',
    description: 'Search for a specific file extension',
  },

  {
    query:       'intitle:',
    description: 'Search for a specific title',
  },

  {
    query:       'allintitle:',
    description: 'Search for a specific title',
  },

  {
    query:       'inurl:',
    description: 'Search for a specific URL',
  },

  {
    query:       'allinurl:',
    description: 'Search for a specific URL',
  },

  {
    query:       'intext:',
    description: 'Search for a specific text',
  },

  {
    query:       'allintext:',
    description: 'Search for a specific text',
  },

  {
    query:       'inanchor:',
    description: 'Search for a specific text',
  },

  {
    query:       'allinanchor:',
    description: 'Search for a specific text',
  },

  {
    query:       'inpostauthor:',
    description: 'Search for a specific text',
  },

  {
    query:       'allinpostauthor:',
    description: 'Search for a specific text',
  },

  {
    query:       'weather:',
    description: 'Search for a specific text',
  },

  {
    query:       'loc:',
    description: 'Search for a specific text',
  },

  {
    query:       'location:',
    description: 'Search for a specific text',
  },

  {
    quert:       'map:',
    description: '',
  },

  {
    query:       'define:',
    description: 'Search for a specific text',
  },

  {
    query:       'daterange:-',
    description: 'Search for a specific text',
    cursorPosition: 10,
  },

  {
    query:       'source:',
    description: 'Search for a specific text',
  },

  {
    query:       'movie:',
    description: 'Search for a specific text',
  },

  {
    query:       'phonebook:',
    description: 'Search for a specific text',
  },

  {
    query:       'stock:',
    description: 'Search for a specific text',
  },

  {
    query:       '@twitter',
    description: 'Search Twitter',
    insertWhiteSpace: true,
  },

  {
    query:       '@facebook',
    description: 'Search Facebook',
    insertWhiteSpace: true,
  },
];
