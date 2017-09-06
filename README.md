# Esy

[![NPM](https://nodei.co/npm/esy-language.png?compact=true)](https://npmjs.org/package/esy-language)

[![CircleCI](https://circleci.com/gh/Slye-team/esy-language/tree/master.svg?style=shield)](https://circleci.com/gh/Slye-team/esy-language/tree/master)
[![npm version](https://badge.fury.io/js/esy-language.svg)](https://badge.fury.io/js/esy-language)
[![downloads](https://img.shields.io/npm/dt/esy-language.svg)](https://www.npmjs.com/package/badges)
[![dependencies](https://img.shields.io/david/slye-team/esy-language.svg)](https://www.npmjs.com/package/badges)
[![license](https://img.shields.io/npm/l/esy-language.svg)](./LICENSE)
[![Join the chat at https://gitter.im/Slye-team/esy-language](https://badges.gitter.im/Slye-team/esy-language.svg)](https://gitter.im/Slye-team/esy-language?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![Esy Logo](./logo.png)

Esy is a new JS preprocessor allows you to use custom block structures.

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

# Example
  After installing the `Esy`, save this file as `ex.esy`
  ```esy
  // Cache sum for 500ms
  cache 500 sum(a,b){
  	console.log('Computing...');
  	return a+b;
  } key (c,d){
  	// We don't care about numbers order in sum function (a+b=b+a)
  	return [c, d].sort();
  }

  // Compute 5+7 once
  console.log(sum(5,7))

  // Load theme from cache without computing
  console.log(sum(5,7))
  console.log(sum(7,5))

  // Wait 100ms more than cache's lifetime.
  timeout 600{
  	// It should compute 5+7 again
  	console.log(sum(7,5))
  }
  ```
  and then cd to the directory that your file is and run this command to run program:
  ```
  esy ex.esy
  ```
  for saving result to a file run:
  ```
  esy compile ex.esy -s
  ```

# Docs
  Read [official docs](https://github.com/Slye-team/esy-language/tree/master/docs) for more details.

# Testing
  To run tests just run:
  ```bash
  git clone https://github.com/Slye-team/esy-language.git
  cd esy-language
  npm run test
  ```
