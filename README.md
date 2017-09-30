# asys

[![Build Status](https://travis-ci.org/benmerckx/asys.svg?branch=master)](https://travis-ci.org/benmerckx/asys)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000)](https://gitter.im/haxetink/public)

Asynchronous sys module for all sys targets and node.js.
The structure mimics the haxe std sys classes. Each method has an asynchronous
counterpart in asys. Asynchronous methods return a [`Future<Data>`](https://haxetink.github.io/tink_core/#/types/future) or a [`Promise<Data>`](https://haxetink.github.io/tink_core/#/types/promise).

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

Using [tink_await](https://github.com/haxetink/tink_await) this can be written as:
```haxe
trace(@await FileSystem.exists(path));
```

There other shortcuts for working with futures and promises which you can find in the [tink_core documentation](https://github.com/haxetink/tink_core).


#### Currently implemented

All methods are handled asynchronously on node.js.  
On other targets all methods are implemented using `Future.sync`.
If used in combination with [tink_runloop](https://github.com/haxetink/tink_runloop), file io will be done asynchronously.

```
asys
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
