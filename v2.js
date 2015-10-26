/**
 * @author Stefan Goessner (c) 2013-15
 * @license MIT Licence (MIT)
 */
/* jshint -W014 */
/**
 *  Create a plain vector object  {x,y}
 *  @class v2 Create plain vector object without using new.
 */
var v2 = function v2(x,y) { return {x:x||0.0,y:y||0.0}; }
/**
 * Null vector.
 */
v2.zero = Object.create(null, {x:{value:0},y:{value:0}});  // non-modifiable null vector ...
/**
 * Epsilon to test null vectors and unit vectors against.
 */
v2.EPS = Math.sqrt(Number.EPSILON);
/**
 * Test for zero vector.<br>
 * u === 0
 * @method v2.isZero
 * @param {v2} u - 2D Vector
 * @return {boolean} is zero vector.
 */
v2.isZero = function(u)  { 
   return u.x === 0 && u.y === 0;
};
/**
 * Equality of two vectors.
 * u === v
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {boolan} equality.
 */
v2.isEq = function(u,v) {
   return u.x === v.x && u.y === v.y;
};
/**
 * Test, if a vector -- or the difference of two vectors -- is smaller than <code>v2.EPS<code>.<br>
 * |u - v| < v2.EPS 
 * @param {v2} u Vector to test.
 * @param {v2|undefined} v Vector to build the difference with u [optional].
 * @returns {boolean} nearly equal or zero.
 */
v2.isEps = function(u,v) {
   return Math.abs(v ? u.x-v.x : u.x) < v2.EPS 
       && Math.abs(v ? u.y-v.y : u.y) < v2.EPS;
};
/**
 * Test, if vector is a unit vector.<br>
 * |u| == 1 
 * @param {v2} u Vector to test.
 * @returns {boolean}
 */
v2.isUnit = function(u) {
   return u.x*u.x + u.y*u.y - 1 < v2.EPS;
};
/**
 * Length / Euclidean Norm of vector.<br>
 * len = sqrt(u.x^2 + u.x^2)
 * @param {v2} u 2D Vector
 * @return {number} length of vector.
 */
v2.len = function(u)  { 
   return Math.hypot(u.x,u.y);
};
/**
 * Squared Length of vector.<br>
 * u*u = u.x^2 + u.x^2
 * @param {v2} u 2D Vector
 * @return {number} squared length of vector.
 */
v2.sqr = function(u)  { 
   return u.x*u.x + u.y*u.y; 
};
/**
 * Angle from u to v or from positive x-axis
 * to u - if v is missing. [radians].<br>
 * atan(~u*v)/(u*v)
 * @param {v2} u 2D Vector
 * @param {v2|undefined} v 2D Vector [optional]
 * @return {number} angle from u to v or from positive x-axis  
 *                  to u.
 */
v2.angle = function(u,v) {
   var t;
   return v ? Math.atan2(Math.abs(t = u.x*v.y - u.y*v.x) < v2.EPS ? 0 : t, u.x*v.x + u.y*v.y)
            : Math.atan2(u.y, u.x);
};
/**
 * Assign vector u to v.<br>
 * v = u
 * @param {v2} u 2D source vector
 * @param {v2|undefined} v 2D destination vector [optional].
 * @return {v2} destination vector o.
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
 * -u
 * @param {v2} u 2D Vector
 * @return {v2} 2D vector negated.
 */
v2.neg = function(u) {
   return {x:-u.x,y:-u.y};
};
/**
 * Orthogonal vector - rotated by 90 degrees counterclockwise.<br>
 * ~u = {x:-u.y,y:u.x}
 * @param {v2} u 2D Vector
 * @return {v2} 2D orthogonal vector.
 */
v2.tilde = function(u) {
   return {x:-u.y,y:u.x}; 
};
/**
 * Unit vector of a vector.<br>
 * u / |u|
 * @param {v2} u 2D Vector
 * @return {v2} 2D unit vector.
 */
