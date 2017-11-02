/*global jQuery, _b */


// ==|== Page min height ======================================================================== //

( function ( win, $ ) {

    'use strict';

    var $header,
        //$nav,
        $footer,
        //$aside,
        $content;

    function stickyFooter() {

        var h = $header.outerHeight( true ) +
                //$nav.outerHeight( true ) +
                $footer.outerHeight( true ); // Margin below footer

        $content.css( 'min-height', 'calc(100vh - ' + h + 'px)' );

        //if ( $aside.length && $aside.height() > $content.height() - 100 ) {
        //    $content.css( 'min-height', ( $aside.height() + 100  ) + 'px' );
        //}
    }

    $( function () {

        $header  = $( '.tmpl__header' );
        //$nav     = $( '.tmpl__nav' );
        $footer  = $( '.tmpl__footer' );
        $content = $( '.tmpl__contentArea' );
        //$aside   = $( '.tmpl__aside' );

        $( win ).on( 'resize', _b.throttle( stickyFooter, 1000 ) );
        stickyFooter();

    } );

}( window, jQuery ) );

