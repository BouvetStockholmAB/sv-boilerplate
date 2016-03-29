/*global $svjq */

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
                height: 'toggle',
                paddingTop: 'toggle',
                paddingBottom: 'toggle',
                opacity: 'toggle'
            }, duration || 300 );
        };
    }

}( $svjq ) );
