/**
 * @author Stefan Goessner (c) 2013-2021
 * @license MIT Licence (MIT)
 */
/* jshint -W014 */
"use strict";
/**
 * Create a 2D cartesian vector object `{x,y}`
 * @class v2 - Create vector object without using new.
 * @function
 * @param {object|number} v - plain `{x,y}` vector or x-coordinate.
 * @param {number} [y=undefined] - y-coordinate.
 * @example
 * const u  = v2(3,4),       // create vector as ...
 *       u2 = v2({x:3,y:4}); // ... smart alternative ...
 *       u3 = {x:3,y:4};     // ... to simple object notation.
 */
function v2(v,y=undefined) {
    if (Object.getPrototypeOf(v) === v2.prototype)  // `v` is already of type `v2` ...
        return v;
    else if (Object.getPrototypeOf(v) === Object.prototype) { // do not modify custom objects ...
        const {x, y, r, w, cw, sw, ...rest} = v;
        let X = 0, Y = 0;
        if (x !== undefined && y !== undefined) { // cartesian coords (primary) .. !
            X = x;
            Y = y;
        }
        else if (r !== undefined && w !== undefined) { // polar coords .. !
            X = r * Math.cos(w);
            Y = r * Math.sin(w);
        }
        else if (r !== undefined && cw !== undefined && sw !== undefined) {
            X = r * cw;
            Y = r * sw;
        }
        else if (r !== undefined) { // to complete .. !
            X = r;
            Y = 0;
        }
        else if (w !== undefined) { // to complete .. !
            X = Math.cos(w);
            Y = Math.sin(w);
        }
        else if (x !== undefined) { // to complete .. ! 
            X = x;
            Y = 0;
        }
        else if (y !== undefined) { // to complete .. !
            X = 0;
            Y = y;
        }
        return v2.create({x:X,y:Y,...rest});
    }
    else if (typeof v === 'number' && typeof y === 'number')
        return v2.create({x:v,y});
    else
        return v2.create({x:0,y:0});
}
v2.prototype = {
    /**
     * Set / copy coordinates from another vector
     * @returns {object} this
     * @param {object} v - source vector.
     * @example
     * let u1 = v2(3,4);
     * u1.set({x:1,y:2}).plain;   // {x:1,y:2}
     */
    set(v) { 
        this.x = v.x; this.y = v.y;
        return this;
    },
    /**
     * Test for zero vector within range `Number.EPSILON`.
     * @type {boolean}
     * @example
     * const u = v2(3,4), u2 = {x:-3,y:-4};
     * u.add(u2).isZero;   // true
     * u.sub(u2).isZero;   // false
     */
    get isZero() { 
        return Math.abs(this.x) < Number.EPSILON && Math.abs(this.y) < Number.EPSILON; 
    },
    /**
     * Test for unit vector.
     * @type {boolean}
     * @example
     * const u = v2(3,4), u2 = {x:-3,y:-4};
     * v2(3,4).isZero;      // false
     * v2(0.6,0.8).isunit;  // true
     */
    get isUnit() { 
        return Math.abs(this.x**2 + this.y**2 - 1) < Number.EPSILON;
    },
    /**
     * Magnitude / length
     * @type {number}
     * @example
     * const u = v2(3,4);
     * u.r === 5;   // true
     */
    get r() { return Math.hypot(this.x,this.y); },
    set r(q) { 
        const r = Math.hypot(this.x,this.y);
        if (q > 0) {
            this.x *= q/r; 
            this.y *= q/r; 
        }
        else {
            const pi2 = 2*Math.PI;
            this.x *= -q/r; 
            this.y *= -q/r;
            this.w += Math.PI;  // turn 180°
            this.w = ((this.w % pi2 + pi2) % pi2) > Math.PI ? this.w - pi2 : this.w;  // map to [-pi ... pi]
        }
    },
    /**
     * angle in [rad]
     * @type {number}
     * @example
     * const u = v2(3,3);
     * u.w === Math.PI/4;   // true
     */
    get w() { return Math.atan2(this.y,this.x); },
    set w(q) { 
        const r = Math.hypot(this.x,this.y); 
        this.x = r*Math.cos(q); 
        this.y = r*Math.sin(q); 
    },
    /**
     * Get unit direction vector.
     * Set unit direction vector, while preserving magnitude.
     * @type {object} v2
     * @example
     * const u = v2(3,4);
     * u.udir;             // { x: 0.6, y: 0.8 }
     * u.udir = {x:0,y:2}  // { x: 0, y: 5 }
     */
    get unit() { const r = Math.hypot(this.x,this.y); return v2.create({x:this.x/r, y:this.y/r}); },
    set unit(v){ const r_rv = Math.hypot(this.x,this.y)/Math.hypot(v.x,v.y); this.x = v.x*r_rv; this.y = v.y*r_rv; },
    /**
     * Provide clone of this vector.
     * @type {object} v2
     */
    get clone() { return v2.create({x:this.x,y:this.y}); },
    /**
     * Magnitude squared.
     * @type {number}
     * @example
     * const u = v2(3,4);
     * u.sqr === 25;   // true
     */
    get sqr() { return this.x**2 + this.y**2; },
    /**
     * Tilde (orthogonal) vector
     * @type {object} v2
     * @example
     * const u = v2(3,4);
     * u.dot(u.tilde) === 0;   // true
     */
    get tilde() { return v2.create({x:-this.y,y:this.x}); },
    get ort() { return v2.create({x:-this.y,y:this.x}); },
    /**
     * Negated vector
     * @type {object} v2
     * @example
     * const u = v2(3,4);
     * u.neg.plain;   // {x:-3,y:-4}
     */
    get neg()  { return v2.create({x:-this.x,y:-this.y}); },
    /**
     * inverted vector
     * i.e. `u.dot(u.inv) === 1`
     * @type {object} v2
     * @example
     * const u = v2(3,4);
     * u.dot(u.inv) === 1;   // true
     */
    get inv()  { const rr = this.x**2 + this.y**2; return v2.create({x:this.x/rr, y:this.y/rr}); },
    /**
     * provide plain (prototype-free) vector
     * @type {object} v2
     * @example
     * const u = v2(3,4);
     * u.plain;   // {x:3,y:4}
     */
    get plain()  { return {x:this.x, y:this.y}; },
    /**
     * Turn into immutable object
     * @returns {object} v2
     * @example
     * 
     * let u = v2(3,4);
     * u.freeze().x = 5;   // error
     */
    freeze() { 
        return Object.freeze(this); 
    },
    /**
     * vector comparison 
     * @returns {boolean}
     * @param {object} v2 - other vector.
     * @example
     * const u = v2(3,4);
     * u.equals(u.plain);    // true
     */
    equals(v) { 
        return Math.abs(this.x-v.x) < Number.EPSILON && Math.abs(this.y-v.y) < Number.EPSILON; 
    },
    /**
     * dot (inner) product
     * @returns {number}
     * @param {object} v - other vector.
     * @example
     * const u1 = v2(3,4), u2 = v2(1,2);
     * u1.dot(u2) === 11;   // true
     */
    dot(v) {
        return this.x*v.x + this.y*v.y;
    },
    /**
     * symplectic (inner) product
     * or use alias `perp(v)`
     * @returns {number}
     * @param {object} v - other vector.
     * @example
     * const u = v2(3,4), u2 = v2(1,2);
     * u.symp(u2) === 2;        // true ... same as
     * u.tilde.dot(u2) === 2;   // true
     */
    symp(v) {
        return this.x*v.y - this.y*v.x;
    },
    /**
     * vector addition
     * @returns {object} v2
     * @param {object} v - other vector.
     * @example
     * const u = v2(3,4);
     * u.add({x:2,y:1});    // {x:5,y:5}
     */
    add(v) {
        return v2.create({x:this.x+v.x,y:this.y+v.y});
    },
    /**
     * vector subtraction
     * @returns {object} v2
     * @param {object} v - other vector.
     * @example
     * const u = v2(3,4);
     * u.sub({x:2,y:1});    // {x:1,y:3}
     */
    sub(v) {
        return v2.create({x:this.x-v.x,y:this.y-v.y});
    },
    /**
     * vector scaling
     * @returns {object} v2
     * @param {number} [s=1] - scale factor.
     * @example
     * const u = v2(3,4);
     * u.scl(2);    // {x:6,y:8}
     */
    scl(s=1) { 
        return v2.create({x:this.x*s, y:this.y*s});
    },
    /**
     * vector rotation
     * @returns {object} v2
     * @param {number} [w=0] - rotation  angle [rad].
     * @example
     * let u = v2(3,4);
     * u.rot(Math.PI/2);    // {x:-4,y:3}
     */
    rot(w=0) { 
        let cw=Math.cos(w), sw=Math.sin(w); 
        return v2.create({x:cw*this.x-sw*this.y,y:sw*this.x+cw*this.y}); 
    },
    /**
     * vector similarity transform
     * @returns {object} v2
     * @param {number} lam - first transform factor.
     * @param {number} mu  - second transform factor.
     * @example
     * const u = v2(3,4);
     * u.simtrf(1,2);                 // same as ...
     * u.scl(1).add(u.tilde.scl(2))   // ...
     */
    simtrf(lam=1,mu=0) {
        return v2.create({ x: lam*this.x - mu*this.y, y: lam*this.y + mu*this.x });
    },
    /**
     * inplace tilde (orthogonalized) vector
     * @returns {object} this
     */
    itilde()  { let x = -this.y; this.y = this.x; this.x = x; return this; },
    /**
     * inplace negate vector
     * @returns {object} this
     */
    ineg()  { this.x = -this.x; this.y = -this.y; return this; },
    /**
     * inplace invert vector
     * @returns {object} this
     */
    iinv()  { const rr = this.x**2 + this.y**2; if (rr) { this.x /= rr; this.y /= rr; } return this; },
    /**
     * inplace rotate vector
     * @returns {object} this
     * @param {number} [w=0] - rotation angle [rad].
     */
    irot(w=0) { const cw=Math.cos(w), sw=Math.sin(w), x=this.cx*cw-this.sy*sw; this.y=this.x*sw+this.y*cw; this.x=x; return this; },
    /**
     * inplace scale vector
     * @returns {object} this
     * @param {number} [s=1] - scale factor.
     */
    iscl(s=1) { this.x *= s; this.y *= s; return this; },
    /**
     * inplace add vector
     * @returns {object} this
     * @param {object} v - other vector.
     */
    iadd(v) { this.x += v.x; this.y += v.y; return this; },
    /**
     * inplace subtract vector
     * @returns {object} this
     * @param {object} v - other vector.
     */
    isub(v) { this.x -= v.x; this.y -= v.y; return this; },
    /**
     * inplace similarity transform vector
     * @returns {object} this
     * @param {number} [lam=1] - first transform factor.
     * @param {number} [mu=0]  - second transform factor.
     */
    isimtrf(lam=1,mu=0) {
        const x = lam*this.x - mu*this.y; 
        this.y  = lam*this.y + mu*this.x; 
        this.x  = x; 
        return this;
    },
    /**
     * constraining methods
     */
    /**
     * Adjust magnitude of this vector with respect to `ratio` to vector `v`.
     * @returns {object} this
     * @param {object} v - other vector.
     * @param {number} [ratio=1] - magnitude ratio .
     */
    cstrLen(v,ratio=1) {
        return this.scl(Math.hypot(v.x,v.y)/Math.hypot(this.x,this.y)*ratio);
    },
    /**
     * Keep relative angle to vector `v` constant.
     * @returns {object} this
     * @param {object} v - other vector.
     * @param {number} [w=0]  - angle in radians.
     */
    cstrAng(v,w=0) {
        const ratio = this.r/v2.r(v), 
              lam = Math.cos(w)*ratio,
              mu  = Math.sin(w)*ratio;
        const x = lam*v.x - mu*v.y; 
        this.y  = lam*v.y + mu*v.x; 
        this.x  = x;
        return this;
    },
    /**
     * formatted output string of vector '{x,y,r,w}'.
     * @returns {string}
     */
    toString() { return `{x:${this.x},y:${this.y},r:${this.r},w:${180/Math.PI*this.w}}`; }
}

