# Timers
Syntax:
```esy
(timeout|interval) [dely] [<pass1,pass2,..>] [(arg1,arg2,..)]{
    // body
}
```
Look at examples if you're confused!
## Basic Usage:
```esy
timeout 500{
    console.log("Hi");
}
```

## Passing argument
```esy
var a   = {a:"Hello",b:" World!"};
interval 1000 <a.a, a.b> (a,b){
    console.log(a,b);
}
```

## Variable assignment
To clear a timeout/interval event you can assign it to variable and use one of `clearInterval` or `clearTimeout` functions.
### Example
```esy
var a   = {a:"Hello",b:"World!"};
vsr i   = interval 1000 <a.a, a.b> (a,b){
    console.log(a,b);
    clearInterval(i);
}
```