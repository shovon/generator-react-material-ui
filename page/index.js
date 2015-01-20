var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var helpers = generators.test;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('pagename', {type: String, required: true});
    this.argument('pagetitle', {type: String, required: true});
    this.option('no-inject', { type: Boolean });
  },
  writing: function () {
    var destination = path.join(
      'src', 'pages', this._.classify(this.pagename) + 'Page'
    );

    // The CSS class name.
    var className = this.pagename.split(/\s+/).join('-');

    var generatePage = function () {
      this.fs.copy(
        this.templatePath('Page-test.js'),
        this.destinationPath(path.join(destination, '__tests__', 'index-test.js'))
      );

      this.fs.copyTpl(
        this.templatePath('Page.js'),
        this.destinationPath(path.join(destination, 'index.js')), {
          className: className,
          title: this.pagename.split(/\s+/).map(function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
          }).join(' ')
        }
      );

      this.fs.copyTpl(
        this.templatePath('style.less'),
        this.destinationPath(path.join(destination, 'style.less')),
        {
          className: className
        }
      );

    }.bind(this);

    generatePage();

    if (this.options['no-inject']) {
      return;
    }

    var pages = [{
      name: this.pagename,
      text: this.pagetitle
    }];

    var appjsx = this.destinationPath('src/app.jsx');
    var file = fs.readFileSync(appjsx, 'utf-8');

    var lines = file.split(/\r?\n/g);
    var outfile = injectPages(lines, pages);
    fs.writeFileSync(appjsx, outfile, 'utf-8');
  }
});

/*
 * Extract the lines in which we want to inject stuff.
 */
function extract(lines, beginningtag, endingtag) {
  var start = null;
  var end = null;

  var i = 0;
  while (start === null) {
    if (beginningtag.test(lines[i])) {
      start = i;
    }
    i++;
    if (i >= lines.length) {
      throw new Error('Something is wrong with this file.');
    }
  }

  while (end === null) {
    if (endingtag.test(lines[i])) {
      end = i;
    }
    i++;
    if (i >= lines.length) {
      throw new Error('Something is wrong with this file.');
    }
  }

  var first = lines.slice(0, start + 1);
  var inbetween = lines.slice(start + 1, end);
  var last = lines.slice(end, lines.length);

  return {
    first: first,
    inbetween: inbetween,
    last: last
  }
}

/*
 * This will create a class name.
 */
function getClassName(name) {
  var className =
    name.slice(0, 1).toUpperCase() + name.slice(1, name.length) + 'Page';
  return className;
}

/*
 * Injects the requires.
 */
function injectRequire(lines, pages) {
  var props = extract(
    lines,
    /^\/\/(\s+)?inject:pagerequire$/,
    /^\/\/(\s+)?endinject$/
  );

  var first = props.first;
  var inbetween = props.inbetween;
  var last = props.last;

  var toInject = pages.map(function (page) {
    var className = getClassName(page.name);
    return (
      'var ' + className + ' = ' + 'require(\'./pages/' + className + '\');'
    )
  });

  return first.concat(inbetween).concat(toInject).concat(last);
};

/*
 * Injects the menu items.
 */
function injectMenuItems(lines, pages) {
  var props = extract(
    lines,
    /^(\s+)?\/\/(\s+)?inject:menuitems$/,
    /^(\s+)?\/\/(\s+)?endinject$/
  );

  var first = props.first;
  var inbetween = props.inbetween;
  var last = props.last;

  var toInject = pages.map(function (page) {
    return (
      '  { payload: \'' + page.name + '\', text: \'' + page.text + '\' },'
    );
  });

  return first.concat(inbetween).concat(toInject).concat(last);
}

/*
 * Inject the titles.
 */
function injectTitles(lines, pages) {
  var props = extract(
    lines,
    /^(\s+)?\/\/(\s+)?inject:titles$/,
    /^(\s+)?\/\/(\s+)?endinject$/
  );

  var first = props.first;
  var inbetween = props.inbetween;
  var last = props.last;

  var toInject = pages.map(function (page) {
    return (
      '  \'/' + page.name + '\': \'' + page.text + '\','
    );
  });

  return first.concat(inbetween).concat(toInject).concat(last);
}

/*
 * Inject the routes.
 */
function injectRoutes(lines, pages) {
  var props = extract(
    lines,
    /^(\s+)?\{(\s+)?\/\*(\s+)?inject:route(\s+)?\*\/(\s+)?}$/,
    /^(\s+)?\{(\s+)?\/\*(\s+)?endinject(\s+)?\*\/(\s+)?}$/
  );

  var first = props.first;
  var inbetween = props.inbetween;
  var last = props.last;

  var toInject = pages.map(function (page) {
    var className = getClassName(page.name);
    return (
      '    <Route name=\'' + page.name + '\' handler={' + className + '} />'
    );
  });

  return first.concat(inbetween).concat(toInject).concat(last);
}

/*
 * Merge the lines.
 */
function mergeLines(lines) {

  return lines.join('\n');
}

/*
 * Inject the pages into the lines.
 */
function injectPages(lines, pages) {
  lines = injectRequire(lines, pages);
  lines = injectMenuItems(lines, pages);
  lines = injectTitles(lines, pages);
  lines = injectRoutes(lines, pages);

  return mergeLines(lines);
}