// redundancies ...
v2.prototype.perp = v2.prototype.symp;

// statics ...
/**
 * create a v2 vector (internal use only).
 * @private
 * @returns {object} v2
 */
v2.create = function create(v) { return Object.create(v2.prototype, Object.getOwnPropertyDescriptors(v)); }

/**
 * constant zero v2 vector (freezed).
 */
v2.zero  = v2.create({x:0,y:0}).freeze()
/**
 * constant x-unit v2 vector (freezed).
 */
v2.xunit = v2.create({x:1,y:0}).freeze()
/**
 * constant y-unit v2 vector (freezed).
 */
v2.yunit = v2.create({x:0,y:1}).freeze()

/**
 * Set coordinates of (plain) vector `a` to coordinates of (plain) vector `b`.
 * @param {object} a - (plain) vector.
 * @param {object} b - (plain) vector.
 * @returns {object} - vector a.
 */
v2.set = (a,b) => { a.x = b.x; a.y = b.y; return a; }
/**
 * Get magnitude of (plain) vector `v`.
 * @param {object} v - (plain) vector.
 * @returns {number}
 */
v2.len =
v2.r = (v) => Math.hypot(v.x,v.y)
/**
 * Set magnitude of (plain) vector `v`, while keeping angle `w` constant.
 * @param {object} v - (plain) vector.
 * @param {number} r - magnitude.
 * @returns {object}
 */
