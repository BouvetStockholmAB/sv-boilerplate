
# {PROJECT_NAME}

Static script files and stylesheets are deployed to [GitHub Pages](https://bouvetstockholmab.github.io/{project_name}/).

You may include them directly from there during development, but upload them to SiteVision when you're done.

Site metadata pointing to JS and CSS files are changed on the site node. 


## Dev. project setup

1. Install Node JS
2. Checkout project from Git
3. Open project folder in terminal
4. `$ npm install`
5. There is no point 5.


## Working in dev project

### Code style

JS code style follows [jQuery Style Guide](https://contribute.jquery.org/style-guide/js/) JSCS preset with some whitespace exceptions (look in file .jscsrc).

Code style and hinting is done on build (JSCS & JSHint).


### Local development

`$ gulp` (equals `$ gulp watch`)

- Starts a local server at localhost:8080
- Watches for changes to JS and CSS files
- URL parameter sets website in devmode and will
  use JS- and CSS-files from localhost: 
  http://www.example.com/?devmode=true 


Use the Devmode bookmarklet for easy toggle between devmode and production:

[http://henrikekelof.github.io/devmode/](http://henrikekelof.github.io/devmode/)


### Build for distribution

`$ gulp build`

- Builds minified files for production to ./dist directory.
- Commit and push to GitHub or upload to SiteVision file storage
  depending on where your metadata is pointing.

`$ gulp build --rev` 

- Builds minified files for production to ./dist directory with timestamp
  in file name.
