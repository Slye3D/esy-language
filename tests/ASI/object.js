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

const {compare}   = require('../tools');

exports.$simple  = function (assert) {
	var code    = `
re = {
	a: 5,
	b: 6
}
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$function   = function(assert){
	var code    = `
re = {
	a: 5,
	b: function(c){
		return c * 5
	}
}
re.b(7)
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};


exports.$getter = function(assert){
	var code    = `
re = {
	a: 5,
	get b(){
		return 7;
	},
	c: 9
}
re.b
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$setter = function(assert){
	var code    = `
j = false
re = {
	a: 5,
	set b(v){
		j = true
		return v
	},
	c: 9
}
re.b = 8
	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test1  = function (assert) {
	var code    = `
re = {
	a: 5
}	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test2  = function (assert) {
	var code    = `
re = {
	r(x){
		return x + 5;
	}
}
re.a = re.r(9)`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test3  = function (assert) {
	var code    = `
re = {
	a: 4,
	b: 6
}	`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test4  = function (assert) {
	var code    = `
re = {
	a: 4,
	b(x){
		return x+6;
	}
}
re.c = re.b(4)`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test5  = function (assert) {
	var code    = `
re = {
	b(x){
		return x+6;
	},
	a: 5
}
re.c = re.b(4)`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test6  = function (assert) {
	var code    = `
re = {
	c: 8,
	b(x){
		return x+6;
	},
	a: 5
}
re.c = re.b(4)`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test7  = function (assert) {
	var code    = `
re = {
	c: 8,
	b : {
		c: 9,
		d: 7,
		l: 12,
		f(x){
			return x + 8
		}
	},
	a: 5
}
re.c = re.b.f(4)`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test8  = function (assert) {
	var code    = `
re = {
	c: 8,
	b: {
		f(x){
			return x + 8
		},
		b: {
			f(x){
				return x + 8
			},
			b: {
				f(x){
					return x + 8
				},
				b: {
					f(x){
						return x + 8
					}, b: {
						f(x){
							return x + 8
						}, b: {
							f(x){
								return x + 8
							}, b: {
								f(x){
									return x + 8
								}, b: {
									f(x){
										return x + 8
									}, b: {
										f(x){
											return x + 8
										}, b: {
											f(x){
												return x + 8
											}
										}
									}
								}
							}
						}
					}
				}
			},
		},
	},
	d: {},
	a: 5
}
re.c = re.b.f(4)`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};


exports.$test8  = function (assert) {
	var code    = `
re = {
	c: 8,
	b : {
		f(x){
			return x + 8
		}
	},
	a: 5
};
(function(x){
	re.c = re.b.f(x)
})(8)
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};
