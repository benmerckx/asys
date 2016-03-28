package asys.net;

import asys.net.Host;
import tink.io.Sink;
import tink.io.Source;

using tink.CoreApi;

typedef NativeSocket =
	#if nodejs js.node.net.Socket
	#else sys.net.Socket
	#end;

class Socket {
	public var input(default,null): Source;
	public var output(default,null): Sink;
	var socket: NativeSocket;

	public function new() {
		createSocket();
		#if nodejs
		input = Source.ofNodeStream(socket, 'socket input');
		output = Sink.ofNodeStream(socket, 'socket output');
		#else
		output = Sink.ofOutput('socket output', socket.output);
		input = Source.ofInput('socket input', socket.input);
		#end
	}

	function createSocket() {
		socket = new NativeSocket();
		#if !nodejs
		//socket.setBlocking(false);
		#end
	}

	public function connect(host: Host, port: Int): Surprise<Noise, Error> {
		#if !nodejs
		return Future.sync(
			try {
				socket.connect(host.instance, port);
				Success(Noise);
			} catch (e: Dynamic) {
				Failure(new Error(Std.string(e)));
			}
		);
		#else
		var trigger = Future.trigger();
		socket.on('error', function(err: js.Error)
		 	trigger.trigger(Failure(Error.withData(err.message, err)))
		);
		socket.on('connect', function()
		 	trigger.trigger(Success(Noise))
		);
		socket.connect({host: host.host, port: port});
		return trigger.asFuture();
		#end
	}

	public function close() {
		#if nodejs
		socket.destroy();
		#else
		socket.close();
		#end
	}
}
