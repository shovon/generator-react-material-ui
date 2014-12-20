var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    var prompt = function () {
      this.prompt({
        type    : 'input',
        name    : 'storename',
        message : 'Name of your store (e.g. users)',
      }, function (answers) {
        if (!answers.storename.trim()) {
          this.log('Please enter a value');
          // Async to prevent stack overflows.
          setImmediate(function () {
            prompt();
          }.bind(this))
        }
        this.storename = answers.storename.trim();
        done();
      }.bind(this));
    }.bind(this);

    prompt();
  },

  writing: function () {
    var storename = this.storename.split(/\s+/).map(function (name) {
      return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    }).join('');
    this.log(storename);
    this.fs.copy(
      this.templatePath('Store.js'),
      this.destinationPath('src/stores/' + storename + 'Store.js')
    );
  }
});