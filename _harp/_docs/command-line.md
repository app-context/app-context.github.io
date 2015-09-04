`app-context` ships with a convenient command-line to work with your
application in a simple and standard way. Every command will load your application
context, boot to a certain run level, and then take an action.

## app-context config

Loads to the `configured` run level and then prints the contents of `APP.config`.

## app-context console

Loads to the `initialized` run level and then will create a node REPL that has
your application context already loaded and initialized. This is great for
debugging your app's environment (via `APP`).

The REPL also has built-in support for promises. If you run a method that returns
a promise, the REPL will print the result of the promise when it is resolved or
print the error if it is rejected. For callbacks, there is a helper method to
do the same thing through `$_`. So you can do `fs.readFileSync('./config.json', $_)`.

## app-context run &lt;script&gt;

Loads to the `initialized` run level and then executes the script that you pass
in. When the script finishes (resolves it's promise or calls it's callback)
the application will be exited. This is very similar to `start`, but can be used
to execute any script in the same environment as your full application.

In order for `app-context` to know when your script has completed, you must export
a method or an object with a key named `execute` that is a method. Your method
will be passed the application context and can signal that it is finished by
returning a promise or taking a second parameter as a callback.

For example, this method will be called and the application will be exited
when it finishes.

```javascript
// context is the same as APP
module.exports = function(context) {
  foo();
  bar();
};
```

Here, the method will be called and the application will be exited when the
promise is resolved.

```javascript
module.exports = function(context) {
  return promisedFoo();
};
```

This time we use a callback.

```javascript
module.exports = function(context, done) {
  foo(function(err) {
    if (err) { return done(err); }
    console.log('YAY');
    done();
  })
};
```

## app-context start

Loads to the `running` run level. When the last initializer finishes
(resolves it's promise or calls it's callback) the application will be
exited using `process.exit()`. `start` will also exit the application if `SIGINT`
is sent to the process.

`start` is great to use with your web app or long-running process. To have your
process never exit, just don't close out the final initializer. For instance:

```javascript
module.exports = function() {
  this.runlevel('running')
    .use(function(context, done) {
      // kick off some long-running job
      // don't call done
    });
};
```

This application can still be exited by sending it a `SIGINT` (pressing CTRL-C).
