export default [
  {
    operator: '""',
    description: browser.i18n.getMessage('googleOperators_exact'),
    cursorPosition: 1,
  },

  {
    operator: '-""',
    description: browser.i18n.getMessage('googleOperators_exclude'),
    cursorPosition: 2,
  },

  {
    operator: '" * "',
    description: browser.i18n.getMessage('googleOperators_wildcard'),
    cursorPosition: 1,
  },

  {
    operator: '...',
    description: browser.i18n.getMessage('googleOperators_rangeOfNumbers'),
    cursorPosition: 0,
  },

  {
    operator: 'OR',
    description: browser.i18n.getMessage('googleOperators_or'),
    insertWhiteSpace: true,
  },

  {
    operator: 'group:',
    description: browser.i18n.getMessage('googleOperators_group'),
  },

  {
    operator: 'AROUND()',
    description: browser.i18n.getMessage('googleOperators_around'),
    cursorPosition: 7,
  },

  {
    operator: 'site:',
    description: browser.i18n.getMessage('googleOperators_site'),
  },

  {
    operator: '-site:',
    description: browser.i18n.getMessage('googleOperators_site'),
  },

  {
    operator: 'related:',
    description: browser.i18n.getMessage('googleOperators_related'),
  },

  {
    operator: 'info:',
    description: browser.i18n.getMessage('googleOperators_info'),
  },

  {
    operator: 'id:',
    description: browser.i18n.getMessage('googleOperators_info'),
  },

  {
    operator: 'cache:',
    description: browser.i18n.getMessage('googleOperators_cache'),
  },

  {
    operator: 'link:',
    description: browser.i18n.getMessage('googleOperators_link'),
  },

  {
    operator: 'filetype:',
    description: browser.i18n.getMessage('googleOperators_filetype'),
  },

  {
    operator: 'ext:',
    description: browser.i18n.getMessage('googleOperators_filetype'),
  },

  {
    operator: 'intitle:',
    description: browser.i18n.getMessage('googleOperators_intitle'),
  },

  {
    operator: 'insubject:',
    description: browser.i18n.getMessage('googleOperators_intitle'),
  },

  {
    operator: 'allintitle:',
    description: browser.i18n.getMessage('googleOperators_allintitle'),
  },

  {
    operator: 'inurl:',
    description: browser.i18n.getMessage('googleOperators_inurl'),
  },

  {
    operator: 'allinurl:',
    description: browser.i18n.getMessage('googleOperators_allinurl'),
  },

  {
    operator: 'intext:',
    description: browser.i18n.getMessage('googleOperators_intext'),
  },

  {
    operator: 'allintext:',
    description: browser.i18n.getMessage('googleOperators_allintext'),
  },

  {
    operator: 'inanchor:',
    description: browser.i18n.getMessage('googleOperators_inanchor'),
  },

  {
    operator: 'allinanchor:',
    description: browser.i18n.getMessage('googleOperators_allinanchor'),
  },

  {
    operator: 'author:',
    description: browser.i18n.getMessage('googleOperators_author'),
  },

  {
    operator: 'weather:',
    description: browser.i18n.getMessage('googleOperators_weather'),
  },

  {
    operator: 'location:',
    description: browser.i18n.getMessage('googleOperators_location'),
  },

  {
    operator: 'define:',
    description: browser.i18n.getMessage('googleOperators_define'),
  },

  {
    operator: 'source:',
    description: browser.i18n.getMessage('googleOperators_source'),
  },

  {
    operator: 'movie:',
    description: browser.i18n.getMessage('googleOperators_movie'),
  },

  {
    operator: '@twitter',
    description: browser.i18n.getMessage('googleOperators_@twitter'),
    insertWhiteSpace: true,
  },

  {
    operator: '@facebook',
    description: browser.i18n.getMessage('googleOperators_@facebook'),
    insertWhiteSpace: true,
  },
];
