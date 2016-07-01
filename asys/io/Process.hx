package asys.io;

#if nodejs
import js.Node;
import js.node.ChildProcess;
#end
import tink.io.Sink;
import tink.io.Source;

using tink.CoreApi;

class Process {

	public var stdout(default,null): Source;
	public var stderr(default,null): Source;
	public var stdin(default,null): Sink;
	var process: #if nodejs js.node.child_process.ChildProcess #else sys.io.Process #end;
	var exitTrigger = Future.trigger();

	public function new(cmd: String, ?args: Array<String> ) {
		#if nodejs
		process = ChildProcess.spawn(cmd, args);
		stdin = Sink.ofNodeStream('stdin', process.stdin);
		stderr = Source.ofNodeStream('stderr', process.stderr);
		stdout = Source.ofNodeStream('stdout', process.stdout);
		process.on('exit', function(code, signal) {
			exitTrigger.trigger(code);
		});
		#else
		process = new sys.io.Process(cmd, args);
		stdin = Sink.ofOutput('stdin', process.stdin);
		stderr = Source.ofInput('stderr', process.stderr);
		stdout = Source.ofInput('stdout', process.stdout);
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
