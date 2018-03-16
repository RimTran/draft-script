import { endsWith, isNil } from "lodash";
import Cache from './Cache';

class CacheManager {
  constructor() {
    this.internalMap = {};
    this.internalCache = new Cache();
  }
  
  resolve = (key) => {
    const keyObj = this.internalMap[key];
    return this.internalCache.get(keyObj);
  };
  
  set = (key, data) => {
    const keyObj = { key };
    this.internalMap[key] = keyObj;
    this.internalCache.set(keyObj, data);
  }
}

export default new CacheManager();