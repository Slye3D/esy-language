# ReadlineSync
Syntax
```esy
readlinesync <input>;
```
`ReadlineSync` is used to read line from STDIN synchronously.

``Note: It is necessary to have the semicolon at the end of the line.``

## Example
```esy
console.log("What is your name?")
readlinesync <name>;
console.log(`Hello ${name}`)
console.log("Bye")
```