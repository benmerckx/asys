#if tink_runloop #error #end

import buddy.SingleSuite;
import haxe.io.Bytes;

import asys.FileSystem;
import asys.io.File;

using tink.io.Source;
using buddy.Should;
using tink.CoreApi;

@colorize
class RunTests extends SingleSuite {
	
	public function new() {
		#if (php && (haxe_ver < 4)) untyped __call__('ini_set', 'xdebug.max_nesting_level', 10000); #end
		describe('asys', {
			describe('FileSystem', {
				it('exists', function(done) {
					FileSystem.exists('haxelib.json').handle(function(response) {
						response.should.be(true);
						FileSystem.exists('none').handle(function(response) {
							response.should.be(false);
							done();
						});
					});
				});
				
				it('rename', function(done) {
					FileSystem.rename('test.txt', 'test2.txt').handle(function(response) {
						response.should.equal(Success(Noise));
						done();
					});
				});
				
				it('stat', function(done) {
          FileSystem.stat('test2.txt').handle(function(response) switch response {
            case Success(res):
              res.size.should.be(2);
              done();
            default: fail();
          });
				});
				
				it('fullPath', function(done) {
					FileSystem.fullPath('haxelib.json').handle(function(response) switch response {
						case Success(res): 
							(res.length > 'haxelib.json'.length).should.be(true);
							done();
						default: fail();
					});
				});
				
				it('isDirectory', function(done) {
					FileSystem.isDirectory('tests').handle(function(response) {
						response.should.be(true);
						FileSystem.isDirectory('none').handle(function(response) {
							response.should.be(false);
							done();
						});
					});
				});
				
				it('createDirectory', function(done) {
					FileSystem.createDirectory('tests-dir').handle(function(response) {
						response.should.equal(Success(Noise));
						done();
					});
				});
				
				it('createDirectory recursive', function(done) {
					FileSystem.createDirectory('tests-dir2/sub-dir').handle(function(response) {
						response.should.equal(Success(Noise));
						done();
					});
				});
				
				it('deleteFile', function(done) {
					FileSystem.deleteFile('test2.txt').handle(function(response) {
						response.should.equal(Success(Noise));
						FileSystem.deleteFile('none').handle(function(response) switch response {
							case Failure(_): done();
							default: fail();
						});
					});
				});
				
				it('deleteDirectory', function(done) {
					FileSystem.deleteDirectory('tests-dir').handle(function(response) {
						response.should.equal(Success(Noise));
						FileSystem.deleteDirectory('tests-dir').handle(function(response) switch response {
							case Failure(_): done();
							default: fail();
						});
					});
				});
				
				#if nodejs // FIXME: see https://github.com/HaxeFoundation/haxe/issues/5585
				it('deleteDirectory recursive', function(done) {
					File.saveContent('tests-dir2/sub-dir/foo.txt', 'foo')
						.next(function(_) return FileSystem.deleteDirectory('tests-dir2'))
						.handle(function(response) {
							response.should.equal(Success(Noise));
							done();
						});
				});
				#end
				
				it('readDirectory', function(done) {
					FileSystem.readDirectory('tests').handle(function(response) switch response {
						case Success(list):
							done();
						default: fail();
					});
				});
			});
			
			describe('File', {
				it('saveContent', function(done) {
					File.saveContent('test.txt', 'done').handle(function(response) {
						response.should.equal(Success(Noise));
						done();
					});
				});
				
				it('getContent', function(done) {
					File.getContent('test.txt').handle(function(response) switch response {
						case Success(res):
							res.should.be('done');
							done();
						default: fail();
					});
				});
				
				it('saveBytes', function(done) {
					File.saveBytes('test.txt', Bytes.ofString('bytes')).handle(function(response) {
						response.should.equal(Success(Noise));
						done();
					});
				});
				
				it('getBytes', function(done) {
					File.getBytes('test.txt').handle(function(response) switch response {
						case Success(res):
							res.toString().should.be('bytes');
							done();
						default: fail();
					});
				});
				
				it('write', function(done) {
					File.write('test.txt').handle(function(response) switch response {
						case Success(res):
							res.writeBytes(Bytes.ofString('as'), 0, 2);
							done();
						default: fail();
					});
				});
				
				it('append', function(done) {
					File.append('test.txt').handle(function(response) switch response {
						case Success(res):
							res.writeBytes(Bytes.ofString('ys'), 0, 2);
							done();
						default: fail();
					});
				});
				
				it('copy', function(done) {
					File.copy('test.txt', 'test2.txt').handle(function(response) {
						response.should.equal(Success(Noise));
						done();
					});
				});
				
				it('read');
				
				afterAll({
					FileSystem.deleteFile('test2.txt').handle(function(_) null);
					FileSystem.deleteFile('test.txt').handle(function(_) null);
				});
			});
		});
	}
  
}