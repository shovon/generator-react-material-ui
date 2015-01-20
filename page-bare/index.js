var generators = require('yeoman-generator');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('pagename', {type: String, required: true});
  },
  writing: function () {
    var destination = path.join(
      'src', 'pages', this._.classify(this.pagename) + 'Page'
    );

    // The CSS class name.
    var className = this.pagename.split(/\s+/).join('-');

    this.fs.copyTpl(
      this.templatePath('Page.js'),
      this.destinationPath(path.join(destination, 'index.js')), {
        className: className,
        title: this.pagename.split(/\s+/).map(function (str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }).join(' ')
      }
    );

    this.fs.copyTpl(
      this.templatePath('style.less'),
      this.destinationPath(path.join(destination, 'style.less')), {
        className: className
      }
    );
  }
});
