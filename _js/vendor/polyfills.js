( function ( strPrototype, arrPrototype ) {

    'use strict';


    if ( !strPrototype.startsWith ) {
        strPrototype.startsWith = function ( str ) {
            return this.slice( 0, str.length ) === str;
        };
    }

    if ( !strPrototype.endsWith ) {
        strPrototype.endsWith = function ( str ) {
            return this.slice( -str.length ) === str;
        };
    }

    if ( !strPrototype.includes ) {
        strPrototype.includes = function ( search, start ) {
            if ( typeof start !== 'number' ) {
                start = 0;
            }
            if ( start + search.length > this.length ) {
                return false;
            } else {
                return this.indexOf( search, start ) !== -1;
            }
        };
    }

    if ( !strPrototype.capitalize ) {
        strPrototype.capitalize = function () {
            return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
        };
    }

    if ( !arrPrototype.includes ) {
        arrPrototype.includes = function ( searchElement /*, fromIndex*/ ) {

            var Obj   = Object( this ),
                len = parseInt( Obj.length ) || 0,
                n = parseInt( arguments[ 1 ], 10 ) || 0,
                k, currentElement;

            if ( len === 0 ) {
                return false;
            }

            if ( n >= 0 ) {
                k = n;
            } else {
                k = len + n;
                if ( k < 0 ) { k = 0; }
            }

            while ( k < len ) {
                currentElement = Obj[ k ];
                if ( searchElement === currentElement ||
                     ( searchElement !== searchElement && currentElement !== currentElement ) ) {
                    return true;
                }
                k += 1;
            }

            return false;
            
        };
    }

}( String.prototype, Array.prototype ) );