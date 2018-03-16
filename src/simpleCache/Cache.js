import { has } from 'lodash';

export default class Cache {
  internalCache = new WeakMap();
  
  get = (key) => {
    return this.internalCache.get(key);
  };
  
  has = (key) => {
    return has(this.internalCache, key);
  };
  
  set = (key, value) => {
    this.internalCache.set(key, value);
  };
  
  delete = (key) => {
    this.internalCache.delete(key);
  };
}