package sys.async.io;

#if !nodejs

typedef FileOutput = sys.io.FileOutput;

#else

import js.node.Fs;
import js.node.Buffer;
import sys.async.io.FileSeek;

class FileOutput extends haxe.io.Output {

	var fd: Int;
	var position = 0;
	var buffer = new Buffer(1);
	
	public function new(fd)
		this.fd = fd;
	
	public override function writeByte(c: Int) {
		buffer[0] = c;
		Fs.writeSync(fd, buffer, 0, 1, position++);
	}
	
	override public function writeBytes(s: haxe.io.Bytes, pos: Int, len: Int): Int {
		var amount = Fs.writeSync(fd, Buffer.hxFromBytes(s), pos, len);
		position += len;
		return amount;
	}
	
	public function seek(length: Int, pos: FileSeek)
		switch pos {
			case FileSeek.SeekBegin: position = 0;
			case FileSeek.SeekCur: position += length;
			case FileSeek.SeekEnd: 
				throw 'Not implemented';
		}
	
	public function tell()
		return position;

	override public function close() 
		Fs.closeSync(fd);
}

#end