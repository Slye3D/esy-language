# ReadlineSync
Syntax
```esy
readlinesync <input>{
    ...code
}
```
`ReadlineSync` is used to read line from STDIN synchronously.

## Example
```esy
console.log("What is your name?")
readlinesync <name>{
	console.log(`Hello ${name}`)
}
console.log("Bye")
```