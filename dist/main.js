/*global $svjq */


// ==|== Prettier Vertical Visbility Toggler ==================================================== //

( function ( $ ) {

    'use strict';

    // Pretty show/hide animation, height and opacity
    if ( !$.fn.toggleVertical ) {
        /**
         * Toggle visibilty of an element with a pretty vertical animation.
         * @example
         * $( '.foo' ).toggleVertical()
         * // => Hides or shows an element
         */
        $.fn.toggleVertical = function ( duration ) {
            return this.animate( {
                height       : 'toggle',
                paddingTop   : 'toggle',
                paddingBottom: 'toggle',
                opacity      : 'toggle'
            }, duration || 300 );
        };
    }

}( $svjq ) );


// ==|== Exists Function ======================================================================== //

( function ( $ ) {

    'use strict';

    if ( !$.fn.exists ) {
        /**
         * Instead of $( el ).length > 0 you may use $( el ).exists()
         * @example
         * $( '.foo' ).exists()
         * // => false
         */
        $.fn.exists = function () {
            return this.length > 0;
        };
    }

}( $svjq ) );


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
/*global $svjq */

// ==|== Global Namespace Variables ============================================================= //

/**
 * Site script global namespace. Page or component specific code
 * should be placed under this namespace.
 */
var BV = BV || {},
    /**
     * Toolbox Library
     */
    _b = _b || {};


// ==|== Throttle function ====================================================================== //
// https://remysharp.com/2010/07/21/throttling-function-calls

_b.throttle = function ( fn, threshhold, scope ) {

    'use strict';

    threshhold || ( threshhold = 250 );

    var last, deferTimer;

    return function () {
        var context = scope || this,
            now     = new Date().getTime(),
            args    = arguments;
        if ( last && now < last + threshhold ) {
            // hold on to it
            clearTimeout( deferTimer );
            deferTimer = setTimeout( function () {
                last = now;
                fn.apply( context, args );
            }, threshhold );
        } else {
            last = now;
            fn.apply( context, args );
        }
    };

};



// ==|== Misc Toolbox Functions ================================================================= //

( function () {

    'use strict';

    [ 'Arguments', 'Array', 'Function', 'String', 'Number', 'Date', 'RegExp' ]
        .forEach( function ( name ) {
            _b[ 'is' + name ] = function ( obj ) {
                return Object.prototype.toString.call( obj ) === '[object ' + name + ']';
            };
        } );

    // Test for integer
    _b.isInt = function ( n ) {
        return Number( n ) === n && n % 1 === 0;
    };

    // Test for float
    _b.isFloat = function ( n ) {
        return n === Number( n ) && n % 1 !== 0;
    };

    function isObject( o ) {
        return o !== null && typeof o === 'object' && !Array.isArray( o );
    }

    function isObjectObject( o ) {
        return isObject( o ) === true && Object.prototype.toString.call( o ) === '[object Object]';
    }

    _b.isPlainObject = function ( o ) {

        var ctor, prot;

        if ( isObjectObject( o ) === false ) {
            return false;
        }

        // If has modified constructor
        ctor = o.constructor;
        if ( typeof ctor !== 'function' ) {
            return false;
        }

        // If has modified prototype
        prot = ctor.prototype;
        if ( isObjectObject( prot ) === false ) {
            return false;
        }

        // If constructor does not have an Object-specific method
        if ( prot.hasOwnProperty( 'isPrototypeOf' ) === false ) {
            return false;
        }

        // Most likely a plain Object
        return true;
    };

}() );

// ==|== Custom localStorage function w. detection ============================================== //

( function ( w ) {

    'use strict';

    _b.localStorage = ( function () {

        var uid = new Date().toString(),
            result;

        try {
            w.localStorage.setItem( uid, uid );
            result = w.localStorage.getItem( uid ) === uid;
            w.localStorage.removeItem( uid );
            return result && w.localStorage;
        } catch ( exception ) {
        }

    }() );

    _b.sessionStorage = _b.localStorage ? w.sessionStorage : false;

}( window ) );


// ==|== Check for edit mode ==================================================================== //

( function ( $ ) {

    'use strict';

    $( function () {
        _b.isEditMode = ( function () {
            var $body = $( document.body );
            return ( $body.hasClass( 'sv-edit-mode' ) ||
                     $body.hasClass( 'sv-editing-mode' ) ||
                     $body.hasClass( 'sv-classic-edit-mode' ) );
        }() );
    } );


}( $svjq ) );



// ==|== Cutting the mustard ==================================================================== //

/**
 * This is our definition of a JS capable browser.
 * Used to determine if we should run our JavaScript,
 * and as feature detection.
 *   if ( _b.cutsTheMustard ) {
 *       // Stuff
 *   }
 */

_b.cutsTheMustard = (
    'querySelector' in document &&
    _b.localStorage &&
    'addEventListener' in window && !!Array.prototype.forEach && !!Array.prototype.indexOf
);


// ==|== Load JS and CSS assets ================================================================= //

( function ( doc, s ) {

    'use strict';

    _b.load = {
        /**
         * Load JavaScript file async by adding script tag to DOM.
         * May be used for own scripts or external scripts.
         * <script> NRM.load.js( 'some-js-file.js' ) </script>
         * // => Loads and executes some-js-file.js
         */
        js: function ( src, beforeEl ) {
            var script = doc.createElement( s );
            beforeEl   = beforeEl || doc.getElementsByTagName( s )[ 0 ];
            script.src = src;
            beforeEl.parentNode.insertBefore( script, beforeEl );
            return script;
        }
    };

    _b.appendStyleElement = function ( data ) {
        var style;
        style = doc.createElement( 'style' );
        style.setAttribute( 'type', 'text/css' );
        if ( style.styleSheet ) {
            style.styleSheet.cssText = data;
        } else {
            style.appendChild( doc.createTextNode( data ) );
        }
        doc.head.appendChild( style );
    };

}( document, 'script' ) );


