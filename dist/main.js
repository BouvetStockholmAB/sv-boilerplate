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
/*global jQuery */

// ==|== Check if var is jQuery object ========================================================== //

( function ( $ ) {

    'use strict';

    // Pretty show/hide animation, height and opacity
    if ( !$.isjQueryObject ) {
        $.isjQueryObject = function ( obj ) {
            return ( obj && ( obj instanceof jQuery || 'jquery' in Object( obj ) ) );
        };
    }

}( jQuery ) );



// ==|== Prettier Vertical Visibility Toggler =================================================== //

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

}( jQuery ) );


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

}( jQuery ) );


/*global jQuery */

// ==|== Global Namespace Variables ============================================================= //

/**
 * Site script global namespace. Page or component specific code
 * should be placed under this namespace.
 */
var BV = BV || {},
    // Toolbox Library
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


// ==|== Async JS loader ======================================================================== //

( function ( doc, s ) {

    'use strict';

    _b.load = {
        /**
         * Load JavaScript file async by adding script tag to DOM.
         * May be used for own scripts or external scripts.
         * (script) _b.load.js( 'some-js-file.js' ) (/script)
         * // => Loads and executes some-js-file.js
         */
        js: function ( src ) {
            var script   = doc.createElement( s ),
                beforeEl = doc.getElementsByTagName( s )[ 0 ];
            script.src   = src;
            beforeEl.parentNode.insertBefore( script, beforeEl );
            return script;
        }
    };

}( document, 'script' ) );


// ==|== LocalStorage Detection ================================================================= //

( function ( win ) {

    'use strict';

    _b.localStorage = ( function () {

        var uid = new Date().toString(),
            result;

        try {
            win.localStorage.setItem( uid, uid );
            result = win.localStorage.getItem( uid ) === uid;
            win.localStorage.removeItem( uid );
            return result && win.localStorage;
        } catch ( exception ) {
        }

    }() );

    _b.sessionStorage = _b.localStorage ? win.sessionStorage : false;

}( window ) );


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


}( jQuery ) );



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



// ==|== Add to init and exec on DOMContentLoaded =============================================== //


/**
 * Add functions or function names for functions to be executed on DOMContentLoaded.
 * Use inline in markup. Modules will tell the script which functions
 * need to be executed for the current page.
 * Pass as string to ensure function to only be executed once.
 *
 * <script> _b.init.push( 'M.fooBar' ) </script>
 * // => will execute M.foobar on DOMContentLoaded
 *
 * <script> _b.init.push( function () { alert( 'Hello' ) } ) </script>
 * // => will alert 'Hello' on DOMContentLoaded
 */


( function ( win, doc, $, undefined ) {

    'use strict';

    var functionsCalled = [];

    function getFunction( fn ) {

        var parts = fn.split( '.' ),
            currentFunction = window,
            i, l;

        for ( i = 0, l = parts.length; i < l; i += 1 ) {
            if ( !currentFunction[ parts[ i ] ] ) {
                return undefined;
            } else {
                currentFunction = currentFunction[ parts[ i ] ];
            }
        }

        if ( _b.isFunction( currentFunction ) ) {
            return currentFunction;
        }

    }


    function exec( f ) {

        if ( _b.isArray( f ) ) {
            f.forEach( exec );
            return;
        }

        if ( _b.isString( f ) ) {
            if ( functionsCalled.includes( f ) ) {
                return;
            }
            functionsCalled.push( f );
            f = getFunction( f );
        }

        if ( _b.isFunction( f ) ) {
            f();
        }

    }


    $( function () {
        if ( _b.init.length > 0 ) {
            _b.init.forEach( exec );
        }
    } );

}( window, document, jQuery ) );







/*global jQuery, console */

( function ( $ ) {

    'use strict';

    console.log( 'jQuery is loaded: ' + !!$ );

}( jQuery ) );
/*global jQuery, FastClick, _b */


// ==|== FastClick ============================================================================== //

( function ( d, $ ) {

    'use strict';

    _b.attachFastClick = function ( elms ) {

        var i, j;

        function attachFastClick( el ) {

            if ( $.isjQueryObject( el ) ) {
                // jQuery object - make recursive call for each node.
                el.each( function ( i, e ) { attachFastClick( e ); } );
                return;
            }

            if ( el.length ) {
                // NodeList - make recursive call for each node.
                for ( i = 0, j = el.length; i < j; i += 1 ) {
                    attachFastClick( el[ i ] );
                }
                return;
            }

            if ( el.nodeType === 1 ) {
                // Single element. Attach FastClick.
                FastClick.attach( el );
            }

        }

        if ( elms.length ) {
            elms.forEach( attachFastClick );
        } else {
            attachFastClick( elms );
        }

    };

    /*

    // Uncomment to use, also make sure fastclick.js is included in gulpfile.js.

    $( function () {
        _b.attachFastClick( [
            d.querySelector( '.hamburger' ),
            $( '.searchBox__submit' )
        ] );
    } );

    */
    
}( document, jQuery ) );

