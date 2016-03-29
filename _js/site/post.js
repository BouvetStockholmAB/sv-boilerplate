/*global $svjq, _, FastClick, _b, HH */


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

            if ( !_.isObject( el ) ) {
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
        _.each( elms, attachFastClick );

    };

    _b.init( function () {

        //_b.attachFastClick( [
        //    d.querySelector( '.hamburger' ),
        //    d.querySelector( '.searchBox__submit' ),
        //    d.querySelector( '.paginationButton__button' )
        //] );

    } );

}( document ) );

