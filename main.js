(function (console, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var $process = new asys_io_Process("vips",["--help"]);
	var buf = new haxe_io_BytesOutput();
	var this1 = $process.stdout.pipeTo((function($this) {
		var $r;
		var s = tink_io__$Sink_Sink_$Impl_$.ofOutput("which",buf,tink_io__$Worker_Worker_$Impl_$.EAGER);
		$r = s;
		return $r;
	}(this)));
	this1(function(x) {
		switch(x[1]) {
		case 0:
			console.log("stdout: " + buf.getBytes().toString());
			break;
		default:
			console.log("error");
		}
	});
	var buf2 = new haxe_io_BytesOutput();
	var this2 = $process.stderr.pipeTo((function($this) {
		var $r;
		var s1 = tink_io__$Sink_Sink_$Impl_$.ofOutput("which",buf2,tink_io__$Worker_Worker_$Impl_$.EAGER);
		$r = s1;
		return $r;
	}(this)));
	this2(function(x1) {
		switch(x1[1]) {
		case 0:
			console.log("stderr: " + buf2.getBytes().toString());
			break;
		default:
			console.log("error");
		}
	});
	var this3 = $process.exitCode();
	this3(function(code) {
		console.log(code);
	});
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var asys_FileSystem = function() { };
asys_FileSystem.__name__ = true;
asys_FileSystem.exists = function(path) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.stat(path,function(err,stats) {
		trigger.trigger(err == null);
	});
	return trigger.future;
};
asys_FileSystem.rename = function(path,newPath) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.rename(path,newPath,function(err) {
		trigger.trigger(err == null?tink_core_Outcome.Success(tink_core_Noise.Noise):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "FileSystem.hx", lineNumber : 27, className : "asys.FileSystem", methodName : "rename"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_FileSystem.stat = function(path) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.stat(path,function(err,stat) {
		trigger.trigger(err == null?tink_core_Outcome.Success({ gid : stat.gid, uid : stat.uid, atime : stat.atime, mtime : stat.mtime, ctime : stat.ctime, size : stat.size | 0, dev : stat.dev, ino : stat.ino | 0, nlink : stat.nlink, rdev : stat.rdev, mode : stat.mode}):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "FileSystem.hx", lineNumber : 50, className : "asys.FileSystem", methodName : "stat"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_FileSystem.fullPath = function(relPath) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.realpath(relPath,function(err,path) {
		trigger.trigger(err == null?tink_core_Outcome.Success(path):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "FileSystem.hx", lineNumber : 61, className : "asys.FileSystem", methodName : "fullPath"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_FileSystem.absolutePath = function(relPath) {
	if(haxe_io_Path.isAbsolute(relPath)) return relPath;
	return haxe_io_Path.join([process.cwd(),relPath]);
};
asys_FileSystem.isDirectory = function(path) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.stat(path,function(err,stat) {
		trigger.trigger(err == null?stat.isDirectory():(function($this) {
			var $r;
			switch(err) {
			default:
				$r = false;
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_FileSystem.createDirectory = function(path) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.mkdir(path,function(err) {
		trigger.trigger(err == null?tink_core_Outcome.Success(tink_core_Noise.Noise):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "FileSystem.hx", lineNumber : 88, className : "asys.FileSystem", methodName : "createDirectory"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_FileSystem.deleteFile = function(path) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.unlink(path,function(err) {
		trigger.trigger(err == null?tink_core_Outcome.Success(tink_core_Noise.Noise):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "FileSystem.hx", lineNumber : 99, className : "asys.FileSystem", methodName : "deleteFile"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_FileSystem.deleteDirectory = function(path) {
	return asys_FileSystem.deleteFile(path);
};
asys_FileSystem.readDirectory = function(path) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.readdir(path,function(err,files) {
		trigger.trigger(err == null?tink_core_Outcome.Success(files):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "FileSystem.hx", lineNumber : 114, className : "asys.FileSystem", methodName : "readDirectory"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
var asys_io_File = function() { };
asys_io_File.__name__ = true;
asys_io_File.getContent = function(path) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.readFile(path,"utf8",function(err,data) {
		trigger.trigger(err == null?tink_core_Outcome.Success(data):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "File.hx", lineNumber : 22, className : "asys.io.File", methodName : "getContent"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_io_File.saveContent = function(path,content) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.writeFile(path,content,"utf8",function(err) {
		trigger.trigger(err == null?tink_core_Outcome.Success(tink_core_Noise.Noise):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "File.hx", lineNumber : 33, className : "asys.io.File", methodName : "saveContent"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_io_File.getBytes = function(path) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.readFile(path,function(err,buffer) {
		trigger.trigger(err == null?tink_core_Outcome.Success(haxe_io_Bytes.ofData(buffer)):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "File.hx", lineNumber : 44, className : "asys.io.File", methodName : "getBytes"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_io_File.saveBytes = function(path,bytes) {
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.writeFile(path,new js_node_buffer_Buffer(bytes.b.bufferValue),function(err) {
		trigger.trigger(err == null?tink_core_Outcome.Success(tink_core_Noise.Noise):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "File.hx", lineNumber : 55, className : "asys.io.File", methodName : "saveBytes"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_io_File.read = function(path,binary) {
	if(binary == null) binary = true;
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.open(path,"r",function(err,fd) {
		trigger.trigger(err == null?tink_core_Outcome.Success(new asys_io_FileInput(fd)):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "File.hx", lineNumber : 66, className : "asys.io.File", methodName : "read"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_io_File.write = function(path,binary) {
	if(binary == null) binary = true;
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.open(path,"w",function(err,fd) {
		trigger.trigger(err == null?tink_core_Outcome.Success(new asys_io_FileOutput(fd)):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "File.hx", lineNumber : 77, className : "asys.io.File", methodName : "write"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_io_File.readStream = function(path,binary) {
	if(binary == null) binary = true;
	return tink_io__$Source_Source_$Impl_$.ofNodeStream(js_node_Fs.createReadStream(path),"asys read stream");
};
asys_io_File.writeStream = function(path,binary) {
	if(binary == null) binary = true;
	return tink_io__$Sink_Sink_$Impl_$.ofNodeStream(js_node_Fs.createWriteStream(path),"asys write stream");
};
asys_io_File.append = function(path,binary) {
	if(binary == null) binary = true;
	var trigger = new tink_core_FutureTrigger();
	js_node_Fs.open(path,"a",function(err,fd) {
		trigger.trigger(err == null?tink_core_Outcome.Success(new asys_io_FileOutput(fd)):(function($this) {
			var $r;
			switch(err) {
			default:
				$r = tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "File.hx", lineNumber : 104, className : "asys.io.File", methodName : "append"}));
			}
			return $r;
		}(this)));
	});
	return trigger.future;
};
asys_io_File.copy = function(srcPath,dstPath) {
	var trigger = new tink_core_FutureTrigger();
	var called = false;
	var done = function(err) {
		if(called) return;
		if(err == null) tink_core_Outcome.Success(tink_core_Noise.Noise); else switch(err) {
		default:
			tink_core_Outcome.Failure(tink_core_TypedError.withData(null,err.message,err,{ fileName : "File.hx", lineNumber : 117, className : "asys.io.File", methodName : "copy"}));
		}
		called = true;
	};
	var rd = js_node_Fs.createReadStream(srcPath);
	rd.on("error",done);
	var wr = js_node_Fs.createWriteStream(dstPath);
	wr.on("error",done);
	wr.on("close",function(ex) {
		done();
	});
	rd.pipe(wr);
	return trigger.future;
};
var haxe_io_Input = function() { };
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	readByte: function() {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,close: function() {
	}
	,__class__: haxe_io_Input
};
var asys_io_FileInput = function(fd) {
	this.position = 0;
	this.bufferPos = 0;
	this.bufferSize = 4;
	this.fd = fd;
	this.buffer = new js_node_buffer_Buffer(this.bufferSize);
};
asys_io_FileInput.__name__ = true;
asys_io_FileInput.__super__ = haxe_io_Input;
asys_io_FileInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		if(this.bufferPos == this.bufferSize) this.bufferPos = 0;
		if(this.bufferPos == 0) js_node_Fs.readSync(this.fd,this.buffer,0,this.bufferSize,this.position);
		this.position++;
		return this.buffer[this.bufferPos++];
	}
	,readBytes: function(s,pos,len) {
		this.bufferPos = 0;
		var b = new js_node_buffer_Buffer(len);
		var amount = js_node_Fs.readSync(this.fd,b,0,len,this.position);
		s.blit(pos,haxe_io_Bytes.ofData(b),0,len);
		this.position += len;
		return amount;
	}
	,seek: function(length,pos) {
		this.bufferPos = 0;
		switch(pos[1]) {
		case 0:
			this.position = length;
			break;
		case 1:
			this.position += length;
			break;
		case 2:
			throw new js__$Boot_HaxeError("Not implemented");
			break;
		}
	}
	,tell: function() {
		return this.position;
	}
	,eof: function() {
		return this.buffer.length < this.bufferSize;
	}
	,close: function() {
		this.buffer = null;
		js_node_Fs.closeSync(this.fd);
	}
	,__class__: asys_io_FileInput
});
var haxe_io_Output = function() { };
haxe_io_Output.__name__ = true;
haxe_io_Output.prototype = {
	writeByte: function(c) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,writeBytes: function(s,pos,len) {
		var k = len;
		var b = s.b.bufferValue;
		if(pos < 0 || len < 0 || pos + len > s.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		while(k > 0) {
			this.writeByte(b[pos]);
			pos++;
			k--;
		}
		return len;
	}
	,close: function() {
	}
	,__class__: haxe_io_Output
};
var asys_io_FileOutput = function(fd) {
	this.buffer = new js_node_buffer_Buffer(1);
	this.position = 0;
	this.fd = fd;
};
asys_io_FileOutput.__name__ = true;
asys_io_FileOutput.__super__ = haxe_io_Output;
asys_io_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		this.buffer[0] = c;
		js_node_Fs.writeSync(this.fd,this.buffer,0,1,this.position++);
	}
	,writeBytes: function(s,pos,len) {
		var amount = js_node_Fs.writeSync(this.fd,new js_node_buffer_Buffer(s.b.bufferValue),pos,len);
		this.position += len;
		return amount;
	}
	,seek: function(length,pos) {
		switch(pos[1]) {
		case 0:
			this.position = 0;
			break;
		case 1:
			this.position += length;
			break;
		case 2:
			throw new js__$Boot_HaxeError("Not implemented");
			break;
		}
	}
	,tell: function() {
		return this.position;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,__class__: asys_io_FileOutput
});
var asys_io_FileSeek = { __ename__ : true, __constructs__ : ["SeekBegin","SeekCur","SeekEnd"] };
asys_io_FileSeek.SeekBegin = ["SeekBegin",0];
asys_io_FileSeek.SeekBegin.toString = $estr;
asys_io_FileSeek.SeekBegin.__enum__ = asys_io_FileSeek;
asys_io_FileSeek.SeekCur = ["SeekCur",1];
asys_io_FileSeek.SeekCur.toString = $estr;
asys_io_FileSeek.SeekCur.__enum__ = asys_io_FileSeek;
asys_io_FileSeek.SeekEnd = ["SeekEnd",2];
asys_io_FileSeek.SeekEnd.toString = $estr;
asys_io_FileSeek.SeekEnd.__enum__ = asys_io_FileSeek;
var asys_io_Process = function(cmd,args) {
	this.exitTrigger = new tink_core_FutureTrigger();
	var _g = this;
	this.process = js_node_ChildProcess.spawn(cmd,args);
	this.stdin = tink_io__$Sink_Sink_$Impl_$.ofNodeStream(this.process.stdin,"stdin");
	this.stderr = tink_io__$Source_Source_$Impl_$.ofNodeStream(this.process.stderr,"stderr");
	this.stdout = tink_io__$Source_Source_$Impl_$.ofNodeStream(this.process.stdout,"stdout");
	this.process.on("exit",function(code,signal) {
		_g.exitTrigger.trigger(code);
	});
};
asys_io_Process.__name__ = true;
asys_io_Process.prototype = {
	getPid: function() {
		return this.process.pid;
	}
	,exitCode: function() {
		return this.exitTrigger.future;
	}
	,close: function() {
	}
	,kill: function() {
		this.process.kill();
	}
	,__class__: asys_io_Process
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_ds_Option = { __ename__ : true, __constructs__ : ["Some","None"] };
haxe_ds_Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe_ds_Option; $x.toString = $estr; return $x; };
haxe_ds_Option.None = ["None",1];
haxe_ds_Option.None.toString = $estr;
haxe_ds_Option.None.__enum__ = haxe_ds_Option;
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(srcpos == 0 && len == src.length) this.b.set(src.b,pos); else this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		if(this.len == 0) throw new js__$Boot_HaxeError(new haxe_io_Eof());
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		if(this.len == 0 && len > 0) throw new js__$Boot_HaxeError(new haxe_io_Eof());
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe_io_BytesInput
});
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
haxe_io_BytesOutput.__name__ = true;
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		this.b.b.push(c);
	}
	,writeBytes: function(buf,pos,len) {
		this.b.addBytes(buf,pos,len);
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() {
};
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_Path = function() { };
haxe_io_Path.__name__ = true;
haxe_io_Path.join = function(paths) {
	var paths1 = paths.filter(function(s) {
		return s != null && s != "";
	});
	if(paths1.length == 0) return "";
	var path = paths1[0];
	var _g1 = 1;
	var _g = paths1.length;
	while(_g1 < _g) {
		var i = _g1++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += paths1[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join("/");
	if(path == null || path == slash) return slash;
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join(slash);
	var regex = new EReg("([^:])/+","g");
	var result = regex.replace(tmp,"$1" + slash);
	var acc = new StringBuf();
	var colon = false;
	var slashes = false;
	var _g11 = 0;
	var _g2 = tmp.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var _g21 = HxOverrides.cca(tmp,i);
		var i1 = _g21;
		if(_g21 != null) switch(_g21) {
		case 58:
			acc.b += ":";
			colon = true;
			break;
		case 47:
			if(colon == false) slashes = true; else {
				colon = false;
				if(slashes) {
					acc.b += "/";
					slashes = false;
				}
				acc.add(String.fromCharCode(i1));
			}
			break;
		default:
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		} else {
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		}
	}
	var result1 = acc.b;
	return result1;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) return path + "\\"; else return path;
	} else if(c1 != path.length - 1) return path + "/"; else return path;
};
haxe_io_Path.isAbsolute = function(path) {
	if(StringTools.startsWith(path,"/")) return true;
	if(path.charAt(1) == ":") return true;
	return false;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var js_node_ChildProcess = require("child_process");
var js_node_Fs = require("fs");
var js_node_buffer_Buffer = require("buffer").Buffer;
var tink_core__$Any_Any_$Impl_$ = {};
tink_core__$Any_Any_$Impl_$.__name__ = true;
tink_core__$Any_Any_$Impl_$.__promote = function(this1) {
	return this1;
};
var tink_core__$Callback_Callback_$Impl_$ = {};
tink_core__$Callback_Callback_$Impl_$.__name__ = true;
tink_core__$Callback_Callback_$Impl_$._new = function(f) {
	return f;
};
tink_core__$Callback_Callback_$Impl_$.invoke = function(this1,data) {
	this1(data);
};
tink_core__$Callback_Callback_$Impl_$.fromNiladic = function(f) {
	return function(r) {
		f();
	};
};
tink_core__$Callback_Callback_$Impl_$.fromMany = function(callbacks) {
	return function(v) {
		var _g = 0;
		while(_g < callbacks.length) {
			var callback = callbacks[_g];
			++_g;
			callback(v);
		}
	};
};
var tink_core__$Callback_CallbackLink_$Impl_$ = {};
tink_core__$Callback_CallbackLink_$Impl_$.__name__ = true;
tink_core__$Callback_CallbackLink_$Impl_$._new = function(link) {
	return link;
};
tink_core__$Callback_CallbackLink_$Impl_$.dissolve = function(this1) {
	if(this1 != null) this1();
};
tink_core__$Callback_CallbackLink_$Impl_$.toCallback = function(this1) {
	{
		var f = this1;
		return function(r) {
			f();
		};
	}
};
tink_core__$Callback_CallbackLink_$Impl_$.fromFunction = function(f) {
	return f;
};
tink_core__$Callback_CallbackLink_$Impl_$.fromMany = function(callbacks) {
	return function() {
		var _g = 0;
		while(_g < callbacks.length) {
			var cb = callbacks[_g];
			++_g;
			if(cb != null) cb();
		}
	};
};
var tink_core__$Callback_CallbackList_$Impl_$ = {};
tink_core__$Callback_CallbackList_$Impl_$.__name__ = true;
tink_core__$Callback_CallbackList_$Impl_$._new = function() {
	return [];
};
tink_core__$Callback_CallbackList_$Impl_$.get_length = function(this1) {
	return this1.length;
};
tink_core__$Callback_CallbackList_$Impl_$.add = function(this1,cb) {
	var cell;
	var ret;
	ret = (function($this) {
		var $r;
		var this2;
		this2 = new Array(1);
		$r = this2;
		return $r;
	}(this));
	ret[0] = cb;
	cell = ret;
	this1.push(cell);
	return function() {
		if(HxOverrides.remove(this1,cell)) cell[0] = null;
		cell = null;
	};
};
tink_core__$Callback_CallbackList_$Impl_$.invoke = function(this1,data) {
	var _g = 0;
	var _g1 = this1.slice();
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		if(cell[0] != null) cell[0](data);
	}
};
tink_core__$Callback_CallbackList_$Impl_$.clear = function(this1) {
	var _g = 0;
	var _g1 = this1.splice(0,this1.length);
	while(_g < _g1.length) {
		var cell = _g1[_g];
		++_g;
		cell[0] = null;
	}
};
var tink_core_Either = { __ename__ : true, __constructs__ : ["Left","Right"] };
tink_core_Either.Left = function(a) { var $x = ["Left",0,a]; $x.__enum__ = tink_core_Either; $x.toString = $estr; return $x; };
tink_core_Either.Right = function(b) { var $x = ["Right",1,b]; $x.__enum__ = tink_core_Either; $x.toString = $estr; return $x; };
var tink_core_TypedError = function(code,message,pos) {
	if(code == null) code = 500;
	this.code = code;
	this.message = message;
	this.pos = pos;
};
tink_core_TypedError.__name__ = true;
tink_core_TypedError.withData = function(code,message,data,pos) {
	return tink_core_TypedError.typed(code,message,data,pos);
};
tink_core_TypedError.typed = function(code,message,data,pos) {
	var ret = new tink_core_TypedError(code,message,pos);
	ret.data = data;
	return ret;
};
tink_core_TypedError.catchExceptions = function(f,report) {
	try {
		return tink_core_Outcome.Success(f());
	} catch( $e0 ) {
		if ($e0 instanceof js__$Boot_HaxeError) $e0 = $e0.val;
		if( js_Boot.__instanceof($e0,tink_core_TypedError) ) {
			var e = $e0;
			return tink_core_Outcome.Failure(e);
		} else {
		var e1 = $e0;
		return tink_core_Outcome.Failure(report == null?tink_core_TypedError.withData(null,"Unexpected Error",e1,{ fileName : "Error.hx", lineNumber : 97, className : "tink.core.TypedError", methodName : "catchExceptions"}):report(e1));
		}
	}
};
tink_core_TypedError.reporter = function(code,message,pos) {
	return function(e) {
		return tink_core_TypedError.withData(code,message,e,pos);
	};
};
tink_core_TypedError.rethrow = function(any) {
	throw new js__$Boot_HaxeError(any);
	return any;
};
tink_core_TypedError.prototype = {
	printPos: function() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	,toString: function() {
		var ret = "Error#" + this.code + ": " + this.message;
		if(this.pos != null) ret += " " + this.printPos();
		return ret;
	}
	,throwSelf: function() {
		throw new js__$Boot_HaxeError(this);
		return this;
	}
	,__class__: tink_core_TypedError
};
var tink_core__$Future_Future_$Impl_$ = {};
tink_core__$Future_Future_$Impl_$.__name__ = true;
tink_core__$Future_Future_$Impl_$._new = function(f) {
	return f;
};
tink_core__$Future_Future_$Impl_$.handle = function(this1,callback) {
	return this1(callback);
};
tink_core__$Future_Future_$Impl_$.gather = function(this1) {
	var op = new tink_core_FutureTrigger();
	var self = this1;
	return tink_core__$Future_Future_$Impl_$._new(function(cb) {
		if(self != null) {
			this1($bind(op,op.trigger));
			self = null;
		}
		return op.future(cb);
	});
};
tink_core__$Future_Future_$Impl_$.first = function(this1,other) {
	return tink_core__$Future_Future_$Impl_$.async(function(cb) {
		this1(cb);
		other(cb);
	});
};
tink_core__$Future_Future_$Impl_$.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = tink_core__$Future_Future_$Impl_$._new(function(callback) {
		return this1(function(result) {
			var data = f(result);
			callback(data);
		});
	});
	if(gather) return tink_core__$Future_Future_$Impl_$.gather(ret); else return ret;
};
tink_core__$Future_Future_$Impl_$.flatMap = function(this1,next,gather) {
	if(gather == null) gather = true;
	var ret = tink_core__$Future_Future_$Impl_$.flatten(tink_core__$Future_Future_$Impl_$.map(this1,next,gather));
	if(gather) return tink_core__$Future_Future_$Impl_$.gather(ret); else return ret;
};
tink_core__$Future_Future_$Impl_$.merge = function(this1,other,merger,gather) {
	if(gather == null) gather = true;
	return tink_core__$Future_Future_$Impl_$.flatMap(this1,function(t) {
		return tink_core__$Future_Future_$Impl_$.map(other,function(a) {
			return merger(t,a);
		},false);
	},gather);
};
tink_core__$Future_Future_$Impl_$.flatten = function(f) {
	return tink_core__$Future_Future_$Impl_$._new(function(callback) {
		var ret = null;
		ret = f(function(next) {
			ret = next(function(result) {
				callback(result);
			});
		});
		return ret;
	});
};
tink_core__$Future_Future_$Impl_$.fromTrigger = function(trigger) {
	return trigger.future;
};
tink_core__$Future_Future_$Impl_$.ofMany = function(futures,gather) {
	if(gather == null) gather = true;
	var ret = tink_core__$Future_Future_$Impl_$.sync([]);
	var _g = 0;
	while(_g < futures.length) {
		var f = [futures[_g]];
		++_g;
		ret = tink_core__$Future_Future_$Impl_$.flatMap(ret,(function(f) {
			return function(results) {
				return tink_core__$Future_Future_$Impl_$.map(f[0],(function() {
					return function(result) {
						return results.concat([result]);
					};
				})(),false);
			};
		})(f),false);
	}
	if(gather) return tink_core__$Future_Future_$Impl_$.gather(ret); else return ret;
};
tink_core__$Future_Future_$Impl_$.fromMany = function(futures) {
	return tink_core__$Future_Future_$Impl_$.ofMany(futures);
};
tink_core__$Future_Future_$Impl_$.lazy = function(l) {
	return tink_core__$Future_Future_$Impl_$._new(function(cb) {
		var data = l();
		cb(data);
		return null;
	});
};
tink_core__$Future_Future_$Impl_$.sync = function(v) {
	return tink_core__$Future_Future_$Impl_$._new(function(callback) {
		callback(v);
		return null;
	});
};
tink_core__$Future_Future_$Impl_$.async = function(f,lazy) {
	if(lazy == null) lazy = false;
	if(lazy) return tink_core__$Future_Future_$Impl_$.flatten(tink_core__$Future_Future_$Impl_$.lazy(tink_core__$Lazy_Lazy_$Impl_$.ofFunc((function(f1,f2,a1) {
		return function() {
			return f1(f2,a1);
		};
	})(tink_core__$Future_Future_$Impl_$.async,f,false)))); else {
		var op = new tink_core_FutureTrigger();
		f($bind(op,op.trigger));
		return op.future;
	}
};
tink_core__$Future_Future_$Impl_$.or = function(a,b) {
	return tink_core__$Future_Future_$Impl_$.first(a,b);
};
tink_core__$Future_Future_$Impl_$.either = function(a,b) {
	return tink_core__$Future_Future_$Impl_$.first(tink_core__$Future_Future_$Impl_$.map(a,tink_core_Either.Left,false),tink_core__$Future_Future_$Impl_$.map(b,tink_core_Either.Right,false));
};
tink_core__$Future_Future_$Impl_$.and = function(a,b) {
	return tink_core__$Future_Future_$Impl_$.merge(a,b,function(a1,b1) {
		return new tink_core_MPair(a1,b1);
	});
};
tink_core__$Future_Future_$Impl_$._tryFailingFlatMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.flatMap(f,function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return map(d);
		case 1:
			var f1 = o[2];
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(f1));
		}
	});
};
tink_core__$Future_Future_$Impl_$._tryFlatMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.flatMap(f,function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return tink_core__$Future_Future_$Impl_$.map(map(d),tink_core_Outcome.Success);
		case 1:
			var f1 = o[2];
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(f1));
		}
	});
};
tink_core__$Future_Future_$Impl_$._tryFailingMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.map(f,function(o) {
		return tink_core_OutcomeTools.flatMap(o,tink_core__$Outcome_OutcomeMapper_$Impl_$.withSameError(map));
	});
};
tink_core__$Future_Future_$Impl_$._tryMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.map(f,function(o) {
		return tink_core_OutcomeTools.map(o,map);
	});
};
tink_core__$Future_Future_$Impl_$._flatMap = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.flatMap(f,map);
};
tink_core__$Future_Future_$Impl_$._map = function(f,map) {
	return tink_core__$Future_Future_$Impl_$.map(f,map);
};
tink_core__$Future_Future_$Impl_$.trigger = function() {
	return new tink_core_FutureTrigger();
};
var tink_core_FutureTrigger = function() {
	var _g = this;
	this.list = [];
	this.future = tink_core__$Future_Future_$Impl_$._new(function(callback) {
		if(_g.list == null) {
			callback(_g.result);
			return null;
		} else return tink_core__$Callback_CallbackList_$Impl_$.add(_g.list,callback);
	});
};
tink_core_FutureTrigger.__name__ = true;
tink_core_FutureTrigger.prototype = {
	asFuture: function() {
		return this.future;
	}
	,trigger: function(result) {
		if(this.list == null) return false; else {
			var list = this.list;
			this.list = null;
			this.result = result;
			tink_core__$Callback_CallbackList_$Impl_$.invoke(list,result);
			tink_core__$Callback_CallbackList_$Impl_$.clear(list);
			return true;
		}
	}
	,__class__: tink_core_FutureTrigger
};
var tink_core__$Lazy_Lazy_$Impl_$ = {};
tink_core__$Lazy_Lazy_$Impl_$.__name__ = true;
tink_core__$Lazy_Lazy_$Impl_$._new = function(r) {
	return r;
};
tink_core__$Lazy_Lazy_$Impl_$.get = function(this1) {
	return this1();
};
tink_core__$Lazy_Lazy_$Impl_$.ofFunc = function(f) {
	var result = null;
	return function() {
		if(f != null) {
			result = f();
			f = null;
		}
		return result;
	};
};
tink_core__$Lazy_Lazy_$Impl_$.map = function(this1,f) {
	return tink_core__$Lazy_Lazy_$Impl_$.ofFunc(function() {
		return f(this1());
	});
};
tink_core__$Lazy_Lazy_$Impl_$.flatMap = function(this1,f) {
	return tink_core__$Lazy_Lazy_$Impl_$.ofFunc(function() {
		var this2 = f(this1());
		return this2();
	});
};
tink_core__$Lazy_Lazy_$Impl_$.ofConst = function(c) {
	return function() {
		return c;
	};
};
var tink_core_Noise = { __ename__ : true, __constructs__ : ["Noise"] };
tink_core_Noise.Noise = ["Noise",0];
tink_core_Noise.Noise.toString = $estr;
tink_core_Noise.Noise.__enum__ = tink_core_Noise;
var tink_core_Outcome = { __ename__ : true, __constructs__ : ["Success","Failure"] };
tink_core_Outcome.Success = function(data) { var $x = ["Success",0,data]; $x.__enum__ = tink_core_Outcome; $x.toString = $estr; return $x; };
tink_core_Outcome.Failure = function(failure) { var $x = ["Failure",1,failure]; $x.__enum__ = tink_core_Outcome; $x.toString = $estr; return $x; };
var tink_core_OutcomeTools = function() { };
tink_core_OutcomeTools.__name__ = true;
tink_core_OutcomeTools.sure = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		var failure = outcome[2];
		if(js_Boot.__instanceof(failure,tink_core_TypedError)) return failure.throwSelf(); else throw new js__$Boot_HaxeError(failure);
		break;
	}
};
tink_core_OutcomeTools.toOption = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return haxe_ds_Option.Some(data);
	case 1:
		return haxe_ds_Option.None;
	}
};
tink_core_OutcomeTools.toOutcome = function(option,pos) {
	switch(option[1]) {
	case 0:
		var value = option[2];
		return tink_core_Outcome.Success(value);
	case 1:
		return tink_core_Outcome.Failure(new tink_core_TypedError(404,"Some value expected but none found in " + pos.fileName + "@line " + pos.lineNumber,{ fileName : "Outcome.hx", lineNumber : 37, className : "tink.core.OutcomeTools", methodName : "toOutcome"}));
	}
};
tink_core_OutcomeTools.orNull = function(outcome) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		return null;
	}
};
tink_core_OutcomeTools.orUse = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data;
	case 1:
		return fallback();
	}
};
tink_core_OutcomeTools.orTry = function(outcome,fallback) {
	switch(outcome[1]) {
	case 0:
		return outcome;
	case 1:
		return fallback();
	}
};
tink_core_OutcomeTools.equals = function(outcome,to) {
	switch(outcome[1]) {
	case 0:
		var data = outcome[2];
		return data == to;
	case 1:
		return false;
	}
};
tink_core_OutcomeTools.map = function(outcome,transform) {
	switch(outcome[1]) {
	case 0:
		var a = outcome[2];
		return tink_core_Outcome.Success(transform(a));
	case 1:
		var f = outcome[2];
		return tink_core_Outcome.Failure(f);
	}
};
tink_core_OutcomeTools.isSuccess = function(outcome) {
	switch(outcome[1]) {
	case 0:
		return true;
	default:
		return false;
	}
};
tink_core_OutcomeTools.flatMap = function(o,mapper) {
	return tink_core__$Outcome_OutcomeMapper_$Impl_$.apply(mapper,o);
};
tink_core_OutcomeTools.attempt = function(f,report) {
	try {
		return tink_core_Outcome.Success(f());
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return tink_core_Outcome.Failure(report(e));
	}
};
var tink_core__$Outcome_OutcomeMapper_$Impl_$ = {};
tink_core__$Outcome_OutcomeMapper_$Impl_$.__name__ = true;
tink_core__$Outcome_OutcomeMapper_$Impl_$._new = function(f) {
	return { f : f};
};
tink_core__$Outcome_OutcomeMapper_$Impl_$.apply = function(this1,o) {
	return this1.f(o);
};
tink_core__$Outcome_OutcomeMapper_$Impl_$.withSameError = function(f) {
	return tink_core__$Outcome_OutcomeMapper_$Impl_$._new(function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			return f(d);
		case 1:
			var f1 = o[2];
			return tink_core_Outcome.Failure(f1);
		}
	});
};
tink_core__$Outcome_OutcomeMapper_$Impl_$.withEitherError = function(f) {
	return tink_core__$Outcome_OutcomeMapper_$Impl_$._new(function(o) {
		switch(o[1]) {
		case 0:
			var d = o[2];
			{
				var _g = f(d);
				switch(_g[1]) {
				case 0:
					var d1 = _g[2];
					return tink_core_Outcome.Success(d1);
				case 1:
					var f1 = _g[2];
					return tink_core_Outcome.Failure(tink_core_Either.Right(f1));
				}
			}
			break;
		case 1:
			var f2 = o[2];
			return tink_core_Outcome.Failure(tink_core_Either.Left(f2));
		}
	});
};
var tink_core__$Pair_Pair_$Impl_$ = {};
tink_core__$Pair_Pair_$Impl_$.__name__ = true;
tink_core__$Pair_Pair_$Impl_$._new = function(a,b) {
	return new tink_core_MPair(a,b);
};
tink_core__$Pair_Pair_$Impl_$.get_a = function(this1) {
	return this1.a;
};
tink_core__$Pair_Pair_$Impl_$.get_b = function(this1) {
	return this1.b;
};
tink_core__$Pair_Pair_$Impl_$.toBool = function(this1) {
	return this1 != null;
};
tink_core__$Pair_Pair_$Impl_$.isNil = function(this1) {
	return this1 == null;
};
tink_core__$Pair_Pair_$Impl_$.nil = function() {
	return null;
};
var tink_core_MPair = function(a,b) {
	this.a = a;
	this.b = b;
};
tink_core_MPair.__name__ = true;
tink_core_MPair.prototype = {
	__class__: tink_core_MPair
};
var tink_core__$Ref_Ref_$Impl_$ = {};
tink_core__$Ref_Ref_$Impl_$.__name__ = true;
tink_core__$Ref_Ref_$Impl_$._new = function() {
	return (function($this) {
		var $r;
		var this1;
		this1 = new Array(1);
		$r = this1;
		return $r;
	}(this));
};
tink_core__$Ref_Ref_$Impl_$.get_value = function(this1) {
	return this1[0];
};
tink_core__$Ref_Ref_$Impl_$.set_value = function(this1,param) {
	return this1[0] = param;
};
tink_core__$Ref_Ref_$Impl_$.toString = function(this1) {
	return "@[" + Std.string(this1[0]) + "]";
};
tink_core__$Ref_Ref_$Impl_$.to = function(v) {
	var ret;
	ret = (function($this) {
		var $r;
		var this1;
		this1 = new Array(1);
		$r = this1;
		return $r;
	}(this));
	ret[0] = v;
	return ret;
};
var tink_core__$Signal_Signal_$Impl_$ = {};
tink_core__$Signal_Signal_$Impl_$.__name__ = true;
tink_core__$Signal_Signal_$Impl_$._new = function(f) {
	return f;
};
tink_core__$Signal_Signal_$Impl_$.handle = function(this1,handler) {
	return this1(handler);
};
tink_core__$Signal_Signal_$Impl_$.map = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			var data = f(result);
			cb(data);
		});
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
tink_core__$Signal_Signal_$Impl_$.flatMap = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			var this2 = f(result);
			this2(cb);
		});
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
tink_core__$Signal_Signal_$Impl_$.filter = function(this1,f,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return this1(function(result) {
			if(f(result)) cb(result);
		});
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
tink_core__$Signal_Signal_$Impl_$.join = function(this1,other,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		return tink_core__$Callback_CallbackLink_$Impl_$.fromMany([this1(cb),other(cb)]);
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
tink_core__$Signal_Signal_$Impl_$.next = function(this1) {
	var ret = new tink_core_FutureTrigger();
	var handler = tink_core__$Callback_CallbackLink_$Impl_$.toCallback(this1($bind(ret,ret.trigger)));
	this1(handler);
	return ret.future;
};
tink_core__$Signal_Signal_$Impl_$.noise = function(this1) {
	return tink_core__$Signal_Signal_$Impl_$.map(this1,function(_) {
		return tink_core_Noise.Noise;
	});
};
tink_core__$Signal_Signal_$Impl_$.gather = function(this1) {
	var ret = tink_core__$Signal_Signal_$Impl_$.trigger();
	this1(function(x) {
		tink_core__$Callback_CallbackList_$Impl_$.invoke(ret,x);
	});
	return tink_core__$Signal_SignalTrigger_$Impl_$.asSignal(ret);
};
tink_core__$Signal_Signal_$Impl_$.trigger = function() {
	return [];
};
tink_core__$Signal_Signal_$Impl_$.ofClassical = function(add,remove,gather) {
	if(gather == null) gather = true;
	var ret = function(cb) {
		var f = function(a) {
			cb(a);
		};
		add(f);
		{
			var f2 = (function(f1,a1) {
				return function() {
					f1(a1);
				};
			})(remove,f);
			return f2;
		}
	};
	if(gather) return tink_core__$Signal_Signal_$Impl_$.gather(ret); else return ret;
};
var tink_core__$Signal_SignalTrigger_$Impl_$ = {};
tink_core__$Signal_SignalTrigger_$Impl_$.__name__ = true;
tink_core__$Signal_SignalTrigger_$Impl_$._new = function() {
	return [];
};
tink_core__$Signal_SignalTrigger_$Impl_$.trigger = function(this1,event) {
	tink_core__$Callback_CallbackList_$Impl_$.invoke(this1,event);
};
tink_core__$Signal_SignalTrigger_$Impl_$.getLength = function(this1) {
	return this1.length;
};
tink_core__$Signal_SignalTrigger_$Impl_$.clear = function(this1) {
	tink_core__$Callback_CallbackList_$Impl_$.clear(this1);
};
tink_core__$Signal_SignalTrigger_$Impl_$.asSignal = function(this1) {
	var f = (function(_e) {
		return function(cb) {
			return tink_core__$Callback_CallbackList_$Impl_$.add(_e,cb);
		};
	})(this1);
	return f;
};
var tink_io__$Buffer_Mutex = function() {
};
tink_io__$Buffer_Mutex.__name__ = true;
tink_io__$Buffer_Mutex.prototype = {
	'synchronized': function(f) {
		return f();
	}
	,__class__: tink_io__$Buffer_Mutex
};
var tink_io_Buffer = function(bytes,width) {
	this.available = 0;
	this.writable = true;
	this.retainCount = 0;
	this.zero = 0;
	this.bytes = bytes;
	this.raw = bytes.b.bufferValue;
	this.width = width;
};
tink_io_Buffer.__name__ = true;
tink_io_Buffer.poolBytes = function(b,width) {
	if(width >= 10) tink_io_Buffer.pool[width - 10].push(b);
};
tink_io_Buffer.allocMin = function(minSize) {
	if(minSize > 268435456) "Cannot allocate buffer of size " + minSize;
	var width = 16;
	var size = 1 << width;
	while(size < minSize) size = 1 << ++width;
	return tink_io_Buffer.alloc(width);
};
tink_io_Buffer.alloc = function(width) {
	if(width == null) width = 17;
	if(width < 10) width = 10;
	if(width > 28) width = 28;
	return new tink_io_Buffer(tink_io_Buffer.allocBytes(width),width);
};
tink_io_Buffer.allocBytes = function(width) {
	var _g = tink_io_Buffer.pool[width - 10].pop();
	var v = _g;
	if(_g == null) return haxe_io_Bytes.alloc(1 << width); else switch(_g) {
	default:
		return v;
	}
};
tink_io_Buffer.releaseBytes = function(bytes) {
	var _g = 10;
	while(_g < 28) {
		var width = _g++;
		if(bytes.length == 1 << width) {
			tink_io_Buffer.poolBytes(bytes,width);
			return true;
		}
	}
	return false;
};
tink_io_Buffer.unmanaged = function(bytes) {
	return new tink_io_Buffer(bytes,-1);
};
tink_io_Buffer.prototype = {
	retain: function() {
		var _g = this;
		this.retainCount++;
		var called = false;
		return function() {
			if(called) return;
			called = true;
			if(--_g.retainCount == 0) _g.dispose();
		};
	}
	,get_size: function() {
		return this.bytes.length;
	}
	,get_end: function() {
		return (this.zero + this.available) % this.bytes.length;
	}
	,get_freeBytes: function() {
		return this.bytes.length - this.available;
	}
	,seal: function() {
		this.writable = false;
	}
	,content: function() {
		return this.blitTo(haxe_io_Bytes.alloc(this.available));
	}
	,blitTo: function(ret) {
		if(this.zero + this.available <= this.bytes.length) ret.blit(0,this.bytes,this.zero,this.available); else {
			ret.blit(this.bytes.length - this.zero,this.bytes,0,this.get_end());
			ret.blit(0,this.bytes,this.zero,this.bytes.length - this.zero);
		}
		return ret;
	}
	,toString: function() {
		return "[Buffer " + this.available + "/" + this.bytes.length + "]";
	}
	,safely: function(operation,f) {
		try {
			return tink_core_Outcome.Success(f());
		} catch( $e0 ) {
			if ($e0 instanceof js__$Boot_HaxeError) $e0 = $e0.val;
			if( js_Boot.__instanceof($e0,haxe_io_Error) ) {
				var e = $e0;
				return tink_core_Outcome.Success(e == haxe_io_Error.Blocked?0:-1);
			} else if( js_Boot.__instanceof($e0,haxe_io_Eof) ) {
				var e1 = $e0;
				return tink_core_Outcome.Success(-1);
			} else if( js_Boot.__instanceof($e0,tink_core_TypedError) ) {
				var e2 = $e0;
				return tink_core_Outcome.Failure(e2);
			} else {
			var e3 = $e0;
			return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"" + operation + " due to " + Std.string(e3),e3,{ fileName : "Buffer.hx", lineNumber : 102, className : "tink.io.Buffer", methodName : "safely"}));
			}
		}
	}
	,tryWritingTo: function(name,dest) {
		return this.safely("Failed writing to " + name,(function(f,a1) {
			return function() {
				return f(a1);
			};
		})($bind(this,this.writeTo),dest));
	}
	,tryReadingFrom: function(name,source) {
		return this.safely("Failed reading from " + name,(function(f,a1) {
			return function() {
				return f(a1);
			};
		})($bind(this,this.readFrom),source));
	}
	,writeTo: function(dest) {
		if(this.available == 0) if(this.writable) return 0; else {
			this.dispose();
			return -1;
		}
		var toWrite;
		if(this.zero + this.available > this.bytes.length) toWrite = this.bytes.length - this.zero; else toWrite = this.available;
		var transfered = dest.writeBytes(this.bytes,this.zero,toWrite);
		if(transfered > 0) {
			this.zero = (this.zero + transfered) % this.bytes.length;
			this.available -= transfered;
		}
		if(!this.writable && this.available == 0) this.dispose();
		return transfered;
	}
	,align: function() {
		if(this.zero < this.get_end()) return false;
		var copy;
		if(this.width > 0) copy = tink_io_Buffer.allocBytes(this.width); else copy = haxe_io_Bytes.alloc(this.bytes.length);
		this.blitTo(copy);
		var old = this.bytes;
		this.bytes = copy;
		this.raw = copy.b.bufferValue;
		this.zero = 0;
		tink_io_Buffer.poolBytes(old,this.width);
		return true;
	}
	,clear: function() {
		this.zero = 0;
		this.available = 0;
		this.writable = true;
	}
	,readFrom: function(source) {
		if(!this.writable) return -1;
		if(this.available == this.bytes.length) return 0;
		var toRead;
		if(this.get_end() < this.zero) toRead = this.bytes.length - this.available; else toRead = this.bytes.length - this.get_end();
		var transfered = source.readBytes(this.bytes,this.get_end(),toRead);
		if(transfered > 0) this.available += transfered;
		return transfered;
	}
	,dispose: function() {
		if(this.bytes.length > 0) {
			var old = this.bytes;
			this.bytes = tink_io_Buffer.ZERO_BYTES;
			this.raw = this.bytes.b.bufferValue;
			this.zero = 0;
			this.available = 0;
			tink_io_Buffer.poolBytes(old,this.width);
		}
	}
	,__class__: tink_io_Buffer
};
var tink_io_SinkObject = function() { };
tink_io_SinkObject.__name__ = true;
tink_io_SinkObject.prototype = {
	__class__: tink_io_SinkObject
};
var tink_io_IdealSinkObject = function() { };
tink_io_IdealSinkObject.__name__ = true;
tink_io_IdealSinkObject.__interfaces__ = [tink_io_SinkObject];
tink_io_IdealSinkObject.prototype = {
	__class__: tink_io_IdealSinkObject
};
var tink_io_SinkBase = function() { };
tink_io_SinkBase.__name__ = true;
tink_io_SinkBase.__interfaces__ = [tink_io_SinkObject];
tink_io_SinkBase.prototype = {
	write: function(from) {
		throw new js__$Boot_HaxeError("writing not implemented");
	}
	,close: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,idealize: function(onError) {
		return new tink_io_IdealizedSink(this,onError);
	}
	,__class__: tink_io_SinkBase
};
var tink_io_IdealSinkBase = function() { };
tink_io_IdealSinkBase.__name__ = true;
tink_io_IdealSinkBase.__interfaces__ = [tink_io_IdealSinkObject];
tink_io_IdealSinkBase.__super__ = tink_io_SinkBase;
tink_io_IdealSinkBase.prototype = $extend(tink_io_SinkBase.prototype,{
	idealize: function(onError) {
		return this;
	}
	,writeSafely: function(from) {
		throw new js__$Boot_HaxeError("not implemented");
	}
	,closeSafely: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Noise.Noise);
	}
	,write: function(from) {
		return tink_core__$Future_Future_$Impl_$.map(this.writeSafely(from),tink_core_Outcome.Success);
	}
	,close: function() {
		return tink_core__$Future_Future_$Impl_$.map(this.closeSafely(),tink_core_Outcome.Success);
	}
	,__class__: tink_io_IdealSinkBase
});
var tink_io_BlackHole = function() {
};
tink_io_BlackHole.__name__ = true;
tink_io_BlackHole.__super__ = tink_io_IdealSinkBase;
tink_io_BlackHole.prototype = $extend(tink_io_IdealSinkBase.prototype,{
	writeBytes: function(_,_1,len) {
		return len;
	}
	,writeSafely: function(from) {
		return tink_core__$Future_Future_$Impl_$.sync(from.writeTo(this));
	}
	,__class__: tink_io_BlackHole
});
var tink_io_IdealizedSink = function(target,onError) {
	this.target = target;
	this.onError = onError;
};
tink_io_IdealizedSink.__name__ = true;
tink_io_IdealizedSink.__super__ = tink_io_IdealSinkBase;
tink_io_IdealizedSink.prototype = $extend(tink_io_IdealSinkBase.prototype,{
	writeSafely: function(from) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.map(this.target.write(from),function(o) {
			switch(o[1]) {
			case 0:
				var p = o[2];
				return p;
			case 1:
				var e = o[2];
				_g.onError(e);
				from.clear();
				return -1;
			}
		});
	}
	,closeSafely: function() {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.map(this.target.close(),function(o) {
			switch(o[1]) {
			case 1:
				var e = o[2];
				_g.onError(e);
				break;
			default:
			}
			return tink_core_Noise.Noise;
		});
	}
	,__class__: tink_io_IdealizedSink
});
var tink_io__$IdealSource_IdealSource_$Impl_$ = {};
tink_io__$IdealSource_IdealSource_$Impl_$.__name__ = true;
tink_io__$IdealSource_IdealSource_$Impl_$.ofBytes = function(b,offset) {
	if(offset == null) offset = 0;
	if(b == null) return tink_io_Empty.instance; else return new tink_io_ByteSource(b,offset);
};
tink_io__$IdealSource_IdealSource_$Impl_$.fromBytes = function(b) {
	return tink_io__$IdealSource_IdealSource_$Impl_$.ofBytes(b,null);
};
tink_io__$IdealSource_IdealSource_$Impl_$.fromString = function(s) {
	if(s == null) return tink_io_Empty.instance; else return tink_io__$IdealSource_IdealSource_$Impl_$.ofBytes(haxe_io_Bytes.ofString(s),null);
};
tink_io__$IdealSource_IdealSource_$Impl_$.create = function() {
	return new tink_io_SyntheticIdealSource();
};
var tink_io_SourceObject = function() { };
tink_io_SourceObject.__name__ = true;
tink_io_SourceObject.prototype = {
	__class__: tink_io_SourceObject
};
var tink_io_IdealSourceObject = function() { };
tink_io_IdealSourceObject.__name__ = true;
tink_io_IdealSourceObject.__interfaces__ = [tink_io_SourceObject];
tink_io_IdealSourceObject.prototype = {
	__class__: tink_io_IdealSourceObject
};
var tink_io_SourceBase = function() { };
tink_io_SourceBase.__name__ = true;
tink_io_SourceBase.__interfaces__ = [tink_io_SourceObject];
tink_io_SourceBase.prototype = {
	idealize: function(onError) {
		return new tink_io_IdealizedSource(this,onError);
	}
	,prepend: function(other) {
		return tink_io__$Source_CompoundSource.of(other,this);
	}
	,append: function(other) {
		return tink_io__$Source_CompoundSource.of(this,other);
	}
	,read: function(into) {
		throw new js__$Boot_HaxeError("not implemented");
	}
	,close: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,pipeTo: function(dest) {
		return tink_io_Pipe.make(this,dest);
	}
	,parse: function(parser) {
		var ret = null;
		return tink_core__$Future_Future_$Impl_$._tryMap(this.parseWhile(parser,function(x) {
			ret = x;
			return tink_core__$Future_Future_$Impl_$.sync(false);
		}),function(s) {
			return { data : ret, rest : s};
		});
	}
	,parseWhile: function(parser,cond) {
		return new tink_io_ParserSink(parser,cond).parse(this);
	}
	,parseStream: function(parser,rest) {
		return tink_streams__$Stream_Stream_$Impl_$.generate(($_=new tink_io__$Source_ParsingStream(this,parser,rest),$bind($_,$_.next)));
	}
	,split: function(delim) {
		var f = this.parse(new tink_io_Splitter(delim));
		return { first : new tink_io__$Source_FutureSource(tink_core__$Future_Future_$Impl_$._tryMap(f,function(d) {
			return tink_io__$Source_Source_$Impl_$.fromBytes(d.data);
		})), then : new tink_io__$Source_FutureSource(tink_core__$Future_Future_$Impl_$._tryMap(f,function(d1) {
			return d1.rest;
		}))};
	}
	,__class__: tink_io_SourceBase
};
var tink_io_IdealSourceBase = function() { };
tink_io_IdealSourceBase.__name__ = true;
tink_io_IdealSourceBase.__interfaces__ = [tink_io_IdealSourceObject];
tink_io_IdealSourceBase.__super__ = tink_io_SourceBase;
tink_io_IdealSourceBase.prototype = $extend(tink_io_SourceBase.prototype,{
	idealize: function(onError) {
		return this;
	}
	,readSafely: function(into) {
		throw new js__$Boot_HaxeError("abstract");
	}
	,closeSafely: function() {
		throw new js__$Boot_HaxeError("abstract");
	}
	,close: function() {
		return tink_core__$Future_Future_$Impl_$.map(this.closeSafely(),tink_core_Outcome.Success);
	}
	,read: function(into) {
		return tink_core__$Future_Future_$Impl_$.map(this.readSafely(into),tink_core_Outcome.Success);
	}
	,pipeSafelyTo: function(dest) {
		return tink_io_Pipe.make(this,dest);
	}
	,__class__: tink_io_IdealSourceBase
});
var tink_io_IdealizedSource = function(target,onError) {
	this.target = target;
	this.onError = onError;
};
tink_io_IdealizedSource.__name__ = true;
tink_io_IdealizedSource.__super__ = tink_io_IdealSourceBase;
tink_io_IdealizedSource.prototype = $extend(tink_io_IdealSourceBase.prototype,{
	readSafely: function(into) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.map(this.target.read(into),function(x) {
			switch(x[1]) {
			case 0:
				var v = x[2];
				return v;
			case 1:
				var e = x[2];
				_g.onError(e);
				return -1;
			}
		});
	}
	,closeSafely: function() {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.map(this.target.close(),function(x) {
			switch(x[1]) {
			case 1:
				var e = x[2];
				_g.onError(e);
				return tink_core_Noise.Noise;
			case 0:
				var v = x[2];
				return v;
			}
		});
	}
	,__class__: tink_io_IdealizedSource
});
var tink_io_Empty = function() {
};
tink_io_Empty.__name__ = true;
tink_io_Empty.__super__ = tink_io_IdealSourceBase;
tink_io_Empty.prototype = $extend(tink_io_IdealSourceBase.prototype,{
	readSafely: function(into) {
		return tink_core__$Future_Future_$Impl_$.sync(-1);
	}
	,closeSafely: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Noise.Noise);
	}
	,toString: function() {
		return "[Empty source]";
	}
	,__class__: tink_io_Empty
});
var tink_io_SyntheticIdealSource = function() {
	this.writable = true;
	this.buf = [];
	this.queue = [];
};
tink_io_SyntheticIdealSource.__name__ = true;
tink_io_SyntheticIdealSource.__super__ = tink_io_IdealSourceBase;
tink_io_SyntheticIdealSource.prototype = $extend(tink_io_IdealSourceBase.prototype,{
	get_closed: function() {
		return this.buf == null;
	}
	,doRead: function(into) {
		if(this.buf == null || this.buf.length == 0) return -1;
		var src = this.buf[0];
		var ret = into.readFrom(src);
		if(src.pos == src.totlen) this.buf.shift();
		return ret;
	}
	,end: function() {
		this.writable = false;
		if(this.queue.length > 0) this.closeSafely();
	}
	,readSafely: function(into) {
		var _g = this;
		if(this.buf == null) return tink_core__$Future_Future_$Impl_$.sync(-1);
		if(this.buf.length > 0 || !this.writable) return tink_core__$Future_Future_$Impl_$.sync(this.doRead(into));
		var trigger = new tink_core_FutureTrigger();
		this.queue.push(trigger);
		return tink_core__$Future_Future_$Impl_$.map(trigger.future,function(_) {
			return _g.doRead(into);
		});
	}
	,write: function(bytes) {
		if(this.buf == null || !this.writable) return false;
		this.buf.push(new haxe_io_BytesInput(bytes));
		if(this.queue.length > 0 && (this.buf.length > 0 || !this.writable)) this.queue.shift().trigger(tink_core_Noise.Noise);
		return true;
	}
	,closeSafely: function() {
		if(!(this.buf == null)) {
			this.buf = null;
			var _g = 0;
			var _g1 = this.queue;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				q.trigger(tink_core_Noise.Noise);
			}
			this.queue = null;
		}
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Noise.Noise);
	}
	,__class__: tink_io_SyntheticIdealSource
});
var tink_io_ByteSource = function(data,offset) {
	if(offset == null) offset = 0;
	this.data = data;
	this.pos = offset;
};
tink_io_ByteSource.__name__ = true;
tink_io_ByteSource.__super__ = tink_io_IdealSourceBase;
tink_io_ByteSource.prototype = $extend(tink_io_IdealSourceBase.prototype,{
	readBytes: function(into,offset,len) {
		if(this.pos >= this.data.length) return -1; else if(len <= 0) return 0; else if(this.pos + len > this.data.length) return this.readBytes(into,offset,this.data.length - this.pos); else {
			into.blit(offset,this.data,this.pos,len);
			this.pos += len;
			return len;
		}
	}
	,toString: function() {
		return "[Byte Source " + this.pos + "/" + this.data.length + "]";
	}
	,readSafely: function(into) {
		return tink_core__$Future_Future_$Impl_$.sync(into.readFrom(this));
	}
	,closeSafely: function() {
		this.data = tink_io_Buffer.ZERO_BYTES;
		this.pos = 0;
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Noise.Noise);
	}
	,__class__: tink_io_ByteSource
});
var tink_io_Pipe = function(source,dest,buffer,onDone) {
	if(buffer == null) buffer = tink_io_Buffer.alloc(17);
	this.source = source;
	this.dest = dest;
	this.buffer = buffer;
	this.result = new tink_core_FutureTrigger();
	this.onDone = onDone;
};
tink_io_Pipe.__name__ = true;
tink_io_Pipe.make = function(from,to,buffer) {
	var p1 = new tink_io_Pipe(from,to,buffer,function(p) {
		p.buffer.dispose();
	});
	p1.read();
	return p1.result.future;
};
tink_io_Pipe.prototype = {
	terminate: function(s) {
		this.result.trigger(s);
		if(this.onDone != null) this.onDone(this);
	}
	,read: function() {
		var _g1 = this;
		var this1 = this.source.read(this.buffer);
		this1(function(o) {
			switch(o[1]) {
			case 0:
				var __ex0 = o[2];
				{
					var _g = __ex0 < 0;
					switch(_g) {
					case true:
						_g1.source.close();
						_g1.buffer.seal();
						_g1.flush();
						break;
					default:
						switch(o[1]) {
						case 0:
							var v = o[2];
							_g1.flush();
							break;
						case 1:
							var e = o[2];
							_g1.terminate(tink_io_PipeResult.SourceFailed(e));
							break;
						}
					}
				}
				break;
			case 1:
				var e1 = o[2];
				_g1.terminate(tink_io_PipeResult.SourceFailed(e1));
				break;
			}
		});
	}
	,flush: function() {
		var _g1 = this;
		var this1 = this.dest.write(this.buffer);
		this1(function(o) {
			switch(o[1]) {
			case 0:
				var __ex0 = o[2];
				{
					var _g = __ex0 < 0;
					switch(_g) {
					case true:
						_g1.terminate(_g1.buffer.available > 0?tink_io_PipeResult.SinkEnded(_g1.buffer):tink_io_PipeResult.AllWritten);
						break;
					default:
						switch(o[1]) {
						case 0:
							var v = o[2];
							if(_g1.buffer.writable) _g1.read(); else _g1.flush();
							break;
						case 1:
							var f = o[2];
							_g1.source.close();
							_g1.terminate(tink_io_PipeResult.SinkFailed(f,_g1.buffer));
							break;
						}
					}
				}
				break;
			case 1:
				var f1 = o[2];
				_g1.source.close();
				_g1.terminate(tink_io_PipeResult.SinkFailed(f1,_g1.buffer));
				break;
			}
		});
	}
	,__class__: tink_io_Pipe
};
var tink_io_PipeResult = { __ename__ : true, __constructs__ : ["AllWritten","SinkFailed","SinkEnded","SourceFailed"] };
tink_io_PipeResult.AllWritten = ["AllWritten",0];
tink_io_PipeResult.AllWritten.toString = $estr;
tink_io_PipeResult.AllWritten.__enum__ = tink_io_PipeResult;
tink_io_PipeResult.SinkFailed = function(e,rest) { var $x = ["SinkFailed",1,e,rest]; $x.__enum__ = tink_io_PipeResult; $x.toString = $estr; return $x; };
tink_io_PipeResult.SinkEnded = function(rest) { var $x = ["SinkEnded",2,rest]; $x.__enum__ = tink_io_PipeResult; $x.toString = $estr; return $x; };
tink_io_PipeResult.SourceFailed = function(e) { var $x = ["SourceFailed",3,e]; $x.__enum__ = tink_io_PipeResult; $x.toString = $estr; return $x; };
var tink_io__$Pipe_PipePart_$Impl_$ = {};
tink_io__$Pipe_PipePart_$Impl_$.__name__ = true;
tink_io__$Pipe_PipePart_$Impl_$._new = function(x) {
	return x;
};
tink_io__$Pipe_PipePart_$Impl_$.ofIdealSource = function(s) {
	return s;
};
tink_io__$Pipe_PipePart_$Impl_$.ofSource = function(s) {
	return s;
};
tink_io__$Pipe_PipePart_$Impl_$.ofIdealSink = function(s) {
	return s;
};
tink_io__$Pipe_PipePart_$Impl_$.ofSink = function(s) {
	return s;
};
var tink_io__$Progress_Progress_$Impl_$ = {};
tink_io__$Progress_Progress_$Impl_$.__name__ = true;
tink_io__$Progress_Progress_$Impl_$.get_isEof = function(this1) {
	return this1 < 0;
};
tink_io__$Progress_Progress_$Impl_$.get_bytes = function(this1) {
	if(this1 < 0) return 0; else return this1;
};
tink_io__$Progress_Progress_$Impl_$._new = function(v) {
	return v;
};
tink_io__$Progress_Progress_$Impl_$.by = function(amount) {
	return amount;
};
tink_io__$Progress_Progress_$Impl_$.toBool = function(this1) {
	return this1 > 0;
};
var tink_io_AsyncSink = function(writer,closer) {
	this.closer = closer;
	this.writer = writer;
	this.last = tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(0));
};
tink_io_AsyncSink.__name__ = true;
tink_io_AsyncSink.cause = function(f) {
	f(function(r) {
		null;
	});
	return f;
};
tink_io_AsyncSink.__super__ = tink_io_SinkBase;
tink_io_AsyncSink.prototype = $extend(tink_io_SinkBase.prototype,{
	write: function(from) {
		var _g = this;
		if(this.closing != null) return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(-1));
		return tink_io_AsyncSink.cause(this.last = tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.last,function(p) {
			return _g.writer(from);
		}));
	}
	,close: function() {
		var _g = this;
		if(this.closing == null) tink_io_AsyncSink.cause(this.closing = tink_core__$Future_Future_$Impl_$.flatMap(this.last,function(_) {
			return _g.closer();
		}));
		return this.closing;
	}
	,__class__: tink_io_AsyncSink
});
var tink_io_NodeSink = function(target,name) {
	var _g = this;
	this.target = target;
	this.name = name;
	tink_io_AsyncSink.call(this,function(from) {
		var bytes = from.content();
		var progress = from.writeTo({ writeBytes : function(b,pos,len) {
			return len;
		}});
		var $native = new js_node_buffer_Buffer(bytes.b.bufferValue);
		if(progress < 0 || target.write($native)) return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(progress)); else return tink_core__$Future_Future_$Impl_$.async(function(cb) {
			_g.next({ drain : function(_) {
				cb(tink_core_Outcome.Success(progress));
			}, error : function(e) {
				cb(tink_core_Outcome.Failure(new tink_core_TypedError(null,"Failed writing to " + name,e)));
			}});
		});
	},function() {
		target.end();
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	});
};
tink_io_NodeSink.__name__ = true;
tink_io_NodeSink.__super__ = tink_io_AsyncSink;
tink_io_NodeSink.prototype = $extend(tink_io_AsyncSink.prototype,{
	toString: function() {
		return this.name;
	}
	,next: function(handlers) {
		var _g2 = this;
		var handlers1 = handlers;
		var removeAll = function() {
			var _g = 0;
			var _g1 = Reflect.fields(handlers1);
			while(_g < _g1.length) {
				var key = _g1[_g];
				++_g;
				_g2.target.removeListener(key,handlers1[key]);
			}
		};
		var _g3 = 0;
		var _g11 = Reflect.fields(handlers1);
		while(_g3 < _g11.length) {
			var key1 = _g11[_g3];
			++_g3;
			var old = [handlers1[key1]];
			var nu = handlers1[key1] = (function(old) {
				return function(x) {
					old[0](x);
					removeAll();
				};
			})(old);
			this.target.addListener(key1,nu);
		}
	}
	,__class__: tink_io_NodeSink
});
var tink_io__$Sink_Sink_$Impl_$ = {};
tink_io__$Sink_Sink_$Impl_$.__name__ = true;
tink_io__$Sink_Sink_$Impl_$.ofNodeStream = function(w,name) {
	return new tink_io_NodeSink(w,name);
};
tink_io__$Sink_Sink_$Impl_$.inMemory = function() {
	return tink_io__$Sink_Sink_$Impl_$.ofOutput("Memory sink",new haxe_io_BytesOutput(),tink_io__$Worker_Worker_$Impl_$.EAGER);
};
tink_io__$Sink_Sink_$Impl_$.async = function(writer,closer) {
	return new tink_io_AsyncSink(writer,closer);
};
tink_io__$Sink_Sink_$Impl_$.flatten = function(s) {
	return new tink_io_FutureSink(s);
};
tink_io__$Sink_Sink_$Impl_$.ofOutput = function(name,target,worker) {
	return new tink_io_StdSink(name,target,worker);
};
var tink_io__$Sink_SimpleOutput = function(writer) {
	this.writer = writer;
};
tink_io__$Sink_SimpleOutput.__name__ = true;
tink_io__$Sink_SimpleOutput.__super__ = haxe_io_Output;
tink_io__$Sink_SimpleOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		this.writer(c);
	}
	,__class__: tink_io__$Sink_SimpleOutput
});
var tink_io_FutureSink = function(f) {
	this.f = f;
};
tink_io_FutureSink.__name__ = true;
tink_io_FutureSink.cause = function(f) {
	f(function(r) {
		null;
	});
	return f;
};
tink_io_FutureSink.__super__ = tink_io_SinkBase;
tink_io_FutureSink.prototype = $extend(tink_io_SinkBase.prototype,{
	write: function(from) {
		return tink_io_FutureSink.cause(tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.f,function(s) {
			return s.write(from);
		}));
	}
	,close: function() {
		return tink_io_FutureSink.cause(tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.f,function(s) {
			return s.close();
		}));
	}
	,toString: function() {
		var ret = "PENDING";
		this.f(function(o) {
			ret = Std.string(o);
		});
		return "[FutureSink " + ret + "]";
	}
	,__class__: tink_io_FutureSink
});
var tink_io_StdSink = function(name,target,worker) {
	this.name = name;
	this.target = target;
	this.worker = worker;
};
tink_io_StdSink.__name__ = true;
tink_io_StdSink.__super__ = tink_io_SinkBase;
tink_io_StdSink.prototype = $extend(tink_io_SinkBase.prototype,{
	write: function(from) {
		var _g = this;
		var this1 = this.worker;
		var task = tink_core__$Lazy_Lazy_$Impl_$.ofFunc(function() {
			return from.tryWritingTo(_g.name,_g.target);
		});
		if(this1 == null) return tink_io__$Worker_Worker_$Impl_$.work(tink_io__$Worker_Worker_$Impl_$.get_DEFAULT(),task); else return this1.work(task);
	}
	,close: function() {
		var _g = this;
		var this1 = this.worker;
		var task = tink_core__$Lazy_Lazy_$Impl_$.ofFunc(function() {
			return tink_core_TypedError.catchExceptions(function() {
				_g.target.close();
				return tink_core_Noise.Noise;
			},tink_core_TypedError.reporter(null,"Failed to close " + _g.name,{ fileName : "Sink.hx", lineNumber : 189, className : "tink.io.StdSink", methodName : "close"}));
		});
		if(this1 == null) return tink_io__$Worker_Worker_$Impl_$.work(tink_io__$Worker_Worker_$Impl_$.get_DEFAULT(),task); else return this1.work(task);
	}
	,toString: function() {
		return this.name;
	}
	,__class__: tink_io_StdSink
});
var tink_io_ParserSink = function(parser,onResult) {
	this.parser = parser;
	this.onResult = onResult;
	this.wait = tink_core__$Future_Future_$Impl_$.sync(true);
};
tink_io_ParserSink.__name__ = true;
tink_io_ParserSink.__super__ = tink_io_SinkBase;
tink_io_ParserSink.prototype = $extend(tink_io_SinkBase.prototype,{
	doClose: function() {
		if(this.state == null) this.state = tink_core_Outcome.Success(-1);
	}
	,write: function(from) {
		var _g = this;
		if(this.state != null) return tink_core__$Future_Future_$Impl_$.sync(this.state); else return tink_core__$Future_Future_$Impl_$.map(this.wait,function(resume) {
			if(!resume) {
				_g.doClose();
				return _g.state;
			} else {
				var last = from.available;
				if(last == 0 && !from.writable) {
					var _g1 = _g.parser.eof();
					switch(_g1[1]) {
					case 0:
						var v = _g1[2];
						_g.doClose();
						_g.wait = _g.onResult(v);
						return tink_core_Outcome.Success(-1);
					case 1:
						var e = _g1[2];
						return _g.state = tink_core_Outcome.Failure(e);
					}
				} else {
					var _g11 = _g.parser.progress(from);
					switch(_g11[1]) {
					case 0:
						var d = _g11[2];
						switch(d[1]) {
						case 0:
							var v1 = d[2];
							_g.wait = _g.onResult(v1);
							break;
						case 1:
							break;
						}
						return tink_core_Outcome.Success(last - from.available);
					case 1:
						var f = _g11[2];
						return _g.state = tink_core_Outcome.Failure(f);
					}
				}
			}
		});
	}
	,close: function() {
		this.doClose();
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,parse: function(s) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.async(function(cb) {
			var this1 = tink_io_Pipe.make(s,_g,tink_io_Buffer.allocMin(2 * _g.parser.minSize()));
			this1(function(res) {
				cb((function($this) {
					var $r;
					switch(res[1]) {
					case 0:
						$r = tink_core_Outcome.Success(s);
						break;
					case 2:
						$r = (function($this) {
							var $r;
							var rest = res[2];
							$r = tink_core_Outcome.Success(s.prepend(tink_io__$Source_Source_$Impl_$.fromBytes(rest.content())));
							return $r;
						}($this));
						break;
					case 1:
						$r = (function($this) {
							var $r;
							var e = res[2];
							$r = tink_core_Outcome.Failure(e);
							return $r;
						}($this));
						break;
					case 3:
						$r = (function($this) {
							var $r;
							var e1 = res[2];
							$r = tink_core_Outcome.Failure(e1);
							return $r;
						}($this));
						break;
					}
					return $r;
				}(this)));
			});
		});
	}
	,__class__: tink_io_ParserSink
});
var tink_io__$Source_Source_$Impl_$ = {};
tink_io__$Source_Source_$Impl_$.__name__ = true;
tink_io__$Source_Source_$Impl_$.ofNodeStream = function(r,name) {
	return new tink_io__$Source_NodeSource(r,name);
};
tink_io__$Source_Source_$Impl_$.limit = function(this1,length) {
	return new tink_io__$Source_LimitedSource(this1,length);
};
tink_io__$Source_Source_$Impl_$.async = function(f,close) {
	return new tink_io__$Source_AsyncSource(f,close);
};
tink_io__$Source_Source_$Impl_$.failure = function(e) {
	return new tink_io__$Source_FailedSource(e);
};
tink_io__$Source_Source_$Impl_$.ofInput = function(name,input,worker) {
	return new tink_io__$Source_StdSource(name,input,worker);
};
tink_io__$Source_Source_$Impl_$.flatten = function(s) {
	return new tink_io__$Source_FutureSource(s);
};
tink_io__$Source_Source_$Impl_$.fromBytes = function(b) {
	return b == null?tink_io_Empty.instance:new tink_io_ByteSource(b,0);
};
tink_io__$Source_Source_$Impl_$.fromString = function(s) {
	return tink_io__$Source_Source_$Impl_$.fromBytes(haxe_io_Bytes.ofString(s));
};
var tink_io__$Source_SimpleSource = function(reader,closer) {
	this.reader = reader;
	this.closer = closer;
};
tink_io__$Source_SimpleSource.__name__ = true;
tink_io__$Source_SimpleSource.__super__ = tink_io_SourceBase;
tink_io__$Source_SimpleSource.prototype = $extend(tink_io_SourceBase.prototype,{
	close: function() {
		if(this.closer == null) return tink_io_SourceBase.prototype.close.call(this); else return this.closer();
	}
	,read: function(into) {
		return this.reader(into);
	}
	,__class__: tink_io__$Source_SimpleSource
});
var tink_io__$Source_NodeSource = function(target,name) {
	this.target = target;
	this.name = name;
	this.end = tink_core__$Future_Future_$Impl_$.async(function(cb) {
		target.once("end",function() {
			cb(tink_core_Outcome.Success(-1));
		});
		target.once("error",function(e) {
			cb(tink_core_Outcome.Failure((tink_core_TypedError.reporter(null,"Error while reading from " + name,{ fileName : "Source.hx", lineNumber : 102, className : "tink.io._Source.NodeSource", methodName : "new"}))(e)));
		});
	});
};
tink_io__$Source_NodeSource.__name__ = true;
tink_io__$Source_NodeSource.__super__ = tink_io_SourceBase;
tink_io__$Source_NodeSource.prototype = $extend(tink_io_SourceBase.prototype,{
	readBytes: function(into,offset,length) {
		if(length > this.rest.length - this.pos) length = this.rest.length - this.pos;
		into.blit(offset,this.rest,this.pos,length);
		this.pos += length;
		if(this.pos == this.rest.length) this.rest = null;
		return length;
	}
	,read: function(into) {
		var _g = this;
		if(this.rest == null) {
			var chunk = this.target.read();
			if(chunk == null) return tink_core__$Future_Future_$Impl_$.or(this.end,tink_core__$Future_Future_$Impl_$.flatMap(tink_core__$Future_Future_$Impl_$.async(function(cb) {
				_g.target.once("readable",function() {
					cb(tink_core_Noise.Noise);
				});
			}),function(_) {
				return _g.read(into);
			}));
			this.rest = haxe_io_Bytes.ofData(chunk);
			this.pos = 0;
		}
		return tink_core__$Future_Future_$Impl_$.sync(into.tryReadingFrom(this.name,this));
	}
	,close: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
	}
	,pipeTo: function(dest) {
		var _g = this;
		if(js_Boot.__instanceof(dest,tink_io_NodeSink)) {
			var dest1 = dest;
			var writable = dest1.target;
			this.target.pipe(writable,{ end : false});
			return tink_core__$Future_Future_$Impl_$.async(function(cb) {
				dest1.next({ unpipe : function(s) {
					if(s == _g.target) cb(tink_io_PipeResult.AllWritten);
				}});
			});
		} else return tink_io_SourceBase.prototype.pipeTo.call(this,dest);
	}
	,__class__: tink_io__$Source_NodeSource
});
var tink_io__$Source_AsyncSource = function(f,close) {
	var _g = this;
	this.data = tink_io__$IdealSource_IdealSource_$Impl_$.create();
	this._close = close;
	var onData = tink_core__$Signal_Signal_$Impl_$.trigger();
	var onEnd = new tink_core_FutureTrigger();
	var this1 = tink_core__$Signal_SignalTrigger_$Impl_$.asSignal(onData);
	this1(($_=this.data,$bind($_,$_.write)));
	this.end = onEnd.future;
	this.end(function(e) {
		tink_core__$Future_Future_$Impl_$.map(_g.data.closeSafely(),tink_core_Outcome.Success);
	});
	this.onError = tink_core__$Future_Future_$Impl_$.async(function(cb) {
		_g.end(function(o) {
			switch(o[1]) {
			case 1:
				var e1 = o[2];
				cb(tink_core_Outcome.Failure(e1));
				break;
			default:
			}
		});
	});
	f(onData,onEnd);
};
tink_io__$Source_AsyncSource.__name__ = true;
tink_io__$Source_AsyncSource.__super__ = tink_io_SourceBase;
tink_io__$Source_AsyncSource.prototype = $extend(tink_io_SourceBase.prototype,{
	read: function(into) {
		return tink_core__$Future_Future_$Impl_$.or(tink_core__$Future_Future_$Impl_$.map(this.data.readSafely(into),tink_core_Outcome.Success),this.onError);
	}
	,close: function() {
		this._close();
		return tink_core__$Future_Future_$Impl_$.map(this.data.closeSafely(),tink_core_Outcome.Success);
	}
	,__class__: tink_io__$Source_AsyncSource
});
var tink_io__$Source_LimitedSource = function(target,max) {
	this.surplus = 0;
	this.bytesRead = 0;
	this.target = target;
	this.max = max;
};
tink_io__$Source_LimitedSource.__name__ = true;
tink_io__$Source_LimitedSource.__super__ = tink_io_SourceBase;
tink_io__$Source_LimitedSource.prototype = $extend(tink_io_SourceBase.prototype,{
	fake: function(data,pos,len) {
		if(len > this.surplus) len = this.surplus;
		this.surplus -= len;
		return len;
	}
	,writeBytes: function(from,pos,len) {
		return this.fake(from,pos,len);
	}
	,readBytes: function(into,pos,len) {
		return this.fake(into,pos,len);
	}
	,read: function(into) {
		var _g = this;
		if(this.bytesRead >= this.max) return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(-1)); else return tink_core__$Future_Future_$Impl_$.async(function(cb) {
			var left = _g.max - _g.bytesRead;
			var surplus;
			if(left < into.bytes.length - into.available) surplus = into.bytes.length - into.available - left; else surplus = 0;
			_g.surplus = surplus;
			while(_g.surplus > 0) into.readFrom(_g);
			var this1 = _g.target.read(into);
			this1(function(o) {
				_g.surplus = surplus;
				while(_g.surplus > 0) into.writeTo(_g);
				switch(o[1]) {
				case 0:
					var p = o[2];
					if(p < 0) _g.bytesRead += 0; else _g.bytesRead += p;
					break;
				default:
				}
				cb(o);
			});
		});
	}
	,__class__: tink_io__$Source_LimitedSource
});
var tink_io__$Source_ParsingStream = function(source,parser,rest) {
	var _g = this;
	this.nextStep = new tink_core_FutureTrigger();
	this.awaitRead = new tink_core_FutureTrigger();
	var this1 = new tink_io_ParserSink(parser,$bind(this,this.onResult)).parse(source);
	this1(function(x) {
		switch(x[1]) {
		case 0:
			var v = x[2];
			_g.awaitRead.future((function($this) {
				var $r;
				var f = function() {
					_g.nextStep.trigger(tink_streams_StreamStep.End);
					if(rest != null) rest(v);
				};
				$r = function(r) {
					f();
				};
				return $r;
			}(this)));
			break;
		case 1:
			var e = x[2];
			_g.nextStep.trigger(tink_streams_StreamStep.Fail(e));
			break;
		}
	});
};
tink_io__$Source_ParsingStream.__name__ = true;
tink_io__$Source_ParsingStream.prototype = {
	next: function() {
		var ret = this.nextStep;
		this.awaitRead.trigger(true);
		return ret.future;
	}
	,onResult: function(data) {
		var _g = this;
		if(data == null) {
			this.nextStep.trigger(tink_streams_StreamStep.End);
			return tink_core__$Future_Future_$Impl_$.sync(false);
		} else {
			var resume = this.awaitRead.future;
			resume((function($this) {
				var $r;
				var f = function() {
					var old = _g.nextStep;
					_g.nextStep = new tink_core_FutureTrigger();
					_g.awaitRead = new tink_core_FutureTrigger();
					old.trigger(tink_streams_StreamStep.Data(data));
				};
				$r = function(r) {
					f();
				};
				return $r;
			}(this)));
			return resume;
		}
	}
	,__class__: tink_io__$Source_ParsingStream
};
var tink_io__$Source_FutureSource = function(s) {
	this.s = s;
};
tink_io__$Source_FutureSource.__name__ = true;
tink_io__$Source_FutureSource.__super__ = tink_io_SourceBase;
tink_io__$Source_FutureSource.prototype = $extend(tink_io_SourceBase.prototype,{
	read: function(into) {
		return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.s,function(s) {
			return s.read(into);
		});
	}
	,close: function() {
		return tink_core__$Future_Future_$Impl_$._tryFailingFlatMap(this.s,function(s) {
			return s.close();
		});
	}
	,toString: function() {
		var ret = "PENDING";
		this.s(function(o) {
			ret = Std.string(o);
		});
		return "[FutureSource " + ret + "]";
	}
	,__class__: tink_io__$Source_FutureSource
});
var tink_io__$Source_FailedSource = function(error) {
	this.error = error;
};
tink_io__$Source_FailedSource.__name__ = true;
tink_io__$Source_FailedSource.__super__ = tink_io_SourceBase;
tink_io__$Source_FailedSource.prototype = $extend(tink_io_SourceBase.prototype,{
	read: function(into) {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(this.error));
	}
	,close: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(this.error));
	}
	,__class__: tink_io__$Source_FailedSource
});
var tink_io__$Source_StdSource = function(name,target,worker) {
	this.name = name;
	this.target = target;
	this.worker = worker;
};
tink_io__$Source_StdSource.__name__ = true;
tink_io__$Source_StdSource.__super__ = tink_io_SourceBase;
tink_io__$Source_StdSource.prototype = $extend(tink_io_SourceBase.prototype,{
	read: function(into) {
		var _g = this;
		var this1 = this.worker;
		var task = tink_core__$Lazy_Lazy_$Impl_$.ofFunc(function() {
			return into.tryReadingFrom(_g.name,_g.target);
		});
		if(this1 == null) return tink_io__$Worker_Worker_$Impl_$.work(tink_io__$Worker_Worker_$Impl_$.get_DEFAULT(),task); else return this1.work(task);
	}
	,close: function() {
		var _g = this;
		var this1 = this.worker;
		var task = tink_core__$Lazy_Lazy_$Impl_$.ofFunc(function() {
			return tink_core_TypedError.catchExceptions(function() {
				_g.target.close();
				return tink_core_Noise.Noise;
			},tink_core_TypedError.reporter(null,"Failed to close " + _g.name,{ fileName : "Source.hx", lineNumber : 407, className : "tink.io._Source.StdSource", methodName : "close"}));
		});
		if(this1 == null) return tink_io__$Worker_Worker_$Impl_$.work(tink_io__$Worker_Worker_$Impl_$.get_DEFAULT(),task); else return this1.work(task);
	}
	,toString: function() {
		return this.name;
	}
	,__class__: tink_io__$Source_StdSource
});
var tink_io__$Source_CompoundSource = function(parts) {
	this.parts = parts;
};
tink_io__$Source_CompoundSource.__name__ = true;
tink_io__$Source_CompoundSource.of = function(a,b) {
	return new tink_io__$Source_CompoundSource((function($this) {
		var $r;
		var _g;
		_g = (a instanceof tink_io__$Source_CompoundSource)?a:null;
		var _g1;
		_g1 = (b instanceof tink_io__$Source_CompoundSource)?b:null;
		$r = _g == null?_g1 == null?[a,b]:(function($this) {
			var $r;
			var p = _g1.parts;
			$r = [a].concat(p);
			return $r;
		}($this)):_g1 == null?(function($this) {
			var $r;
			var p1 = _g.parts;
			$r = p1.concat([b]);
			return $r;
		}($this)):(function($this) {
			var $r;
			var p11 = _g.parts;
			var p2 = _g1.parts;
			$r = p11.concat(p2);
			return $r;
		}($this));
		return $r;
	}(this)));
};
tink_io__$Source_CompoundSource.__super__ = tink_io_SourceBase;
tink_io__$Source_CompoundSource.prototype = $extend(tink_io_SourceBase.prototype,{
	append: function(other) {
		return tink_io__$Source_CompoundSource.of(this,other);
	}
	,pipeTo: function(dest) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.async(function(cb) {
			var next;
			var next1 = null;
			next1 = function() {
				var _g1 = _g.parts;
				var v = _g1;
				switch(_g1.length) {
				case 0:
					cb(tink_io_PipeResult.AllWritten);
					break;
				default:
					var this1 = _g.parts[0].pipeTo(dest);
					this1(function(x) {
						switch(x[1]) {
						case 0:
							_g.parts.shift().close();
							next1();
							break;
						default:
							cb(x);
						}
					});
				}
			};
			next = next1;
			next();
		});
	}
	,close: function() {
		if(this.parts.length == 0) return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(tink_core_Noise.Noise));
		var ret = tink_core__$Future_Future_$Impl_$.ofMany((function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				var _g2 = $this.parts;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(p.close());
				}
			}
			$r = _g;
			return $r;
		}(this)));
		this.parts = [];
		return tink_core__$Future_Future_$Impl_$.map(ret,function(outcomes) {
			var failures = [];
			var _g11 = 0;
			while(_g11 < outcomes.length) {
				var o = outcomes[_g11];
				++_g11;
				switch(o[1]) {
				case 1:
					var f = o[2];
					failures.push(f);
					break;
				default:
				}
			}
			switch(failures.length) {
			case 0:
				return tink_core_Outcome.Success(tink_core_Noise.Noise);
			default:
				return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Error closing sources",failures,{ fileName : "Source.hx", lineNumber : 463, className : "tink.io._Source.CompoundSource", methodName : "close"}));
			}
		});
	}
	,read: function(into) {
		var _g2 = this;
		var _g = this.parts;
		switch(_g.length) {
		case 0:
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(-1));
		default:
			return tink_core__$Future_Future_$Impl_$.flatMap(this.parts[0].read(into),function(o) {
				switch(o[1]) {
				case 0:
					var __ex0 = o[2];
					{
						var _g1 = __ex0 < 0;
						switch(_g1) {
						case true:
							_g2.parts.shift().close();
							return _g2.read(into);
						default:
							return tink_core__$Future_Future_$Impl_$.sync(o);
						}
					}
					break;
				default:
					return tink_core__$Future_Future_$Impl_$.sync(o);
				}
			});
		}
	}
	,__class__: tink_io__$Source_CompoundSource
});
var tink_io_StreamParser = function() { };
tink_io_StreamParser.__name__ = true;
tink_io_StreamParser.prototype = {
	__class__: tink_io_StreamParser
};
var tink_io_ParseStep = { __ename__ : true, __constructs__ : ["Failed","Done","Progressed"] };
tink_io_ParseStep.Failed = function(e) { var $x = ["Failed",0,e]; $x.__enum__ = tink_io_ParseStep; $x.toString = $estr; return $x; };
tink_io_ParseStep.Done = function(r) { var $x = ["Done",1,r]; $x.__enum__ = tink_io_ParseStep; $x.toString = $estr; return $x; };
tink_io_ParseStep.Progressed = ["Progressed",2];
tink_io_ParseStep.Progressed.toString = $estr;
tink_io_ParseStep.Progressed.__enum__ = tink_io_ParseStep;
var tink_io_Splitter = function(delim) {
	this.delim = delim;
};
tink_io_Splitter.__name__ = true;
tink_io_Splitter.__interfaces__ = [tink_io_StreamParser];
tink_io_Splitter.prototype = {
	minSize: function() {
		return this.delim.length;
	}
	,reset: function() {
		this.out = new haxe_io_BytesBuffer();
	}
	,writeBytes: function(bytes,start,length) {
		if(!this.atEnd) {
			length -= this.delim.length;
			if(length < 0) length = 0;
		}
		if(length > 0) {
			var _g = 0;
			while(_g < length) {
				var i = _g++;
				var found = true;
				var _g2 = 0;
				var _g1 = this.delim.length;
				while(_g2 < _g1) {
					var dpos = _g2++;
					if(bytes.b[start + i + dpos] != this.delim.b[dpos]) {
						found = false;
						break;
					}
				}
				if(found) {
					this.out.addBytes(bytes,start,i);
					this.result = haxe_ds_Option.Some(this.out.getBytes());
					this.reset();
					return i + this.delim.length;
				}
			}
			this.out.addBytes(bytes,start,length);
		}
		return length;
	}
	,progress: function(buffer) {
		if(this.result != haxe_ds_Option.None) {
			this.reset();
			this.result = haxe_ds_Option.None;
		}
		if(buffer.bytes.length - buffer.zero <= this.delim.length) buffer.align();
		this.atEnd = !buffer.writable;
		buffer.writeTo(this);
		return tink_core_Outcome.Success(this.result);
	}
	,eof: function() {
		return tink_core_Outcome.Success(this.out.getBytes());
	}
	,__class__: tink_io_Splitter
};
var tink_io_ByteWiseParser = function() {
	this.resume = tink_core_Outcome.Success(haxe_ds_Option.None);
};
tink_io_ByteWiseParser.__name__ = true;
tink_io_ByteWiseParser.__interfaces__ = [tink_io_StreamParser];
tink_io_ByteWiseParser.prototype = {
	minSize: function() {
		return 1;
	}
	,read: function(c) {
		throw new js__$Boot_HaxeError("not implemented");
	}
	,eof: function() {
		{
			var _g = this.read(-1);
			switch(_g[1]) {
			case 0:
				var e = _g[2];
				return tink_core_Outcome.Failure(e);
			case 1:
				var r = _g[2];
				return tink_core_Outcome.Success(r);
			default:
				return tink_core_Outcome.Failure(new tink_core_TypedError(422,"Unexpected end of input",{ fileName : "StreamParser.hx", lineNumber : 112, className : "tink.io.ByteWiseParser", methodName : "eof"}));
			}
		}
	}
	,writeBytes: function(bytes,start,length) {
		var data = bytes.b.bufferValue;
		var _g1 = start;
		var _g = start + length;
		while(_g1 < _g) {
			var pos = _g1++;
			{
				var _g2 = this.read(data.bytes[pos]);
				switch(_g2[1]) {
				case 2:
					break;
				case 0:
					var e = _g2[2];
					this.result = tink_core_Outcome.Failure(e);
					return pos - start + 1;
				case 1:
					var r = _g2[2];
					this.result = tink_core_Outcome.Success(haxe_ds_Option.Some(r));
					return pos - start + 1;
				}
			}
		}
		return length;
	}
	,progress: function(buffer) {
		this.result = this.resume;
		buffer.writeTo(this);
		return this.result;
	}
	,__class__: tink_io_ByteWiseParser
};
var tink_io_WorkerObject = function() { };
tink_io_WorkerObject.__name__ = true;
tink_io_WorkerObject.prototype = {
	__class__: tink_io_WorkerObject
};
var tink_io__$Worker_EagerWorker = function() {
};
tink_io__$Worker_EagerWorker.__name__ = true;
tink_io__$Worker_EagerWorker.__interfaces__ = [tink_io_WorkerObject];
tink_io__$Worker_EagerWorker.prototype = {
	work: function(task) {
		return tink_core__$Future_Future_$Impl_$.sync(task());
	}
	,__class__: tink_io__$Worker_EagerWorker
};
var tink_io__$Worker_Worker_$Impl_$ = {};
tink_io__$Worker_Worker_$Impl_$.__name__ = true;
tink_io__$Worker_Worker_$Impl_$.get_DEFAULT = function() {
	if(tink_io__$Worker_Worker_$Impl_$.DEFAULT == null) tink_io__$Worker_Worker_$Impl_$.DEFAULT = tink_io__$Worker_Worker_$Impl_$.EAGER;
	return tink_io__$Worker_Worker_$Impl_$.DEFAULT;
};
tink_io__$Worker_Worker_$Impl_$.work = function(this1,task) {
	if(this1 == null) return tink_io__$Worker_Worker_$Impl_$.work(tink_io__$Worker_Worker_$Impl_$.get_DEFAULT(),task); else return this1.work(task);
};
var tink_streams__$Stream_Stream_$Impl_$ = {};
tink_streams__$Stream_Stream_$Impl_$.__name__ = true;
tink_streams__$Stream_Stream_$Impl_$.ofIterator = function(i) {
	return new tink_streams_IteratorStream(i);
};
tink_streams__$Stream_Stream_$Impl_$.failure = function(e) {
	return tink_streams__$Stream_Stream_$Impl_$.generate(function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_streams_StreamStep.Fail(e));
	});
};
tink_streams__$Stream_Stream_$Impl_$.generate = function(step) {
	return new tink_streams_Generator(step);
};
tink_streams__$Stream_Stream_$Impl_$.fold = function(this1,start,reduce) {
	return tink_core__$Future_Future_$Impl_$.async(function(cb) {
		var this2 = this1.forEach(function(x) {
			start = reduce(start,x);
			return true;
		});
		this2(function(o) {
			cb((function($this) {
				var $r;
				switch(o[1]) {
				case 1:
					$r = (function($this) {
						var $r;
						var e = o[2];
						$r = tink_core_Outcome.Failure(e);
						return $r;
					}($this));
					break;
				default:
					$r = tink_core_Outcome.Success(start);
				}
				return $r;
			}(this)));
		});
	});
};
tink_streams__$Stream_Stream_$Impl_$.foldAsync = function(this1,start,reduce) {
	return tink_core__$Future_Future_$Impl_$.async(function(cb) {
		var this2 = this1.forEachAsync(function(x) {
			return tink_core__$Future_Future_$Impl_$.map(reduce(start,x),function(v) {
				start = v;
				return true;
			});
		});
		this2(function(o) {
			cb((function($this) {
				var $r;
				switch(o[1]) {
				case 1:
					$r = (function($this) {
						var $r;
						var e = o[2];
						$r = tink_core_Outcome.Failure(e);
						return $r;
					}($this));
					break;
				default:
					$r = tink_core_Outcome.Success(start);
				}
				return $r;
			}(this)));
		});
	});
};
tink_streams__$Stream_Stream_$Impl_$.concat = function(a,b) {
	return tink_streams_ConcatStream.make([a,b]);
};
var tink_streams_StreamObject = function() { };
tink_streams_StreamObject.__name__ = true;
tink_streams_StreamObject.prototype = {
	__class__: tink_streams_StreamObject
};
var tink_streams_StreamBase = function() { };
tink_streams_StreamBase.__name__ = true;
tink_streams_StreamBase.__interfaces__ = [tink_streams_StreamObject];
tink_streams_StreamBase.prototype = {
	next: function() {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.async(function(cb) {
			var this1 = _g.forEach(function(x) {
				cb(tink_streams_StreamStep.Data(x));
				return false;
			});
			this1(function(o) {
				switch(o[1]) {
				case 0:
					switch(o[2]) {
					case true:
						cb(tink_streams_StreamStep.End);
						break;
					default:
					}
					break;
				case 1:
					var e = o[2];
					cb(tink_streams_StreamStep.Fail(e));
					break;
				}
			});
		});
	}
	,forEach: function(item) {
		return this.forEachAsync(function(x) {
			return tink_core__$Future_Future_$Impl_$.sync(item(x));
		});
	}
	,forEachAsync: function(item) {
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(true));
	}
	,map: function(item) {
		var this1;
		this1 = new tink_streams_StreamMapFilter(this,tink_streams__$Stream_StreamMap_$Impl_$.lift(item));
		return this1;
	}
	,mapAsync: function(item) {
		var this1;
		this1 = new tink_streams_StreamMapFilterAsync(this,tink_streams__$Stream_StreamMapAsync_$Impl_$.lift(item));
		return this1;
	}
	,filter: function(item) {
		var this1;
		this1 = new tink_streams_StreamMapFilter(this,tink_streams__$Stream_StreamFilter_$Impl_$.lift(item));
		return this1;
	}
	,filterAsync: function(item) {
		var this1;
		this1 = new tink_streams_StreamMapFilterAsync(this,tink_streams__$Stream_StreamFilterAsync_$Impl_$.lift(item));
		return this1;
	}
	,__class__: tink_streams_StreamBase
};
var tink_streams_StepWise = function() { };
tink_streams_StepWise.__name__ = true;
tink_streams_StepWise.__super__ = tink_streams_StreamBase;
tink_streams_StepWise.prototype = $extend(tink_streams_StreamBase.prototype,{
	next: function() {
		return tink_core__$Future_Future_$Impl_$.sync(tink_streams_StreamStep.End);
	}
	,forEach: function(item) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.async(function(cb) {
			var next;
			var next1 = null;
			next1 = function() {
				while(true) {
					var touched = [false];
					var this1 = _g.next();
					this1((function(touched) {
						return function(step) {
							switch(step[1]) {
							case 0:
								var data = step[2];
								if(!item(data)) cb(tink_core_Outcome.Success(false)); else if(touched[0]) next1(); else touched[0] = true;
								break;
							case 2:
								var e = step[2];
								cb(tink_core_Outcome.Failure(e));
								break;
							case 1:
								cb(tink_core_Outcome.Success(true));
								break;
							}
						};
					})(touched));
					if(!touched[0]) {
						touched[0] = true;
						break;
					}
				}
			};
			next = next1;
			next();
		});
	}
	,forEachAsync: function(item) {
		var _g = this;
		return tink_core__$Future_Future_$Impl_$.async(function(cb) {
			var next;
			var next1 = null;
			next1 = function() {
				while(true) {
					var touched = [false];
					var this1 = _g.next();
					this1((function(touched) {
						return function(step) {
							switch(step[1]) {
							case 0:
								var data = step[2];
								var this2 = item(data);
								this2((function(touched) {
									return function(resume) {
										if(!resume) cb(tink_core_Outcome.Success(false)); else if(touched[0]) next1(); else touched[0] = true;
									};
								})(touched));
								break;
							case 2:
								var e = step[2];
								cb(tink_core_Outcome.Failure(e));
								break;
							case 1:
								cb(tink_core_Outcome.Success(true));
								break;
							}
						};
					})(touched));
					if(!touched[0]) {
						touched[0] = true;
						break;
					}
				}
			};
			next = next1;
			next();
		});
	}
	,__class__: tink_streams_StepWise
});
var tink_streams_Generator = function(step) {
	this.step = step;
	this.waiting = [];
};
tink_streams_Generator.__name__ = true;
tink_streams_Generator.__super__ = tink_streams_StepWise;
tink_streams_Generator.prototype = $extend(tink_streams_StepWise.prototype,{
	next: function() {
		var _g = this;
		var ret = new tink_core_FutureTrigger();
		if(this.waiting.push(ret) == 1) {
			var this1 = this.step();
			this1($bind(ret,ret.trigger));
		} else this.waiting[this.waiting.length - 2].future((function($this) {
			var $r;
			var f = function() {
				var this2 = _g.step();
				this2($bind(ret,ret.trigger));
			};
			$r = function(r) {
				f();
			};
			return $r;
		}(this)));
		return ret.future;
	}
	,__class__: tink_streams_Generator
});
var tink_streams__$Stream_Maybe_$Impl_$ = {};
tink_streams__$Stream_Maybe_$Impl_$.__name__ = true;
tink_streams__$Stream_Maybe_$Impl_$._new = function(o) {
	return o;
};
tink_streams__$Stream_Maybe_$Impl_$.isSet = function(this1) {
	return this1 != null;
};
tink_streams__$Stream_Maybe_$Impl_$.get = function(this1) {
	return this1;
};
tink_streams__$Stream_Maybe_$Impl_$.map = function(this1,f) {
	if(this1 != null) {
		var v = f(this1);
		return v;
	} else return null;
};
tink_streams__$Stream_Maybe_$Impl_$.flatMap = function(this1,f) {
	if(this1 != null) return f(this1); else return null;
};
tink_streams__$Stream_Maybe_$Impl_$.Some = function(v) {
	return v;
};
tink_streams__$Stream_Maybe_$Impl_$.None = function() {
	return null;
};
var tink_streams_ConcatStream = function(parts) {
	this.parts = parts;
};
tink_streams_ConcatStream.__name__ = true;
tink_streams_ConcatStream.make = function(parts) {
	var flat = [];
	var _g = 0;
	while(_g < parts.length) {
		var p = parts[_g];
		++_g;
		if(js_Boot.__instanceof(p,tink_streams_ConcatStream)) {
			var _g1 = 0;
			var _g2 = p.parts;
			while(_g1 < _g2.length) {
				var p1 = _g2[_g1];
				++_g1;
				flat.push(p1);
			}
		} else flat.push(p);
	}
	return new tink_streams_ConcatStream(flat);
};
tink_streams_ConcatStream.__super__ = tink_streams_StreamBase;
tink_streams_ConcatStream.prototype = $extend(tink_streams_StreamBase.prototype,{
	filter: function(item) {
		return this.transform(function(x) {
			return x.filter(item);
		});
	}
	,filterAsync: function(item) {
		return this.transform(function(x) {
			return x.filterAsync(item);
		});
	}
	,map: function(item) {
		return this.transform(function(x) {
			return x.map(item);
		});
	}
	,mapAsync: function(item) {
		return this.transform(function(x) {
			return x.mapAsync(item);
		});
	}
	,transform: function(t) {
		return new tink_streams_ConcatStream((function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				var _g2 = $this.parts;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(t(p));
				}
			}
			$r = _g;
			return $r;
		}(this)));
	}
	,withAll: function(f) {
		var _g1 = this;
		var _g = this.parts;
		switch(_g.length) {
		case 0:
			return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(true));
		default:
			return tink_core__$Future_Future_$Impl_$.async(function(cb) {
				var this1 = f(_g1.parts[0]);
				this1(function(x) {
					switch(x[1]) {
					case 0:
						var v = x[2];
						if(v) {
							_g1.parts.shift();
							var this2 = _g1.withAll(f);
							this2(cb);
						} else cb(x);
						break;
					case 1:
						var e = x[2];
						cb(x);
						break;
					}
				});
			});
		}
	}
	,forEach: function(item) {
		return this.withAll(function(s) {
			return s.forEach(item);
		});
	}
	,forEachAsync: function(item) {
		return this.withAll(function(s) {
			return s.forEachAsync(item);
		});
	}
	,__class__: tink_streams_ConcatStream
});
var tink_streams_IteratorStream = function(target,error) {
	this.target = target;
	this.error = error;
};
tink_streams_IteratorStream.__name__ = true;
tink_streams_IteratorStream.__super__ = tink_streams_StepWise;
tink_streams_IteratorStream.prototype = $extend(tink_streams_StepWise.prototype,{
	next: function() {
		return tink_core__$Future_Future_$Impl_$.sync(this.target.hasNext()?tink_streams_StreamStep.Data(this.target.next()):this.error == null?tink_streams_StreamStep.End:tink_streams_StreamStep.Fail(this.error));
	}
	,forEach: function(item) {
		if(this.error != null) return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Failure(this.error));
		while(this.target.hasNext()) if(!item(this.target.next())) return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(false));
		return tink_core__$Future_Future_$Impl_$.sync(tink_core_Outcome.Success(true));
	}
	,__class__: tink_streams_IteratorStream
});
var tink_streams__$Stream_StreamFilter_$Impl_$ = {};
tink_streams__$Stream_StreamFilter_$Impl_$.__name__ = true;
tink_streams__$Stream_StreamFilter_$Impl_$._new = function(data,filter) {
	var this1;
	this1 = new tink_streams_StreamMapFilter(data,tink_streams__$Stream_StreamFilter_$Impl_$.lift(filter));
	return this1;
};
tink_streams__$Stream_StreamFilter_$Impl_$.lift = function(filter) {
	return function(x) {
		if(filter(x)) return x; else return null;
	};
};
var tink_streams__$Stream_StreamMap_$Impl_$ = {};
tink_streams__$Stream_StreamMap_$Impl_$.__name__ = true;
tink_streams__$Stream_StreamMap_$Impl_$._new = function(data,map) {
	var this1;
	this1 = new tink_streams_StreamMapFilter(data,tink_streams__$Stream_StreamMap_$Impl_$.lift(map));
	return this1;
};
tink_streams__$Stream_StreamMap_$Impl_$.lift = function(map) {
	return function(x) {
		var v = map(x);
		return v;
	};
};
var tink_streams_StreamMapFilter = function(data,transformer) {
	this.data = data;
	this.transformer = transformer;
};
tink_streams_StreamMapFilter.__name__ = true;
tink_streams_StreamMapFilter.__super__ = tink_streams_StreamBase;
tink_streams_StreamMapFilter.prototype = $extend(tink_streams_StreamBase.prototype,{
	chain: function(transformer) {
		var _g = this;
		return new tink_streams_StreamMapFilter(this.data,function(i) {
			var this1 = _g.transformer(i);
			if(this1 != null) return transformer(this1); else return null;
		});
	}
	,forEach: function(item) {
		var _g = this;
		return this.data.forEach(function(x) {
			var _g1 = _g.transformer(x);
			var v = _g1;
			if(v != null) return item(v); else return true;
		});
	}
	,forEachAsync: function(item) {
		var _g = this;
		return this.data.forEachAsync(function(x) {
			var _g1 = _g.transformer(x);
			var v = _g1;
			if(v != null) return item(v); else return tink_core__$Future_Future_$Impl_$.sync(true);
		});
	}
	,chainAsync: function(transformer) {
		var _g = this;
		return new tink_streams_StreamMapFilterAsync(this.data,function(i) {
			var _g1 = _g.transformer(i);
			var v = _g1;
			if(v != null) return transformer(v); else return tink_core__$Future_Future_$Impl_$.sync(null);
		});
	}
	,filterAsync: function(item) {
		return this.chainAsync(tink_streams__$Stream_StreamFilterAsync_$Impl_$.lift(item));
	}
	,mapAsync: function(item) {
		return this.chainAsync(tink_streams__$Stream_StreamMapAsync_$Impl_$.lift(item));
	}
	,map: function(item) {
		return this.chain(tink_streams__$Stream_StreamMap_$Impl_$.lift(item));
	}
	,filter: function(item) {
		return this.chain(tink_streams__$Stream_StreamFilter_$Impl_$.lift(item));
	}
	,__class__: tink_streams_StreamMapFilter
});
var tink_streams__$Stream_StreamFilterAsync_$Impl_$ = {};
tink_streams__$Stream_StreamFilterAsync_$Impl_$.__name__ = true;
tink_streams__$Stream_StreamFilterAsync_$Impl_$._new = function(data,filter) {
	var this1;
	this1 = new tink_streams_StreamMapFilterAsync(data,tink_streams__$Stream_StreamFilterAsync_$Impl_$.lift(filter));
	return this1;
};
tink_streams__$Stream_StreamFilterAsync_$Impl_$.lift = function(filter) {
	return function(x) {
		return tink_core__$Future_Future_$Impl_$.map(filter(x),function(matches) {
			if(matches) return x; else return null;
		});
	};
};
var tink_streams__$Stream_StreamMapAsync_$Impl_$ = {};
tink_streams__$Stream_StreamMapAsync_$Impl_$.__name__ = true;
tink_streams__$Stream_StreamMapAsync_$Impl_$._new = function(data,map) {
	var this1;
	this1 = new tink_streams_StreamMapFilterAsync(data,tink_streams__$Stream_StreamMapAsync_$Impl_$.lift(map));
	return this1;
};
tink_streams__$Stream_StreamMapAsync_$Impl_$.lift = function(map) {
	return function(x) {
		return tink_core__$Future_Future_$Impl_$.map(map(x),tink_streams__$Stream_Maybe_$Impl_$.Some);
	};
};
var tink_streams_StreamMapFilterAsync = function(data,transformer) {
	this.data = data;
	this.transformer = transformer;
};
tink_streams_StreamMapFilterAsync.__name__ = true;
tink_streams_StreamMapFilterAsync.__super__ = tink_streams_StreamBase;
tink_streams_StreamMapFilterAsync.prototype = $extend(tink_streams_StreamBase.prototype,{
	chain: function(transformer) {
		var _g = this;
		return new tink_streams_StreamMapFilterAsync(this.data,function(i) {
			return tink_core__$Future_Future_$Impl_$.map(_g.transformer(i),function(o) {
				if(o != null) return transformer(o); else return null;
			});
		});
	}
	,chainAsync: function(transformer) {
		var _g = this;
		return new tink_streams_StreamMapFilterAsync(this.data,function(i) {
			return tink_core__$Future_Future_$Impl_$.flatMap(_g.transformer(i),function(o) {
				var v = o;
				if(v != null) return transformer(v); else return tink_core__$Future_Future_$Impl_$.sync(null);
			});
		});
	}
	,forEachAsync: function(item) {
		var _g = this;
		return this.data.forEachAsync(function(x) {
			return tink_core__$Future_Future_$Impl_$.flatMap(_g.transformer(x),function(x1) {
				var v = x1;
				if(v != null) return item(v); else return tink_core__$Future_Future_$Impl_$.sync(true);
			},false);
		});
	}
	,filterAsync: function(item) {
		return this.chainAsync(tink_streams__$Stream_StreamFilterAsync_$Impl_$.lift(item));
	}
	,mapAsync: function(item) {
		return this.chainAsync(tink_streams__$Stream_StreamMapAsync_$Impl_$.lift(item));
	}
	,map: function(item) {
		return this.chain(tink_streams__$Stream_StreamMap_$Impl_$.lift(item));
	}
	,filter: function(item) {
		return this.chain(tink_streams__$Stream_StreamFilter_$Impl_$.lift(item));
	}
	,__class__: tink_streams_StreamMapFilterAsync
});
var tink_streams_StreamStep = { __ename__ : true, __constructs__ : ["Data","End","Fail"] };
tink_streams_StreamStep.Data = function(data) { var $x = ["Data",0,data]; $x.__enum__ = tink_streams_StreamStep; $x.toString = $estr; return $x; };
tink_streams_StreamStep.End = ["End",1];
tink_streams_StreamStep.End.toString = $estr;
tink_streams_StreamStep.End.__enum__ = tink_streams_StreamStep;
tink_streams_StreamStep.Fail = function(e) { var $x = ["Fail",2,e]; $x.__enum__ = tink_streams_StreamStep; $x.toString = $estr; return $x; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
tink_io_Buffer.ZERO_BYTES = haxe_io_Bytes.alloc(0);
tink_io_Buffer.MIN_WIDTH = 10;
tink_io_Buffer.MAX_WIDTH = 28;
tink_io_Buffer.mutex = new tink_io__$Buffer_Mutex();
tink_io_Buffer.pool = (function($this) {
	var $r;
	var _g = [];
	{
		var _g1 = 10;
		while(_g1 < 28) {
			var i = _g1++;
			_g.push([]);
		}
	}
	$r = _g;
	return $r;
}(this));
tink_io_BlackHole.INST = new tink_io_BlackHole();
tink_io_Empty.instance = new tink_io_Empty();
tink_io_Pipe.queue = [];
tink_io__$Progress_Progress_$Impl_$.EOF = -1;
tink_io__$Progress_Progress_$Impl_$.NONE = 0;
tink_io__$Sink_Sink_$Impl_$.stdout = tink_io__$Sink_Sink_$Impl_$.ofNodeStream(process.stdout,"stdout");
tink_io__$Worker_Worker_$Impl_$.EAGER = new tink_io__$Worker_EagerWorker();
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
