import { INPUT_QUERY, SUGGESTION_QUERY } from './constants';
import { Opelete } from './Opelete';

((): void => {
  const { pathname } = window.location;

  if (pathname !== '/' && pathname !== '/search') {
    return;
  }

  const mo = new MutationObserver((_, self) => {
    const inputNode      = document.querySelector(INPUT_QUERY) as HTMLInputElement;
    const suggestionNode = document.querySelector(SUGGESTION_QUERY) as HTMLDivElement;

    if ( inputNode && suggestionNode ) {
      self.disconnect();

      /* tslint:disable no-unused-expression */
      new Opelete(inputNode, suggestionNode);
      /* tslint:enable no-unused-expression */
    }
  });

  mo.observe(document.body, { childList: true });
})();
