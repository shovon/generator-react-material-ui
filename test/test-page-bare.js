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

    it('should simply generate a new page', function (done) {
      var generator =
        (path.basename(path.dirname(__dirname)) + ':page-bare')
          .slice('generator-'.length);

      react = helpers
        .createGenerator(generator, deps, ['game player'], options);

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

    it('should generate a page with a view', function (done) {
      var generator =
        (path.basename(path.dirname(__dirname)) + ':page-bare')
          .slice('generator-'.length);

      react = helpers
        .createGenerator(generator, deps, ['game player'], options);

      helpers.mockPrompt(react, {
        createview: true,
        viewname: 'game player',
        createstore: false
      });

      react.run({}, function () {
        helpers.assertFile([
          'src/pages/GamePlayerPage/index.js',
          'src/pages/GamePlayerPage/style.less',
          'src/pages/GamePlayerPage/__tests__/index-test.js',
          'src/views/GamePlayerView/index.js',
          'src/views/GamePlayerView/style.less',
          'src/views/GamePlayerView/__tests__/index-test.js'
        ]);

        helpers.assertFileContent(
          'src/pages/GamePlayerPage/index.js',
          'var GamePlayerView = require(\'../../views/GamePlayerView\');'
        );

        helpers.assertFileContent(
          'src/pages/GamePlayerPage/index.js',
          '<GamePlayerView />'
        );
        done();
      });
    });
  });
});
