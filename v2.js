/**
 * @author Stefan Goessner (c) 2013-16
 * @license MIT Licence (MIT)
 */
/* jshint -W014 */
/**
 *  Create a plain 2D vector object `{x,y}`
 *  @class v2 Create plain vector object without using new.
 * @example
 * var u1 = v2(3,4),      // create vector as an alternative ...
 *     u2 = {x:-3,y:-4};  // ... to simple object notation.
 */
function v2(x,y) { return {x:x||0,y:y||0}; }

/**
 * Null vector.
 */
v2.zero = Object.create(null, {x:{value:0},y:{value:0}});  // non-modifiable null vector ...
/**
 * Epsilon (`1.49e-8`) to test null vectors and unit vectors against.
 */
v2.EPS = Math.sqrt(Number.EPSILON);
/**
 * Test for zero vector.<br>
 * `u === 0`
 * @method v2.isZero
 * @param {v2} u - 2D Vector
 * @return {boolean} is zero vector.
 * @example
 * var u1 = v2(3,4), u2 = {x:-3,y:-4};
 * v2.isZero(v2.add(u1,u2);   // true
 * v2.isZero(v2.sub(u1,u2);   // false
 */
v2.isZero = function(u)  { 
   return u.x === 0 && u.y === 0;
};
/**
 * Equality of two vectors.
 * `u === v`
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {boolan} equality.
 * @example
 * var u1 = v2(3,4), u2 = v2(1,2), u3 = {x:3,y:4};
 * v2.isEq(u1,u2);       // false
 * v2.isEq(u1,u3);       // true
 */
v2.isEq = function(u,v) {
   return u.x === v.x && u.y === v.y;
};
/**
 * Test, if a vector -- or the difference of two vectors -- is smaller than `v2.EPS`.<br>
 * `|u - v| < v2.EPS` 
 * @param {v2} u Vector to test.
 * @param {v2|undefined} v Vector to build the difference with u [optional].
 * @returns {boolean} nearly equal or zero.
 * @example
 * var u1 = v2(1e-10,2e-9), u2 = {x:3e-9,y:-4e-11};
 * v2.isEps(u1);         // true
 * v2.isEps(u1,u2);      // true, with difference
 *                       // {x:-2.9e-9, y:2.04e-9} 
 */
v2.isEps = function(u,v) {
   return Math.abs(v ? u.x-v.x : u.x) < v2.EPS 
       && Math.abs(v ? u.y-v.y : u.y) < v2.EPS;
};
/**
 * Test, if vector is a unit vector.<br>
 * `|u| === 1` 
 * @param {v2} u Vector to test.
 * @returns {boolean}
 * @example
 * var u1 = {x:3/5,y:4/5}, u2 = v2(3,-4);
 * v2.isUnit(u1);        // true
 * v2.isUnit(u2);        // false
 */
v2.isUnit = function(u) {
   return u.x*u.x + u.y*u.y - 1 < v2.EPS;
};
/**
 * Test, if vector has cartesian coordinates `{x,y}`.
 * @param {v2} u Vector to test.
 * @returns {boolean}
 * @example
 * var u1 = v2(3,4), u2 = {r:5,w:0.9273}, 
 *     u3 = {r:5,w:0.9273,x:3,y:4};
 * v2.isCartesian(u1);   // true
 * v2.isCartesian(u2);   // false
 * v2.isCartesian(u3);   // true
 */
v2.isCartesian = function(u) {
   return "x" in u && "y" in u;
};
/**
 * Test, if vector has polar coordinates `{r,w}`.
 * @param {v2} u Vector to test.
 * @returns {boolean}
 * @example
 * var u1 = v2(3,4), u2 = {r:5,w:0.9273}, 
 *     u3 = {r:5,w:0.9273,x:3,y:4};
 * v2.isPolar(u1);   // false
 * v2.isPolar(u2);   // true
 * v2.isPolar(u3);   // true
 */
v2.isPolar = function(u) {
   return "r" in u && "w" in u;
};
/**
 * Length / Euclidean Norm of vector.<br>
 * `len = sqrt(u.x^2 + u.x^2)`
 * @param {v2} u 2D Vector
 * @return {number} length of vector.
 * @example
 * var u = {x:3,y:4};
 * v2.len(u);   // 5
 */
