var harp = require('harp');
var marked = require('harp/node_modules/terraform/node_modules/marked');
var highlight = require('highlight.js');

marked.setOptions({
  langPrefix: '',
  highlight: function (code, language) {
    return language ? highlight.highlight(language, code).value : code;
  }
});

harp.compile('./_harp', './www', function(err) {
  if (err) { console.log(err.stack); }
  console.log('DONE', arguments);
});
