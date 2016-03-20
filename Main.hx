package;

import asys.FileSystem;
import asys.io.File;
import haxe.io.Bytes;
import asys.io.FileOutput;
import asys.io.FileSeek;
import asys.io.Process;
import tink.io.Sink;
import haxe.io.BytesOutput;
import tink.io.Worker;

class Main {
	public static function main() {
		/*FileSystem.exists('build.hxml').handle(function(exists)
			trace(exists)
		);
		FileSystem.rename('file.txt', 'file2.txt').handle(function(success) {
			trace(success);
		});
		FileSystem.stat('build.hxml').handle(function(x)
			switch x {
				case Success(stat): trace(stat);
				default:
			}
		);
		FileSystem.fullPath('build.hxml').handle(function(x)
			switch x {
				case Success(stat): trace(stat);
				default:
			}
		);
		FileSystem.isDirectory('build.hxml').handle(function(x)
			trace(x)
		);
		FileSystem.deleteFile('file2.txt').handle(function(x)
			trace(x)
		);
		
		FileSystem.readDirectory('asys').handle(function(x)
			switch x {
				case Success(f): trace(f);
				default:
			}
		);*/
		
		/*File.saveContent('test.txt', 'hello').handle(function(x)
			trace(x)
		);*/
		
		/*File.getBytes('test.txt').handle(function(x)
			trace(x)
		);
		
		File.copy('test.txt', 'test.txt').handle(function(x)
			trace(x)
		);*/
		
		/*File.read('build.hxml').handle(function(x)
			switch x {
				case Success(input):
					var bytes = Bytes.alloc(5);
					trace(input.readByte());
					trace(input.readByte());
					input.seek(3, FileSeek.SeekCur);
					trace(input.readByte());
					trace(input.readByte());
				default:
			}
		);*/
		
		var process = new Process('vips', ['--help']);
		var buf = new BytesOutput();
		process.stdout
		.pipeTo(Sink.ofOutput('which', buf, Worker.EAGER))
		.handle(function (x) switch x {
			case AllWritten:
				trace('stdout: '+buf.getBytes().toString());
			default:
				trace('error');
		});
		
		var buf2 = new BytesOutput();
		process.stderr
		.pipeTo(Sink.ofOutput('which', buf2, Worker.EAGER))
		.handle(function (x) switch x {
			case AllWritten:
				trace('stderr: '+buf2.getBytes().toString());
			default:
				trace('error');
		});
		
		process.exitCode().handle(function(code) {
			trace(code);
		});
		//process.kill();
	}
}