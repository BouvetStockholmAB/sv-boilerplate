
var cookies = request.getCookies(),
    cookiesDismissed = false,
    i;

for ( i = 0; i < cookies.length; i += 1 ) {
    if ( cookies[ i ].getName() === 'bvCookiesCookie' && cookies[ i ].getValue() === 'dismissed' ) {
        cookiesDismissed = true;
        break;
    }
}


