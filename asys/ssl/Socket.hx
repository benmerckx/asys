package asys.ssl;

import asys.net.Host;
import asys.net.Socket as PlainSocket;
import tink.io.Sink;
import tink.io.Source;
#if hxssl
import sys.ssl.Socket as HxsslSocket;
#end

using tink.CoreApi;


@:access(asys.net.Socket)
class Socket extends PlainSocket {
	
	override function createSocket() {
		socket = cast
			#if nodejs
				null
			#elseif hxssl
				new HxsslSocket()
			#elseif php
				new php.net.SslSocket()
			#elseif java
				new java.net.SslSocket()
			#else
				null; throw 'Not supported on this platform'
			#end
		;
	}
	
	@:access(sys.ssl.Socket)
	@:access(sys.net.Socket)
	public static function upgrade(socket: PlainSocket): Socket {
		#if nodejs
		socket.socket = js.node.Tls.connect({socket: socket.socket});
		socket.setStreams();
		return cast socket;
		#elseif php
		untyped __php__("stream_socket_enable_crypto($socket->socket->__s, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)");
		return cast socket;
		#elseif hxssl
		var s = new HxsslSocket();
		s.__s = socket.socket.__s;
		s.ctx = s.buildSSLContext();
		s.ssl = HxsslSocket.SSL_new(s.ctx);
        untyped s.input.ssl = s.ssl;
        untyped s.output.ssl = s.ssl;
        var sbio = HxsslSocket.BIO_new_socket(s.__s, HxsslSocket.BIO_NOCLOSE());
        HxsslSocket.SSL_set_bio(s.ssl, sbio, sbio);
        var r: Int = HxsslSocket.SSL_connect(s.ssl);
		socket.socket = cast s;
		socket.setStreams();
		return cast socket;
		#elseif java
		socket.input = null;
		socket.output = null;
		var s = new Socket();
		s.socket = socket.socket;
		socket.socket.sock = 
			(untyped java.javax.net.ssl.SSLSocketFactory.getDefault()).createSocket(
				socket.socket.sock,
				socket.socket.sock.getInetAddress().getHostAddress(),
				socket.socket.sock.getPort(),
				true
			);
		(untyped socket.socket.sock).startHandshake();
		s.input = new tink.io.java.JavaSource(java.nio.channels.Channels.newChannel(socket.socket.sock.getInputStream()), 'socket input');
		s.output = new tink.io.java.JavaSink(java.nio.channels.Channels.newChannel(socket.socket.sock.getOutputStream()), 'socket out');
		return s;
		#else
		throw 'Not supported on this platform';
		#end
	}
	
	#if nodejs
	override public function connect(host: Host, port: Int): Surprise<Noise, Error> {
		var trigger = Future.trigger();
		socket = js.node.Tls.connect(port, host.host);
		setStreams();
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