v2.set_len =
v2.set_r = (v,r) => { const q = Math.hypot(v.x,v.y); v.x *= r/q; v.y *= r/q; return v; }
/**
 * Get angle of (plain) vector `v` in [rad].
 * @param {object} v - (plain) vector.
 * @returns {number}
 */
v2.angle
v2.w = (v) => Math.atan2(v.y,v.x)
 /**
 * Set angle of (plain) vector `v`, while keeping magnitude `r` constant.
 * @param {object} v - (plain) vector.
 * @param {number} w - angle.
 * @returns {object}
 */
v2.set_angle =
v2.set_w = (v,w) => { const r = Math.hypot(v.x,v.y); v.x = r*Math.cos(w); v.y = r*Math.sin(w); }
/**
 * Get (plain) unit vector of (plain) vector `v`.
 * @param {object} v - (plain) vector.
 * @returns {object}
 */
 v2.unit = (v) => { const r = Math.hypot(v.x,v.y); return r ? {x:v.x/r, y:v.y/r} : v; }
 /**
  * Set unit vector of (plain) vector `v` to unit vector of (plain) vector `u`, while preserving its magnitude.
  * @param {object} v - (plain) vector to modify.
  * @param {object} u - vector to lend unit vector from.
  * @returns {object} - modified vector `v`.
  */
 v2.set_unit = (v,u) => { const r_ru = Math.hypot(v.x,v.y)/Math.hypot(u.x,u.y); return {x:u.x*r_ru, y:u.y*r_ur}; }
