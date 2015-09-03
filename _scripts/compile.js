var path = require('path');
var harp = require('harp');
var highlight = require('highlight.js');
var exec = require('child_process').exec;
var marked = require('harp/node_modules/terraform/node_modules/marked');

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
      exec([
        'cp -r ' + dir.harp + '/images ' + dir.www + '/',
        'cp -r ' + dir.harp + '/icons ' + dir.www + '/',
        'rm -rf ' + dir.www + '/bower_components',
        'mkdir -p ' + dir.www + '/bower_components/jquery/dist',
        'cp ' + dir.harp + '/bower_components/jquery/dist/jquery.min.js ' + dir.www + '/bower_components/jquery/dist/',
        'mkdir -p ' + dir.www + '/bower_components/components-bootstrap/js',
        'cp ' + dir.harp + '/bower_components/components-bootstrap/js/bootstrap.min.js ' + dir.www + '/bower_components/components-bootstrap/js/',
        'mkdir -p ' + dir.www + '/bower_components/font-awesome/fonts',
        'cp ' + dir.harp + '/bower_components/font-awesome/fonts/* ' + dir.www + '/bower_components/font-awesome/fonts/'
      ].join(';'), function() {
        cb();
      });
    }, 2000);
  });
}

compile(function(err) {
  if (err) { return console.log(err); }
  console.log('DONE');
});
