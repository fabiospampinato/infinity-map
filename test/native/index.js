
/* IMPORT */

import {describe} from 'fava';
import InfinityMap from '../../dist/index.js';

/* MAIN */

describe ( 'InfinityMap', it => {

  it ( 'does not throw with 20M items', t => {

    const map = new InfinityMap ();

    for ( let i = 0, l = 20_000_000; i < l; i++ ) {
      map.set ( i, i );
    }

    for ( let i = 0, l = 20_000_000; i < l; i++ ) {
      t.true ( map.has ( i ) );
    }

  });

});
