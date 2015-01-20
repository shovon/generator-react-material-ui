var generators = require('yeoman-generator');
var async = require('async');
var path = require('path');
var Store = require('../store');

// TODO: an ugly hack is used. Find an alternative.

// A hack to allow for conditional store generation.
var helpers = generators.test;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('viewname', {type: String, required: true});
  },

  writing: function () {
    var destination = path.join(
      'src', 'views', this._.classify(this.viewname) + 'View'
    );

    var className = this.viewname.split(/\s+/).join('-');

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

    if (this.createstore) {
      Store.prototype.writing.apply(this, arguments);
    }
  }
});
