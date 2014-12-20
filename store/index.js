var generators = require('yeoman-generator');
var lib = require('./lib');
var helper = require('../helpers');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    lib.prompt.bind(this)(function (err, storename) {
      this.storename = storename
      done();
    }.bind(this));
  },

  writing: function () {
    lib.create.bind(this)(this.storename);
  }
});