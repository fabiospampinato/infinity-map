
/* MAIN */

class InfinityMap<K, V> {

  /* VARIABLES */

  private current: Map<K, V>;
  private pool: Map<K, V>[];

  /* CONSTRUCTOR */

  constructor ( entries?: readonly (readonly [K, V])[] ) {

    this.clear ();

    if ( entries ) {

      for ( const [key, value] of entries ) {

        this.set ( key, value );

      }

    }

  }

  /* GETTERS */

  get size (): number {

    return this.pool.reduce ( ( sum, map ) => sum + map.size, 0 );

  }

  /* API */

  clear (): undefined {

    this.current = new Map<K, V> ();
    this.pool = [this.current];

    return;

  }

  delete ( key: K ): boolean {

    return this.pool.some ( map => map.delete ( key ) );

  }

  get ( key: K ): V | undefined {

    for ( const map of this.pool ) {

      if ( !map.has ( key ) ) continue;

      return map.get ( key );

    }

  }

  has ( key: K ): boolean {

    return this.pool.some ( map => map.has ( key ) );

  }

  set ( key: K, value: V ): this {

    if ( this.has ( key ) ) return this;

    this.current.set ( key, value );

    if ( this.current.size === 16777215 ) {

      this.current = new Map<K, V> ();
      this.pool.push ( this.current );

    }

    return this;

  }

  /* ITERATION API */

  * [Symbol.iterator] (): IterableIterator<[K, V]> {

    for ( const map of this.pool ) {

      yield * map[Symbol.iterator]();

    }

  }

  * keys (): IterableIterator<K> {

    for ( const map of this.pool ) {

      yield * map.keys ();

    }

  }

  * values (): IterableIterator<V> {

    for ( const map of this.pool ) {

      yield * map.values ();

    }

  }

  * entries (): IterableIterator<[K, V]> {

    for ( const map of this.pool ) {

      yield * map.entries ();

    }

  }

  forEach ( callback: ( value: V, key: K, map: InfinityMap<K, V> ) => void, thisArg?: any ): undefined {

    for ( const [key, value] of this ) {

      callback.call ( thisArg, value, key, this );

    }

    return;

  }

};

/* EXPORT */

export default InfinityMap;