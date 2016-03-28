package asys.macro;

import haxe.macro.Context;
import haxe.macro.Expr;

using tink.MacroApi;

class Builder {

	public static function build() {
		var fields = Context.getBuildFields();
		return fields.map(field);
	}

	static function field(field: Field) {
		#if !nodejs
		var module: String = Context.getLocalModule(),
			sysModule = module.substr(1);
		switch field.kind {
			case FieldType.FFun(f):
				switch f.ret {
					case TPath(p):
						switch p.name {
							#if runloop
							case 'Future':
								var call = fieldCall(sysModule, field, f.args);
								f.expr = macro @:pos(f.expr.pos) {
									var trigger = Future.trigger();
									tink.RunLoop.current.work(function ()
										trigger.trigger($call)
									);
									return trigger.asFuture();
								};
							case 'Surprise':
								var call = fieldCall(sysModule, field, f.args);
								switch p.params {
									case [TPType(TPath(_.name => 'Noise')), _]:
										call = macro @:pos(f.expr.pos) {
											var trigger = Future.trigger();
											tink.RunLoop.current.work(function () {
												trigger.trigger(
													try {
														$call;
														tink.core.Outcome.Success(tink.Noise.Noise);
													} catch (e: Dynamic) {
														tink.core.Outcome.Failure(new tink.core.Error(0, e));
													}
												);
											});
											return trigger.asFuture();
										};
									default:
										call = macro @:pos(f.expr.pos) {
											var trigger = Future.trigger();
											tink.RunLoop.current.work(function () {
												trigger.trigger(
													try
														tink.core.Outcome.Success($call)
													catch (e: Dynamic)
														tink.core.Outcome.Failure(new tink.core.Error(0, e))
												);
											});
											return trigger.asFuture();
										};
								}
								f.expr = macro @:pos(f.expr.pos) $call;
							#else
							case 'Future':
								var call = fieldCall(sysModule, field, f.args);
								f.expr = macro @:pos(f.expr.pos) return tink.core.Future.sync($call);
							case 'Surprise':
								var call = fieldCall(sysModule, field, f.args);
								switch p.params {
									case [TPType(TPath(_.name => 'Noise')), _]:
										call = macro @:pos(f.expr.pos) {
											try {
												$call;
												tink.core.Outcome.Success(tink.Noise.Noise);
											}
											catch (e: Dynamic) {
												tink.core.Outcome.Failure(new tink.core.Error(0, e));
											}
										};
									default:
										call = macro @:pos(f.expr.pos) {
											try
												tink.core.Outcome.Success($call)
											catch (e: Dynamic)
												tink.core.Outcome.Failure(new tink.core.Error(0, e));
										};
								}
								f.expr = macro @:pos(f.expr.pos) return tink.core.Future.sync($call);
							#end
						}
					default:
				}
			default:
				return null;
		}
		#end
		return field;
	}

	static function fieldCall(module: String, field: Field, arguments: Array<FunctionArg>): Expr
		return (module+'.'+field.name).resolve().call(
			arguments.map(function(arg)
				return macro $i{arg.name}
			)
		);

}
