var generators = require('yeoman-generator');
var path = require('path');

var helpers = generators.test;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('pagename', {type: String, required: true});
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

    generatePage();
  }
});
