# Foreach
Syntax:
```
foreach(obj|array as [key:]value){
    ...code
}
```
The idea behind this block comes from PHP's foreach block, and its syntax is completely like PHP.

> Tip: like the For block, Foreach supports one line without the braces. (Look at first example)
## Examples
1)
```esy
ages = {ali:5, john:20, 'qti3e': 16}
foreach(a as name:age)
	console.log(name, ' is ', age, ' years old);
```

2)
```esy
a = [5,7]
foreach(a as k:v){
	console.log(k,v)
}
```
3)
```esy
a = [5,7,8]
foreach(a as v){
	console.log(v * 5)
}
```