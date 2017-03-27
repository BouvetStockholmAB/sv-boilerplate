/*
 * Customized version of cookie-monster 0.3.0
 * https://github.com/jgallen23/cookie-monster
 * copyright Greg Allen 2014
 * MIT License
 * Modified 2016 by Henrik Ekelöf, Bouvet Örebro
 * (formatting, hinting, rename)
 */

var _b = _b || {};

( function () {

    'use strict';

    _b.cookie = {
        set      : function ( name, value, options ) {
            var date       = new Date(),
                expires    = '',
                type       = typeof value,
                valueToUse = '',
                secureFlag = '',
                domainFlag = '',
                path;

            path = ( options && options.path ) ? options.path : '/';

            if ( options && options.days ) {
                date.setTime( date.getTime() + ( options.days * 24 * 60 * 60 * 1000 ) );
                expires = '; expires=' + date.toUTCString();
            }

            if ( type === 'object' && type !== 'undefined' ) {
                if ( !( 'JSON' in window ) ) {
                    throw 'Bummer, your browser doesn\'t support JSON parsing.';
                }
                valueToUse = encodeURIComponent( JSON.stringify( { v: value } ) );
            } else {
                valueToUse = encodeURIComponent( value );
            }

            if ( options && options.secure ) {
                secureFlag = ';secure';
            }

            if ( options && options.domain ) {
                domainFlag = ';domain=' + options.domain;
            }

            document.cookie = name + '=' + valueToUse + expires +
                              ';path=' + path + secureFlag + domainFlag;

        },
        get      : function ( name ) {
            var nameEQ    = name + '=',
                ca        = document.cookie.split( ';' ),
                value     = '',
                firstChar = '',
                parsed    = {},
                i, c;
            for ( i = 0; i < ca.length; i += 1 ) {
                c = ca[ i ];
                while ( c.charAt( 0 ) === ' ' ) {
                    c = c.substring( 1, c.length );
                }
                if ( c.indexOf( nameEQ ) === 0 ) {
                    value     = decodeURIComponent( c.substring( nameEQ.length, c.length ) );
                    firstChar = value.substring( 0, 1 );
                    if ( firstChar === '{' ) {
                        try {
                            parsed = JSON.parse( value );
                            if ( 'v' in parsed ) {
                                return parsed.v;
                            }
                        } catch ( e ) {
                            return value;
                        }
                    }
                    if ( value === 'undefined' ) {
                        return undefined;
                    }
                    return value;
                }
            }
            return null;
        },
        remove   : function ( name ) {
            this.set( name, '', { days: -1 } );
        },
        increment: function ( name, days ) {
            var value = this.get( name ) || 0;
            this.set( name, ( parseInt( value, 10 ) + 1 ), { days: days } );
        },
        decrement: function ( name, days ) {
            var value = this.get( name ) || 0;
            this.set( name, ( parseInt( value, 10 ) - 1 ), { days: days } );
        }
    };

}() );
