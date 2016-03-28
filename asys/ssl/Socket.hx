package asys.ssl;

using tink.CoreApi;

class Socket extends asys.net.Socket {
	override function createSocket() {
		socket = cast
			#if nodejs
				new js.node.tls.TLSSocket(new js.node.net.Socket(), {})
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
}
