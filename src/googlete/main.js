import ready from './ready';
import Googlete from './Googlete';

function main () {
  ready(() => {
    new Googlete();
  });
}

main();
