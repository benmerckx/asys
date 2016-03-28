# asys

Asynchronous sys module for all sys targets and node.js.
The structure mimics the haxe std sys classes. Each method has an asynchronous
counterpart in asys. Asynchronous methods return a [`Future<Data>`](https://github.com/haxetink/tink_core#future) or a [`Surprise<Data, Error>`](https://github.com/haxetink/tink_core#surprise).

For example where you would previously write
```haxe
trace(FileSystem.exists(path));
```
That would become
```haxe
FileSystem.exists(path).handle(function(exists)
	trace(exists)
);
```

There a lot of shortcuts for working with futures and surprises which you can find in the [tink_core documentation](https://github.com/haxetink/tink_core).


#### Currently implemented

All methods are handled asynchronously on node.js.  
If `-D runloop` is defined, a worker is used on [tink_runloop](https://github.com/haxetink/tink_runloop) to get the results asynchronously.  
On other targets all methods are implemented using `Future.sync`.

```
sys
	async
		io
			File
			FileInput
			FileOutput
			FileSeek
			Process
		net
			Host
			Socket
		ssl
			Socket
		FileStat
		FileSystem
```

License: MIT
