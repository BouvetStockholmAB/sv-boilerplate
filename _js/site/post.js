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

