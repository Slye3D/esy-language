Esy
--------------
    Esy is a new JS preprocessor allows you to use custom block structures.
- Now it's only an engine that doesn't do anything. (Work in progress)
# What does it mean?
 Right now in JavaScript and many other languages that support the [block structure](https://en.wikipedia.org/wiki/Scope_(computer_science)#Block_scope), you're only able to use some predefined structures like:
 
 1. if (){...}
 2. for (){...}
 3. while (){...}
 4. do {...} while();
 5. switch (){...}
 6. else {...}
 7. try {...}
 8. catch (){...}
 9. finally (){...}
 10. etc...
 
 Those are all familiar structures to you, but have you ever thought about the following structure?
 ```esy
 timeout 200 {
    console.log("Hello World!");
 }
 ```
 Certainly, it's easier than what we have in `JS` right now:
 ```js
 setTimeout(function() {
    console.log("Hello World!");
 }, 200);
 ```
 Or even with `arrow functions`:
```js
 setTimeout(() => {
    console.log("Hello World!");
 }, 200);
 ```
 That why `Esy` comes from `Easy`
 
 # Install
  You can install this package globally by running:
  ```bash
  npm install esy-language -g
  ```
  but if you're interested in the core API and wants to use it in your own package just run:
  ```bash
  npm install esy-language --save
  ```
  
 # Blocks
 There are 3 types of blocks, `General Blocks`, `Angular Blocks` and `Redis Blocks`, maybe we support other things like `jQuery` in the future.
 
    This project is not complete yet, we're working on the following abilities.
 ## General Blocks
 - [x] Timeout
 - [x] Interval
 - [x] Env
 - [x] Encrypt
 - [x] Wait [for] sth() as [(data)]{...}error{...}
 - [x] Promise sth(a1,a2,...)[(resolve, reject)]{....}
 - [ ] Cache [lifetime] sth(a1,a2,...){...}[key{...}]
 - [ ] Class
 - [ ] Block
 - [ ] Doc
 - [ ] Todo
 - [ ] Test
 
 ## Angular Blocks
 - [ ] Directive
 - [ ] Controller
 - [ ] $Timeout
 - [ ] $Interval
 ## Redis blocks
 - [ ] Redis [command]\(...args) [(re)]{...} [error [(err)]{...}]

 # CLI
 Esy has a simple command line interface you can use to compile your code from `.esy` to `.js`, the `esy` command will be available on your system as you install this package globally with `npm`, read the [install](#install) part for more detail.
 
 List of all commands:
 - [x] esy cache dir
 - [x] esy cache clean
 - [x] esy cache status
 - [x] esy cache disable
 - [x] esy cache enable
 - [x] esy config get \<key>
 - [x] esy config set \<key> \<value>
 - [x] esy config lpush \<key> \<values..>
 - [x] esy config lrem \<key> \<values..>
 - [x] esy compile \<file>
 - [x] esy build [env]
 - [ ] esy todo [owner]
 - [ ] esy docs [env]
 - [ ] esy test
 - [x] esy modules list
 - [x] esy modules install \<name>
 - [x] esy modules uninstall \<name>

Use `--config` option to set path of `esy.json` file manually.

and you can use `--help` option to get help about a command,
```
   _____ __              ______
  / ___// /_  _____     / ____/______  __
  \__ \/ / / / / _ \   / __/ / ___/ / / /
 ___/ / / /_/ /  __/  / /___(__  ) /_/ /
/____/_/\__, /\___/  /_____/____/\__, /
       /____/                   /____/
Esy is a new JS preprocessor allows you to use custom block structures.

Commands:
  build [platforms..]  Compile files from build configs
  cache <command>      Mange cache storage
  compile <files..>    Compile Esy file to JavaScript
  config <command>     Manage config values
  modules <command>    Manage Esy modules

Options:
  --help              Show help                                        [boolean]
  --config, -c        config.json src             [string] [default: "esy.json"]
  --environments, -e  Set project's environments                         [array]

for more information, find our manual at:
    https://github.com/Slye-team/esy-language
```