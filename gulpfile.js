/*global console, require, process */

( function () {

    'use strict';

    var dir,
        files,
        options,
        path          = require( 'path' ),
        gulp          = require( 'gulp' ),
        gulpif        = require( 'gulp-if' ),
        rename        = require( 'gulp-rename' ),
        del           = require( 'del' ),
        concat        = require( 'gulp-concat' ),
        connect       = require( 'gulp-connect' ),
        sass          = require( 'gulp-sass' ),
        imagemin      = require( 'gulp-imagemin' ),
        inlineBase64  = require( 'gulp-inline-base64' ),
        file2base64   = require( 'gulp-css-file2base64' ),
        lodashBuilder = require( 'gulp-lodash-builder' ),
        jshint        = require( 'gulp-jshint' ),
        jscs          = require( 'gulp-jscs' ),
        uglify        = require( 'gulp-uglify' ),
        autoprefixer  = require( 'gulp-autoprefixer' ),
        cssnano       = require( 'gulp-cssnano' ),
        minifyInline  = require( 'gulp-minify-inline' );

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

    options = {
        dev: _getArg( '--dev' ),
        rev: _getArg( '--rev' )
    };

    dir = {
        dev      : '_dev',
        dist     : 'dist',
        sass     : '_sass',
        images   : '_images/', // Must use ending slash!
        fonts    : '_fonts',
        resources: '_resources/',
        hintedjs : '_js/site',
        sitejs   : [
            '_js/site/pre.js',
            '_js/site/modules/**/*.js',
            '_js/site/post.js'
        ],
        temp     : '_temp',
        vendorjs : [
            '_js/vendor/polyfills.js',
            '_js/vendor/jquery-custom-plugins.js',
            // '_js/vendor/fastclick.js',
        ]
    };

    files = {
        sass     : 'main.scss',
        css      : 'main.css',
        cssmin   : 'main.min.css',
        cssfonts : 'fonts.css',
        lodash   : 'lodash.custom.js',
        sitejs   : 'main-site.js',
        vendorjs : 'main-vendor.js',
        js       : 'main.js',
        jsmin    : 'main.min.js',
        headvm   : 'additional-head-src.vm',
        headvmmin: 'additional-head-min.vm'
    };


    //----- Build for prod -----//

    gulp.task( 'build', [ 'imgoptimize', 'js-build-min', 'minify-head', 'css-build-min', 'fontcss-build' ], function () {

        var destDir        = options.dev ? 'dev' : 'dist',
            useCacheBuster = !!( options.rev && !options.dev ),
            timestamp      = _timestamp();

        del( [ path.join( dir.dist, '/**/*-*.js' ), path.join( dir.dist, '/**/*-*.css' ) ] );

        console.log( useCacheBuster );
        console.log( 'Building ' + destDir );

        return gulp.src( [
                       _devDir( files.js ),
                       _devDir( files.css ),
                       _devDir( files.jsmin ),
                       _devDir( files.cssmin ),
                       _devDir( files.cssfonts )
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
                outputStyle: 'nested'
            } ).on( 'error', sass.logError ) )
            .pipe( inlineBase64( {
                baseDir: dir.images,
                maxSize: 1,
                debug  : true
            } ) )
            .pipe( autoprefixer( {
                browsers: [ 'last 2 versions' ],
                cascade : false
            } ) );
    }

    gulp.task( 'css-build', function () {
        return buildCss( gulp.src( path.join( dir.sass, files.sass ) ) )
            .pipe( gulp.dest( dir.dev ) );
    } );

    gulp.task( 'css-build-min', [ 'css-build' ], function () {
        return gulp.src( [ _devDir( files.css ) ] )
                   .pipe( rename( files.cssmin ) )
                   .pipe( cssnano() )
                   .pipe( gulp.dest( dir.dev ) );
    } );

    gulp.task( 'fontcss-build', function () {
        return gulp.src( path.join( dir.fonts, files.cssfonts ) )
                   .pipe( file2base64() )
                   .pipe( gulp.dest( dir.dev ) );
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
        return gulp.src( path.join( dir.hintedjs, '/**/*.js' ) )
                   .pipe( jshint( '.jshintrc' ) )
                   .pipe( jshint.reporter( 'jshint-stylish' ) )
                   .pipe( jshint.reporter( 'fail' ) );
    } );

    gulp.task( 'jscs', function () {
        return gulp.src( path.join( dir.hintedjs, '/**/*.js' ) )
                   .pipe( jscs() )
                   .pipe( jscs.reporter() );
    } );

    gulp.task( 'lodash-build', function () {
        return gulp.src( dir.sitejs, {
                       buffer: false
                   } )
                   .pipe( lodashBuilder( {
                       target  : path.join( dir.temp, files.lodash ),
                       settings: {}
                   } ) )
                   .on( 'error', function ( err ) {
                       console.log( 'err: ', err );
                   } );
    } );

    gulp.task( 'vendorjs-concat', function () {
        // Add lodash to lib build
        var vendorjs = dir.vendorjs;
        // vendorjs.unshift( path.join( dir.temp, files.lodash ) );
        return gulp.src( vendorjs )
                   .pipe( concat( files.vendorjs ) )
                   .pipe( gulp.dest( dir.dev ) );
    } );

    gulp.task( 'sitejs-concat', function () {
        return gulp.src( dir.sitejs )
                   .pipe( concat( files.sitejs ) )
                   .pipe( gulp.dest( dir.dev ) );
    } );

    gulp.task( 'alljs-concat', [ 'sitejs-concat', 'lodash-build', 'vendorjs-concat' ], function () {
        return gulp.src( [
                       _devDir( files.vendorjs ),
                       _devDir( files.sitejs )
                   ] )
                   .pipe( concat( files.js ) )
                   .pipe( gulp.dest( dir.dev ) );
    } );

    gulp.task( 'js-build-dev', [ 'sitejs-concat' ], function () {
        return gulp.src( [
                       _devDir( files.vendorjs ),
                       _devDir( files.sitejs )
                   ] )
                   .pipe( concat( files.js ) )
                   .pipe( gulp.dest( dir.dev ) );
    } );

    gulp.task( 'vendorjs-build-dev', [ 'vendorjs-concat' ], function () {
        return gulp.src( [
                       _devDir( files.vendorjs ),
                       _devDir( files.sitejs )
                   ] )
                   .pipe( concat( files.js ) )
                   .pipe( gulp.dest( dir.dev ) );
    } );

    gulp.task( 'js-build-min', [ 'jshint', 'jscs', 'alljs-concat' ], function () {
        return gulp.src( [
                       _devDir( files.js )
                   ] )
                   .pipe( rename( files.jsmin ) )
                   .pipe( uglify() )
                   .pipe( gulp.dest( dir.dev ) );

    } );


    //----- Minifying JS in Velocity (HEAD) -----//

    gulp.task( 'minify-head', function () {
        gulp.src( path.join( dir.resources, files.headvm ) )
            .pipe( rename( files.headvmmin ) )
            .pipe( minifyInline() )
            .pipe( gulp.dest( dir.resources ) );
    } );


    //----- Watch -----//

    gulp.task( 'connect', function () {
        connect.server( {
            root      : dir.dev,
            livereload: false
        } );
    } );

    gulp.task( 'watch', [ 'css-build', 'alljs-concat', 'connect' ], function () {
        gulp.watch( path.join( dir.hintedjs, '/**/*.js' ), [ 'js-build-dev' ] );
        gulp.watch( dir.vendorjs, [ 'vendorjs-build-dev' ] );
        gulp.watch( path.join( dir.sass, '/**/*.scss' ), [ 'css-build' ] );
    } );

    gulp.task( 'default', [ 'watch' ] );


}() );


