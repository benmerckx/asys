package asys.ssl;

import asys.net.Host;
import tink.io.Sink;
import tink.io.Source;

using tink.CoreApi;

class Socket extends asys.net.Socket {
	override function createSocket() {
		socket = cast
			#if nodejs
				null
			#elseif hxssl
				new sys.ssl.Socket()
			#elseif php
				new php.net.SslSocket()
			#elseif java
				new java.net.SslSocket()
			#else
				#error
			#end
		;
	}
	
	#if nodejs
	override public function connect(host: Host, port: Int): Surprise<Noise, Error> {
		var trigger = Future.trigger();
		socket = js.node.Tls.connect(port, host.host);
		input = Source.ofNodeStream(socket, 'socket input');
		output = Sink.ofNodeStream(socket, 'socket output');
		socket.on('error', function(err: js.Error)
		 	trigger.trigger(Failure(Error.withData(err.message, err)))
		);
		socket.on('connect', function()
		 	trigger.trigger(Success(Noise))
		);
		return trigger.asFuture();
	}
	#end
}
