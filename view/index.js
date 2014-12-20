var generators = require('yeoman-generator');
var async = require('async');
var storelib = require('../store/lib');
var helpers = requier('../helpers');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    var promptViewname = function (callback) {
      this.prompt({
        type    : 'input',
        name    : 'viewname',
        message : 'Name of your view (e.g. users)',
      }, function (answers) {
        if (!answers.storename.trim()) {
          this.log('Please enter a value');
          // Async to prevent stack overflows.
          setImmediate(function () {
            prompt();
          }.bind(this))
        }
        this.viewname = answers.viewname.trim();
        callback(null);
      }.bind(this));
    }.bind(this);

    var promptInitializeStore = function (callback) {
      this.prompt({
        type   : 'input',
        name   : 'shouldinitialize',
        message: 'Would you like to initialize a store?',
        default: 'no'
      }, function (answers) {
        this.shouldInitializeStore =
          /^y(e(s|ah?)?)?$/.test(answers.viewname.trim().toLowerCase());
        callback(null);
      }.bind(this));
    }.bind(this);

    async.waterfall([
      function (callback) {
        promptViewname(callback);
      }.bind(this),

      function (callback) {
        promptInitializeStore(callback);
      }.bind(this),

      function (callback) {
        if (this.shouldInitializeStore) {
          return lib.prompt.bind(this)(function () {
            callback(null);
          });
        }
        setImmediate(function () {
          callback(null);
        });
      }.bind(this)
    ], function () {
      done();
    }.bind(this));
  },

  writing: function () {
    if (this.shouldInitializeStore) {
      var storeClassname = helpers.createClassName();
    }
  }
});