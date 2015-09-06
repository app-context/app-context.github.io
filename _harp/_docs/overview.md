`app-context` is a simple, reusable application context and bootloader for your
node.js applications. It provides a simple, structured way to initialize and
run your application and scripts in a common environment. Initialization is
split into run levels (similar to *NIX boot processes) and guarantee sequential
execution of each run level and initializer within a run level. When your
application code is run, the full context is always available at `APP`.

Just create your `app-context.js` and go!


```javascript
module.exports = function() {
  this.runlevel('configured')
    .use('connie', 'file', 'config/${environment}.json');

  this.runlevel('connected')
    .use('mongodb', '$mongodb')
    .use('redis', {
      cache: '$redis.cache',
      sessions: '$redis.sessions'
    });

  this.runlevel('running')
    .use('express');
};
```
