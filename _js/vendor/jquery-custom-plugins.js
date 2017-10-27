/*global jQuery */

// ==|== Check if var is jQuery object ========================================================== //

( function ( $ ) {

    'use strict';

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

    if ( !$.fn.showVertical ) {
        $.fn.showVertical = function ( duration ) {
            return this.animate( {
                height       : 'show',
                paddingTop   : 'show',
                paddingBottom: 'show',
                opacity      : 'show'
            }, duration || 300 );
        };
    }

    if ( !$.fn.hideVertical ) {
        $.fn.hideVertical = function ( duration ) {
            return this.animate( {
                height       : 'hide',
                paddingTop   : 'hide',
                paddingBottom: 'hide',
                opacity      : 'hide'
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

