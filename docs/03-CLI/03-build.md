# Build
> :warning: To understand this manual please read [this](../04-blocks/02-env.md) first.

Imagine you're working on a web application, you have multiple builds, in this case you might have a JS version for `Electron` 
and one JS code for your online app.

In this case you can easily use `env` block in your code like this:
```esy
env electron{
    var fs  = require('fs')
}else{
    class CloudAPI{
        ...
    }
    // My cloud File System API
    var fs  = new CloudAPI();
}
```

By now you probably now that you can use this command to compile for `electorn` version:
```
esy compile index.esy -e "electron" -s electron.js
```

But what happens when your project starts becoming too big with so many included files and different platforms and environments?
In this case you can use `Esy One Step Build` to solve the problem

By now each build has a :
1. Unique Name
2. List of included files
3. List of environments

Tips:
> We'll support different config values in future (Maybe next main version)

> Don't worry it's not necessary to write name of all files, `Esy` uses `glob` package so you can use [glob expressions](https://www.npmjs.com/package/minimatch) to match file names.

> Each build generates two js file, [BuildName].js and [BuildName].min.js where the second file is auto minimized file. (We use `uglify-es` to support `ES6`)

## Add new build
Command: `esy build --add`

Run that command to add a new config, the program will asks you some questions and it'll generate the configuration it self.

## Build
Usage: `esy build [platforms..]`

You can use this command with no argument to build for all defined platforms:
```
esy build
```
But if you want to build for a specific platform you can easily run:
```
esy build [PlaformName]
```
even you can enter name of more than one platform.

## Config: build_dest
Default: `build`

Directory you want to save your builds.