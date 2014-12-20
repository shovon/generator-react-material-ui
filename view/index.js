var generators = require('yeoman-generator');
var async = require('async');
var storelib = require('../store/lib');
var helpers = require('../helpers');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    var promptViewname = function (callback) {
      // Get the view's name from the user.
      this.prompt({
        type    : 'input',
        name    : 'viewname',
        message : 'Name of your view (e.g. users)',
      }, function (answers) {
        if (!answers.viewname.trim()) {
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

    // Prompt the user whether or not they want to initialize a store along
    // with the view.
    var promptInitializeStore = function (callback) {
      this.prompt({
        type   : 'input',
        name   : 'shouldinitialize',
        message: 'Would you like to initialize a store?',
        default: 'no'
      }, function (answers) {
        this.shouldInitializeStore =
          /^y(e(s|ah?)?)?$/.test(answers.shouldinitialize.trim().toLowerCase());
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
        // Prompt the user for the store name, only if the user requested that
        // a new store is created.
        if (this.shouldInitializeStore) {
          return storelib.prompt.bind(this)(function (err, storename) {
            this.storename = storename;
            callback(null);
          }.bind(this));
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
    var viewClassName = helpers.createClassName(this.viewname);

    if (this.shouldInitializeStore) {
      var storeClassName = helpers.createClassName(this.storename);
      var storepath = path.resolve(
        this.templatePath(),
        '..',
        '..',
        'store',
        'templates'
      );
      this.fs.copyTpl(
        this.templatePath('ViewStore.js'),
        this.destinationPath('src/views/' + viewClassName + 'View.js'),
        { name: this.viewname, storename: storeClassName + 'Store' }
      );
      storelib.create.bind(this)(this.storename, storepath);
      return;
    }

    this.fs.copyTpl(
      this.templatePath('View.js'),
      this.destinationPath('src/views/' + viewClassName + 'View.js'),
      { name: this.viewname }
    );
  }
});