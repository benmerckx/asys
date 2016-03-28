package sys.async.net;

using tink.CoreApi;

class Host {

	public var host(default,null): String;
	public var ip(default,null): Future<Int>;
	var address: String;
	var ipTrigger = Future.trigger();
	#if !nodejs
	@:allow(sys.async.net.Socket)
	var instance: sys.net.Host;
	#end

	public function new( name : String ) : Void {
		host = name;
		#if nodejs
		if(~/^(\d{1,3}\.){3}\d{1,3}$/.match(name)) {
		  address = name;
		  processIp(null, address);
		} else {
			js.node.Dns.lookup(name, 4, processIp);
		}
		ip = ipTrigger.asFuture();
		#else
		instance = new sys.net.Host(name);
		address = Std.string(instance);
		ipTrigger.trigger(instance.ip);
		#end
	}

	function processIp(err, address, ?_) {
		if(host == address || err != null) {
			ipTrigger.trigger(0);
			return;
		}

		this.address = address;
		var parts = address.split(".");
	    var res = 0;

	    res += Std.parseInt(parts[0]) << 24;
	    res += Std.parseInt(parts[1]) << 16;
	    res += Std.parseInt(parts[2]) << 8;
	    res += Std.parseInt(parts[3]);

		ipTrigger.trigger(res);
	}

	public function toString() : String {
		return address;
	}

	/*public function reverse() : String {
		return untyped __call__('gethostbyaddr', _ip);
	}

	public static function localhost() : String {
		return untyped __var__('_SERVER', 'HTTP_HOST');
	}*/
}
