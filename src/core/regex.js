/**
 *    _____ __
 *   / ___// /_  _____
 *   \__ \/ / / / / _ \
 *  ___/ / / /_/ /  __/
 * /____/_/\__, /\___/
 *       /____/
 *       Copyright 2017 Slye Development Team. All Rights Reserved.
 *       Licence: MIT License
 */

class Expr{
	constructor(regex){
		this.regex      = regex;
		this._capture   = false;
		this._optional  = false;
	}

	capture(){
		this._capture   = true;
		return this;
	}

	optional(){
		this._repeat  = '?';
		return this;
	}

	max(num){
		this._max   = num;
		return this;
	}

	min(num){
		this._min   = num;
		return this;
	}

	count(min, max){
		this._min   = min;
		this._max   = max;
		return this;
	}

	exact(num){
		this._exact = num;
		return this;
	}

	lookAfter(...patterns){
		this._after = (new Regex(...patterns)).toString();
		return this;
	}

	forceGroup(){
		this.force_group = true;
		return this;
	}

	oneOrMore(){
		this._repeat    = '+';
		return this;
	}

	oneOrNotAtAll(){
		this._repeat    = '?';
		return this;
	}

	zeroOrMore(){
		this._repeat    = '*';
		return this;
	}

	toString(){
		var a = '(';
		if(!this._capture)
			a += '?:';
		if(this._after){
			a += '(?:'
		}
		a += this.regex;
		a += ')';

		if(this._after){
			a += `(?=${this._after}))`
		}

		if(this._min == this._max && !this._exact)
			this._exact = this._min;

		var s = true;
		if(this._exact){
			a += `{${this._exact}}`;
			s = false;
		}else {
			if(this._min && this._max){
				a += `{${this._min},${this._max}}`;
				s = false;
			}else {
				if(this._min){
					a += `{${this._min},}`;
					s = false;
				}
				if(this._max){
					a += `{,${this._max}}`;
					s = false;
				}
			}
		}
		if(this._repeat && s)
			a += this._repeat;
		if(!this._after && a.startsWith('(?:') && a.endsWith(')') && !this.force_group)
			return a.substr(3, a.length - 4);
		return a;
	}
}

class Regex{
	constructor(..._patterns){
		this.patterns       = _patterns;
		this._autoSpace     = false;
		this._flags         = 'ig';
	}

	autoSpace(){
		this._autoSpace = true;
		return this;
	}

	flags(flags){
		this._flags = flags;
		return this;
	}

	toString(){
		var re = '';
		this.patterns.forEach(pattern => {
			re  += pattern.toString();
			if(this._autoSpace)
				re += '\\s*';
		});
		if(this._autoSpace && re[0] !== '^')
			re = '\\s*' + re;
		if(this._autoSpace && re[0] == '^')
			re = '^' + re.substr(4);
		if(this.autoSpace() && re.endsWith('$\\s*'))
			re = re.substr(0, re.length - 7) + '$';
		return re;
	}

	toObj(){
		return new RegExp(this.toString(), this._flags)
	}

	static text(...texts){
		texts = texts.map(a => a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'));
		return new Expr(texts.join('|')).forceGroup()
	}

	static beginning(){
		return new Expr('^');
	}

	static end(){
		return new Expr('$');
	}

	static space(){
		return new Expr('\\s+');
	}

	static group(...patterns){
		return new Expr((new Regex(...patterns)).toString())
	}

	static arguments(){
		// return new Expr('(?:(?:\\s*(?:[$A-Z_][$A-Z_0-9]*|\\{.+?\\}|\\[.+?\\])\\s*)(?:,(?=\\s*[\\{\\[$A-Z_]+))?)+')
		return new Expr('.*');
	}

	static callParameters(){
		return new Expr('.*')
	}

	static identifier(){
		return new Expr('[$A-Z_][$A-Z_0-9]*');
	}

	static number(){
		return this.or(
			// Binary Literal
			'[+-]?0[bB][01]+',

			// Octal
			'[+-]?0[oO][0-7]+',

			// Octal
			'[+-]?0[oO][0-7]+',

			// Hex
			'[+-]?0[xX][0-9a-fA-F]+',

			// Decimal Literal
			'[+-]?(?:0|[1-9][0-9]*)\\.(?:[0-9]+)?(?:[eE][+-]?[0-9]+)?',
			'[+-]?\\.[0-9]+(?:[eE][+-]?[0-9]+)?',
			'[+-]?(?:0|[1-9][0-9]*)(?:[eE][+-]?[0-9]+)?'
		);
	}

	static or(...patterns){
		return new Expr(patterns.map(r => new Expr(r).forceGroup()).join('|')).forceGroup();
	}

	static raw(regex){
		return new Expr(regex);
	}

	static functionCall(){
		return this.group(
			this.identifier(),
			this.raw('.*'),
			this.text('('),
			this.callParameters(),
			this.text(')'),
			this.text(';').optional()
		)
	}
}
Regex.expr  = Expr;
module.exports  = Regex;