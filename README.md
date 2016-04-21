
# SiteVision Front End Boilerplate

Node, Gulp, Sass, LiveReload, Autoprefixer, minification, 
image optimization and embedding and more. 

*Created by Henrik Ekelöf at Bouvet Örebro in 2016.*


## Content

- [Why use this?](#why-use-this)
- [What's in the box](#whats-in-the-box)
- [Set up a new project](#set-up-a-new-project)
   - [GitHub Repo](#github-repo)
   - [Add the boilerplate](#add-the-boilerplate)
   - [Edit project files](#edit-project-files)
   - [SiteVision project site setup](#sitevision-project-site-setup)
   - [SiteVision project site changes when going live](#siteVision-project-site-changes-when-going-live)
- [How to use](#how-to-use)
   - [Gulp](#gulp)
      - [Gulp Watch](#gulp-watch)
      - [Gulp Build](#gulp-build)
      - [LiveReload](#livereload)
   - [Git](#git)
   - [Optimized images](#optimized-images)
   - [Embedded images](#embedded-images)
   - [Async font-face](#async-font-face)
   - [Sass](#sass)
   - [Async JS](#async-js)
   - [Init JS module](#init-js-module)
   - [Lodash](#lodash)
   - [Autoprefixer](#autoprefixer)


## Why use this?

I wanted a skeleton project for the frontend stuff I use in almost all of my web projects to get started faster and to get the setup right with less effort every time. This boilerplate does that for me. Feel free to use it as you wish in your projects!

The boilerplate is created with SiteVision projects in mind but will probably work for any CMS. I will add setup for other CMSs in case I use this in other systems. 

My setup is:

- Development on OS X using IntelliJ IDEA, Web- or PhpStorm
- SiteVision CMS running on remote server
- Source code repo on GitHub
- Local webserver (using gulp-connect) to serve JS and CSS during development
- "Deploy" by building and pushing to GitHub Pages. The site will use the files at GitHub as a demo version during development. When the project is finished I will upload the files to the server.
  

## What's in the box

- [Gulp](http://gulpjs.com/) tasks.
- [Sass](http://sass-lang.com/).
- [Autoprefixer](https://github.com/postcss/autoprefixer).
- [Optimization of image assets](https://github.com/sindresorhus/gulp-imagemin).
- Images embedded (Base64 encoded) in CSS on demand.
- Script concatention
- Custom [Lodash](https://lodash.com/) builds based on usage in JS-files available.
- JSHint on build, .jshintrc for use by IDE.
- JSCS on build, .jscsrc for use by IDE. Uses customized version of [jQuery JS Style Guide](https://contribute.jquery.org/style-guide/js/)
- Serving assets from localhost
- Instructions and custom script modules for including files in SiteVision
- Bookmarklet to toggle dev- and production (or demo) mode
- Instructions for including files for finished site


## Set up a new project

Prerequisites: Node.js

### GitHub Repo

- Create a new GitHub repository for the project
- Create branch `gh-pages`
- Delete master
- Clone repo to your computer

### Add the boilerplate

- Clone (or update) Boilerplate repo
- Copy files to new project repo
- Delete this README and rename Project-example-README.md to README.md. This is what will show up on GitHub. Edit the file to fit the project.

### Edit project files

- Edit package.json (Name, description, GitHub URLs)
- Edit _config.yml (set project name)
- Run `$ npm install`

If you run into errors with installing gulp-sass, try `$ npm install node-sass --unsafe-perm` and `$ npm install` again. This is because node-sass is not pure JavaScript module, it includes binary component as well as the custom installation scripts.


### SiteVision project site setup

1. In your base template, create two script modules. One as early as possible in the page before all content, and one last in the page after all content. Copy portlet scripts from devmode-assetCssMain.vm to the first portlet and devmode-assetJsMain.vm to the last.

2. Create a new "Additional HEAD element" in classic mode with type Velocity and add content from additional-head-element.vm there.

3. Add metadata (as links): 

- assetJsMain
- assetCssMain
    
Set "Visible for roles" to "Administrator" for all.

Now you can build the site and deploy so you get your asset URLs. Point metadata in SiteVision to URLs on GitHub Pages.

### SiteVision project site changes when going live

1. Remove metadata assetJsMain and assetCssMain. Remove portlets (see [SiteVision project site setup](#sitevision-project-site-setup)). 

2. Upload JS and CSS to SiteVision file repository. 

3. In your base template, add CSS asset for your CSS file and JavaScript asset in body for your JS file.     


## How to use

As you work on your web project you will "deploy" by pushing code to GitHub Pages. Everytime you do that, the site will be updated with your newest code for the customer to look at and test.

When you write the code you will serve your JS and CSS from a local webserver (started by Gulp). You need to tell SiteVision to fetch from your localhost instead of from GitHub. You do that by passing a URL parameter: `?devmode=true`.


### Gulp

#### Gulp Watch

`$ gulp watch` or `$ gulp`

- Start local webserver
- Watch `_js` and `_sass` folders for changes
- Build and concatenate JS on change
- Compile Sass to CSS on change
- Build custom version of Lodash based on usage in files

Default URLs for local files:

- http://localhost:8080/main.js
- http://localhost:8080/main.css

#### Gulp Build

`$ gulp build`

- Run JSHint and JSCS to check scripts
- Build and concatenate JS
- Optimize images
- Compile Sass to CSS
- Build custom version of Lodash based on usage in files (optional)
- Autoprefixer

`$ gulp build --rev`

- Same as `$ gulp build` but will add a timestamp to the file name.


#### LiveReload

When you start your localhost server with `$ gulp watch`, a script will be injected that live reloads your website (uses Web Sockets).

`$ gulp watch --nolive` to disable


### Git

I always forget how to Git from the command line. These are the commands I will use 99.9 % of the time:

- `$ git status`
- `$ git commit -a`
- `$ git pull --rebase`
- `$ git push`

After a `$ gulp build` I will do the commands above in order, and that will push my changes to GitHub and my website will be updated for the customer.

### Optimized images

All image assets in `_assets` folder will be optimized on build. It's a lossless optimization, but you might still want to keep another copy of the image file elsewhere.


### Embedded images

By using the function data-uri in your Sass code you may choose to embed an image in your CSS, Base64 encoded. 

`background-image: data-uri( "foo.svg" )`


### Sass 

The folder structure is using [the 7-1 architecture pattern](http://sass-guidelin.es/#architecture). 

You will probably want to go through the files and remove stuff you do not want. 

Some stuff included:

- Normalize CSS
- `data-uri` function for embedding image assets
- `em` and `rem` helper functions  
- Example on how to use same background multiple times with only one include (see `_bgimg-extends.scss`)


### Init JS module

Modules (functions) in your JS that you want to invoke on certain pages should be initialized from the HTML. 

Example:

Put this anywhere in the HTML body:
`<script> _b.init.push( 'BV.fooBar' ) </script>`

On DOMContentLoaded the function BV.fooBar will be invoked.



### Lodash

You may use Lodash in your JS files, but must first uncomment one row in `gulpfile.js` so it is included in the build. 

Gulp will search for usage of Lodash and build a custom version with only the parts of Lodash that is needed.
 

### Autoprefixer

Autoprefixer will check your CSS files and add vendor prefixes if needed based on the latest information from [Can I Use](http://caniuse.com). You write CSS without worrying about vendor prefixes, like this:

```
.foo { transition: transform 1s; }
```

When you save the file, Autoprefixer transforms that rule into cross-browser CSS:

```
.foo { -webkit-transition: -webkit-transform 1s; transition: transform 1s }
```

