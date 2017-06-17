# Promise
Syntax:
```esy
promise function(a1,a2,...) [<resolve[,reject]>]{
    // Function body
}
```
Use this block to create a function that returns a promise:

## Example
```esy
promise sum(a,b){
    // We didn't passed name of resolve variable 
    // so it'll be `resolve` by default
    resolve(a + b)
}
wait for sum(5,10) as result{
    console.log("Sum:", result)
}
```
Passing the resolve name:
```esy
promise sum(a,b) <resolve>{
    resolve(a + b)
}
promise wrong(a,b) <resolve, reject>{
    reject("Test")
}
```