v2.unit = function(u) {
   var len = Math.hypot(u.x,u.y), invlen = Math.abs(len) < v2.EPS ? 0 : 1/len; 
   return {x:u.x*invlen,y:u.y*invlen}; 
};
/**
 * Sum of two vectors.<br>
 * u + v
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {v2} 2D vector sum.
 */
v2.sum = function(u,v) { 
   return {x:u.x+v.x,y:u.y+v.y}; 
};
/**
 * Difference of two vectors.<br>
 * u - v
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {v2} 2D vector difference.
 */
v2.dif = function(u,v) {
   return {x:u.x-v.x,y:u.y-v.y}; 
};
/**
 * Scalar (dot) product of two vectors.<br>
 * u * v
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {number} scalar product.
 */
v2.dot = function(u,v) { 
   return u.x*v.x + u.y*v.y; 
};
/**
 * perp dot product of two 2D vectors (area product).
 * ~u * v<br>
 * Is equal to the value of the z-coordinate of the resulting
 * vector of the cross product of the corresponding 3D vectors.
 * @param {v2} u - 2D Vector
 * @param {v2} v - 2D Vector
 * @return {number}  perp dot product (~u*v).
 */
v2.perp = function(u,v) { 
   return u.x*v.y - u.y*v.x; 
};
/**
 * Scale a vector by multiplication.<br>
 * u*s
 * @param {v2} u 2D Vector
 * @param {number} s Scaling factor
 * @return {v2} 2D vector scaled.
 */
v2.scl = function(u,s) { 
   return {x:s*u.x,y:s*u.y};
};
/**
 * Rotate a vector by angle w [radians].<br>
 * @param {v2} u 2D Vector
 * @param {number} w Rotation angle in radians
 * @return {v2} 2D vector rotated.
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
 * @param {number} e x-translation [optional]
 * @param {number} f y-translation [optional]
 * @return {v2} 2D vector transformed.
 */
v2.trf = function(u,a,b,c,d,e,f) {
   return { x: a*u.x + c*u.y + (e||0),
            y: b*u.x + d*u.y + (f||0) }
};
/**
 * Inplace negate a vector.<br>
 * u = -u
 * @param {v2} u 2D Vector
 * @return {v2} vector u negated.
 */
v2.ineg = function(u) {
   u.x = -u.x;
   u.y = -u.y;
   return u;
};
/**
 * Inplace create orthogonal vector - rotated by 90 degrees counterclockwise.<br>
 * u = {x:-u.y,y:u.x}
 * @param {v2} u 2D Vector
 * @return {v2} orthogonal vector u.
 */
v2.itilde = function(u) {
   var t = u.x;
   u.x = -u.y;
   u.y =  t;
   return u;
};
/**
 * Inplace create unit vector of a vector.<br>
 * u = u / |u|
 * @param {v2} u 2D Vector
 * @return {v2} 2D unit vector.
 */
v2.iunit = function(u)  {
   var len = Math.hypot(u.x,u.y), invlen = Math.abs(len) < v2.EPS ? 0 : 1/len; 
   u.x *= invlen;
   u.y *= invlen;
   return u;
};
/**
 * Add vector v to u.<br>
 * u += v
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {v2} Result vector u.
 */
v2.isum = function(u,v) { 
   u.x += v.x;
   u.y += v.y;
   return u;
};
/**
 * Subtract vector v from u.<br>
 * u -= v
 * @param {v2} u 2D Vector
 * @param {v2} v 2D Vector
 * @return {v2} result vector u.
 */
v2.idif = function(u,v) {
   u.x -= v.x;
   u.y -= v.y;
   return u;
};
/**
 * Inplace scale a vector.<br>
 * u *= s
 * @param {v2} u 2D Vector
 * @param {number} s Scaling factor
 * @return {v2} vector u scaled.
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
 */
v2.itrf = function(u,a,b,c,d,e,f) {
   var x   = a*u.x + c*u.y + (e||0);
       u.y = b*u.x + d*u.y + (f||0);
       u.x = x;
   return u;
};

/**
 * String of vector. Format: "(x,y)".
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