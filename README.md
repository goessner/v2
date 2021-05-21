
[![npm](https://img.shields.io/npm/v/v2d.svg)](https://www.npmjs.com/package/v2d/)
[![npm](https://img.shields.io/npm/dt/v2d.svg)](https://www.npmjs.com/package/v2d)

# `v2` - A Minimalistic 2D Symplectic Vector Space JavaScript Class

A short overview about symplectic geometry in vector space $\R^2$ is given in this [Cheat Sheet](https://www.researchgate.net/publication/348869700_Symplectic_Geometry_in_R2_-_Cheat_Sheet_V10). If you want to learn more, [read this](). In a nutshell: 

> "The *standard inner (dot) product* together with an *orthogonal operator* is the *symplectic inner product*."

Symplectic geometry is a geometry of even dimensional spaces in   which area measurements, rather than length measurements, are the fundamental quantities. Benefits are:

* Symplectic geometry is coordinate free, i.e. coordinates aren't needed except weexplicitly want them.
* The definition of an explicit origin is not required.
* Transformation matrices are rarely need. Similarity transformation mostly does whatwe want. 

In its version 3.0 `v2` class library has undergone considerable changes. We now have `v2` objects as well as `v2` static functions. Latter work with arbitrary objects as long as these expose `x` and `y` members or `x` and `y` getters and setters.

* `v2` objects
    * Properties
    * operator methods
    * mutator methods
* `v2` static functions
    * analysis functions
    * operator functions
    * mutator functions

`v2` objects are of `v2.prototype`. They own two member values `x` and `y`. Polar coordinates &ndash; magnitude `r` and angle `w` &ndash; are accessible and modifyable via getters and setters. Given that they are exactly as lightweight as plain `{x,y}` objects with `Object.prototype`.

## `v2` objects

### Properties

| Property | Data&nbsp;Type | Access | Comment |
|:---:|:---:| --- |:---|
| `x` |`number`| member | x-coordinate |
| `y` |`number`| member | y-coordinate |
| `r` |`number`| getter | magnitude / length, polar-coordinate |
| `r` |`number`| setter | If value is positive, magnitude is set to that value and angle `w` is preserved. <br>If value is negative, magnitude is set to absolute value and angle `w` is corrected to opposite direction angle. |
| `w` |`number`| getter | get angle to pos. x-axis in [rad] in range [-pi ... pi] |
| `w` |`number`| setter | set angle to pos. x-axis in [rad] |
| `unit` |`v2`| getter | get unit direction vector. |
| `unit` |`v2`| setter | set direction vector to unit direction vector of `v`, while preserving its magnitude. |
| `isUnit` |`boolean`| getter | is this vector a unit vector. |
| `isZero` |`boolean`| getter | is this vector zero vector. |
| `clone` |`v2`| getter | get clone of this vector. |
| `sqr` |`number`| getter | get magnitude squared. |
| `tilde` |`v2`| getter | get orthogonal vector. |
| `neg` |`v2`| getter | get negative vector of this vector. |
| `inv` |`v2`| getter | get inverse vector of this vector. |
| `plain` |`{x,y}`| getter | get equivalent plain vector `{x,y}` of this vector. |

### Non-modifying Operator Methods

`v2` vector operations are non-modifying by nature. If result value is a vector, it's always a temporarily created new one.

Consider vector expression `(a+b-c)*s`, with `a,b,c` being vectors and `s` a scalar. An appropriate representation using operator functions reads

```js
a.add(b).sub(c).scl(s)
```
None of the used vectors `a,b,c` are modified. Instead three temporary vector objects are created by each method used. Think `(((a+b)-c)*s)`, where each parenthesis pair creates a temporary vector.

| Method | Result Type | Argument(s) | Comment |
|:---:|:---:|:---:|:---|
| `equals` |`boolean`| `v` | Compare vector for coordinate equality with `v` within numerical range of `Number.EPSILON`. |
| `add` |`v2`| `v` | Add vector `v` to this vector returning a temporary vector. |
| `sub` |`v2`| `v` | Subtract vector `v` from this vector returning a temporary vector. |
| `dot` |`number`| `v` | Dot (inner) product with argument vector `v`. |
| `symp` |`number`| `v` | Symplectic inner product with argument vector `v`. |
| `scl` |`v2`| `s` | Scale this vector by argument factor `s` returning a temporary vector. |
| `rot` |`v2`| `dw` | Rotate this vector by argument angle `dw` [rad] returning a temporary vector. |
| `simtrf` |`v2`| `(lam,mu)` | Similarity transform this vector by two scalar values `lam` and `mu` returning a temporary vector. |

### Modifying Mutator Methods

Whereas operator methods never modify the current vector, mutator methods (starting with letter `i` &ndash; read `inplace`) intentionally do exactly that. Consider vector expression `(a+b-c)s` again. When using mutator methods

```js
a.add(b).isub(c).iscl(s)
```

only the first operator method `add` creates a tempory vector object, which is then succeedingly reused and overwritten by mutator methods `isub` and `iscl` (read `'inplace subtract'` and `'inplace scale'`). So using mutator methods that way we can save memory and improve performance.

| Method | Result Type | Argument(s) | Comment |
|:---:|:---:|:---:|:---|
| `iadd` |`v2`| `v` | inplace add vector `v` to this vector. |
| `isub` |`v2`| `v` | inplace subtract vector `v` from this vector. |
| `ineg` |`v2`| &ndash; | inplace negate this vector. |
| `iinv` |`v2`| &ndash; | inplace invert this vector. |
| `itilde` |`v2`| &ndash; | inplace orthogonalize this vector. |
| `iscl` |`v2`| `s` | inplace scale this vector by scalar `s`. |
| `irot` |`v2`| `dw` | inplace rotate vector by difference angle `dw` in [rad]. |
| `isimtrf` |`v2`| `(lam,mu)` | inplace Similarity transform by two scalar values `lam` and `mu`.. |
| `freeze` |`v2`| &ndash; | make this vector immutable. |

Please note that methods not returning a vector don't need an accompanying `inplace` method.

## Static `v2` Functions

`v2` has three types of static vector functions:

* Aalysis functions (`isZero, isUnit, equals, len/r, angle/w, sqr`)
* Operator functions (`unit, tilde/perp, neg, sum/add, dif/sub, rot, scl, simtrf, dot, symp`)
* Mutator functions (`set, set_len/set_r, set_angle/set_w, set_unit, ineg, itilde/iperp, isum/iadd, idif/isub, irot, iscl, isimtrf, case1, case2, case3, case4, case5`)

*Analysis* and *Operator* functions never modify their vector arguments. They work on arbitrary objects as long as these expose readable `x` and `y` members or `x` and `y` getters. Here is an example:

```js
const cir = { x:100, y:200, r: 50 }, 
      pnt = { x: 30, y:150 },
      dist = v2.r(v2.dif(cir,pnt)) - cir.r;  // dist = 36.02325
```

In contrast *Mutator* functions intentionly modify their arguments. So they avoid creating temporary objects, which might be advantageous for memory saving and performance reasons. *Mutator* functions usually require argument objects with writeable `x` and `y` members or `x` and `y` getters and setters. Mutator functions accompanying operator functions ar distinguished by a prefixed letter `i`.

```js
const box = {
   x0:100, y0:200, b:100, h:60,
   // center point
   get x()  { return this.x0 + this.b/2; },
   set x(q) { this.x0 = q - this.b/2; },
   get y()  { return this.y0 + this.h/2; },
   set y(q) { this.y0 = q - this.h/2; }
}
v2.iadd(box,{x:50,y:75})    // box = { x0:150, y0:275, b:100, h:60 }
```

### Analysis Functions

| Function | Result&nbsp;Type | Argument(s) | Comment |
|:---:|:---:|:---:|:---|
| `v2.isZero` |`boolean`| `v` | Test for zero vector within range `Number.EPSILON`. |
| `v2.isUnit` |`boolean`| `v` | Test for unit vector within range `Number.EPSILON`. |
| `v2.equals` |`boolean`| `(a,b)` | Test two (plain) vectors for equality within range of `Number.EPSILON`. |
| `v2.r`<br>`v2.len` |`number`| `v` | get magnitude of vector `v`. |
| `v2.w`<br>`v2.angle` |`number`| `v` | get angle of (plain) vector `v` with respect to positive x-axis in [rad]. |
| `v2.sqr` |`number`| `v` | Get magnitude squared of (plain) vector `v`. |

### Operator Functions

Operator functions work on arbitrary objects as long as these expose `x`and `y` members or `x`and `y` getters. They do not modify their arguments.

| Function | Result&nbsp;Type | Argument(s) | Comment |
|:---:|:---:|:---:|:---|
| `v2.unit` |`{x,y}`| `v` | get unit vector of (plain) vector `v`. |
| `v2.clone` |`{x,y}`| `v` | Get clone of (plain) vector `v` |
| `v2.tilde`<br>`v2.perp` |`{x,y}`| `v` | Get orthogonal vector from (plain) vector `v`. |
| `v2.neg` |`{x,y}`| `v` | Get negative vector from (plain) vector `v`. |
| `v2.inv` |`{x,y}`| `v` | Get inverse vector from (plain) vector `v`. |
| `v2.dot` |`number`| `(a,b)` | Dot (inner) product of two (plain) vectors. |
| `v2.symp` |`number`| `(a,b)` | Symplectic inner product of two (plain) vectors. |
| `v2.sum`<br>`v2.add` |`{x,y}`| `(a,b)` | Sum of two (plain) vectors. |
| `v2.dif`<br>`v2.sub` |`{x,y}`| `(a,b)` | Difference of two (plain) vectors. |
| `v2.scl` |`{x,y}`| `(v,s)` | Get (plain) vector `v` scaled by `s`. |
| `v2.rot` |`{x,y}`| `(v,dw)` | Get (plain) vector `v` rotated by `dw` in [rad]. |
| `v2.simtrf` |`{x,y}`| `(v,lam,mu)` | Get similarity-transformed vector `v` by two scalar values `lam` and `mu`. |

### Mutator Functions

Mutator functions work on arbitrary objects as long as these expose `x` and `y` members or `x`and `y` getters and setters. They might modify their arguments.

Functions `case1, case2, case3, case4, case5` allow to easily solve the [five cases of the planar triangle equation](https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation).

| Function | Result&nbsp;Type | Argument(s) | Comment |
|:---:|:---:|:---:|:---|
| `v2.set` |`{x,y}`| `(a,b)` | Set vector `a` to coordinates of vector `b` returning `a`. |
| `v2.set_r`<br>`v2.set_len` |`{x,y}`| `(v,r)` | Change magnitude of (plain) vector `v` to `r`, while preserving its direction. Returns `v`. |
| `v2.set_w`<br>`v2.set_angle` |`{x,y}`| `(v,w)` | Change angle of (plain) vector `v` to `w` in [`rad`], while preserving its magnitude. Returns `v`. |
| `v2.set_unit` |`{x,y}`| `(a,b)` | Change unit vector of (plain) vector `a` to unit vector of (plain) vector `b`, while preserving its magnitude. Returns `a`. |
| `v2.itilde`<br>`v2.iperp` |`{x,y}`| `v` | Replace vector `v` by its orthogonal vector. |
| `v2.ineg` |`{x,y}`| `v` | Replace vector `v` by its negative vector. |
| `v2.iinv` |`{x,y}`| `v` | Replace vector `v` by its inverse vector . |
| `v2.isum`<br>`v2.iadd` |`{x,y}`| `(a,b)` | Add vector `b` to vector `a`. Returns modified `a`. |
| `v2.idif`<br>`v2.isub` |`{x,y}`| `(a,b)` | Subtract vector `b` from vector `a`. Returns modified `a`. |
| `v2.iscl` |`{x,y}`| `(v,s)` | Inplace scale vector `v` by `s`. |
| `v2.irot` |`{x,y}`| `(v,dw)` | Inplace rotate vector `v` by angle `dw` in [rad]. |
| `v2.isimtrf` |`{x,y}`| `(v,lam,mu)` | Inplace similarity-transform vector `v` by scalar factors `lam` and `mu`. |
| `v2.cstrLen` |`{x,y}`| `(a,b,ratio)` | Length constraint. Adjust magnitude of vector `a` by `ratio` with respect to vector `b`. |
| `v2.cstrAng` |`{x,y}`| `(a,b,ratio)` | Angular constraint. Adjust angle of vector `a` by `ratio` with respect to vector `b`. |
| `v2.case1` |&ndash;| `(a,b,c)` | First (trivial) case of the [planar vector triangle equation](https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation). Magnitude and direction of vector `a` is modified. |
| `v2.case2` |&ndash;| `(a,b,c,sgn)` | Second case of the [planar vector triangle equation](https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation). Magnitude of vector `a` and direction of vector `b` is modified with respect to sign `sgn` of requested solution. |
| `v2.case3` |&ndash;| `(a,b,c)` | Third case of the [planar vector triangle equation](https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation). Magnitude of vector `a` and magnitude of vector `b` is modified. |
| `v2.case4` |&ndash;| `(a,b,c,sgn)` | Fourth case of the [planar vector triangle equation](https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation). Direction of vector `a` and direction of vector `b` is modified with respect to sign `sgn` of requested solution. |
| `v2.case5` |&ndash;| `(a,b,c,sgn)` | Fifth case of the [planar vector triangle equation](https://www.researchgate.net/publication/330997539_The_Five_Cases_of_the_Planar_Vector_Equation). Direction and magnitude of vector `a` as well as direction of vector `b` (needs to be orthogonal to `a`) is modified with respect to sign `sgn` of requested solution. |

`v2` is minimal and well suited for graphics, physics 
and engineering applications. It is tiny. `v2` weights 15 kB uncompressed and 3 kb minified.

# Node Installation

`npm install v2d`

``` javascript
const v2 = require('v2d');
const u = v2(3,4);
```

# Browser

``` html
<script src="v2.js"></script>
<script>
   const u = v2(3,4);
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

## 1.3.8 - 2016-12-07

### Modified

*   `scl` and `iscl` function: default value [=1] of second parameter `factor` removed. Value `0` is allowed and supported now. 

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
