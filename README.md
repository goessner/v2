[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/goessner/g2/license.txt)
[![npm](https://img.shields.io/npm/v/v2d.svg?maxAge=2592000)](https://www.npmjs.com/package/v2d/)
[![npm](https://img.shields.io/npm/dt/v2d.svg?maxAge=2592000)](https://www.npmjs.com/package/v2d)

# v2 - A Minimalistic 2D Vector Class

v2 is not really a class, but merely a creator function generating plain javascript objects. So 
`v2(3,4)` creates the plain object `{x:3,y:4}`. Then v2 also serves as a `namespace` holding a 
minimal set of static vector functions.

Those functions expect objects like `{x:<number>,y:<number>}`. In fact they accept every
object at least providing an `x`- and `y`-member. An `x/y`-getter and - for some readonly 
functions not even necessary - `x/y`-setter is also sufficient.

With this convention v2 objects should perfectly harmonize with ECMAScript 7 [typed objects](https://github.com/hemanth/es7-features#typed-objects).

An alternative representation using arrays `[<number>,<number>]` shows comparable [performance](http://jsperf.com/object-vs-array)
results. Even if arrays perform slightly better, the code is already significantly less readable compared with objects, 
which was the primary reason for choosing the object representation here.

v2 differs three types of vector functions:

* analyse functions (`isZero, isEq, isEps, isUnit, sqr, len, angle`)
* operator functions (`unit, neg, tilde, sum, dif, rot, scl, trf, dot, perp, toPolar, fromPolar`)
* mutator functions (`iunit, ineg, itilde, isum, idif, irot, iscl, itrf, copy`)

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

# License

v2 is licensed under the terms of the MIT License. See LICENSE-MIT for details.

#Change Log

All notable changes to this project will be documented in this file. This project adheres to Semantic Versioning.

## 1.2.0 - 2016-05-14

### Added

    simtrf function for applying efficient similarity transformation @goessner.


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
  * [.len(u)](#v2.len) ⇒ <code>number</code>
  * [.sqr(u)](#v2.sqr) ⇒ <code>number</code>
  * [.angle(u, v)](#v2.angle) ⇒ <code>number</code>
  * [.copy(u, v)](#v2.copy) ⇒ <code>[v2](#v2)</code>
  * [.neg(u)](#v2.neg) ⇒ <code>[v2](#v2)</code>
  * [.tilde(u)](#v2.tilde) ⇒ <code>[v2](#v2)</code>
  * [.unit(u)](#v2.unit) ⇒ <code>[v2](#v2)</code>
  * [.toPolar(u)](#v2.toPolar) ⇒ <code>object</code>
  * [.fromPolar(u)](#v2.fromPolar) ⇒ <code>[v2](#v2)</code>
  * [.sum(u, v)](#v2.sum) ⇒ <code>[v2](#v2)</code>
  * [.dif(u, v)](#v2.dif) ⇒ <code>[v2](#v2)</code>
  * [.dot(u, v)](#v2.dot) ⇒ <code>number</code>
  * [.perp(u, v)](#v2.perp) ⇒ <code>number</code>
  * [.scl(u, s)](#v2.scl) ⇒ <code>[v2](#v2)</code>
  * [.rot(u, w)](#v2.rot) ⇒ <code>[v2](#v2)</code>
  * [.trf(u, a, b, c, d, e, f)](#v2.trf) ⇒ <code>[v2](#v2)</code>
  * [.simtrf(u, a, b)](#v2.simtrf) ⇒ <code>[v2](#v2)</code>
  * [.ineg(u)](#v2.ineg) ⇒ <code>[v2](#v2)</code>
  * [.itilde(u)](#v2.itilde) ⇒ <code>[v2](#v2)</code>
  * [.iunit(u)](#v2.iunit) ⇒ <code>[v2](#v2)</code>
  * [.isum(u, v)](#v2.isum) ⇒ <code>[v2](#v2)</code>
  * [.idif(u, v)](#v2.idif) ⇒ <code>[v2](#v2)</code>
  * [.iscl(u, s)](#v2.iscl) ⇒ <code>[v2](#v2)</code>
  * [.irot(w, u)](#v2.irot) ⇒ <code>[v2](#v2)</code>
  * [.itrf(u, a, b, c, d, e, f)](#v2.itrf) ⇒ <code>[v2](#v2)</code>
  * [.str(u, n)](#v2.str) ⇒ <code>string</code>

<a name="create_v2"></a>
### v2(x,y) ⇒ <code>object</code>
Create a plain 2D vector object {x:number,y:number} without using new.

<a name="v2.zero"></a>
### v2.zero
Null vector.

**Kind**: static property of <code>[v2](#v2)</code>  
<a name="v2.EPS"></a>
### v2.EPS
Epsilon to test null vectors and unit vectors against.<br>
Its value is set to `Math.sqrt(Number.EPSILON)`.

**Kind**: static property of <code>[v2](#v2)</code>  
<a name="v2.isZero"></a>
### v2.isZero(u) ⇒ <code>boolean</code>
Test for zero vector.<br>
<code>u === 0</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.isEq"></a>
### v2.isEq(u, v) ⇒ <code>boolan</code>
Equality of two vectors.
<code>u === v</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.isEps"></a>
### v2.isEps(u, v) ⇒ <code>boolean</code>
Test, if a vector -- or the difference of two vectors -- is smaller than <code>v2.EPS</code>.<br>
<code>|u - v| < v2.EPS</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | Vector to test. |
| v | <code>[v2](#v2)</code> &#124; <code>undefined</code> | Vector to build the difference with u [optional]. |

<a name="v2.isUnit"></a>
### v2.isUnit(u) ⇒ <code>boolean</code>
Test, if vector is a unit vector.<br>
<code>|u| == 1</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | Vector to test. |

<a name="v2.len"></a>
### v2.len(u) ⇒ <code>number</code>
Length / Euclidean Norm of vector.<br>
<code>len = sqrt(u.x^2 + u.x^2)</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.sqr"></a>
### v2.sqr(u) ⇒ <code>number</code>
Squared Length of vector.<br>
<code>u^2 = u.x^2 + u.x^2</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.angle"></a>
### v2.angle(u, v) ⇒ <code>number</code>
Angle from u to v or from positive x-axis
to u - if v is missing. [radians].<br>
<code>atan(~u*v)/(u*v)</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> &#124; <code>undefined</code> | 2D Vector [optional] |

<a name="v2.copy"></a>
### v2.copy(u, v) ⇒ <code>[v2](#v2)</code>
Assign vector u to v.<br>
<code>v = u</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D source vector |
| v | <code>[v2](#v2)</code> &#124; <code>undefined</code> | 2D destination vector [optional]. |

<a name="v2.neg"></a>
### v2.neg(u) ⇒ <code>[v2](#v2)</code>
Negative vector.<br>
<code>-u</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.tilde"></a>
### v2.tilde(u) ⇒ <code>[v2](#v2)</code>
Orthogonal vector - rotated by 90 degrees counterclockwise.<br>
<code>~u = {x:-u.y,y:u.x}</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.unit"></a>
### v2.unit(u) ⇒ <code>[v2](#v2)</code>
Unit vector of a vector.<br>
<code>u / |u|</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.toPolar"></a>
### v2.toPolar(u) ⇒ <code>object</code>
Convert cartesian vector to polar format.<br>
`{r:sqrt(u.x^2+u.y^2),w:atan2(u.y,u.x)}`

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | Cartesian 2D Vector |

<a name="v2.fromPolar"></a>
### v2.fromPolar(u) ⇒ <code>[v2](#v2)</code>
Convert polar vector `{r,w}` to cartesian vector.<br>
`{x:u.r*cos(u.w),y:u.r*sin(u.w)}`

| Param | Type | Description |
| --- | --- | --- |
| u | <code>object</code> | Vector in polar format {r,w}. |


<a name="v2.sum"></a>
### v2.sum(u, v) ⇒ <code>[v2](#v2)</code>
Sum of two vectors.<br>
<code>u + v</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.dif"></a>
### v2.dif(u, v) ⇒ <code>[v2](#v2)</code>
Difference of two vectors.<br>
<code>u - v</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.dot"></a>
### v2.dot(u, v) ⇒ <code>number</code>
Scalar (dot) product of two vectors.<br>
<code>u * v</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.perp"></a>
### v2.perp(u, v) ⇒ <code>number</code>
perp dot product of two 2D vectors (area product).
<code>~u * v</code><br>
Is equal to the value of the z-coordinate of the resulting
vector of the cross product of the corresponding 3D vectors.

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.scl"></a>
### v2.scl(u, s) ⇒ <code>[v2](#v2)</code>
Scale a vector by multiplication.<br>
<code>u*s</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| s | <code>number</code> | Scaling factor |

<a name="v2.rot"></a>
### v2.rot(u, w) ⇒ <code>[v2](#v2)</code>
Rotate a vector by angle w [radians].<br>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| w | <code>number</code> | Rotation angle in radians |

<a name="v2.trf"></a>
### v2.trf(u, a, b, c, d, e, f) ⇒ <code>[v2](#v2)</code>
Transform a vector by 2x3 matrix (SVG). <br>
<code>[a c e] [x] = [x']</code><br>
<code>[b d f] [y] = [y']</code><br>
<code>[0 0 1] [1] = [1]</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| a | <code>number</code> | m11 |
| b | <code>number</code> | m21 |
| c | <code>number</code> | m12 |
| d | <code>number</code> | m22 |
| e | <code>number</code> | x-translation [optional] |
| f | <code>number</code> | y-translation [optional] |

<a name="v2.simtrf"></a>
### v2.simtrf(u, a, b) ⇒ <code>[v2](#v2)</code>
Apply similarity transformation to a vector. <br>
a*u + b*~u

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| a | <code>number</code> | Scale u by a. |
| b | <code>number</code> | Scale ~u by b. |

<a name="v2.ineg"></a>
### v2.ineg(u) ⇒ <code>[v2](#v2)</code>
Inplace negate a vector.<br>
<code>u = -u</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.itilde"></a>
### v2.itilde(u) ⇒ <code>[v2](#v2)</code>
Inplace create orthogonal vector - rotated by 90 degrees counterclockwise.<br>
<code>u = {x:-u.y,y:u.x}</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.iunit"></a>
### v2.iunit(u) ⇒ <code>[v2](#v2)</code>
Inplace create unit vector of a vector.<br>
<code>u = u / |u|</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.isum"></a>
### v2.isum(u, v) ⇒ <code>[v2](#v2)</code>
Add vector v to u.<br>
<code>u += v</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.idif"></a>
### v2.idif(u, v) ⇒ <code>[v2](#v2)</code>
Subtract vector v from u.<br>
<code>u -= v</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| v | <code>[v2](#v2)</code> | 2D Vector |

<a name="v2.iscl"></a>
### v2.iscl(u, s) ⇒ <code>[v2](#v2)</code>
Inplace scale a vector.<br>
<code>u *= s</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| s | <code>number</code> | Scaling factor |

<a name="v2.irot"></a>
### v2.irot(u, w) ⇒ <code>[v2](#v2)</code>
Inplace rotate a vector by angle w [radians].<br>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| w | <code>number</code> | Rotation angle in radians. |

<a name="v2.itrf"></a>
### v2.itrf(u, a, b, c, d, e, f) ⇒ <code>[v2](#v2)</code>
Inplace transform a vector by 2x3 matrix (SVG). <br>
<code>[a c e] [x] = [x']</code><br>
<code>[b d f] [y] = [y']</code><br>
<code>[0 0 1] [1] = [1]</code>

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| a | <code>number</code> | m11 |
| b | <code>number</code> | m21 |
| c | <code>number</code> | m12 |
| d | <code>number</code> | m22 |
| e | <code>number</code> | x-translation [optional] |
| f | <code>number</code> | y-translation [optional] |

<a name="v2.str"></a>
### v2.str(u, n) ⇒ <code>string</code>
String of vector. Format: "(x,y)".

| Param | Type | Description |
| --- | --- | --- |
| u | <code>[v2](#v2)</code> | 2D Vector |
| n | <code>int</code> | decimal places. [optional] |
