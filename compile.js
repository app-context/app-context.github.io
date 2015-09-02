var harp = require('harp');
var marked = require('harp/node_modules/terraform/node_modules/marked');
var highlight = require('highlight.js');

marked.setOptions({
  langPrefix: '',
  highlight: function (code, language) {
    return language ? highlight.highlight(language, code).value : code;
  }
});

harp.compile('./_harp', '.', function() {
  console.log('DONE');
});