/**
 * Test for zero vector within range `Number.EPSILON`.
 * @type {boolean}
 * @example
 * v2.isZero({x:3,y:4}) // false
 */
v2.isZero = (v) => Math.abs(v.x) < Number.EPSILON && Math.abs(v.y) < Number.EPSILON
/**
 * Test for unit vector within range `Number.EPSILON`.
 * @type {boolean}
 * @example
 * const u = v2(3,4), u2 = {x:-3,y:-4};
 * v2(3,4).isZero;      // false
 * v2(0.6,0.8).isunit;  // true
 */
v2.isUnit = (v) => Math.abs(this.x**2 + this.y**2 - 1) < Number.EPSILON
/**
 * Get clone of (plain) vector `v`.
 * @param {object} v - (plain) vector.
 * @returns {object} v2
 */
v2.clone = (v) => { return {x:v.x, y:v.y} }
/**
 * Get magnitude squared of (plain) vector `v`.
 * @param {object} v - (plain) vector.
 * @returns {number}
 */
v2.sqr = (v) => v.x**2 + v.y**2
/**
 * Get orthogonal vector from (plain) vector `v`.
 * @param {object} v - plain vector.
 * @returns {object} plain
 */
v2.perp =
v2.tilde = (v) => { return {x:-v.y,y:v.x}; }
/**
 * Get negative vector from (plain) vector `v`.
 * @param {object} v - plain vector.
 * @returns {object} plain
 */
 v2.neg = (v) => { return {x:-v.x,y:-v.y}; }
