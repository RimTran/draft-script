import { endsWith, isEmpty, isNil } from 'lodash';
import { parse } from 'url-parse';
import HttpStatus from 'http-status';

class Cache {
  internalCache = new WeakMap();
  
  get = (key) => {
    this.internalMap.get(key);
  };
  
  has = (key) => {
    this.internalCache.has(key);
  };
  
  set = (key, value) => {
    this.internalCache.set(key, value);
  };
  
  delete = (key) => {
    this.internalCache.delete(key);
  };
}

class CacheManager {
  constructor() {
    this.internalMap = {};
    this.internalCache = new Cache();
  }
  
  get = (key) => {
    const entry = this.internalMap[key];
    console.log('entry: ', entry);
    if (isNil(entry)) {
      const path = key;
      if (endsWith(path, '/count')) {
        // TODO will remove /^pattern*/ inside internalMap and internalCache.
        const splitUrl = path.substring(0, path.lastIndexOf('/'));
        return new Promise(async (resolve, reject) => {
          try {
            const resp = await fetch(splitUrl);
            if (resp.ok) {
              if (resp.status === 204) {
                resolve(null);
              } else {
                const data = await resp.json();
                resolve(data);
                console.log('this.internalCache: ', this.internalCache);
              }
            } else if (resp.status === HttpStatus.NOT_FOUND) {
              reject({ status: resp.status });
            } else {
              const error = await resp.json();
              reject({ status: resp.status, error });
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      return null;
    }
    
    if (this.internalCache.has({ key })) {
      return this.internalCache.get({ key });
    }
    
    return null;
  };
  
  set = (key, value, expire) => {
    this.internalMap[key] = { expireOn: Date.now() + expire };
    this.internalCache.set({ key }, value);
  };
}

class FetchManager {
  constructor(props) {
    this.cacheManager = new CacheManager();
    this.cacheMethods = {
      'get': getCache,
      'put': putCache,
      'post': postCache,
      'delete': deleteCache,
    }
  }
  
  
  doRequest(url, options) {
    // const { method } = options;
    // if (method === 'GET') {
    //   return this.cacheManager.get(url);
    // }
    
    return this.cacheMethods[options.method](options);
  }
  
}

const getCache = (options) => {

}

const putCache = (options) => {

}
const postCache = (options) => {

}
const deleteCache = (options) => {

}



export default new FetchManager();
