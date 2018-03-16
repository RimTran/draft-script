import fetchStrategies from './fetchStrategies';
import CacheManager from './CacheManager';

export const customFetch = (url, options) => {
  const { method } = options;
  const strategy = fetchStrategies[method];
  return strategy(url, options);
}
