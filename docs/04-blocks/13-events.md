# Events
This syntax is a little bit weird but you can understand it by looking at examples.

## Normal
Syntax:
```
#var[<event>](callback_args...)[.func = '.on']{

}
```
### Examples
1)
```esy
#io<'connection'> (client) {
	console.log('Client connected...');
}
```
Compiles to:
```js
io.on('connection', function(client){
    console.log('Client connected...');
})
```
2)
```esy
#server<PORT>().listen{
	console.log("App started on port ", PORT)
}
```
Compiles to:
```js
server.listen(PORT, function(){
    console.log("App started on port ", PORT)
})
```

---
## Nested
Syntax:
```
#var[<def_func = 'on'>]{
    <event1>(callback_args1...)[.func = def_func]{

    }

    <event2>(callback_args2...)[.func = def_func]{

    }
}
```

### Examples
1)
```esy
#client{
    <'join'>(data){
        console.log(data)
    }
    <'messages'>(data){
        client.emit('broad', data);
        client.broadcast.emit('broad',data);
    }
}
```
Compiles to:
```js
client.on('join', function(data){
    console.log(data)
})
client.on('message', function(data){
    client.emit('broad', data);
    client.broadcast.emit('broad',data);
})
```

2)
```esy
#app<all>{
	<'/'>(req, res, next){
		res.sendFile(__dirname + '/view/index.html', () => {
			next();
		})
	}
	<'/index.html'>(req, res, next).get{
		res.redirect('/')
		next()
	}
	<'/config.json'>(req, res, next){
		res.send(JSON.stringify({
			host: req.headers.host,
			port: PORT
		}))
		next();
	}
}
```
Compiles to:
```js
app.all('/', function(req, res, next){
    res.sendFile(__dirname + '/view/index.html', () => {
        next();
    })
})
app.get('/index.html', function(req, res, next).get{
    res.redirect('/')
    next()
})
app.all('/config.json', function(req, res, next).get{
    res.redirect('/')
    next()
})
```
