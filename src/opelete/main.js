import ready from './ready';
import Opelete from './Opelete';
import { INPUT_QUERY, SUGGESTION_QUERY } from './constants';

function main () {
  ready(() => {
    const mo = new MutationObserver((_, self) => {
      const inputNode      = document.querySelector(INPUT_QUERY);
      const suggestionNode = document.querySelector(SUGGESTION_QUERY);

      if ( inputNode && suggestionNode ) {
        self.disconnect();
        new Opelete();
      }
    });

    mo.observe(document.body, { childList: true });
  });
}

main();