/**
 * Get inverse vector from (plain) vector `v`.
 * @param {object} v - plain vector.
 * @returns {object} plain
 */
v2.inv = (v) => { const rr = this.x**2 + this.y**2; return rr ? {x:v.x/rr,y:v.y/rr} : v; }
/**
 * Test two (plain) vectors for equality.
 * @param {object} a - (plain) vector.
 * @param {object} b - (plain) vector.
 * @returns {boolean}
 */
v2.equals = (a,b) => Math.abs(a.x-b.x) < Number.EPSILON && Math.abs(a.y-b.y) < Number.EPSILON
/**
 * Dot (inner) product of two (plain) vectors.
 * @param {object} a - (plain) vector.
 * @param {object} b - (plain) vector.
 * @returns {number}
 */
v2.dot = (a,b) => a.x*b.x + a.y*b.y
/**
 * Symplectic (inner) product of two (plain) vectors.
 * @param {object} a - (plain) vector.
 * @param {object} b - (plain) vector.
 * @returns {number}
 */
v2.symp = (a,b) => a.x*b.y - a.y*b.x
/**
 * Create sum of two (plain) vectors.
 * @param {object} a - (plain) vector.
 * @param {object} b - (plain) vector.
 * @returns {object}
 */
v2.sum = (a,b) => { return {x:a.x+b.x, y:a.y+b.y}; }
/**
 * Create difference of two (plain) vectors.
 * @param {object} a - (plain) vector.
 * @param {object} b - (plain) vector.
 * @returns {object}
 */
v2.dif = (a,b) => { return {x:a.x-b.x, y:a.y-b.y}; }
/**
 * Get scaled vector from (plain) vector.
 * @param {object} v - (plain) vector.
 * @param {number} s - scaling factor.
 * @returns {object} v2
 */
v2.scl = (v,s=1) => { return {x:s*v.x, y:s*v.y} }
/**
 * Get rotateded vector from (plain) vector.
 * @param {object} v - (plain) vector.
 * @param {number} w - rotation angle [rad].
 * @returns {object} v2
 */
v2.rot = (v,dw=0) => { 
    const cw=Math.cos(dw), sw=Math.sin(dw);
    return {x:cw*v.x-sw*v.y,y:sw*v.x+cw*v.y};
}
/**
 * Similarity transform vector.
 * @returns {object} 
 * @param {object} v - (plain) vector.
 * @param {number} [lam=1] - first transform factor.
 * @param {number} [mu=0]  - second transform factor.
 */
v2.simtrf = (v,lam=1,mu=0) => { return { x: lam*v.x - mu*v.y, y: lam*v.y + mu*v.x }}
/**
 * Replace vector `v` by its orthogonal vector.
 * @param {object} v - plain vector.
 * @returns {object} plain
 */
v2.iperp =
v2.itilde = (v) => { const x = -v.y; v.y = v.x; v.x = x; return v; } 
/**
 * Replace vector `v` by its negative vector.
 * @param {object} v - plain vector.
 * @returns {object} v
 */
 v2.ineg = (v) => { v.x = -v.x; v.y = -v.y; return v; }
/**
 * Replace vector `v` by its inverse vector.
 * @param {object} v - plain vector.
 * @returns {object} v
 */
v2.iinv = (v) => { const rr = v.x**2 + v.y**2; if (rr) { v.x /= rr; v.y /= rr } return v; }
/**
 * Add vector `b` to vector `a`. Returns modified `a`.
 * @param {object} a - (plain) vector.
 * @param {object} b - (plain) vector.
 * @returns {object}
 */
v2.iadd =
v2.isum = (a,b) => { a.x += b.x; a.y += b.y; return v }
/**
 * Create difference of two (plain) vectors.
 * @param {object} a - (plain) vector.
 * @param {object} b - (plain) vector.
 * @returns {object} a
 */
v2.isub =
v2.idif = (a,b) => { a.x -= b.x; a.y -= b.y; return v }
/**
 * Inplace scale vector `v` by `s`.
 * @param {object} v - (plain) vector.
 * @param {number} s - scaling factor.
 * @returns {object} v
 */