// ==|== Font-face loader ======================================================================= //

( function ( win, doc, $ ) {

    'use strict';

    var fontCss;

    if ( !_b.localStorage ) {
        return;
    }

    function getFontCss() {

        var fileName = doc.getElementById( 'js-main' ).getAttribute( 'data-fonts' );

        $.ajax( {
            url     : fileName,
            success : function ( data ) {
                _b.appendStyleElement( data );
                _b.localStorage.setItem( 'bvSiteFonts', data );
            },
            dataType: 'text'
        } );

    }

    fontCss = _b.localStorage.getItem( 'bvSiteFonts' );

    if ( fontCss ) {
        _b.appendStyleElement( fontCss );
    } else {
        $( getFontCss );
    }

}( window, document, $svjq ) );



// ==|== Add to init and exec on DOMContentLoaded =============================================== //

( function ( win, doc, undefined ) {

    'use strict';

    var functions       = [],
        functionsCalled = [],
        currentFunction,
        isInitiated     = false;

    function isNamedFunction( fn ) {
        var fName = fn.toString().match( /^function\s*([^\s]+)\s*\(\)/ );
        if ( fName ) {
            fName = fName[ 1 ];
        }
        return !!fName;
    }

    function include( fn ) {
        if ( isNamedFunction( fn ) ) {
            doc.addEventListener( 'DOMContentLoaded', fn );
        } else {
            functions.push( fn );
        }
    }


    function getFunction( fn ) {

        if ( typeof fn === 'function' ) {
            return fn;
        }

        var parts = fn.split( '.' ),
            i,
            l;

        for ( i = 0, l = parts.length; i < l; i += 1 ) {

            if ( !currentFunction[ parts[ i ] ] ) {
                return undefined;
            } else {
                currentFunction = currentFunction[ parts[ i ] ];
            }
        }
        return currentFunction;
    }


    function exec( fns ) {

        var fn, i, l;

        fns = fns || functions;

        for ( i = 0, l = fns.length; i < l; i += 1 ) {

            currentFunction = win;

            if ( _b.isString( fns[ i ] ) && functionsCalled.indexOf( fns[ i ] ) === -1 ) {

                functionsCalled.push( fns[ i ] );
                fn = getFunction( fns[ i ] );

                if ( typeof fn === 'function' ) {
                    fn();
                }

            }
        }

    }


    /**
     * Add function names for functions to be executed on DOMContentLoaded.
     * Use inline in markup. Modules will tell the script which functions
     * need to be executed for the current page.
     * Any named function may be added multiple times but will only
     * be executed once
     *
     * <script> _b.init( 'M.fooBar' ) </script>
     * // => will execute M.foobar on DOMContentLoaded
     *
     * <script> _b.init( function () { alert( 'Hello' ) } ) </script>
     * // => will alert 'Hello' on DOMContentLoaded
     */
    _b.init = function ( fn ) {

        if ( isInitiated ) {
            if ( _b.isString( fn ) ) {
                exec( [ fn ] );
            } else if ( typeof ( fn ) === 'function' ) {
                fn();
            }

            return;
        }

        if ( !fn || ( _b.isPlainObject( fn ) && fn.target ) ) {
            if ( functions.length > 0 ) {
                exec();
            }
            isInitiated = true;
            return;
        }

        if ( _b.isString( fn ) || typeof ( fn ) === 'function' ) {
            include( fn );
        } else if ( _b.isArray( fn ) ) {
            fn.forEach( function ( f ) {
                include( f );
            } );
        }

    };

    //    _b.inInit = function ( s ) {
    //        return ( functions.indexOf( s ) > -1 || functionsCalled.indexOf( s ) > -1 );
    //    };

    doc.addEventListener( 'DOMContentLoaded', _b.init );

}( window, document ) );







/*global $svjq, console */

( function ( $ ) {

    'use strict';

    console.log( 'jQuery is loaded: ' + !!$ );

}( $svjq ) );
/*global FastClick, _b */


// ==|== FastClick ============================================================================== //

( function ( d ) {

    'use strict';

    if ( !d.querySelectorAll || !d.addEventListener ) {
        // Testing for addEventListener to make early exit in old IE (8).
        return;
    }

    _b.attachFastClick = function ( elms ) {

        var i, j;

        function attachFastClick( el ) {

            if ( !_b.isPlainObject( el ) ) {
                return;
            }
            if ( el.nodeType === 1 ) {
                // Single element
                FastClick.attach( el );
                return;
            }
            if ( el.length ) {
                // NodeList - make recursive call for each node.
                for ( i = 0, j = el.length; i < j; i += 1 ) {
                    attachFastClick( el[ i ] );
                }
                return;
            }

        }

        // Must be a DOM node or nodeList - no jQuery objects please.
        elms.forEach( attachFastClick );

    };

    _b.init( function () {

        //_b.attachFastClick( [
        //    d.querySelector( '.hamburger' ),
        //    d.querySelector( '.searchBox__submit' ),
        //    d.querySelector( '.paginationButton__button' )
        //] );

    } );

}( document ) );

