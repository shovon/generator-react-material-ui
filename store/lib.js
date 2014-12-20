var helpers = require('../helpers');
var path = require('path');

var prompt = module.exports.prompt = function (callback) {
  this.prompt({
    type    : 'input',
    name    : 'storename',
    message : 'Name of your store (e.g. users)',
  }, function (answers) {
    if (!answers.storename.trim()) {
      this.log('Please enter a value');
      // Async to prevent stack overflows.
      return setImmediate(function () {
        prompt();
      });
    }
    callback(null, answers.storename.trim());
  });
};

module.exports.create = function (storename, filepath) {
  filepath = filepath || '';
  storename = helpers.createClassName(storename);
  var destPath =
    this.destinationPath('src/stores/' + storename + 'Store');
  this.fs.copy(
    path.join(filepath, 'Store.js'),
    path.join(destPath, 'index.js')
  );
  this.fs.copy(
    path.join(filepath, 'Store-test.js'),
    path.join(destPath, '__tests__', 'index-test.js')
  );
};