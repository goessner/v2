[![view on npm](http://img.shields.io/npm/v/file-set.svg)](https://www.npmjs.org/package/file-set)
[![npm module downloads](http://img.shields.io/npm/dt/file-set.svg)](https://www.npmjs.org/package/file-set)
[![Build Status](https://travis-ci.org/75lb/file-set.svg?branch=master)](https://travis-ci.org/75lb/file-set)
[![Dependency Status](https://badgen.net/david/dep/75lb/file-set)](https://david-dm.org/75lb/file-set)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# file-set

Breaks an input list of file paths and glob expressions into three categories: files, directories and not existing.

**Example**  
```js
const FileSet = require('file-set')
```


## Install

```sh
$ npm install file-set
```

## Usage

```js
> const FileSet = require('file-set');

> new FileSet([ '*', 'not/existing/*' ])
FileSet {
  files: [ 'LICENSE', 'package.json', 'README.md' ],
  dirs: [ 'jsdoc2md/', 'lib/', 'node_modules/', 'test/' ],
  notExisting: [ 'not/existing/*' ] }
```

# API

Breaks an input list of file paths and glob expressions into three categories: files, directories and not existing.

**Example**  
```js
const FileSet = require('file-set')
```

* [file-set](#module_file-set)
    * [FileSet](#exp_module_file-set--FileSet) ⏏
        * [new FileSet(patternList)](#new_module_file-set--FileSet_new)
        * [.files](#module_file-set--FileSet+files) : <code>Array.&lt;string&gt;</code>
        * [.dirs](#module_file-set--FileSet+dirs) : <code>Array.&lt;string&gt;</code>
        * [.notExisting](#module_file-set--FileSet+notExisting) : <code>Array.&lt;string&gt;</code>
        * [.add(files)](#module_file-set--FileSet+add)

<a name="exp_module_file-set--FileSet"></a>

### FileSet ⏏
**Kind**: Exported class  
<a name="new_module_file-set--FileSet_new"></a>

#### new FileSet(patternList)

| Param | Type | Description |
| --- | --- | --- |
| patternList | <code>string</code> \| <code>Array.&lt;string&gt;</code> | One or more file paths or glob expressions to inspect. |

<a name="module_file-set--FileSet+files"></a>

#### fileSet.files : <code>Array.&lt;string&gt;</code>
The existing files found

**Kind**: instance property of [<code>FileSet</code>](#exp_module_file-set--FileSet)  
<a name="module_file-set--FileSet+dirs"></a>

#### fileSet.dirs : <code>Array.&lt;string&gt;</code>
The existing directories found

**Kind**: instance property of [<code>FileSet</code>](#exp_module_file-set--FileSet)  
<a name="module_file-set--FileSet+notExisting"></a>

#### fileSet.notExisting : <code>Array.&lt;string&gt;</code>
Paths which were not found

**Kind**: instance property of [<code>FileSet</code>](#exp_module_file-set--FileSet)  
<a name="module_file-set--FileSet+add"></a>

#### fileSet.add(files)
Add file patterns to the set.

**Kind**: instance method of [<code>FileSet</code>](#exp_module_file-set--FileSet)  

| Param | Type | Description |
| --- | --- | --- |
| files | <code>string</code> \| <code>Array.&lt;string&gt;</code> | One or more file paths or glob expressions to inspect. |


* * *

&copy; 2014-19 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
