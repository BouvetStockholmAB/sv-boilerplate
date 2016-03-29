/*global $svjq, _ */

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

_b.throttle = function( fn, threshhold, scope ) {

    'use strict';

    threshhold || ( threshhold = 250 );

    var last, deferTimer;

    return function() {
        var context = scope || this,
            now = new Date().getTime(),
            args = arguments;
        if ( last && now < last + threshhold ) {
            // hold on to it
            clearTimeout( deferTimer );
            deferTimer = setTimeout( function() {
                last = now;
                fn.apply( context, args );
            }, threshhold );
        } else {
            last = now;
            fn.apply( context, args );
        }
    };

};



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
            beforeEl = beforeEl || doc.getElementsByTagName( s )[ 0 ];
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

            if ( _.isString( fns[ i ] ) && functionsCalled.indexOf( fns[ i ] ) === -1 ) {

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
            if ( _.isString( fn ) ) {
                exec( [ fn ] );
            } else if ( typeof ( fn ) === 'function' ) {
                fn();
            }

            return;
        }

        if ( !fn || ( _.isObject( fn ) && fn.target ) ) {
            if ( functions.length > 0 ) {
                exec();
            }
            isInitiated = true;
            return;
        }

        if ( _.isString( fn ) || typeof ( fn ) === 'function' ) {
            include( fn );
        } else if ( _.isArray( fn ) ) {
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






