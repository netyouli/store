///  Created by WHC on 19/07/13.
//  Copyright © 2017年 WHC. All rights reserved.
//
//  Github <https://github.com/netyouli/store>
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

 /**
  * 数据缓存
  */
 export default class Store {
    static __store = new store();
    constructor() {
        /** 内存存储 */
        this.__smap = new Map();
        this.__lmap = new Map();
    }

    /**
     * 处理生成过期时间
     */
    static __handleMsec = (v = null, msec = null) => {
        if (msec != null) {
            if (typeof(msec) == 'number') {
                const exp = new Date();
                exp.setTime(exp.getTime() + msec * 1);  
                return {
                    ___storeExpires__: exp.getTime(),
                    value: v,
                };
            }else {
                console.warn('[store]: msec not number type');
            }
        }
        return v;
    };

    /**
     * 处理带过期时间value
     */
    static __handleValue = (value = null, defaultValue = null , k = null, isSession = false) => {
        if (value != void 0) {
            try {
                value = JSON.parse(value);
            }catch(e) {
                return value;
            }
            const {
                ___storeExpires__ = null,
            } = value;
            if (___storeExpires__ != null) {
                const date = new Date();
                if (date.getTime() < ___storeExpires__) {
                    return value.value;
                }else {
                    if (isSession) {
                        this.sSet(k, null);
                    }else {
                        this.lSet(k, null);
                    }
                    return defaultValue;
                }
            }
        }
        return value;
    };

    /**
     * local 存储数据
     * 如果v为null 那么就是删除数据
     * msec 过期时间(毫秒)
     */
    static lset = (k, v = null, msec = null) => {
        if (k) {
            if (v) {
                v = this.__handleMsec(v, msec);
                if (typeof v === 'string') {
                    this.__store.__lmap.set(k, v);
                    localStorage.setItem(k,v);
                }else if (v instanceof Object) {
                    const value = JSON.stringify(v);
                    this.__store.__lmap.set(k, value);
                    localStorage.setItem(k,value);
                }else {
                    this.__store.__lmap.set(k, v);
                    localStorage.setItem(k,v);
                }
            }else {
                this.__store.__lmap.delete(k);
                localStorage.removeItem(k);
            }
        }
        return null;
    };

    /**
     * local 获取数据
     */
    static lget = (k = null, defaultValue = null) => {
        let value = null;
        if (k) {
            value = this.__store.__lmap.get(k);
            if (value == void 0) {
                value = localStorage.getItem(k);
            }
            value = this.__handleValue(value, defaultValue, k, false);
        }
        return value;
    };

    /**
     * seesion 存储数据
     * 如果v为null 那么就是删除数据
     */
    static sset = (k = null, v = null , msec = null) => {
        if (k) {
            if (v) {
                v = this.__handleMsec(v, msec);
                if (typeof v === 'string') {
                    this.__store.__smap.set(k, v);
                    sessionStorage.setItem(k,v);
                }else if (v instanceof Object) {
                    const value = JSON.stringify(v);
                    this.__store.__smap.set(k, value);
                    sessionStorage.setItem(k,value);
                }else {
                    this.__store.__smap.set(k, v);
                    sessionStorage.setItem(k,v);
                }
            }else {
                this.__store.__smap.delete(k);
                sessionStorage.removeItem(k);
            }
        }
        return null;
    };

    /**
     * session 获取存储数据，先从内存获取，如果内存没有就从本地获取
     */
    static sget = (k = null, defaultValue = null) => {
        let value = null;
        if (k) {
            value = this.__store.__smap.get(k);
            if (value == void 0) {
                value = sessionStorage.getItem(k);
            }
            value = this.__handleValue(value, defaultValue, k);
        }
        return value;
    };

    /**
     * local 清空数据
     */
    static lclear = () => {
        this.__store.__lmap.clear();
        localStorage.clear();
    };

    /**
     * seesion 清空数据
     */
    static sclear = () => {
        this.__store.__smap.clear();
        sessionStorage.clear();
    };

    /**
     * 清除存储数据
     */
    static clearAll = () => {
        this.seesionClear();
        this.localClear();
    };
 }