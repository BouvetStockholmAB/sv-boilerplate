/*global require */

( function () {

    'use strict';

    var inlineBase64 = require( 'gulp-inline-base64' ),
        autoprefixer = require( 'gulp-autoprefixer' ),
        imagemin     = require( 'gulp-imagemin' ),
        connect      = require( 'gulp-connect' ),
        replace      = require( 'gulp-replace' ),
        sass         = require( 'gulp-sass' ),
        jshint       = require( 'gulp-jshint' ),
        jscs         = require( 'gulp-jscs' ),
        gulp         = require( 'gulp' );


    //----- Building JS -----//

    gulp.task( 'jshint', function () {
        return gulp.src( [ '_js/**/*.js', '!_js/vendor/*.js' ] )
                   .pipe( jshint( '.jshintrc' ) )
                   .pipe( jshint.reporter( 'jshint-stylish' ) )
                   .pipe( jshint.reporter( 'fail' ) );
    } );

    gulp.task( 'jscs', function () {
        return gulp.src( [ '_js/**/*.js', '!_js/vendor/*.js' ] )
                   .pipe( jscs() )
                   .pipe( jscs.reporter() );
    } );

    gulp.task( 'build-js-dev', function () {
        return gulp.src( [ '_js/**/*.js' ] )
                   .pipe( gulp.dest( 'build/js' ) )
                   .pipe( connect.reload() );
    } );

    gulp.task( 'build-js-dist', [ 'jshint', 'jscs' ], function () {
        return gulp.src( [ '_js/**/*.js' ] )
                   .pipe( gulp.dest( 'build/js' ) );
    } );


    //----- Building CSS -----//

    gulp.task( 'imgoptimize', function () {
        return gulp.src( '_images/**/*' )
                   .pipe( imagemin( {
                       progressive: true,
                       svgoPlugins: [
                           { removeViewBox: false },
                           { cleanupIDs: false }
                       ]
                   } ) )
                   .pipe( gulp.dest( '_images' ) );
    } );

    function buildCss( inputStream ) {
        return inputStream
            .pipe( sass( {
                outputStyle: 'expanded'
            } ).on( 'error', sass.logError ) )
            .pipe( inlineBase64( {
                debug  : true,
                baseDir: '_images/',
                maxSize: 1
            } ) )
            .pipe( replace( '@charset "UTF-8";', '' ) )
            .pipe( autoprefixer( {
                browsers: [ 'last 2 versions' ],
                cascade : false
            } ) );
    }

    gulp.task( 'build-css-dev', function () {
        //gulp.task( 'build-css-dist', function () {
            return buildCss( gulp.src( '_sass/**/*.scss' ) )
                .pipe( gulp.dest( 'build/css' ) )
                .pipe( connect.reload() );
        //} );
    } );

    gulp.task( 'build-css-dist', function () {
        return buildCss( gulp.src( '_sass/**/*.scss' ) )
            .pipe( gulp.dest( 'build/css' ) );
    } );

    //----- Reload -----//

    gulp.task( 'connect', function () {
        connect.server( {
            root      : 'build',
            // https     : true,
            livereload: {
                enable: true,
                port  : 8088
            },
            host      : 'localhost', // 'local.dev',
            port      : 8080
        } );
    } );


    //----- Use these tasks: -----//

    gulp.task( 'build', [ 'build-js-dist', 'build-css-dist', 'imgoptimize' ] );

    gulp.task( 'watch', [ 'build-js-dev', 'build-css-dev', 'connect' ], function () {
        gulp.watch( '_js/**/*.js', [ 'build-js-dev' ] );
        gulp.watch( '_sass/**/*.scss', [ 'build-css-dev' ] );
    } );

    gulp.task( 'default', [ 'watch' ] );


}() );


