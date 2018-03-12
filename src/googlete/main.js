import ready from './ready';
import Googlete from './Googlete';
import { INPUT_QUERY, SUGGESTION_QUERY } from './constants';

function main () {
  ready(() => {
    const mo = new MutationObserver((_, self) => {
      const inputNode      = document.querySelector(INPUT_QUERY);
      const suggestionNode = document.querySelector(SUGGESTION_QUERY);

      if ( inputNode && suggestionNode ) {
        self.disconnect();
        new Googlete();
      }
    });

    mo.observe(document.body, { childList: true });
  });
}

main();
