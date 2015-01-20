var helpers = require('yeoman-generator').test;
var path = require('path');

describe('react-material-ui:view', function () {
  describe('no options', function () {
    var react;
    var appPath = 'myapp';
    var deps = [
      '../../../view'
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

    it('should generate a view', function (done) {
      var generator =
        (path.basename(path.dirname(__dirname)) + ':view')
          .slice('generator-'.length);

      var react = helpers
        .createGenerator(generator, deps, ['game player'], options)

      helpers.mockPrompt(react, {
        createstore: false
      });

      react
        .run({}, function () {
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

          done();
        });
    });

    it('should generate a view with a store', function (done) {
      var generator =
        (path.basename(path.dirname(__dirname)) + ':view')
          .slice('generator-'.length);

      var react = helpers
        .createGenerator(generator, deps, ['game player'], options)

      helpers.mockPrompt(react);

      react
        .run({}, function () {
          helpers.assertFile([
            'src/views/GamePlayerView/style.less',
            'src/views/GamePlayerView/index.js',
            'src/views/GamePlayerView/__tests__/index-test.js',
            'src/stores/GamePlayerStore/index.js',
            'src/stores/GamePlayerStore/__tests__/index-test.js',
          ]);

          helpers.assertFileContent(
            'src/views/GamePlayerView/index.js',
            /\s+<div className='game-player-view'>\n\s+Game Player/
          );

          helpers.assertFileContent(
            'src/views/GamePlayerView/style.less',
            /\.game-player-view/
          );

          helpers.assertFileContent(
            'src/views/GamePlayerView/index.js',
            'mixins: [helpers.FluxMixin, StoreWatchMixin(\'GamePlayerStore\')],'
          );

          done();
        });
    });
  });
});
