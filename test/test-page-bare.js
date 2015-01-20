var helpers = require('yeoman-generator').test;
var path = require('path');

describe('react-material-ui:page-bare', function () {
  describe('no options', function () {
    var react;
    var appPath = 'myapp';
    var deps = [
      '../../../page-bare'
    ];
    var options = {
      'appPath': appPath,
      'skip-welcome-message': true,
      'skip-install': true,
      'skip-message': true
    };

    beforeEach(function (done) {
      helpers
        .testDirectory(path.join(__dirname, '.tmp', appPath), function (err) {
          if (err) { return done(err); }
          done();
        });
    });

    it('should generate an entirely new application', function () {
      var generator =
        (path.basename(path.dirname(__dirname)) + ':page-bare')
          .slice('generator-'.length);

      react = helpers
        .createGenerator(generator, deps, ['game player'], options);

      react.run({}, function () {
        helpers.assertFile([
          'src/pages/GamePlayerPage/index.js',
          'src/pages/GamePlayerPage/style.less',
          'src/pages/GamePlayerPage/__tests__/index-test.js',
        ]);

        helpers.assertFileContent(
          'src/pages/GamePlayerPage/index.js',
          /\s+<div className='game-player-page'>\n\s+Game Player/
        );

        helpers.assertFileContent(
          'src/pages/GamePlayerPage/style.less',
          /\.game-player-page/
        );
      });
    });
  });
});
