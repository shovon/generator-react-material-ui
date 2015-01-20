var helpers = require('yeoman-generator').test;
var path = require('path');

describe('react-material-ui:view', function () {
  describe('no options', function () {
    var react;
    var appPath = 'myapp';

    beforeEach(function (done) {
      var deps = [
        '../../../view'
      ];
      helpers
        .testDirectory(path.join(__dirname, '.tmp', appPath), function (err) {
          if (err) { return done(err); }
          var generator =
            (path.basename(path.dirname(__dirname)) + ':view')
              .slice('generator-'.length);
          react = helpers.createGenerator(generator, deps, ['game player'], {
            'appPath': appPath,
            'skip-welcome-message': true,
            'skip-install': true,
            'skip-message': true
          });
          done();
        });
    });

    it('should generate an entirely new application', function () {
      react.run({}, function () {
        helpers.assertFile([
          'src/views/GamePlayerView/style.less',
          'src/views/GamePlayerView/index.js',
          'src/views/GamePlayerView/__tests__/index-test.js',
        ]);

        helpers.assertFileContent(
          'src/views/GamePlayerView/index.js',
          /\s+<div className='game-player-view'>\n\s+Game Player/
        );

        helpers.assertFileContent(
          'src/views/GamePlayerView/style.less',
          /\.game-player-view/
        );
      });
    });
  });
});
