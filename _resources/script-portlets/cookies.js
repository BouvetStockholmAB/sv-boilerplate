/*global request */
/*jshint strict:false */

var cookiesDismissed = false;

( function () {

    var cookies = request.getCookies(),
        i;

    if ( cookies && cookies.length > 0 ) {
        for ( i = 0; i < cookies.length; i += 1 ) {
            if ( cookies[ i ].getName() === 'bvCookiesCookie' && cookies[ i ].getValue() === 'dismissed' ) {
                cookiesDismissed = true;
                break;
            }
        }
    }

}() );



