/*
 https://github.com/imaustink/swiss-army-knife
 Created by Austin Kurpuis (imaustink, blackmarket, DabMan...)
 This file is open source and free for use to anyone for anything
 have fun and code smart!

 Hinted and customized by Henrik Ekelöf 2016-04-01

 */

( function () {

    'use strict';

    //Array.forEach in IE 5+
    if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function ( callback, thisArg ) {
            if ( thisArg ) {
                callback.call( thisArg );
            }
            for ( var i = 0; i < this.length; i++ ) {
                callback( this[ i ], i, this );
            }
        };
    }

    // Array.each is simlar to Array.forEach but with ability
    // to break by returning false in callback
    if ( !Array.prototype.each ) {
        Array.prototype.each = function ( callback, thisArg ) {
            var i;
            if ( thisArg ) {
                callback.call( thisArg );
            }
            for ( i = 0; i < this.length; i += 1 ) {
                if ( callback( this[ i ], i, this ) === false ) {
                    break;
                }
            }
        };
    }

    // Array.every in IE 5+
    if ( !Array.prototype.every ) {
        Array.prototype.every = function ( callback, thisArg ) {
            var found = true,
                i;
            if ( thisArg ) {
                callback.call( thisArg );
            }
            for ( i = 0; i < this.length; i += 1 ) {
                if ( !callback( this[ i ], i ) ) {
                    found = false;
                }
            }
            return found;
        };
    }

    // Array.some in IE 5+
    if ( !Array.prototype.some ) {
        Array.prototype.some = function ( callback, thisArg ) {
            var found = false,
                i;
            if ( thisArg ) {
                callback.call( thisArg );
            }
            for ( i = 0; i < this.length; i += 1 ) {
                if ( callback( this[ i ], i ) ) {
                    found = true;
                }
            }
            return found;
        };
    }

    // Array.indexOf in IE 5+
    if ( !Array.prototype.indexOf ) {
        Array.prototype.indexOf = function ( value, start ) {
            var index = -1,
                i;
            for ( i = ( start ? start : 0 ); i < this.length; i += 1 ) {
                if ( this[ i ] === value ) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }

    // Array.lastIndexOf in IE 5+
    if ( !Array.prototype.lastIndexOf ) {
        Array.prototype.lastIndexOf = function ( value, start ) {
            var index = -1,
                i;
            for ( i = ( start ? start : this.length - 1 ); i > 0; i -= 1 ) {
                if ( this[ i ] === value ) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }

    // Object.keys in IE 5+
    if ( !Object.keys ) {
        Object.keys = function ( obj ) {
            var keys = [], key;
            for ( key in obj ) {
                if ( obj.hasOwnProperty( key ) ) {
                    keys.push( key );
                }
            }
            return keys;
        };
    }

    // Object.clone
    if ( !Object.clone ) {
        Object.clone = function ( obj ) {
            if ( null === obj || 'object' !== typeof obj ) {
                return obj;
            }
            var copy = {},
                attr, prop;
            for ( attr in obj ) {
                if ( obj.hasOwnProperty( attr ) ) {
                    prop = obj[ attr ];
                    if ( typeof prop === 'object' ) {
                        if ( Array.isArray( prop ) ) {
                            prop = prop.slice();
                        } else {
                            prop = Object.clone( prop );
                        }
                    }
                    copy[ attr ] = prop;
                }
            }
            return copy;
        };
    }

    // Array.isArray in IE 5+
    if ( !Array.isArray ) {
        Array.isArray = function ( a ) {
            return ( Object.prototype.toString.call( a ) === '[object Array]' );
        };
    }

    // Get largest value in array
    if ( !Array.prototype.max ) {
        Array.prototype.max = function () {
            return Math.max.apply( Math, this );
        };
    }

    // Get smallest value in array
    if ( !Array.prototype.min ) {
        Array.prototype.min = function () {
            return Math.min.apply( Math, this );
        };
    }

    // Capitalize first letter
    if ( !String.prototype.capitalize ) {
        String.prototype.capitalize = function () {
            return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
        };
    }
    
}() );