/*global console, require, process */

( function () {

    'use strict';

    var dir,
        options,
        path          = require( 'path' ),
        gulp          = require( 'gulp' ),
        gulpif        = require( 'gulp-if' ),
        rename        = require( 'gulp-rename' ),
        replace       = require( 'gulp-replace' ),
        del           = require( 'del' ),
        connect       = require( 'gulp-connect' ),
        sass          = require( 'gulp-sass' ),
        imagemin      = require( 'gulp-imagemin' ),
        inlineBase64  = require( 'gulp-inline-base64' ),
        jshint        = require( 'gulp-jshint' ),
        jscs          = require( 'gulp-jscs' ),
        autoprefixer  = require( 'gulp-autoprefixer' );

    //----- Helpers -----//

    function _devDir( file ) {
        return path.join( dir.dev, file );
    }

    function _getArg( key ) {
        /**
         * Get command arguments
         *
         * @example
         *
         * $ gulp watch --foo --bar 1337 -boom "Foo isn't equal to bar."
         *
         * _getArg( '--foo ' ) // => true
         * _getArg( '--bar ' ) // => "1337"
         * _getArg( '-boom ' ) // => "Foo isn't equal to bar."
         * _getArg( '--404 ' ) // => null
         *
         */
        var index = process.argv.indexOf( key ),
            next  = process.argv[ index + 1 ];
        return ( index < 0 ) ? null : ( !next || next[ 0 ] === '-' ) ? true : next;
    }

    function _timestamp() {
        var now = new Date(),
            pad = function ( val ) { return ( val > 9 ? val : '0' + val ); };
        return pad( now.getFullYear() ) + pad( now.getMonth() + 1 ) +
               pad( now.getDate() ) + pad( now.getHours() ) +
               pad( now.getMinutes() ) + pad( now.getSeconds() );
    }

    function _getLiveReloadJs() {
        return ';( function() { _b.load.js( \'//' +
               options.localhost +
               ':8088/livereload.js?snipver=1\'); }() );';
    }

    options = {
        localhost: 'localhost',
        dev      : _getArg( '--dev' ),
        live     : !_getArg( '--nolive' ),
        rev      : _getArg( '--rev' )
    };

    dir = {
        dev      : '_dev',
        dist     : 'dist',
        sass     : '_sass',
        images   : '_images/', // Must use ending slash!
        resources: '_resources/',
        js       : '_js',
        temp     : '_temp'
    };



    //----- Build for prod -----//

    gulp.task( 'build',
        [ 'imgoptimize', 'js-build-dist', 'css-build-dist' ],
        function () {

            var destDir        = options.dev ? 'dev' : 'dist',
                useCacheBuster = !!( options.rev && !options.dev ),
                timestamp      = _timestamp();

            del( [ path.join( dir.dist, '/**/*-*.js' ), path.join( dir.dist, '/**/*-*.css' ) ] );

            console.log( 'Building ' + destDir +
                         ( ( useCacheBuster ) ? ' rev ' + timestamp : '' ) );

            return gulp.src( [
                _devDir( '**/*.js' ),
                _devDir( '**/*.css' )
            ], { base: dir.dev } )
                       .pipe( gulpif( useCacheBuster,
                           rename( function ( path ) {
                               path.basename += '-' + timestamp;
                           } )
                       ) )
                       .pipe( gulp.dest( dir[ destDir ] ) );
        } );

    //----- Building CSS -----//

    function buildCss( inputStream ) {
        return inputStream
            .pipe( sass( {
                outputStyle: 'expanded'
            } ).on( 'error', sass.logError ) )
            .pipe( inlineBase64( {
                baseDir: dir.images,
                maxSize: 1,
                debug  : true
            } ) )
            .pipe( replace( '@charset "UTF-8";', '' ) )
            .pipe( autoprefixer( {
                browsers: [ 'last 2 versions' ],
                cascade : false
            } ) );
    }

    gulp.task( 'css-build-dev', function () {
        return buildCss( gulp.src( path.join( dir.sass, '**/*.scss' ) ) )
            .pipe( gulp.dest( path.join( dir.dev, 'css' ) ) )
            .pipe( gulpif( options.live, connect.reload() ) );
    } );

    gulp.task( 'css-build-dist', function () {
        return buildCss( gulp.src( path.join( dir.sass, '**/*.scss' ) ) )
            .pipe( gulp.dest( path.join( dir.dev, 'css' ) ) );
    } );

    gulp.task( 'imgoptimize', function () {
        return gulp.src( path.join( dir.images, '/**/*' ) )
                   .pipe( imagemin( {
                       progressive: true,
                       svgoPlugins: [
                           { removeViewBox: false },
                           { cleanupIDs: false }
                       ]
                   } ) )
                   .pipe( gulp.dest( dir.images ) );
    } );

    //----- Building JS -----//

    gulp.task( 'jshint', function () {
        return gulp.src( [
            path.join( dir.js, '/**/*.js' ),
            '!' + path.join( dir.js, '/vendor/*.js' )
        ] )
                   .pipe( jshint( '.jshintrc' ) )
                   .pipe( jshint.reporter( 'jshint-stylish' ) )
                   .pipe( jshint.reporter( 'fail' ) );
    } );

    gulp.task( 'jscs', function () {
        return gulp.src( [
            path.join( dir.js, '/**/*.js' ),
            '!' + path.join( dir.js, '/vendor/*.js' )
        ] )
                   .pipe( jscs() )
                   .pipe( jscs.reporter() );
    } );


    function jsBuildDev() {
        return gulp.src( [
            path.join( dir.js, '**/*.js' ) // _devDir( '**/*.js' )
        ] )
                   //.pipe( gulpif( options.live, insert.append( _getLiveReloadJs() ) ) )
                   .pipe( gulp.dest( path.join( dir.dev, 'js' ) ) )
                   .pipe( gulpif( options.live, connect.reload() ) );
    }

    gulp.task( 'js-build-dev', jsBuildDev );

    gulp.task( 'js-build-dist', [ 'jshint', 'jscs' ], function () {
        return gulp.src( [
            path.join( dir.js, '**/*.js' ) // _devDir( '**/*.js' )
        ] )
                   .pipe( gulp.dest( path.join( dir.dist, 'js' ) ) );
    } );


    //----- Watch -----//

    gulp.task( 'connect', function () {
        connect.server( {
            root      : dir.dev,
            // https     : true,
            livereload: {
                enable: options.live,
                port  : 8088
            },
            host      : options.localhost,
            port      : 8080
        } );
    } );

    gulp.task( 'watch', [ 'css-build-dev', 'connect' ], function () {
        jsBuildDev(); // Run once first to insert LiveReload JS
        gulp.watch( path.join( dir.js, '**/*.js' ), [ 'js-build-dev' ] );
        //gulp.watch( dir.vendorjs, [ 'vendorjs-build-dev' ] );
        gulp.watch( path.join( dir.sass, '**/*.scss' ), [ 'css-build-dev' ] );
    } );

    gulp.task( 'default', [ 'watch' ] );


}() );


