/**
 * Cookies Bar by Henrik Ekelöf (Bouvet Örebro)
 * ============================================
 *
 * Dependency: cookie-monster.js
 *
 * You may insert your own HTML if you wish. Use this structure:
 *
 * <div class="bvCookiesBar bvCookiesBar--bottomRight">
 *     <div class="bvCookiesBar__wrapper">
 *         <p>We use <a href="#foo">cookies</a>.</p>
 *         <button class="bvCookiesBar__button">OK</button>
 *     </div>
 * </div>
 *
 * 1. The container must match the className in var conf.cssClassName
 * 2. Any button inside the container will dismiss the information.
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
        cssClassName: 'bvCookiesBar',
        cookieName: 'bvCookiesCookie',
        text: '<p>Vi använder cookies för att förbättra din upplevelse. ' +
              'Genom att surfa vidare accepterar du dessa cookies.</p>',
        btnText: 'Jag förstår'
    },
        banner;

    function handleDismiss( e ) {
        if ( e.target && e.target.nodeName === 'BUTTON' ) {
            cookie.set( conf.cookieName, 'dismissed', conf.dismissFor );
            banner.parentNode.removeChild( banner );
        }
    }

    function addDismissListener() {
        banner.addEventListener( 'click', handleDismiss );
    }

    function createBanner() {
        banner = document.createElement( 'div' );
        banner.className = conf.cssClassName + ' ' + conf.cssClassName + '--jsGen';
        banner.innerHTML = '<div class="' + conf.cssClassName + '__wrapper">' +
                           conf.text +
                           '<button class="' + conf.cssClassName + '__button">' +
                           conf.btnText +
                           '</button>' +
                            '';
        document.body.insertBefore( banner, document.body.firstChild );

    }

    function init() {

        var dismissed = cookie.get( conf.cookieName );

        banner = document.querySelector( '.bvCookiesBar' );

        if ( dismissed ) {
            if ( banner ) {
                banner.parentNode.removeChild( banner );
            }
            return;
        }

        if ( banner ) {
            banner.style.display = 'block';
        } else {
            createBanner();
        }

        addDismissListener();

    }

    if ( document.body ) {
        init();
    } else {
        document.addEventListener( 'DOMContentLoaded', init );
    }


}( _b.cookie ) );
