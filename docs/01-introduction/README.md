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
To run the example code just go to [chapter 2](../02-installation)