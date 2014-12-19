var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'title',
      message : 'The title of your project',
      default : 'My App'
    }, function (answers) {
      this.apptitle = answers.title;
      done();
    })
  }
});