var generators = require('yeoman-generator');
var async = require('async');
var fs = require('fs');

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

function getClassName(name) {
  var className =
    name.slice(0, 1).toUpperCase() + name.slice(1, name.length) + 'Page';
  return className;
}

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

function mergeLines(lines) {
  return lines.join('\n');
}

function injectPages(lines, pages) {
  lines = injectRequire(lines, pages);
  lines = injectMenuItems(lines, pages);
  lines = injectTitles(lines, pages);
  lines = injectRoutes(lines, pages);

  return mergeLines(lines);
}

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    var prompt = function (options, callback) {
      this.prompt(options, function (answers) {
        if (!answers[options.name].trim()) {
          this.log('Please enter a value');
          // Async to prevent stack overflows.
          setImmediate(function () {
            prompt();
          }.bind(this))
        }
        callback(null, answers)
      }.bind(this));
    }.bind(this);

    async.waterfall([
      function (callback) {
        prompt({
          type    : 'input',
          name    : 'pagename',
          message : 'Name of your page (e.g. users)'
        }, function (err, answers) {
          this.pagename = answers.pagename.trim();
          callback(null);
        }.bind(this));
      }.bind(this),

      function (callback) {
        prompt({
          type    : 'input',
          name    : 'pagetitle',
          message : 'What should be the page\'s title?'
        }, function (err, answers) {
          this.pagetitle = answers.pagetitle.trim();
          callback(null);
        }.bind(this));
      }.bind(this)
    ], function () {
      done();
    });
  },

  writing: function () {
    var pagename = this.pagename.split(/\s+/).map(function (name, i) {
      if (i === 0) { return name; }
      return name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    }).join('');
    var pagenameClass =
      pagename.slice(0, 1).toUpperCase() +
      pagename.slice(1, pagename.length);
    var title = this.pagetitle;
    var destpath = 'src/pages/' + pagenameClass + 'Page/';
    this.fs.copyTpl(
      this.templatePath('Page.js'),
      this.destinationPath(destpath + 'index.js'),
      {
        name: pagename,
        title: title
      }
    );
    this.fs.copyTpl(
      this.templatePath('style.less'),
      this.destinationPath(destpath + 'style.less'),
      { name: pagename }
    );
    this.fs.copy(
      this.templatePath('Page-test.js'),
      this.destinationPath(destpath + '__tests__' + '/index-test.js')
    );

    var appjsx = this.destinationPath('src/app.jsx');
    var file = fs.readFileSync(appjsx, 'utf-8');

    var pages = [{
      name: pagename,
      text: title
    }];

    var lines = file.split(/\r?\n/g);
    
    var outfile = injectPages(lines, pages);
    fs.writeFileSync(appjsx, outfile, 'utf-8');
  }
});