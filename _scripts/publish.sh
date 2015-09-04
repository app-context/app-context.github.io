#!/bin/sh

ROOT_DIR=$(cd `dirname $0`/..; pwd)

rm -rf $ROOT_DIR/{bower_components,css,icons,images,*.html}
node $ROOT_DIR/_scripts/compile.js
mv $ROOT_DIR/www/* .
rmdir $ROOT_DIR/www
