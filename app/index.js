var generators = require('yeoman-generator');
var libPage = require('../page/lib');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    // Since prompting is done asynchronously, then grab a callback to notify
    // the end of all prompts.
    var done = this.async();

    this.prompt({
      type    : 'input',
      name    : 'title',
      message : 'The title of your project',
      default : 'My App'
    }, function (answers) {
      this.apptitle = answers.title;
      done();
    }.bind(this));
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
      { title: this.apptitle }
    );

    // Loop through each of the following files, and simply copy them.
    [
      '.gitignore',
      'gulpfile.js',
      'package.json',
      'src/style/main.less',
      'src/style/README.md',
      // 'src/pages/HomePage/index.js',
      // 'src/pages/HomePage/index.less',
      // 'src/pages/HomePage/__tests__/index-test.js'
    ].forEach(function (filename) {
      this.fs.copy(
        this.templatePath(filename),
        this.destinationPath(filename)
      );
    }.bind(this));

    this.pagename = 'home';
    this.pagetitle = this.apptitle;

    libPage.writing.call(this);
  },

  install: function () {
    this.installDependencies({npm: true, bower: false});
  }
});