v2.iscl = (v,s=1) => { a.x *= s; a.y *= s; return v }
/**
 * Inplace rotate vector `v` by `dw`.
 * @param {object} v - (plain) vector.
 * @param {number} dw - rotation angle [rad].
 * @returns {object} v2
 */
v2.irot = (v,dw=0) => { 
    const cw=Math.cos(dw), sw=Math.sin(dw);
    const x = cw*v.x-sw*v.y;
    v.y     = sw*v.x+cw*v.y;
    v.x     = x;
    return v;
}
/**
 * Similarity transform vector.
 * @returns {object} 
 * @param {object} v - (plain) vector.
 * @param {number} [lam=1] - first transform factor.
 * @param {number} [mu=0]  - second transform factor.
 */
v2.isimtrf = (v,lam=1,mu=0) => {
    const x = lam*v.x - mu*v.y;
    v.y     = lam*v.y + mu*v.x;
    v.x     = x;
    return v;
}
/**
 * Create a vector with coordinates referencing coordinates of other vector.
 * @param {object} v - (plain) vector.
 * @returns {object} v2
 */
v2.ref = (v) => { return {get x(){return v.x}, get y(){return v.y},set x(q){v.x=q}, set y(q){v.y=q}}; }
/**
 * First (trivial) case of the planar vector triangle equation.
 * .
 * @param {object} a - (plain) vector (magnitude and direction modified)
 * @param {object} b - (plain) vector
 * @param {object} c - (plain) vector
 * s. https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation
 */
v2.case1 = (a,b,c) => {
    a.x = b.x + c.x;
    a.y = b.y + c.y;
}
/**
 * Second case of the planar vector equation.
 * @param {object} a - (plain) vector (magnitude modified)
 * @param {object} b - (plain) vector (direction modified)
 * @param {object} c - (plain) vector
 * @param {number} sgn - sign of required solution
 * s. https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation
 */
v2.case2 = (a,b,c,sgn) => {
    const ea = v2.unit(a),
          sqr = v2.sqr(b) - v2.symp(ea,c)**2;
    v2.set_r(a, v2.dot(ea,c) + (sgn||1)*Math.sqrt(sqr > 0 ? sqr : 0));
    v2.cpy(b,v2.sub(a,c));
}
/**
 * Third case of the planar vector equation.
 * @param {object} a - (plain) vector (magnitude modified)
 * @param {object} b - (plain) vector (magnitude modified)
 * @param {object} c - (plain) vector
 * s. https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation
 */
v2.case3 = (a,b,c) => {
    const ea = v2.unit(a), eb = v2.unit(b), den = v2.symp(ea,eb);
    a.r = v2.symp(c,eb)/den;
    b.r = v2.symp(c,ea)/den;
}
/**
 * Fourth case of the planar vector equation.
 * @param {object} a - (plain) vector (direction modified)
 * @param {object} b - (plain) vector (direction modified)
 * @param {object} c - (plain) vector
 * s. https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation
 * @returns {string}
 */
v2.case4 = function case4(a,b,c,sgn) {
    const cc = v2.sqr(c), aa_cc = v2.sqr(a)/cc,
          lam = (aa_cc - v2.sqr(b)/cc + 1)/2,
          sqr = aa_cc - lam*lam,
          mu = sqr > 0 ? (sgn||1)*Math.sqrt(sqr) : 0;
    
    v2.set(a, v2.simtrf(c, lam, mu));
    v2.set(b, v2.simtrf(c, lam-1, mu));
}
/**
 * Fifth case of the planar vector equation.
 * Direction of `a` and direction of `b` is modified.
 * s. https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation
 * @returns {string}
 */
v2.case5 = function case5(a,b,c,sgn) {
    const ar = (sgn||1)*Math.sqrt(v2.sqr(c) - v2.sqr(b));
    v2.set(a, v2.simtrf(c, ar, b.r).scl(ar/v2.sqr(c)));
    v2.set_unit(b, v2.tilde(a));
}

// use it with node.js ... ?
if (typeof module !== 'undefined') module.exports = v2;
