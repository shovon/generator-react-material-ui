var generators = require('yeoman-generator');
var fs = require('fs');
var lib = require('./lib');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  prompting: lib.prompting,
  writing: lib.writing
});