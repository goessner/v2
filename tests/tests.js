// using  https://github.com/Yuffster/describe
if (typeof module !== 'undefined' && typeof require !== 'undefined') {
	var v2 = require('../v2.js'),
	    describe = require('./describe.js');
}

describe("create", {
	'create vector': function() {
		var a = v2(3,4);
		this.expect(a.x===3 && a.y === 4, true);
	},
	'create null vector': function() {
		var a = v2();
		this.expect(a.x===0 && a.y === 0, true);
	},
});

describe("analyse", {
	'zero vector': function() {
		var z = v2.zero;
		z.x = 1;  // does not work ... components are read only.
		this.expect(z.x===0 && z.y === 0, true);
	},
	'is zero vector': function() {
		var a = {x:0,y:0};
		this.expect(v2.isZero(a), true);
	},
	'is equal': function() {
		var a = {x:2,y:3}, b = {x:3,y:4}, c = {x:3,y:4};
		this.expect(v2.isEq(a,b), false);
		this.expect(v2.isEq(b,c), true);
	},
	'is nearly equal or nearly zero': function() {
		var a = {x:3,y:4+1e-17}, b = {x:3,y:4}, c = {x:1e-17,y:1e-18};
		this.expect(v2.isEps(a,b), true);
		this.expect(v2.isEps(c), true);
	},
	'sqr': function() {
		var a = {x:3,y:4};
		this.expect(v2.sqr(a), 25);
	},
	'len': function() {
		var a = {x:3,y:4};
		this.expect(v2.len(a), 5);
	},
	'angle to x-axis': function() {
		var a = {x:3,y:4};
		this.expect(v2.angle(a), Math.atan2(4,3));
	},
	'angle from a to b': function() {
		var a = {x:3,y:4}, b = v2.tilde(a);
		this.expect(v2.angle(a,b), Math.PI/2);
	}
});

describe("operator", {
	'copy': function() {
		var a = v2(3,4), b;
		b = v2.copy(a,b);
		this.expect(b.x===3 && b.y === 4, true);
	},
	'unit': function() {
		var a = v2.unit(v2(3,4));
		this.expect(Math.abs(a.x*a.x + a.y*a.y)-1 < v2.EPS, true);
	},
	'toPolar': function() {
		var a = v2.toPolar(v2(3,4));
		this.expect(a.r, 5);
		this.expect(a.w, Math.atan2(4,3));
	},
	'fromPolar': function() {
		var a = v2.fromPolar({r:5,w:Math.PI/6});
		this.expect(a.x, 5*Math.cos(Math.PI/6));
		this.expect(a.y, 5*Math.sin(Math.PI/6));
	},
});


console.log(describe.logResults());