v2.len = function(u)  { 
   return Math.hypot(u.x,u.y);
};
/**
 * Squared Length of vector.<br>
 * `u*u = u.x^2 + u.x^2`
 * @param {v2} u 2D Vector
 * @return {number} squared length of vector.
 * @example
 * var u = v2(3,4);
 * v2.sqr(u);   // 25
 */
v2.sqr = function(u)  { 
   return u.x*u.x + u.y*u.y; 
};
/**
 * Angle from u to v or from positive x-axis
 * to `u` - if `v` is missing. [radians].<br>
 * `atan(~u*v)/(u*v)`
 * @param {v2} u 2D Vector
 * @param {v2|undefined} v 2D Vector [optional]
 * @return {number} angle from `u` to `v` or from positive x-axis  
 *                  to `u`.
 * @example
 * var u1 = v2(3,4), u2 = v2(-4,3);
 * v2.angle(u1);     // 0.9273
 * v2.angle(u1,u2);  // 1.5708 (pi/2)
 */
v2.angle = function(u,v) {
   var t;
   return v ? Math.atan2(Math.abs(t = u.x*v.y - u.y*v.x) < v2.EPS ? 0 : t, u.x*v.x + u.y*v.y)
            : Math.atan2(u.y, u.x);
};
/**
 * Assign vector u to v.<br>
 * `v = u`
 * @param {v2} u 2D source vector
 * @param {v2|undefined} v 2D destination vector [optional].
 * @return {v2} destination vector o.
 * @example
 * var u1 = v2(3,4), u2 = {x:2,y:1}, u3;
 * v2.copy(u1,u2);    // u2 = {x:3,y:4}
 * u3 = v2.copy(u1);  // u3 = {x:3,y:4}
 */
v2.copy = function(u,v) {
   if (v) {
      v.x = u.x||0;
      v.y = u.y||0;
   }
   else
     v = {x:u.x,y:u.y};
   return v;
};
/**
 * Negative vector.<br>
 * `-u`
 * @param {v2} u 2D Vector
 * @return {v2} 2D vector negated.
 * @example
 * v2.neg({x:2,y:1});  // {x:-2,y:-1}
 */
v2.neg = function(u) {
   return {x:-u.x,y:-u.y};
};
/**
 * Orthogonal vector - rotated by 90 degrees counterclockwise. Also called *perp operator*.<br>
 * `~u = {x:-u.y,y:u.x}`
 * @param {v2} u 2D Vector
 * @return {v2} 2D orthogonal vector.
 * @example
 * v2.tilde({x:3,y:4});  // {x:-4,y:3}
 */
v2.tilde = function(u) {
   return {x:-u.y,y:u.x};
};
/**
 * Unit vector of a vector.<br>
 * `u / |u|`
 * @param {v2} u 2D Vector
 * @return {v2} 2D unit vector.
 * @example
 * v2.unit({x:3,y:4});  // {x:0.6,y:0.8}
 */
v2.unit = function(u) {
   var len = Math.hypot(u.x,u.y), invlen = Math.abs(len) < v2.EPS ? 0 : 1/len; 
   return {x:u.x*invlen,y:u.y*invlen}; 
};
/**
 * Cartesian vector from polar vector.<br>
 * If argument is already cartesian it is simply returned.<br>
 * `{x:u.r*cos(u.w),y:u.r*sin(u.w)}`
 * @param {v2} u 2D Vector
 * @return {object} 2D vector in cartesian format {x,y}.
 * @example
 * var u1 = {r:5,w:0.9273}, u2 = {x:3,y:4}; 
 * v2.cartesian(u1);       // {x:3,y:4};
 * v2.cartesian(u2);       // {x:3,y:4};
 */
v2.cartesian = function(u) {
   return "x" in u && "y" in u 
        ? {x:u.x,y:u.y}
        : {x:u.r*Math.cos(u.w),y:u.r*Math.sin(u.w)};
};
/**
 * Polar vector from a cartesian vector.<br>
 * If argument is already polar it is simply returned.<br>
 * `{r:sqrt(u.x^2+u.y^2),w:atan2(u.y,u.x)}`
 * @param {v2} u 2D Vector
 * @return {object} 2D vector in polar format {r,w}.
 * @example
 * var u1 = {r:5,w:0.9273}, u2 = {x:3,y:4}; 
 * v2.polar(u1);       // {r:5,w:0.9273};
 * v2.polar(u2);       // {r:5,w:0.9273};
 */
