`app-context` is a sequential bootloader and context for your node.js applications.

-- fill in awesome overview stuff here --


app-context is motivated by the middleware stack of libraries like express. app-context should provide an ordered initialization of your app and works on the idea of run levels. Each level is assured to be run in order so that you can make sure to load your configuration before trying to use it, or connect to your DBs before booting your HTTP server. The app-context also allows externalization of the boot process to different run levels. With one line of code you can load an application so that you can do things like create a REPL into your fully-initialized application context.
