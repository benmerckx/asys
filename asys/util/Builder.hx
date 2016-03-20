package asys.util;

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
							case 'Future':
								var call = fieldCall(sysModule, field, f.args);
								f.expr = macro return tink.core.Future.sync($call);
							case 'Surprise':
								var call = fieldCall(sysModule, field, f.args);
								switch p.params {
									case [TPType(TPath(_.name => 'Noise')), _]:
										call = macro {
											try {
												$call;
												tink.core.Outcome.Success(tink.Noise.Noise);
											}
											catch (e: Dynamic) {
												tink.core.Outcome.Failure(new tink.core.Error(0, e));
											}
										};
									default:
										call = macro {
											try 
												tink.core.Outcome.Success($call)
											catch (e: Dynamic)
												tink.core.Outcome.Failure(new tink.core.Error(0, e));
										};
								}
								f.expr = macro return tink.core.Future.sync($call);
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