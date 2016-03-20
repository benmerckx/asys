# asys

Asynchronous sys module for all sys targets and node.js.
The structure mimics the haxe std sys classes. Each method has an asynchronous
counterpart in asys. Asynchronous methods return a [`Future`](https://github.com/haxetink/tink_core#future) or a [`Surprise<Data, Error>`](https://github.com/haxetink/tink_core#surprise).

For example where you would previously write 
```haxe
trace(FileSystem.exists(path));
```
That now becomes
```haxe
FileSystem.exists(path).handle(function(exists)
	trace(exists)
);
```

There a lot of shortcuts for working with futures and surprises which you can find in the [tink_core documentation](https://github.com/haxetink/tink_core).


#### Currently implemented

All methods are handled asynchronously on node.js. On other targets most methods are implemented using `Future.sync`, in the future support for [tink_runloop](https://github.com/haxetink/tink_runloop) will be added so these may also be handled asynchronously where supported.

```
asys
	io
		File
		FileInput
		FileOutput
		FileSeek
		Process
	FileStat
	FileSystem
```

License: MIT