v2.polar = function(u) {
   return "r" in u && "w" in u 
        ? {r:u.r,w:u.w}
        : {r:Math.hypot(u.x,u.y),w:Math.atan2(u.y,u.x)}; 
};
/**
 * Convert cartesian vector to polar vector.<br>
 * *Obsolete*: use `v2.polar` instead.
 * @param {v2} u 2D Vector
 * @return {object} 2D vector in polar format {r,w}.
 */
v2.toPolar = function(u) {
   return {r:Math.hypot(u.x,u.y),w:Math.atan2(u.y,u.x)}; 
};
/**
 * Convert polar vector {r,w} to cartesian vector.<br>
 * *Obsolete*: use `v2.cartesian` instead.<br>
 * `{x:u.r*cos(u.w),y:u.r*sin(u.w)}`
 * @param  {object} 2D vector in polar format {r,w}.
 * @return {v2} Cartesian 2D Vector
 */
v2.fromPolar = function(u) {
   return {x:u.r*Math.cos(u.w),y:u.r*Math.sin(u.w)};
};
/**
 * Sum of two vectors.<br>
 * `u + v`
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {v2} 2D vector sum.
 * @example
 * var u1 = {x:3,y:4}, u2 = {x:1,y:2}; 
 * v2.sum(u1,u2);      // {x:4,y:6};
 */
v2.sum = function(u,v) { 
   return {x:u.x+v.x,y:u.y+v.y}; 
};
/**
 * Difference of two vectors.<br>
 * `u - v`
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {v2} 2D vector difference.
 * @example
 * var u1 = {x:3,y:4}, u2 = {x:1,y:2}; 
 * v2.dif(u1,u2);      // {x:2,y:2};
 */
v2.dif = function(u,v) {
   return {x:u.x-v.x,y:u.y-v.y}; 
};
/**
 * Scalar (dot) product of two vectors.<br>
 * `u * v = u.x*v.x + u.y*v.y`
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {number} scalar product.
 * @example
 * var u1 = {x:3,y:4}, u2 = {x:1,y:2}, u3 = {x:-4,y:3}; 
 * v2.dot(u1,u2);      // 11;
 * v2.dot(u1,u3);      // 0;
 * v2.dot(u2,u3);      // 2;
 */
v2.dot = function(u,v) { 
   return u.x*v.x + u.y*v.y; 
};
/**
 * perp dot product of two 2D vectors (area product).<br>
 * `~u * v = u.x*v.y - u.y*v.x`<br>
 * Same as : `v2.dot(v2.tilde(u),v)`<br>
 * Result is equal to the value of the z-coordinate of the
 * vector from the cross product of the corresponding 3D vectors.
 * @param {v2} u - 2D Vector
 * @param {v2} v - 2D Vector
 * @return {number}  perp dot product (`~u*v`).
 * @example
 * var u1 = {x:3,y:4}, u2 = {x:6,y:8}, u3 = {x:1,y:2}; 
 * v2.dot(u1,u2);      // 11;
 * v2.dot(u1,u3);      // 0;
 * v2.dot(u2,u3);      // 2;
 */
v2.perp = function(u,v) { 
   return u.x*v.y - u.y*v.x; 
};
/**
 * Scale a vector by multiplication.<br>
 * `u*s`
 * @param {v2} u 2D Vector
 * @param {number} [s=1] Scaling factor
 * @return {v2} 2D vector scaled.
 * @example
 * v2.scl({x:3,y:4},2);      // {x:6,y:8};
 * v2.scl({x:3,y:4},-1);     // {x:-3,y:-4};
 */
v2.scl = function(u,s) { 
   return {x:(s||1)*u.x,y:(s||1)*u.y};
};
/**
 * Rotate a vector by angle w [radians].<br>
 * @param {v2} u 2D Vector
 * @param {number} w Rotation angle in radians
 * @return {v2} 2D vector rotated.
 * @example
 * v2.rot({x:3,y:4},-Math.PI/2);   // {x:4,y:-3};
 */
