var helpers = require('yeoman-generator').test;
var path = require('path');

describe('react-material-ui:page', function () {
  describe('no options', function () {
    var react;
    var appPath = 'myapp';
    var deps = [
      '../../../page'
    ];
    var options = {
      'appPath': appPath,
      'skip-welcome-message': true,
      'skip-install': true,
      'skip-message': true,
      'no-inject': true
    };

    beforeEach(function (done) {
      helpers
        .testDirectory(path.join(__dirname, '.tmp', appPath), function (err) {
          if (err) { return done(err); }
          done();
        });
    });

    it('should simply generate a new page', function (done) {
      var generator =
        (path.basename(path.dirname(__dirname)) + ':page')
          .slice('generator-'.length);

      react = helpers
        .createGenerator(
          generator, deps, ['game player', 'Game Player'], options
        );

      helpers.mockPrompt(react, {
        createview: false
      });

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
        done();
      });
    });
  });
});
