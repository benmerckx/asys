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
	var host: Host;
	var port: Int;

	public function new() {
		createSocket();
	}

	function createSocket() {
		socket = new NativeSocket();
	}
	
	function setStreams() {
		#if !nodejs
		output = Sink.ofOutput('socket output', socket.output);
		input = Source.ofInput('socket input', socket.input);
		#else
		input = Source.ofNodeStream('socket input', socket);
		output = Sink.ofNodeStream('socket output', socket);
		#end
	}

	public function connect(host: Host, port: Int): Promise<Noise> {
		this.host = host;
		this.port = port;
		#if !nodejs
		return Future.sync(
			try {
				socket.connect(host.instance, port);
				setStreams();
				Success(Noise);
			} catch (e: Dynamic) {
				Failure(new Error(Std.string(e)));
			}
		);
		#else
		var trigger = Future.trigger();
		setStreams();
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
	
	public function setTimeout(timeout: Float) {
		#if nodejs
		socket.setTimeout(Std.int(timeout*1000), function() {
			socket.emit('error', 'Socket timeout');
			close();
		});
		#else
		socket.setTimeout(timeout);
		#end
	}
}
