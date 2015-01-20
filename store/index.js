var generators = require('yeoman-generator');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function ()  {
    generators.Base.apply(this, arguments);
    this.argument('storename', {type: String, required: true});
  },
  writing: function () {
    var destination = path.join(
      'src', 'stores', this._.classify(this.storename) + 'Store'
    );

    this.fs.copy(
      this.templatePath('Store-test.js'),
      this.destinationPath(path.join(destination, '__tests__', 'index-test.js'))
    );

    this.fs.copy(
      this.templatePath('Store.js'),
      this.destinationPath(path.join(destination, 'index.js'))
    );
  }
});