/* jshint strict:false, moz:true */

var bvTools = bvTools || {};

bvTools.zeroPad = function ( n, stringLength ) {
    stringLength = stringLength || 2;
    n            = '' + n;
    while ( n.length < stringLength ) {
        n = '0' + n;
    }
    return n;
};

bvTools.getHrefFromHTML = function ( str, getLast ) {
    var href = '';
    str.replace( /href=("|')(.*?)("|')/g, function ( a, b, match ) {
        if ( getLast ) {
            href = match;
        } else if ( href === '' ) {
            href = match;
        }
    } );
    return href;
};

bvTools.getSrcFromImg = function ( str ) {
    var src;
    if ( typeof str === 'string' && str.length > 0 ) {
        src = /<img.*?src=['"](.*?)['"]/.exec( str )[ 1 ];
    }
    return src ? src : '';
};

bvTools.dateStrings = {
    month     : [
        'januari',
        'februari',
        'mars',
        'april',
        'maj',
        'juni',
        'juli',
        'augusti',
        'september',
        'oktober',
        'november',
        'december'
    ],
    shortMonth: [
        'jan',
        'feb',
        'mar',
        'apr',
        'maj',
        'jun',
        'jul',
        'aug',
        'sep',
        'okt',
        'nov',
        'dec'
    ]
};


( function () {
    /* jshint ignore:start */
    // jscs:disable
    var cache    = {};
    bvTools.tmpl = function tmpl( str, data ) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test( str ) ?
                 cache[ str ] = cache[ str ] ||
                                tmpl( document.getElementById( str ).innerHTML ) :
            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
                 new Function( "obj",
                     "var p=[],print=function(){p.push.apply(p,arguments);};" +
                     // Introduce the data as local variables using with(){}
                     "with(obj){p.push('" +
                     // Convert the template into pure JavaScript

                     str
                         .replace( /[\r\t\n]/g, " " )
                         .split( "<%" ).join( "\t" )
                         .replace( /((^|%>)[^\t]*)'/g, "$1\r" )
                         .replace( /\t=(.*?)%>/g, "',$1,'" )
                         .split( "\t" ).join( "');" )
                         .split( "%>" ).join( "p.push('" )
                         .split( "\r" ).join( "\\'" ) +
                     "');}return p.join('');" );
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };
    // jscs:enable
    /* jshint ignore:end */
}() );


