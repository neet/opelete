export default [
  {
    query:       '""',
    description: 'Search for an exact match',
    cursorPosition: 1,
  },

  {
    query:       '" * "',
    description: 'Search for wildcards or unknown words',
    cursorPosition: 1,
  },

  {
    query:       '$...$',
    description: 'Search within a range of numbers',
    cursorPosition: 1,
  },

  {
    query:       'OR',
    description: 'Combine searches',
    insertWhiteSpace: true,
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
