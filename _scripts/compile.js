var path = require('path');
var harp = require('harp');
var highlight = require('highlight.js');
var exec = require('child_process').exec;
var marked = require('harp/node_modules/terraform/node_modules/marked');

var BOWER_DEPENDENCIES = [
  '/bower_components/jquery/dist/jquery.min.js',
  '/bower_components/components-bootstrap/js/bootstrap.min.js',
  '/bower_components/font-awesome/fonts/*',
  '/bower_components/highlightjs/highlight.pack.min.js',
  '/bower_components/hogan.js/web/builds/3.0.2/hogan-3.0.2.min.js'
];

var root = path.join(__dirname, '..');
var dir = {
  root: root,
  harp: path.join(root, '_harp'),
  www: path.join(root, 'www')
};

marked.setOptions({
  langPrefix: '',
  highlight: function (code, language) {
    return language ? highlight.highlight(language, code).value : code;
  }
});

function compile(cb) {
  harp.compile(dir.harp, dir.www, function(err) {
    if (err && err.source !== 'Less') { return cb(err); }

    setTimeout(function() {
      var commands = [
        'cp -r ' + dir.harp + '/images ' + dir.www + '/',
        'cp -r ' + dir.harp + '/icons ' + dir.www + '/',
        'rm -rf ' + dir.www + '/bower_components'
      ];

      commands = commands.concat(
        BOWER_DEPENDENCIES.map(function(dep) {
          return 'mkdir -p ' + dir.www + path.dirname(dep) + ';cp ' + dir.harp + dep + ' ' + dir.www + path.dirname(dep) + '/';
        })
      );

      exec(commands.join(';'), function() {
        cb();
      });
    }, 2000);
  });
}

compile(function(err) {
  if (err) { return console.log(err); }
  console.log('DONE');
});