v2.rot = function(u,w) {
   var s = Math.sin(w), c = Math.cos(w);
   return {x:c*u.x-s*u.y,y:s*u.x+c*u.y};
};
/**
 * Transform a vector by 2x3 matrix (SVG). <br>
 * <code>[a c e] [x] = [x']</code><br>
 * <code>[b d f] [y] = [y']</code><br>
 * <code>[0 0 1] [1] = [1]</code>
 * @param {v2} u 2D Vector
 * @param {number} a m11
 * @param {number} b m21
 * @param {number} c m12
 * @param {number} d m22
 * @param {number} [e=0] x-translation
 * @param {number} [f=0] y-translation
 * @return {v2} 2D vector transformed.
 * @example
 * v2.trf({x:3,y:4},2,0,0,1,4,5);   // {x:10,y:9};
 */
v2.trf = function(u,a,b,c,d,e,f) {
   return { x: a*u.x + c*u.y + (e||0),
            y: b*u.x + d*u.y + (f||0) };
};
/**
 * Apply similarity transformation to a vector. <br>
 * `a*u + b*~u`
 * @param {v2} u 2D Vector
 * @param {number} a Scale u by a.
 * @param {number} b Scale ~u by b.
 * @return {v2} 2D vector transformed.
 * @example
 * v2.simtrf({x:3,y:4},2,1);   // {x:2,y:11};
 */
v2.simtrf = function(u,a,b) {
   return { x: a*u.x - b*u.y, y: a*u.y + b*u.x };
};
/**
 * Inplace convert polar vector to cartesian vector.<br>
 * `{x:u.r*cos(u.w),y:u.r*sin(u.w)}`
 * @param {v2} u 2D Vector
 * @return {object} Vector `u` in cartesian format {x,y}.
 * @example
 * var u1 = {r:5,w:0.9273}, u2 = {x:3,y:4}; 
 * v2.icartesian(u1);       // u1 = {x:3,y:4};
 * v2.icartesian(u2);       // u2 = {x:3,y:4};
 */
v2.icartesian = function(u) {
   if ("r" in u && "w" in u) {  // is polar ..
      u.x = u.r*Math.cos(u.w);
      u.y = u.r*Math.sin(u.w);
      delete u.r;               // avoid redundancy ...
      delete u.w;
   }
   return u;
};
/**
 * Inplace convert cartesian vector to polar vector.<br>
 * `{r:sqrt(u.x^2+u.y^2),w:atan2(u.y,u.x)}`
 * @param {v2} u 2D Vector
 * @return {object} Vector `u`  in polar format {r,w}.
 * @example
 * var u1 = {r:5,w:0.9273}, u2 = {x:3,y:4}; 
 * v2.ipolar(u1);       // u1 = {r:5,w:0.9273};
 * v2.ipolar(u2);       // u2 = {r:5,w:0.9273};
 */
v2.ipolar = function(u) {
   if ("x" in u && "y" in u) {  // is cartesian ..
      u.r = Math.hypot(u.x,u.y);
      u.w = Math.atan2(u.y,u.x);
      delete u.x;               // avoid redundancy ...
      delete u.y;
   } 
   return u;
};
/**
 * Inplace negate a vector.<br>
 * `u = -u`
 * @param {v2} u 2D Vector
 * @return {v2} vector u negated.
 * @example
 * let u = {x:2,y:1};
 * v2.ineg(u);  // u = {x:-2,y:-1}
 */
v2.ineg = function(u) {
   u.x = -u.x;
   u.y = -u.y;
   return u;
};
/**
 * Inplace create orthogonal vector - rotated by 90 degrees counterclockwise.<br>
 * `u = {x:-u.y,y:u.x}`
 * @param {v2} u 2D Vector
 * @return {v2} orthogonal vector u.
 * @example
 * let u = {x:3,y:4};
 * v2.tilde(u);  // u = {x:-4,y:3}
 */
