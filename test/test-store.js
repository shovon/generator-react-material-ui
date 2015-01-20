var helpers = require('yeoman-generator').test;
var path = require('path');

describe('react-material-ui:store', function () {
  describe('no options', function () {
    var react;
    var appPath = 'myapp';

    beforeEach(function (done) {
      var deps = [
        '../../../store'
      ];
      helpers
        .testDirectory(path.join(__dirname, '.tmp', appPath), function (err) {
          if (err) { return done(err); }
          var generator =
            (path.basename(path.dirname(__dirname)) + ':store')
              .slice('generator-'.length);
          react = helpers.createGenerator(generator, deps, ['game player'], {
            'appPath': appPath,
            'skip-welcome-message': true,
            'skip-install': true,
            'skip-message': true,
            'storename': 'game player'
          });
          done();
        });
    });

    it('should generate an entirely new application', function (done) {
      react.run({}, function () {
        helpers.assertFile([
          'src/stores/GamePlayerStore/index.js',
          'src/stores/GamePlayerStore/__tests__/index-test.js',
        ]);
        done();
      });
    });
  });
});
