[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/goessner/g2/license.txt)
[![npm](https://img.shields.io/npm/v/v2d.svg)](https://www.npmjs.com/package/v2d/)
[![npm](https://img.shields.io/npm/dt/v2d.svg)](https://www.npmjs.com/package/v2d)
[![no dependencies](https://img.shields.io/gemnasium/mathiasbynens/he.svg)](https://github.com/goessner/v2)

# v2 - A Minimalistic 2D Vector Class

v2 is not really a class, but merely a creator function generating plain javascript objects. So 
`v2(3,4)` creates the plain object `{x:3,y:4}`. Then v2 also serves as a `namespace` holding a 
minimal set of static vector functions.

Those functions expect objects like `{x:<number>,y:<number>}`. In fact they accept every
object at least providing an `x`- and `y`-member. An `x/y`-getter and - for some readonly 
functions not even necessary - `x/y`-setter is also sufficient.

With this convention v2 should perfectly harmonize with custom objects as well as possible ECMAScript 7 [typed objects](https://github.com/hemanth/es7-features#typed-objects).

An alternative representation using arrays `[<number>,<number>]` shows comparable [performance](http://jsperf.com/object-vs-array)
results. Even if arrays perform slightly better, the code is already significantly less readable compared with objects, 
which was the primary reason for choosing the object representation here.

v2 differs three types of vector functions:

* analyse functions (`isZero, isEq, isEps, isUnit, isPolar, isCartesian, sqr, len, angle`)
* operator functions (`unit, neg, tilde, sum, dif, rot, scl, trf, simtrf, dot, perp, polar, cartesian`)
* mutator functions (`iunit, ineg, itilde, isum, idif, irot, iscl, itrf, copy, ipolar, icartesian`)

Whereas *operator functions* never modify their vector arguments, *mutator functions* intentionly do 
exactly that for memory saving and performance reasons. So consider the vector expression
s(**a**+**b**-**c**), given three vectors **a**, **b**, **c** and scalar *s*. An appropriate *v2* representation
using *operator functions* reads

```javascript
   v2.scl(v2.sum(a,v2.dif(b,c)),s)
```
None of the used vectors **a**, **b**, **c** are modified. Instead three temporary 
vector objects are created. But when using *mutator functions* as an alternative

```javascript
   v2.iscl(v2.isum(a,v2.idif(b,c)),s)
```
no temporary vector objects are created, which can significantly save memory and performs 
much better. Instead vectors **a** and **b** loose their original values
holding intermediate values then. You may read those applied functions as *inplace scale*, *inplace sum* and 
*inplace difference*.

v2 is minimal, can perfectly deal with custom objects and is well suited for graphics, physics 
and engineering applications. It is tiny. v2 weights 8 kB uncompressed and 2 kb minified.


# Vector-2D Math Resources

[Vector-2D Math Resources](https://github.com/goessner/vector2d-math)

# Node Installation

`npm install v2d`

``` javascript
var v2 = require('v2d');
var u = v2(3,4);
```

# Browser

``` html
<script src="v2.js"></script>
<script>
   var u = v2(3,4);
</script>
```
# Test

`npm run test`

## GitCDN
Use the link [https://gitcdn.xyz/repo/goessner/v2/master/v2.min.js](https://gitcdn.xyz/repo/goessner/v2/master/v2.min.js)
for getting the latest commit as a raw file.

In HTML use ...
```html
<script src="https://gitcdn.xyz/repo/goessner/v2/master/v2.min.js"></script>
```

# License

v2 is licensed under the terms of the MIT License. See LICENSE-MIT for details.

#Change Log

All notable changes to this project will be documented in this file. This project adheres to Semantic Versioning.

## 1.3.1 - 2016-07-05

### Added

*   `isimtrf` function for applying inplace similarity transform.
*   Examples to API docs added.

## 1.3.0 - 2016-07-04

### Added

*   `polar` function for converting to polar coordinates.
*   `cartesian` function for converting from polar to cartesian coordinates.
*   `ipolar` function for inplace converting to polar coordinates.
*   `icartesian` function for inplace converting from polar to cartesian coordinates.

### Modified

*   `toPolar` previous converting function marked as obsolete. Use `polar` instead.
*   `fromPolar` previous converting function marked as obsolete. Use `cartesian` instead.

## 1.2.0 - 2016-05-14

### Added

    `simtrf` function for applying efficient similarity transformation @goessner.


## 1.1.0 - 2016-01-08

### Added

    toPolar function @goessner.
    fromPolar function @goessner.
    CHANGELOG.md @goessner.


# API
<a name="v2"></a>

**Kind**: global class  

  * [v2()](#create_v2)
  * [.zero](#v2.zero)
  * [.EPS](#v2.EPS)
  * [.isZero(u)](#v2.isZero) ⇒ <code>boolean</code>
  * [.isEq(u, v)](#v2.isEq) ⇒ <code>boolan</code>
  * [.isEps(u, v)](#v2.isEps) ⇒ <code>boolean</code>
  * [.isUnit(u)](#v2.isUnit) ⇒ <code>boolean</code>
  * [.isCartesian(u)](#v2.isCartesian) ⇒ <code>boolean</code>
  * [.isPolar(u)](#v2.isPolar) ⇒ <code>boolean</code>
  * [.len(u)](#v2.len) ⇒ <code>number</code>
  * [.sqr(u)](#v2.sqr) ⇒ <code>number</code>
  * [.angle(u, v)](#v2.angle) ⇒ <code>number</code>
  * [.copy(u, v)](#v2.copy) ⇒ <code>[v2](#v2)</code>
  * [.neg(u)](#v2.neg) ⇒ <code>[v2](#v2)</code>
  * [.tilde(u)](#v2.tilde) ⇒ <code>[v2](#v2)</code>
  * [.unit(u)](#v2.unit) ⇒ <code>[v2](#v2)</code>
  * [.cartesian(u)](#v2.cartesian) ⇒ <code>object</code>
  * [.polar(u)](#v2.polar) ⇒ <code>object</code>
  * [.toPolar(u)](#v2.toPolar) ⇒ <code>object</code>
  * [.fromPolar(2D)](#v2.fromPolar) ⇒ <code>[v2](#v2)</code>
  * [.sum(u, v)](#v2.sum) ⇒ <code>[v2](#v2)</code>
  * [.dif(u, v)](#v2.dif) ⇒ <code>[v2](#v2)</code>
  * [.dot(u, v)](#v2.dot) ⇒ <code>number</code>
  * [.perp(u, v)](#v2.perp) ⇒ <code>number</code>
  * [.scl(u, [s])](#v2.scl) ⇒ <code>[v2](#v2)</code>
  * [.rot(u, w)](#v2.rot) ⇒ <code>[v2](#v2)</code>
  * [.trf(u, a, b, c, d, [e], [f])](#v2.trf) ⇒ <code>[v2](#v2)</code>
  * [.simtrf(u, a, b)](#v2.simtrf) ⇒ <code>[v2](#v2)</code>
  * [.icartesian(u)](#v2.icartesian) ⇒ <code>object</code>
  * [.ipolar(u)](#v2.ipolar) ⇒ <code>object</code>
  * [.ineg(u)](#v2.ineg) ⇒ <code>[v2](#v2)</code>
  * [.itilde(u)](#v2.itilde) ⇒ <code>[v2](#v2)</code>
  * [.iunit(u)](#v2.iunit) ⇒ <code>[v2](#v2)</code>
  * [.isum(u, v)](#v2.isum) ⇒ <code>[v2](#v2)</code>
  * [.idif(u, v)](#v2.idif) ⇒ <code>[v2](#v2)</code>
  * [.iscl(u, s)](#v2.iscl) ⇒ <code>[v2](#v2)</code>
  * [.irot(w, u)](#v2.irot) ⇒ <code>[v2](#v2)</code>
  * [.itrf(u, a, b, c, d, e, f)](#v2.itrf) ⇒ <code>[v2](#v2)</code>
  * [.isimtrf(u, a, b)](#v2.isimtrf) ⇒ <code>[v2](#v2)</code>
  * [.str(u, n)](#v2.str) ⇒ <code>string</code>

<a name="create_v2"></a>
### v2(x,y) ⇒ <code>object</code>
Create a plain 2D vector object {x:number,y:number} without using new.

**Example**  
```js
var u1 = v2(3,4),      // create vector as an alternative ...
    u2 = {x:-3,y:-4};  // ... to simple object notation.
```

<a name="v2.zero"></a>
### v2.zero
Null vector.

**Kind**: static property of <code>[v2](#v2)</code>  
<a name="v2.EPS"></a>
### v2.EPS
Epsilon (`1.49e-8`) to test null vectors and unit vectors against.

**Kind**: static property of <code>[v2](#v2)</code>  
<a name="v2.isZero"></a>
### v2.isZero(u) ⇒ <code>boolean</code>
Test for zero vector.<br>
`u === 0`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>boolean</code> - is zero vector.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = v2(3,4), u2 = {x:-3,y:-4};
v2.isZero(v2.add(u1,u2);   // true
v2.isZero(v2.sub(u1,u2);   // false
```
<a name="v2.isEq"></a>
### v2.isEq(u, v) ⇒ <code>boolan</code>
Equality of two vectors.
`u === v`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>boolan</code> - equality.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = v2(3,4), u2 = v2(1,2), u3 = {x:3,y:4};
v2.isEq(u1,u2);       // false
v2.isEq(u1,u3);       // true
```
<a name="v2.isEps"></a>
### v2.isEps(u, v) ⇒ <code>boolean</code>
Test, if a vector -- or the difference of two vectors -- is smaller than `v2.EPS`.<br>
`|u - v| < v2.EPS`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>boolean</code> - nearly equal or zero.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | Vector to test. |
| v | <code>[v2](#v2)</code> &#124; <code>undefined</code> | Vector to build the difference with u [optional]. |

**Example**  
```js
var u1 = v2(1e-10,2e-9), u2 = {x:3e-9,y:-4e-11};
v2.isEps(u1);         // true
v2.isEps(u1,u2);      // true, with difference
                      // {x:-2.9e-9, y:2.04e-9} 
```
<a name="v2.isUnit"></a>
### v2.isUnit(u) ⇒ <code>boolean</code>
Test, if vector is a unit vector.<br>
`|u| === 1`

**Kind**: static method of <code>[v2](#v2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | Vector to test. |

**Example**  
```js
var u1 = {x:3/5,y:4/5}, u2 = v2(3,-4);
v2.isUnit(u1);        // true
v2.isUnit(u2);        // false
```
<a name="v2.isCartesian"></a>
### v2.isCartesian(u) ⇒ <code>boolean</code>
Test, if vector has cartesian coordinates `{x,y}`.

**Kind**: static method of <code>[v2](#v2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | Vector to test. |

**Example**  
```js
var u1 = v2(3,4), u2 = {r:5,w:0.9273}, 
    u3 = {r:5,w:0.9273,x:3,y:4};
v2.isCartesian(u1);   // true
v2.isCartesian(u2);   // false
v2.isCartesian(u3);   // true
```
<a name="v2.isPolar"></a>
### v2.isPolar(u) ⇒ <code>boolean</code>
Test, if vector has polar coordinates `{r,w}`.

**Kind**: static method of <code>[v2](#v2)</code>  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | Vector to test. |

**Example**  
```js
var u1 = v2(3,4), u2 = {r:5,w:0.9273}, 
    u3 = {r:5,w:0.9273,x:3,y:4};
v2.isPolar(u1);   // false
v2.isPolar(u2);   // true
v2.isPolar(u3);   // true
```
<a name="v2.len"></a>
### v2.len(u) ⇒ <code>number</code>
Length / Euclidean Norm of vector.<br>
`len = sqrt(u.x^2 + u.x^2)`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>number</code> - length of vector.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u = {x:3,y:4};
v2.len(u);   // 5
```
<a name="v2.sqr"></a>
### v2.sqr(u) ⇒ <code>number</code>
Squared Length of vector.<br>
`u*u = u.x^2 + u.x^2`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>number</code> - squared length of vector.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u = v2(3,4);
v2.sqr(u);   // 25
```
<a name="v2.angle"></a>
### v2.angle(u, v) ⇒ <code>number</code>
Angle from u to v or from positive x-axis
to `u` - if `v` is missing. [radians].<br>
`atan(~u*v)/(u*v)`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>number</code> - angle from `u` to `v` or from positive x-axis  
                 to `u`.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> &#124; <code>undefined</code> | 2D Vector [optional] |

**Example**  
```js
var u1 = v2(3,4), u2 = v2(-4,3);
v2.angle(u1);     // 0.9273
v2.angle(u1,u2);  // 1.5708 (pi/2)
```
<a name="v2.copy"></a>
### v2.copy(u, v) ⇒ <code>[v2](#v2)</code>
Assign vector u to v.<br>
`v = u`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - destination vector o.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D source vector |
| v | <code>[v2](#v2)</code> &#124; <code>undefined</code> | 2D destination vector [optional]. |

**Example**  
```js
var u1 = v2(3,4), u2 = {x:2,y:1}, u3;
v2.copy(u1,u2);    // u2 = {x:3,y:4}
u3 = v2.copy(u1);  // u3 = {x:3,y:4}
```
<a name="v2.neg"></a>
### v2.neg(u) ⇒ <code>[v2](#v2)</code>
Negative vector.<br>
`-u`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector negated.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
v2.neg({x:2,y:1});  // {x:-2,y:-1}
```
<a name="v2.tilde"></a>
### v2.tilde(u) ⇒ <code>[v2](#v2)</code>
Orthogonal vector - rotated by 90 degrees counterclockwise. Also called *perp operator*.<br>
`~u = {x:-u.y,y:u.x}`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D orthogonal vector.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
v2.tilde({x:3,y:4});  // {x:-4,y:3}
```
<a name="v2.unit"></a>
### v2.unit(u) ⇒ <code>[v2](#v2)</code>
Unit vector of a vector.<br>
`u / |u|`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D unit vector.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
v2.unit({x:3,y:4});  // {x:0.6,y:0.8}
```
<a name="v2.cartesian"></a>
### v2.cartesian(u) ⇒ <code>object</code>
Cartesian vector from polar vector.<br>
If argument is already cartesian it is simply returned.<br>
`{x:u.r*cos(u.w),y:u.r*sin(u.w)}`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>object</code> - 2D vector in cartesian format {x,y}.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {r:5,w:0.9273}, u2 = {x:3,y:4}; 
v2.cartesian(u1);       // {x:3,y:4};
v2.cartesian(u2);       // {x:3,y:4};
```
<a name="v2.polar"></a>
### v2.polar(u) ⇒ <code>object</code>
Polar vector from a cartesian vector.<br>
If argument is already polar it is simply returned.<br>
`{r:sqrt(u.x^2+u.y^2),w:atan2(u.y,u.x)}`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>object</code> - 2D vector in polar format {r,w}.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {r:5,w:0.9273}, u2 = {x:3,y:4}; 
v2.polar(u1);       // {r:5,w:0.9273};
v2.polar(u2);       // {r:5,w:0.9273};
```
<a name="v2.toPolar"></a>
### v2.toPolar(u) ⇒ <code>object</code>
Convert cartesian vector to polar vector.<br>
*Obsolete*: use `v2.polar` instead.

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>object</code> - 2D vector in polar format {r,w}.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.fromPolar"></a>
### v2.fromPolar(u) ⇒ <code>[v2](#v2)</code>
Convert polar vector {r,w} to cartesian vector.<br>
*Obsolete*: use `v2.cartesian` instead.<br>
`{x:u.r*cos(u.w),y:u.r*sin(u.w)}`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - Cartesian 2D Vector  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>object</code> | 2D vector in polar format {r,w}. |

<a name="v2.sum"></a>
### v2.sum(u, v) ⇒ <code>[v2](#v2)</code>
Sum of two vectors.<br>
`u + v`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector sum.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {x:3,y:4}, u2 = {x:1,y:2}; 
v2.sum(u1,u2);      // {x:4,y:6};
```
<a name="v2.dif"></a>
### v2.dif(u, v) ⇒ <code>[v2](#v2)</code>
Difference of two vectors.<br>
`u - v`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector difference.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {x:3,y:4}, u2 = {x:1,y:2}; 
v2.dif(u1,u2);      // {x:2,y:2};
```
<a name="v2.dot"></a>
### v2.dot(u, v) ⇒ <code>number</code>
Scalar (dot) product of two vectors (*inner product*).<br>
`u * v = u.x*v.x + u.y*v.y`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>number</code> - scalar product.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {x:3,y:4}, u2 = {x:1,y:2}, u3 = {x:-4,y:3}; 
v2.dot(u1,u2);      // 11;
v2.dot(u1,u3);      // 0;
v2.dot(u2,u3);      // 2;
```
<a name="v2.perp"></a>
### v2.perp(u, v) ⇒ <code>number</code>
perp dot product of two 2D vectors (*outer product* or *area product*).<br>
`~u * v = u.x*v.y - u.y*v.x`<br>
Same as : `v2.dot(v2.tilde(u),v)`<br>
Result is equal to the value of the z-coordinate of the
vector from the cross product of the corresponding 3D vectors.

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>number</code> - perp dot product (`~u*v`).  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {x:3,y:4}, u2 = {x:6,y:8}, u3 = {x:1,y:2}; 
v2.perp(u1,u2);      // 0;
v2.perp(u1,u3);      // 2;
v2.perp(u2,u3);      // 4;
```
<a name="v2.scl"></a>
### v2.scl(u, [s]) ⇒ <code>[v2](#v2)</code>
Scale a vector by multiplication.<br>
`u*s`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector scaled.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| u | <code>[v2](#v2)</code> |  | 2D Vector |
| [s] | <code>number</code> | <code>1</code> | Scaling factor |

**Example**  
```js
v2.scl({x:3,y:4},2);      // {x:6,y:8};
v2.scl({x:3,y:4},-1);     // {x:-3,y:-4};
```
<a name="v2.rot"></a>
### v2.rot(u, [w]) ⇒ <code>[v2](#v2)</code>
Rotate a vector by angle w [radians].<br>

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector rotated.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| u | <code>[v2](#v2)</code> |  | 2D Vector |
| [w] | <code>number</code> | <code>0</code> | Rotation angle in radians |

**Example**  
```js
v2.rot({x:3,y:4},-Math.PI/2);   // {x:4,y:-3};
```
<a name="v2.trf"></a>
### v2.trf(u, a, b, c, d, [e], [f]) ⇒ <code>[v2](#v2)</code>
Transform a vector by 2x3 matrix (SVG). <br>
<code>[a c e] [x] = [x']</code><br>
<code>[b d f] [y] = [y']</code><br>
<code>[0 0 1] [1] = [1]</code>

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector transformed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| u | <code>[v2](#v2)</code> |  | 2D Vector |
| a | <code>number</code> |  | m11 |
| b | <code>number</code> |  | m21 |
| c | <code>number</code> |  | m12 |
| d | <code>number</code> |  | m22 |
| [e] | <code>number</code> | <code>0</code> | x-translation |
| [f] | <code>number</code> | <code>0</code> | y-translation |

**Example**  
```js
v2.trf({x:3,y:4},2,0,0,1,4,5);   // {x:10,y:9};
```
<a name="v2.simtrf"></a>
### v2.simtrf(u, [a], [b]) ⇒ <code>[v2](#v2)</code>
Apply similarity transformation to a vector. <br>
`a*u + b*~u`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector transformed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| u | <code>[v2](#v2)</code> |  | 2D Vector |
| [a] | <code>number</code> | <code>1</code> | Scale u by a. |
| [b] | <code>number</code> | <code>0</code> | Scale ~u by b. |

**Example**  
```js
v2.simtrf({x:3,y:4},2,1);   // {x:2,y:11};
```
<a name="v2.icartesian"></a>
### v2.icartesian(u) ⇒ <code>object</code>
Inplace convert polar vector to cartesian vector.<br>
`{x:u.r*cos(u.w),y:u.r*sin(u.w)}`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>object</code> - Vector `u` in cartesian format {x,y}.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {r:5,w:0.9273}, u2 = {x:3,y:4}; 
v2.icartesian(u1);       // u1 = {x:3,y:4};
v2.icartesian(u2);       // u2 = {x:3,y:4};
```
<a name="v2.ipolar"></a>
### v2.ipolar(u) ⇒ <code>object</code>
Inplace convert cartesian vector to polar vector.<br>
`{r:sqrt(u.x^2+u.y^2),w:atan2(u.y,u.x)}`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>object</code> - Vector `u`  in polar format {r,w}.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {r:5,w:0.9273}, u2 = {x:3,y:4}; 
v2.ipolar(u1);       // u1 = {r:5,w:0.9273};
v2.ipolar(u2);       // u2 = {r:5,w:0.9273};
```
<a name="v2.ineg"></a>
### v2.ineg(u) ⇒ <code>[v2](#v2)</code>
Inplace negate a vector.<br>
`u = -u`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - vector u negated.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
let u = {x:2,y:1};
v2.ineg(u);  // u = {x:-2,y:-1}
```
<a name="v2.itilde"></a>
### v2.itilde(u) ⇒ <code>[v2](#v2)</code>
Inplace create orthogonal vector - rotated by 90 degrees counterclockwise.<br>
`u = {x:-u.y,y:u.x}`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - orthogonal vector u.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
let u = {x:3,y:4};
v2.tilde(u);  // u = {x:-4,y:3}
```
<a name="v2.iunit"></a>
### v2.iunit(u) ⇒ <code>[v2](#v2)</code>
Inplace create unit vector of a vector.<br>
`u = u / |u|`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D unit vector.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
let u = {x:3,y:4};
v2.unit(u);  // u = {x:0.6,y:0.8}
```
<a name="v2.isum"></a>
### v2.isum(u, v) ⇒ <code>[v2](#v2)</code>
Add vector v to u (inplace sum).<br>
`u += v`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - Result vector u.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {x:3,y:4}, u2 = {x:1,y:2}; 
v2.isum(u1,u2);      // u1 = {x:4,y:6};
```
<a name="v2.idif"></a>
### v2.idif(u, v) ⇒ <code>[v2](#v2)</code>
Subtract vector v from u (inplace difference).<br>
`u -= v`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - result vector u.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

**Example**  
```js
var u1 = {x:3,y:4}, u2 = {x:1,y:2}; 
v2.idif(u1,u2);      // u1 = {x:2,y:2};
```
<a name="v2.iscl"></a>
### v2.iscl(u, [s]) ⇒ <code>[v2](#v2)</code>
Inplace scale a vector.<br>
`u *= s`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - vector u scaled.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| u | <code>[v2](#v2)</code> |  | 2D Vector |
| [s] | <code>number</code> | <code>1</code> | Scaling factor |

**Example**  
```js
let u = {x:3,y:4};
v2.scl(u,2);      // u = {x:6,y:8};
```
<a name="v2.irot"></a>
### v2.irot(u, [w]) ⇒ <code>[v2](#v2)</code>
Inplace rotate a vector by angle w [radians].<br>

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - vector u rotated.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| u | <code>[v2](#v2)</code> |  | 2D Vector |
| [w] | <code>number</code> | <code>0</code> | Rotation angle in radians. |

**Example**  
```js
let u = {x:3,y:4};
v2.rot(u,-Math.PI/2);   // u = {x:4,y:-3};
```
<a name="v2.itrf"></a>
### v2.itrf(u, a, b, c, d, e, f) ⇒ <code>[v2](#v2)</code>
Inplace transform a vector by 2x3 matrix (SVG). <br>
<code>[a c e] [x] = [x']</code><br>
<code>[b d f] [y] = [y']</code><br>
<code>[0 0 1] [1] = [1]</code>

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector transformed.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| a | <code>number</code> | m11 |
| b | <code>number</code> | m21 |
| c | <code>number</code> | m12 |
| d | <code>number</code> | m22 |
| e | <code>number</code> | x-translation [optional] |
| f | <code>number</code> | y-translation [optional] |

**Example**  
```js
let u = {x:3,y:4};
v2.trf(u,2,0,0,1,4,5);   // u = {x:10,y:9};
```
<a name="v2.isimtrf"></a>
### v2.isimtrf(u, a, b) ⇒ <code>[v2](#v2)</code>
Apply inplace similarity transformation to a vector. <br>
`u = a*u + b*~u`

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>[v2](#v2)</code> - 2D vector transformed.  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| a | <code>number</code> | Scale u by a. |
| b | <code>number</code> | Scale ~u by b. |

**Example**  
```js
let u = {x:3,y:4};
v2.simtrf(u,2,1);   // u = {x:2,y:11};
```
<a name="v2.str"></a>
### v2.str(u, [n]) ⇒ <code>string</code>
String of vector. Format: `(x,y)`.

**Kind**: static method of <code>[v2](#v2)</code>  
**Returns**: <code>string</code> - .  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| u | <code>[v2](#v2)</code> |  | 2D Vector |
| [n] | <code>[v2](#v2)</code> | <code>3</code> | decimal places. [optional] |

**Example**  
```js
let u1 = {x:3,y:4}, u2 = {x:1.23456,y:78.90123};
v2.str(u1);     // "(3,4)";
v2.str(u2,3);   // "(1.235,78.901)";
v2.str(u2,0);   // "(1,79)";
v2.str(u2);     // "(1.23456,78.90123)";
```
