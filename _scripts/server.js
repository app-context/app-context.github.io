var path = require('path');
var harp = require('harp');
var highlight = require('highlight.js');
var marked = require('harp/node_modules/terraform/node_modules/marked');

var root = path.join(__dirname, '..');

marked.setOptions({
  langPrefix: '',
  highlight: function (code, language) {
    return language ? highlight.highlight(language, code).value : code;
  }
});

harp.server(path.join(root, '_harp'), {port: 9000}, function() {
  console.log('Listening on port 9000');
});
