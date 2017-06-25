# Cache
syntax:
```
cache [LifeTime] [name](args...){
    ...code
} key [(args...)]{
    ...code
}
```
Use cache block to cache your computing and just return the final results

Note: The key block is optional

## Examples
```esy
// Cache sum for 500ms
cache 500 sum(a,b){
	console.log('Computing...');
	return a+b;
} key (c,d){
	// We don't care about numbers order in sum function (a+b=b+a)
	return [c, d].sort();
}

// Compute 5+7 once
console.log(sum(5,7))

// Load theme from cache without computing
console.log(sum(5,7))
console.log(sum(7,5))

// Wait 100ms more than cache's lifetime.
timeout 600{
	// It should compute 5+7 again
	console.log(sum(7,5))
}
```
Result:
```
Computing...
12
12
12
Computing...
12
```