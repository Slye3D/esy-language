# Readline
Syntax:
```esy
readline input{
    ...code
}
```
Readline block is used when you want to read a line from STDIN.

Esy uses default Node's readline module so this block is **NOT** working in `web browsers` and it's just Node.js compatible.

## Example
```esy
console.log("What is your name?")
// Read user's name from STDIN
readline name{
    console.log(`Hello ${name}`)
}
```