v2.itilde = function(u) {
   var x = u.x;
   u.x = -u.y;
   u.y =  x;
   return u;
};
/**
 * Inplace create unit vector of a vector.<br>
 * `u = u / |u|`
 * @param {v2} u 2D Vector
 * @return {v2} 2D unit vector.
 * @example
 * let u = {x:3,y:4};
 * v2.unit(u);  // u = {x:0.6,y:0.8}
 */
v2.iunit = function(u)  {
   var len = Math.hypot(u.x,u.y), invlen = Math.abs(len) < v2.EPS ? 0 : 1/len; 
   u.x *= invlen;
   u.y *= invlen;
   return u;
};
/**
 * Add vector v to u (inplace sum).<br>
 * `u += v`
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {v2} Result vector u.
 * @example
 * var u1 = {x:3,y:4}, u2 = {x:1,y:2}; 
 * v2.isum(u1,u2);      // u1 = {x:4,y:6};
 */
v2.isum = function(u,v) { 
   u.x += v.x;
   u.y += v.y;
   return u;
};
/**
 * Subtract vector v from u (inplace difference).<br>
 * `u -= v`
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {v2} result vector u.
 * @example
 * var u1 = {x:3,y:4}, u2 = {x:1,y:2}; 
 * v2.idif(u1,u2);      // u1 = {x:2,y:2};
 */
v2.idif = function(u,v) {
   u.x -= v.x;
   u.y -= v.y;
   return u;
};
/**
 * Inplace scale a vector.<br>
 * `u *= s`
 * @param {v2} u 2D Vector
 * @param {number} s Scaling factor
 * @return {v2} vector u scaled.
 * @example
 * let u = {x:3,y:4};
 * v2.scl(u,2);      // u = {x:6,y:8};
 */
v2.iscl = function(u,s) { 
   u.x *= s;
   u.y *= s;
   return u;
};
/**
 * Inplace rotate a vector by angle w [radians].<br>
 * @param {number} w Rotation angle in radians.
 * @param {v2} u 2D Vector
 * @return {v2} vector u rotated.
 * @example
 * let u = {x:3,y:4};
 * v2.rot(u,-Math.PI/2);   // u = {x:4,y:-3};
 */
v2.irot = function(w,u) {
   var s = Math.sin(w), c = Math.cos(w),
       x = c*u.x-s*u.y;
   u.y = s*u.x+c*u.y;
   u.x = x;
   return u;
};
/**
 * Inplace transform a vector by 2x3 matrix (SVG). <br>
 * <code>[a c e] [x] = [x']</code><br>
 * <code>[b d f] [y] = [y']</code><br>
 * <code>[0 0 1] [1] = [1]</code>
 * @param {v2} u 2D Vector
 * @param {number} a m11
 * @param {number} b m21
 * @param {number} c m12
 * @param {number} d m22
 * @param {number} e x-translation [optional]
 * @param {number} f y-translation [optional]
 * @return {v2} 2D vector transformed.
 * @example
 * let u = {x:3,y:4};
 * v2.trf(u,2,0,0,1,4,5);   // u = {x:10,y:9};
 */
v2.itrf = function(u,a,b,c,d,e,f) {
   var x   = a*u.x + c*u.y + (e||0);
       u.y = b*u.x + d*u.y + (f||0);
       u.x = x;
   return u;
};
/**
 * Apply inplace similarity transformation to a vector. <br>
 * `u = a*u + b*~u`
 * @param {v2} u 2D Vector
 * @param {number} a Scale u by a.
 * @param {number} b Scale ~u by b.
 * @return {v2} 2D vector transformed.
 * @example
 * var u = {x:3,y:4};
 * v2.simtrf(u,2,1);   // u = {x:2,y:11};
 */
v2.isimtrf = function(u,a,b) {
   var x   = a*u.x - b*u.y;
       u.y = a*u.y + b*u.x;
       u.x = x;
   return u;
};

/**
 * String of vector. Format: `(x,y)`.
 * @param {v2} u 2D Vector
 * @param {v2} n decimal places. [optional]
 * @return {string}.
 */
v2.str = function(u,n) {
    return n > 0  ? "("+u.x.toFixed(n)+","+u.y.toFixed(n)+")"
                  : "("+u.x+","+u.y+")";
}

// use it with node.js ... ?
if (typeof module !== 'undefined') module.exports = v2;