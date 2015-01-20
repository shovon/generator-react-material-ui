var generators = require('yeoman-generator');
var path = require('path');

var helpers = generators.test;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('pagename', {type: String, required: true});
  },
  prompting: function () {
    var done = this.async();
    this.prompt([
      {
        name: 'createview',
        type: 'confirm',
        message: 'Would you like to create a view?'
      },
      {
        when: function (response) {
          return response.createview
        },
        name: 'viewname',
        type: 'input',
        message: 'Name of view?',
        default: this.pagename
      },
      {
        when: function (response) {
          return response.createview
        },
        name: 'createstore',
        type: 'confirm',
        message: 'Would you like to create a store?'
      },
      {
        when: function (response) {
          return response.createstore
        },
        name: 'storename',
        type: 'confirm',
        message: 'Name of store?'
      }
    ], function (response) {
      this.createview = response.createview;
      this.viewname = response.viewname;
      this.createstore = response.createstore;
      this.storename = response.storename;
      done();
    }.bind(this));
  },
  writing: function () {
    var done = this.async();

    var destination = path.join(
      'src', 'pages', this._.classify(this.pagename) + 'Page'
    );

    // The CSS class name.
    var className = this.pagename.split(/\s+/).join('-');


    var generatePage = function () {
      this.fs.copy(
        this.templatePath('Page-test.js'),
        this.destinationPath(path.join(destination, '__tests__', 'index-test.js'))
      );

      if (this.createview && !this.createstore) {
        this.fs.copyTpl(
          this.templatePath('PageView.js'),
          this.destinationPath(path.join(destination, 'index.js')),
          {
            viewName: this._.classify(this.viewname),
            className: className
          }
        );
      } else if (this.createview && this.createstore) {
        this.fs.copyTpl(
          this.templatePath('PageFlux.js'),
          this.destinationPath(path.join(destination, 'index.js')),
          {
            viewName: this._.classify(this.viewname),
            className: className,
            storeName: this._.classify(this.storename)
          }
        )
      } else {
        this.fs.copyTpl(
          this.templatePath('Page.js'),
          this.destinationPath(path.join(destination, 'index.js')), {
            className: className,
            title: this.pagename.split(/\s+/).map(function (str) {
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
      path.join(__dirname, '..', 'view')
    ];

    if (this.createview) {
      helpers
        .testDirectory(this.destinationPath(), function (err) {
          if (err) { return done(err); }
          var generator =
            (path.basename(path.dirname(__dirname)) + ':view')
              .slice('generator-'.length);

          var react = helpers
            .createGenerator(generator, deps, [this.viewname], {
              'appPath': this.destinationPath(),
              'skip-welcome-message': true,
              'skip-install': true,
              'skip-message': true
            })

          helpers.mockPrompt(react, {
            createstore: this.createstore,
            storename: this.storename
          });

          react.run({}, generatePage);
        }.bind(this));

      return;
    }
    generatePage();
  }
});
