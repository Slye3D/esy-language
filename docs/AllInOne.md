<!---  .  -->
# Esy Docs

### Table of contents:
1. [Introduction](https://github.com/Slye-team/esy-language/tree/master/docs/01-introduction)
2. [Installation](https://github.com/Slye-team/esy-language/tree/master/docs/02-installation)
3. [CLI](https://github.com/Slye-team/esy-language/tree/master/docs/03-CLI)
4. [Blocks](https://github.com/Slye-team/esy-language/tree/master/docs/04-blocks)
<!-- 5. [~~Core API~~](https://github.com/Slye-team/esy-language/tree/master/docs/05-api) -->
____________________
> This project is not complete yet, see [here](https://github.com/Slye-team/esy-language/blob/master/README.md) fot more info.<!---  ./01-introduction  -->
# Introduction
**Esy** is a JavaScript preprocessor, which means it compiles `*.esy` files into `*.js`

## What can I do with **Esy**?
By using **Esy** you won't lose any core JavaScript abilities but you'll be able to run some fantastic `esy blocks`!

### What is an `esy block`?
The base feature of **Esy** is that it allows you to use more predefined blocks and define your own blocks, which gives 
you the ability to write shorter codes and more neat codes.

> You can read more about blocks in [Chapter 4](../04-blocks)

## SPE (Simplest Possible Example)
Imagine the following code:
```js
setTimeout(function(){
	console.log("Esy!");
}, 500);
```
By using **Esy** you'll be able to write this code instead of the previous one:
```esy
timeout 500{
    console.log("Esy!");
}
```
which is more readable than the standard JavaScript code.
> timeout is one of Esy's predefined blocks.

## Run example
To run the example code just go to [chapter 2](../02-installation)<!---  ./02-installation  -->
# Installation
**Esy** is available as an NPM package, you can install it by running:
```bash
npm install esy-language -g
```
By running this command you'll be able to run `esy` command
> For more information about using the CLI, see [Chapter 3](../03-cli)
## Compile example
To use `esy compiler` you have to have your code in a file,
let's save this example in a file and call it `hello.esy`
```esy
timeout 500{
    console.log("Esy!");
}
```
After installing **Esy**  you can use the `esy` command, then `cd` to which dir you've stored `hello.esy` and run:
```bash
esy compile hello.esy
```
It'll print the result in your terminal, to save the output file, run:
```bash
esy compile hello.esy -s [filename.js]
```
If you don't pass the filename, it would be `hello.js` as default.<!---  ./03-CLI  -->
# CLI
**Esy** has a much easy to use command line interface (CLI) that you can manage your project with

## Basics
1. [Options](./00-options.md)
2. [Compile](./01-compile.md)
3. [Config](./02-config.md)
## Advanced
4. [Build](./03-build.md)
5. [Cache](./04-cache.md)
6. [Modules](./05-modules.md)
# CLI Options
Along with specific options that exists for special commands (like: compile,cache,etc..), there are some `Global Options` that you can use in every scope of program.

Like `--help` option that shows you all possible options and commands.

## Options
```
  --help              Show help                                        [boolean]
  --config, -c        config.json src             [string] [default: "esy.json"]
  --environments, -e  Set project's environments                         [array]
```
**--help**: Shows all possible options & commands with a brief description.

**--config, -c**: Set path of Esy `Config file`, like many other programs Esy makes a configuration file in your project's directory
to store the project configs. (Default file is `esy.json`)

**environments, -e**: Use this option to set set change `program's environments` just in run time.
> To read more about `program's environments` visit the docs on `env block`# Compile
Let's start with the most useful command: `compile`

Use this command to compile `Esy` files to JavaScript

## Usage
`esy compile [files..]`

This command gives name of some Esy files and convert them to JavaScript, by default it shows output in Terminal.

Example: 
```
1. esy compile a.esy b.esy c.esy            # Print result to terminal
2. esy compile a.esy b.esy c.esy -s         # Save results in esy.js
3. esy compile a.esy -s                     # Save results in a.js
4. esy compile a.esy b.esy -s compiled.js   # Save results in compiled.js
```
## Options
```
Options:
  --help              Show help                                        [boolean]
  --config, -c        config.json src             [string] [default: "esy.json"]
  --environments, -e  Set project's environments                         [array]
  --save, -s          Save file in same directory               [default: false]
  --tree, -t          Just print parsed code tree               [default: false]

```
**--save, -s**: Use this option to save output to a file instead of terminal.

**--tree, -t**: If turn this option on, It'll show you generated Esy `Structure Tree` in JSON format.
> Note: -tree option won't work with multiple files# Config
Usage: `esy config <command> <key> [values..]`

Basically `config` command is used to manage project's configurations, there are some operations you can do on configs like `set` a new value or `get` value of existing commands.

Let's see these operations in detail.

## Set
Usage: `esy config set <key> <value>`

Set a config value.

Example:
```
esy config set "beautify.indent_size" 4
```
Sample file before & after:

Before Change
```json
{
    "beautify": {
        "indent_size": 2
    }
}
```
After running command:
```json
{
    "beautify": {
        "indent_size": 4
    }
}
```

## Get
Use this command to get a value from configs

Sample file:
```json
{
    "a": 50,
    "beautify": {
        "indent_size": 4
    },
    "environment": [
        "test"
    ]
}
```
Examples running on sample:
```
esy config get a                        # 50
esy config get beautify.indent_size     # 4
```
Longer outputs
```
esy config get beautify 
```
Result:
```
{ indent_size: 4,
  indent_char: ' ',
  indent_with_tabs: false,
  eol: '\n',
  end_with_newline: false,
  indent_level: 0,
  preserve_newlines: true,
  max_preserve_newlines: 10,
  space_in_paren: false,
  space_in_empty_paren: false,
  jslint_happy: false,
  space_after_anon_function: false,
  brace_style: 'collapse',
  break_chained_methods: false,
  keep_array_indentation: false,
  unescape_strings: false,
  wrap_line_length: 0,
  e4x: false,
  comma_first: false,
  operator_position: 'before-newline' }
```
This output is useless if we want to use it somewhere else, so what should we do if we want to see data in a better way?
Well we can use `--json, -j` option to print data in JSON mode, let's try.
```
esy config get beautify -j
```
Result:
```json
{"indent_size":4,"indent_char":" ","indent_with_tabs":false,"eol":"\n","end_with_newline":false,"indent_level":0,"preserve_newlines":true,"max_preserve_newlines":10,"space_in_paren":false,"space_in_empty_paren":false,"jslint_happy":false,"space_after_anon_function":false,"brace_style":"collapse","break_chained_methods":false,"keep_array_indentation":false,"unescape_strings":false,"wrap_line_length":0,"e4x":false,"comma_first":false,"operator_position":"before-newline"}
```
Now we have a JSON data that a computer can easily understand, but what about ourselves? just use `--beauty, -b` option to get JSON data in human-readable mode.
```
esy config get beautify -jb
```
Result:
```json
{
    "indent_size": 4,
    "indent_char": " ",
    "indent_with_tabs": false,
    "eol": "\n",
    "end_with_newline": false,
    "indent_level": 0,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "space_in_paren": false,
    "space_in_empty_paren": false,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "break_chained_methods": false,
    "keep_array_indentation": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "e4x": false,
    "comma_first": false,
    "operator_position": "before-newline"
}
```
Now every thing is fine!
> Note: if you compare the sample file and the outputs you see a lot of differences, 
that's because `Esy` use a lot of configurations by default.

## lpush
Usage: `esy config lpush <key> [values..]`

You can push a value or more to a list (array) with this command

Imagine the following configs:
```json
{
  "a": 5,
  "something": []
}
```
and we run this commandL
```
esy config lpush something "Hello World!" "Another value"
```
esy.json:
```json
{
    "a": 5,
    "something": [
        "Hello World!",
        "Another value"
    ]
}
```
And we can even run this command on another non-existing key:
```
esy config lpush "non-existing" "Esy is amazing!"
```
esy.json 
```json
{
    "a": 5,
    "something": [
        "Hello World!",
        "Another value"
    ],
    "non-existing": [
        "Esy is amazing!"
    ]
}
```
But what happens if we run this command on a non-array type, like `a` which is an integer? Well, we'll get an error.
```
[qti3e@funland examples]$ esy config lpush a "Esy is amazing!"
<a> is not an array
```

## lrem
Usage: `esy config lrem <key> <values..>`

It's completely like `lpush` command but it removes a value from a list.
> Read `lpush` section to find more about this command# Build
> :warning: To understand this manual please read [this]() first.

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

Directory you want to save your builds.# Cache
Usage: `esy cache <command>`

Esy uses a cache system which saves the function returns into files in `cache directory`

You can do some operations related to cache system with the following commands:

## Clean
Usage: `esy cache clean`

Remove cache directory manually when it's needed.

## Dir
Usage: `esy cache dir`

Get full path of cache storage

## Disable
Usage: `esy cache disable`

Disable cache system, good when you're working on an external module and you don't want Esy to cache the results.

## Enable
Usage: `esy cache enable`

Enable cache functionality.

## Status
Usage: `esy cache status`

Determine cache system status, `active` or `deactive`# Modules
Usage: `esy modules <command> [..]`

Esy is completely modular even the main functionalities are defined to esy engine as modules.

## Install
Usage `esy modules install <name>`

You can install an external module by running this command where `name` is name of your package or a JS file, imagine you 
want to pass this name to Node `require` function, because that's just what happens backstage.

## Uninstall
Usage `esy modules uninstall <name>`

Uninstall an external module from esy

## List
List all active modules

#### Options:
**--json, -j**: Just like config's `--json` option, prints output in JSON format.

**--beauty, -b**: Print JSON data in human-readable mode.
> Note: `--beauty` only works with `--json` option<!---  ./04-blocks  -->
# Blocks
Custom Blocks are main part of `Esy` and the reason of why something like `Esy` even exist.

There are many blocks we want to make ([see this](https://github.com/Slye-team/esy-language/blob/master/README.md)), but 
till now we have these blocks:

1. Timeout
2. Interval
3. Env
4. Enc
5. Wait
6. Promise<!---  ./.cache  -->