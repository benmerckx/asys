package asys.io;

#if nodejs
import js.Node;
import js.node.ChildProcess;
#end
import tink.io.Sink;

using tink.io.Source;
using tink.CoreApi;

class Process {

	public var stdout(default,null): RealSource;
	public var stderr(default,null): RealSource;
	public var stdin(default,null): RealSink;
	var process: #if nodejs js.node.child_process.ChildProcess #else sys.io.Process #end;
	var exitTrigger = Future.trigger();

	public function new(cmd: String, ?args: Array<String> ) {
		#if nodejs
		process = ChildProcess.spawn(cmd, args);
		stdin = RealSink.ofNodeStream('stdin', process.stdin);
		stderr = RealSource.ofNodeStream('stderr', process.stderr);
		stdout = RealSource.ofNodeStream('stdout', process.stdout);
		process.on('exit', function(code, signal) {
			exitTrigger.trigger(code);
		});
		#else
		process = new sys.io.Process(cmd, args);
		stdin = RealSink.ofOutput('stdin', process.stdin);
		stderr = RealSource.ofInput('stderr', process.stderr);
		stdout = RealSource.ofInput('stdout', process.stdout);
		exitTrigger.trigger(process.exitCode());
		#end
	}

	public function getPid()
		return #if nodejs process.pid #else process.getPid() #end;

	public function exitCode(): Future<Int> {
		return exitTrigger.asFuture();
	}

	public function close() {
		#if !nodejs
		process.close();
		#end
	}

	public function kill()
		process.kill();

}
