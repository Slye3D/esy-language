# Wait
Syntax:
```esy
wait [for] sth(a,b,...) [as result]{
    // Success 
} (error|catch) [(reason)] {
    // Fail managment
}
```
Use this block instead of .then() (Promise), the second part is optional and you can leave it.

> The `for` in expression `wait for` is optional and you can don't write it.

## Example
Sample example with promise:
```esy
promise sum(a,b) <resolve>{
    resolve(a + b)
}
wait for sum(5,10){
    // We didn't passed name of result variable 
    // so it'll be `result` by default
    console.log("Sum:", result)
}
```
Result:
`Sum: 15`