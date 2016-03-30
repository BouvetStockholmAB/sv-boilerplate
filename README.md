
# SiteVision Front End Boilerplate

Node, Gulp, Sass, Autoprefixer, minification, 
image optimization and embedding and more. 

*Created by Henrik Ekelöf at Bouvet Örebro in 2016.*


## Content

- [Why use this?](#why-use-this)
- [What's in the box](#whats-in-the-box)
- [Set up a new project](#set-up-a-new-project)
- [How to use](#how-to-use)


- [Sass setup](#sass)
- []()
- []()
- []()
- []()
- [Sass setup](#sass)
- [Setup](#setup)


## Why use this?

This boilerplate is a project setup kickstart with most of the frontend 
stuff I want to use in my web projects. I want to get started with 
building the site as fast as possible and do not want to set up the same 
things over and over for each project. This boilerplate does that for 
me. Feel free to use it as you wish in your projects!

The boilerplate is created with SiteVision projects in mind but will 
probably work for any CMS.

My setup is:

- Development on OS X using IntelliJ IDEA, Web- or PhpStorm
- SiteVision CMS on remote server
- Source code repo on GitHub
- "Deploy" is when I build and push to gh-pages. The site will use the
  files at GitHub during development. When the project is finished I 
  will upload the files to the server.
  

## What's in the box

- [Gulp](http://gulpjs.com/) tasks
- [Sass](http://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- CSS minification
- [Optimization of image assets](https://github.com/sindresorhus/gulp-imagemin)
- Base64 encoded and embedded images
- Script concatention and minification
- Setup for async loading of font-face fonts embedded in separate CSS
- Custom [Lodash](https://lodash.com/) builds based on usage in JS-files

- JSHint
- JSCS
- Local server

- Instructions for including files in SiteVision (HEAD velocity script)
- Bookmarklet to toggle dev- and production mode


## Set up a new project

## How to use

### Gulp

### Git

### Em

### Optimized images

### Embedded images

### Async font-face

### Sass 

- [Using the 7-1 architecture pattern](http://sass-guidelin.es/#architecture)



## How to use

`$ gulp`
`$ gulp watch`

`$ gulp build`

`$ gulp build --dev`

`$ git pull --rebase`
`$ git commit -a`
`$ git push`


?devmode=true



## Setup

### GitHub Repo

- Set up GitHub repo
- Create branch `gh-pages`
- Delete master
- Clone to your computer

- Clone (or update) Boilerplate repo
- Copy files to new project repo


### Project files

- Edit package.json
    - Name, description, GitHub URLs
- Edit _config.yml (set project name)
- Run `$ npm install`


### SiteVision

- Add content from additional-head-elements.vm to SiteVision
- Add metadata (links): assetJsMain, assetCssMain, assetCssFonts
- Point metadata to GitHub pages URLs when site is generated



### Fonts

- Remove ... if ...

