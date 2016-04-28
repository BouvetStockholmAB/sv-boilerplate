/**
 * Cookies Bar by Henrik Ekelöf (Bouvet Örebro)
 * ============================================
 *
 * Dependency: cookie-monster.js
 *
 * Create Script portlet from _resources/script-portlets/cookies-bar.js and .vm files.
 *
 */

var _b = _b || {};

( function ( cookie ) {

    'use strict';

    if ( !cookie ) {
        throw 'Dependency cookie-monster.custom.js missing.';
    }

    var conf = {
            dismissFor: 365, // days to save cookie
            domain: window.location.hostname,
            cookieName: 'bvCookiesCookie'
        },
        banner;

    function handleDismiss( e ) {
        if ( e.target && e.target.nodeName === 'BUTTON' ) {
            cookie.set( conf.cookieName, 'dismissed', {
                days: conf.dismissFor,
                domain: conf.domain
            } );
            banner.parentNode.removeChild( banner );
        }
    }

    function addDismissListener() {
        banner.addEventListener( 'click', handleDismiss );
    }

    function init() {

        banner = document.querySelector( '.bvCookiesBar' );

        if ( banner ) {
            addDismissListener();
        }

    }

    if ( document.body ) {
        init();
    } else {
        document.addEventListener( 'DOMContentLoaded', init );
    }


}( _b.cookie ) );
