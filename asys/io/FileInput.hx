package asys.io;

#if !nodejs

typedef FileInput = sys.io.FileInput;

#else

import asys.io.FileSeek;
import js.node.fs.ReadStream;
import js.node.Fs;
import js.node.Buffer;

class FileInput extends haxe.io.Input {
	
	var bufferSize = 4;
	var bufferPos = 0;
	var fd: Int;
	var position = 0;
	var buffer: js.node.Buffer;
	
	public function new(fd) {
		this.fd = fd;
		buffer = new Buffer(bufferSize);
	}
	
	override public function readByte(): Int {
		if (bufferPos == bufferSize)
			bufferPos = 0;
		if (bufferPos == 0)
			Fs.readSync(fd, buffer, 0, bufferSize, position);
		position++;
		return buffer[bufferPos++];
	}
	
	override public function readBytes(s: haxe.io.Bytes, pos: Int, len: Int): Int {
		bufferPos = 0;
		var b = new Buffer(len);
		var amount = Fs.readSync(fd, b, 0, len, position);
		s.blit(pos, b.hxToBytes(), 0, len);
		position += len;
		return amount;
	}

	public function seek(length: Int, pos: FileSeek) {
		bufferPos = 0;
		switch pos {
			case FileSeek.SeekBegin: position = length;
			case FileSeek.SeekCur: position += length;
			case FileSeek.SeekEnd: 
				throw 'Not implemented';
		}
	}
	
	public function tell()
		return position;
		
	public function eof()
		return buffer.length < bufferSize;
		
	override public function close() {
		buffer = null;
		Fs.closeSync(fd);
	}
	
}

#end