# Installation
**Esy** is available as an NPM package, you can install it by running:
```bash
npm install esy-language -g
```
By running this command you'll be able to run `esy` command
> For more information about using the CLI, see [Chapter 3](../03-cli)
## Compile example
To use `esy compiler` you have to have your code in a file,
let's save this example in a file and call it `hello.esy`
```esy
timeout 500{
    console.log("Esy!");
}
```
After installing **Esy**  you can use the `esy` command, then `cd` to which dir you've stored `hello.esy` and run:
```bash
esy compile hello.esy
```
It'll print the result in your terminal, to save the output file, run:
```bash
esy compile hello.esy -s [filename.js]
```
If you don't pass the filename, it would be `hello.js` as default.