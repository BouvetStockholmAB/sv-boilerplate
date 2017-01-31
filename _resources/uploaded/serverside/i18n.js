/* global require */
/* jshint strict:false  */

var i18n = {
    sv: {
        home: 'Till startsidan'
    },
    en: {
        home: 'Home'
    },
    de: {
        home: 'Zur Startseite'
    }
};


( function () {

    var portletContextUtil = require( 'PortletContextUtil' ),
        locale             = portletContextUtil.getCurrentLocale().toString();

    if ( locale.indexOf( 'en' ) === 0 ) {
        i18n = i18n.en;
    } else if ( locale.indexOf( 'de' ) === 0 ) {
        i18n = i18n.de;
    } else {
        i18n = i18n.sv;
    }

}() );

