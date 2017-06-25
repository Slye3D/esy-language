# Extract
syntax:
```
extract object{
    ...code
}
```
Extract do the same thing that the With block do, but there is 2 difference:
 1. It's cross-browser
    
    You can run generated code where ever you want. 
    
 2. You can use it in `strict mode`
 
 ## Example
 ```esy
 extract Math{
 	console.log(PI)
 }
 ```
