package sys.async;

#if nodejs
import js.node.Fs;
import js.node.fs.Stats;
#end
import sys.async.FileStat;

using tink.CoreApi;

@:build(asys.Builder.build())
class FileSystem {

	public static function exists(path: String): Future<Bool> {
		var trigger = Future.trigger();
		Fs.stat(path, function(err, stats)
			trigger.trigger(err == null)
		);
		return trigger.asFuture();
	}

	public static function rename(path: String, newPath: String): Surprise<Noise, Error> {
		var trigger = Future.trigger();
		Fs.rename(path, newPath, function(err)
			trigger.trigger(switch err {
				case null: Success(Noise);
				default: Failure(Error.withData(err.message, err));
			})
		);
		return trigger.asFuture();
	}

	public static function stat(path: String): Surprise<FileStat, Error> {
		var trigger = Future.trigger();
		Fs.stat(path, function(err, stat: Stats)
			trigger.trigger(switch err {
				case null: Success({
					gid: stat.gid,
					uid: stat.uid,
					atime: stat.atime,
					mtime: stat.mtime,
					ctime: stat.ctime,
					size: Std.int(stat.size),
					dev : stat.dev,
					ino: Std.int(stat.ino),
					nlink: stat.nlink,
					rdev: stat.rdev,
					mode: stat.mode
				});
				default: Failure(Error.withData(err.message, err));
			})
		);
		return trigger.asFuture();
	}

	public static function fullPath(relPath: String): Surprise<String, Error> {
		var trigger = Future.trigger();
		Fs.realpath(relPath, function(err: js.Error, path)
			trigger.trigger(switch err {
				case null: Success(path);
				default: Failure(Error.withData(err.message, err));
			})
		);
		return trigger.asFuture();
	}

	public static function absolutePath (relPath: String): String {
		if (haxe.io.Path.isAbsolute(relPath)) return relPath;
		return haxe.io.Path.join([Sys.getCwd(), relPath]);
	}

	public static function isDirectory(path: String): Future<Bool> {
		var trigger = Future.trigger();
		Fs.stat(path, function(err: js.Error, stat: Stats)
			trigger.trigger(switch err {
				case null: stat.isDirectory();
				default: false;
			})
		);
		return trigger.asFuture();
	}

	public static function createDirectory(path: String): Surprise<Noise, Error> {
		var trigger = Future.trigger();
		Fs.mkdir(path, function(err: js.Error)
			trigger.trigger(switch err {
				case null: Success(Noise);
				default: Failure(Error.withData(err.message, err));
			})
		);
		return trigger.asFuture();
	}

	public static function deleteFile(path: String): Surprise<Noise, Error> {
		var trigger = Future.trigger();
		Fs.unlink(path, function(err: js.Error)
			trigger.trigger(switch err {
				case null: Success(Noise);
				default: Failure(Error.withData(err.message, err));
			})
		);
		return trigger.asFuture();
	}

	public static function deleteDirectory(path: String): Surprise<Noise, Error> {
		return deleteFile(path);
	}

	public static function readDirectory(path: String): Surprise<Array<String>, Error> {
		var trigger = Future.trigger();
		Fs.readdir(path, function(err: js.Error, files)
			trigger.trigger(switch err {
				case null: Success(files);
				default: Failure(Error.withData(err.message, err));
			})
		);
		return trigger.asFuture();
	}

}