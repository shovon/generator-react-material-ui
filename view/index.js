var generators = require('yeoman-generator');
var async = require('async');
var path = require('path');

// TODO: an ugly hack is used. Find an alternative.

// A hack to allow for conditional store generation.
var helpers = generators.test;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('viewname', {type: String, required: true});
  },

  prompting: function () {
    var done = this.async();
    this.prompt([
      {
        name: 'createstore',
        type: 'confirm',
        message: 'Would you like to create a store?'
      },
      {
        when: function (response) {
          return response.createstore
        },
        name: 'storename',
        type: 'input',
        message: 'Name of store?',
        default: this.viewname
      }
    ], function (response) {
      this.createstore = response.createstore;
      this.storename = response.storename;
      done();
    }.bind(this));
  },

  writing: function () {
    var done = this.async();

    var destination = path.join(
      'src', 'views', this._.classify(this.viewname) + 'View'
    );

    var className = this.viewname.split(/\s+/).join('-');

    var generateView = function () {
      this.fs.copy(
        this.templatePath('View-test.js'),
        this.destinationPath(
          path.join(destination, '__tests__', 'index-test.js')
        )
      );

      if (this.createstore) {
        this.fs.copyTpl(
          this.templatePath('ViewStore.js'),
          this.destinationPath(path.join(destination, 'index.js')),
          {
            storename: this._.classify(this.storename),
            className: className,
            title: this.viewname.split(/\s+/).map(function (str) {
              return str.charAt(0).toUpperCase() + str.slice(1);
            }).join(' ')
          }
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('View.js'),
          this.destinationPath(path.join(destination, 'index.js')),
          {
            className: className,
            title: this.viewname.split(/\s+/).map(function (str) {
              return str.charAt(0).toUpperCase() + str.slice(1);
            }).join(' ')
          }
        );
      }

      this.fs.copyTpl(
        this.templatePath('style.less'),
        this.destinationPath(path.join(destination, 'style.less')),
        {
          className: className
        }
      );

      done();
    }.bind(this);

    var deps = [
      path.join(__dirname, '..', 'store')
    ];

    if (this.createstore) {
      helpers
        .testDirectory(this.destinationPath(), function (err) {
          if (err) { return done(err); }
          var generator =
            (path.basename(path.dirname(__dirname)) + ':store')
              .slice('generator-'.length);
          helpers
            .createGenerator(generator, deps, [this.storename], {
              'appPath': this.destinationPath(),
              'skip-welcome-message': true,
              'skip-install': true,
              'skip-message': true
            })
            .run({}, generateView);
        }.bind(this));

      return;
    }

    generateView();
  }
});
