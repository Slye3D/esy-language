<!---  .  -->
# Esy Docs

### Table of contents:
1. [Introduction](https://github.com/Slye-team/esy-language/blob/master/docs/01-introduction/README.md)
2. [Installation](https://github.com/Slye-team/esy-language/blob/master/docs/02-installation/README.md)
3. [CLI](https://github.com/Slye-team/esy-language/blob/master/docs/03-CLI/README.md)
    1. [basics](./03-cli/basic)
    2. [~~advanced~~](./03-cli/advanced)
4. [Blocks](./04-blocks)
    1. [General Blocks](./04-blocks/general)
    2. [~~Angular~~](./04-blocks/angular)
    2. [~~Redis~~](./04-blocks/redis)
5. [~~Core API~~](./05-api)
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
> Read `lpush` section to find more about this command