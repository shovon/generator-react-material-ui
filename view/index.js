var generators = require('yeoman-generator');
var async = require('async');
var storelib = require('../store/lib');
var helpers = require('../helpers');
var path = require('path');
var lib = require('./lib');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  prompting: lib.prompting,
  writing: lib.writing
});
