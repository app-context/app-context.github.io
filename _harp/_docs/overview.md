`app-context` is a simple, reusable application context and bootloader for your
node.js applications. It provides a simple, structured way to initialize and
run your application and scripts in a common environment. Initialization is
split into run levels (similar to *NIX boot processes) and guarantee sequential
execution of each run level and initializer within a run level. When your
application code is run, the full context is always available at `APP`.

Just create your `app-context.js` and go!


```javascript
module.exports = function() {
  // initializers that run at the configured run level
  this.runlevel('configured')
    // attach a local config file to the context (available later at APP.config)
    .use(function(context) {
      context.config = require('./config.json');
    });

  // initializers that run at the connected run level
  this.runlevel('connected')
    // connect to mongodb using APP.config.mongodb (available later at APP.mongodb)
    .use('mongodb', '$mongodb')
    // connect to 2 redis servers (APP.config.redis.cache, APP.config.redis.sessions)
    // (available later at APP.redis.cache, APP.redis.sessions)
    .use('redis', {
      cache: '$redis.cache',
      sessions: '$redis.sessions'
    });

  // initializers that run at the running run level
  this.runlevel('running')
    // create, initialize, and start an express app
    .use('express');
};
```
