import cacheManager from './CacheManager';
import HttpStatus from 'http-status';

const getStrategy = (url, options) => {
  const dataCached = cacheManager.resolve(url);
  if (dataCached) {
    return new Promise(function(resolve) {
      console.log('fetch data from cache');
      setTimeout(resolve, 1000, dataCached);
    });
  }
  console.log('fetch data from server: ');
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await fetch(url, { ...options, mode: 'cors' });
      if (resp.ok) {
        if (resp.status === 204) {
          resolve(null);
        } else {
          const data = await resp.json();
          resolve(data);
          cacheManager.set(url, data);
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

const postStrategy = () => {

}

const putStrategy = () => {

}

const patchStrategy = () => {

}

const deleteStrategy = () => {

}

export default {
  GET: getStrategy,
  PUT: putStrategy,
  POST: postStrategy,
  PATCH: patchStrategy,
  DELETE: deleteStrategy,
}