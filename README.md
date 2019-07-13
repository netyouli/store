# stroe
这是带有过期时间的h5数据存储组件支持sessionStorage，localStorage

### 该存储组件可以用方便数据读取

[ ![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/netyouli/store/pulls)
[ ![NPM version](http://img.shields.io/npm/v/react-whc-notification.svg?style=flat)](https://www.npmjs.com/package/store)
[![License MIT](http://img.shields.io/badge/license-MIT-orange.svg?style=flat)](https://raw.githubusercontent.com/crazycodeboy/store/master/LICENSE)


## Content

- [Installation](#installation)
- [Getting started](#getting-started)
- [API](#api)
- [Contribution](#contribution)

## Installation

* 1.Run `npm i store --save`
* 2.`import store from 'store'`

## Getting started  

Add `store` to your js file.

`import store from 'store'`

sessionStorage use:
```javascript
 // save
 store.sset('key', value);

 // read
 const value = store.sget('key');

 // read set default value {}
 const value = store.sget('key', {});

 // delete 
 store.sset('key', null);

 // clear
 store.sclear();
```

sessionStorage expiration time use:
```javascript
 // save set expiration time 1m
 store.sset('key', value, 1000 * 60);
```

localStorage use:
```javascript
 // save
 store.lset('key', value);

 // read
 const value = store.lget('key');

 // read set default value {}
 const value = store.lget('key', {});

 // delete 
 store.lset('key', null);

 // clear
 store.lclear();
```

localStorage expiration time use:
```javascript
 // save set expiration time 1m
 store.lset('key', value, 1000 * 60);
```


## API


Method   |  Type     | Optional | Description
----------------- | -------- | -------- | -----------
sset(string, any, number)   | function | true |  sessionStorage save
sget(string, any)  |   function  |  true   | sessionStorage read
sclear()  |   function  |  true   | sessionStorage clear
lset(string, any, number)   | function | true |  localStorage save
lget(string, any)  |   function  |  true   | localStorage read
lclear()  |   function  |  true   | localStorage clear
clearAll()  |   function  |  true   | localStorage,sessionStorage clear


## Contribution

Issues are welcome. Please add a screenshot of bug and code snippet. Quickest way to solve issue is to reproduce it on one of the examples.

Pull requests are welcome. If you want to change API or making something big better to create issue and discuss it first.

---

**MIT Licensed**
