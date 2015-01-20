var generators = require('yeoman-generator');
var path = require('path');

var helpers = generators.test;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('apptitle', {type: String, required: true});
  },

  writing: function () {
    // Copy the index.html, and inject some values.
    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      { title: this.apptitle }
    );

    // Copy the main entry point, while also injecting some values.
    this.fs.copyTpl(
      this.templatePath('src/app.jsx'),
      this.destinationPath('src/app.jsx'),
      { apptitle: this.apptitle }
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    // Loop through each of the following files, and simply copy them.
    [
      'gulpfile.js',
      'package.json',
      'src/helpers.js',
      'src/style/main.less',
      'src/style/README.md'
    ].forEach(function (filename) {
      this.fs.copy(
        this.templatePath(filename),
        this.destinationPath(filename)
      );
    }.bind(this));

    var pagePath = path
      .resolve(this.templatePath(), '..', '..', 'page', 'templates');
    this.fs.copyTpl(
      path.join(pagePath, 'Page.js'),
      this.destinationPath('src/pages/HomePage/index.js'),
      {
        className: 'home',
        title: this.apptitle
      }
    );

    this.fs.copyTpl(
      path.join(pagePath, 'style.less'),
      this.destinationPath('src/pages/HomePage/style.less'),
      {
        className: 'home',
        title: this.apptitle
      }
    );

    this.fs.copy(
      path.join(pagePath, 'style.less'),
      this.destinationPath('src/pages/HomePage/__tests__/index.js')
    );
  },

  install: function () {
    this.installDependencies({npm: true, bower: false});
  }
});
