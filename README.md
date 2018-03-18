# Opelete
[![Build](https://travis-ci.org/neetshin/opelete.svg?branch=master)](https://travis-ci.org/neetshin/opelete)
[![Maintainability](https://api.codeclimate.com/v1/badges/3dd51c205d3aa4c00fb9/maintainability)](https://codeclimate.com/github/neetshin/opelete/maintainability)

A browser extension that autocompletes Google's search operators

![Screenshot](https://i.imgur.com/9S90Cxk.png)

## Install to your browser
- Chromium: [Chrome Store](https://chrome.google.com/webstore/detail/lebidiomlfhgnnlpilmijgpooadhbafe)
- Firefox: [Firefox Add-ons](https://addons.mozilla.org/ja/firefox/addon/opelete/)

## Usage
### In Google web
In `www.google.*`, you can start to searh operators just by type the keyword. Type arrow keys to move focused operator and type the enter key to autocomplete the operator.

![Screenshot](https://i.imgur.com/o43L2Ba.png)

### In omnibox
In omnibox (a.k.a. Adress bar), you need to type `op` first. After that, you can use it just like web version.

![omnibox](https://i.imgur.com/SGRt4qH.png)

## Development
Run following command:
```
yarn --pure-lockfile
npm run build:prod
```

Transpired code will be output in `dist` directory.

## License
MIT
