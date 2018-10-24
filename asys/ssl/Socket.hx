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
			#elseif (haxe_ver > 3.210)
				#if (cpp || neko)
                new sys.ssl.Socket()
				#else
				null; throw 'Not supported on this platform'
				#end
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
		#elseif (php && haxe_ver < 4.0)
		return php.Syntax.code("
		$smtp = $socket->socket->__s;
			stream_set_blocking($smtp, true);
			stream_context_set_option($smtp, 'ssl', 'verify_peer_name', false);
			stream_socket_enable_crypto($smtp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
			stream_set_blocking($smtp, false);
			");
		#elseif (php && haxe_ver < 4.0)
		untyped __php__("
			$smtp = $socket->socket->__s;
			stream_set_blocking($smtp, true);
			stream_context_set_option($smtp, 'ssl', 'verify_peer_name', false);
			stream_socket_enable_crypto($smtp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
			stream_set_blocking($smtp, false);
		");
		
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
		#elseif (haxe_ver > 3.210)
			#if neko
			var s = new Socket();
			s.socket.__s = socket.socket.__s;
			var sslSocket = (cast s.socket: sys.ssl.Socket);
			sslSocket.ctx = sslSocket.buildSSLContext(false);
			var ssl = sslSocket.ssl = sys.ssl.Socket.ssl_new(sslSocket.ctx);
			sys.ssl.Socket.ssl_set_socket(ssl, s.socket.__s);
			if (socket.host.host != null)
				sys.ssl.Socket.ssl_set_hostname(ssl, untyped socket.host.host.__s);
			sslSocket.handshake();
			s.setStreams();
			return cast s;
			#elseif cpp
			var s = new Socket();
			s.socket.__s = socket.socket.__s;
			var sslSocket = (cast s.socket: sys.ssl.Socket);
			sslSocket.conf = sslSocket.buildSSLConfig(false);
			var ssl = sslSocket.ssl = cpp.NativeSsl.ssl_new(sslSocket.conf);
			cpp.NativeSsl.ssl_set_socket(ssl, s.socket.__s);
			if (socket.host.host != null)
				cpp.NativeSsl.ssl_set_hostname(ssl, socket.host.host);
			sslSocket.handshake();
			s.setStreams();
			return cast s;
			#else
			throw 'Not supported on this platform';
			#end
		#else
		throw 'Not supported on this platform';
		#end
	}
	
	#if nodejs
	override public function connect(host: Host, port: Int): Promise<Noise> {
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
