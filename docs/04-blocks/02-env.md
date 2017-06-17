# Env
Syntax:
```esy
env [names..]{
    // code to run in specified env
}else{
    // otherwise
}
```
With this block you can classify your code which means you can specify to have with code in your build.

Example:

`a.esy`:
```esy
var square  = n => n^2;
env test{
    console.log(square(5) == 25)
}
```
To compile this code just run:
```bash
esy compile a.esy -s -e test
```
Even you can turn `test` env on by default:
```bash
esy config lpush environment test
esy compile a.esy -s 
```
