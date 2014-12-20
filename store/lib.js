var helpers = require('../helpers');

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
  filepath = filepath || 'Store.js';
  storename = helpers.createClassName(storename);
  console.log(filepath);
  this.fs.copy(
    filepath,
    this.destinationPath('src/stores/' + storename + 'Store.js')
  );
};