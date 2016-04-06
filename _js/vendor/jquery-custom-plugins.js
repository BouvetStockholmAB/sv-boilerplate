/*global jQuery */


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

