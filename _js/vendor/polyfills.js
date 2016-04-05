( function ( strPrototype ) {

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
    
}( String.prototype ) );