const nodeCache = require('node-cache');

class Cache {
    constructor() {
        this.cacheTTL = process.env.NODE_CACHE_TTL || 3600;
        this.cache = new nodeCache({ stdTTL: this.cacheTTL, checkperiod: this.cacheTTL * 0.2, useClones: false });
    }
    
    get(key, setCache) {
        const value = this.cache.get(key);
        if (value) {
            console.log("fetched from CACHE! ");
            return Promise.resolve(value);
        }

        return setCache().then((result) => {
            console.log("fetched from API! ");
            this.cache.set(key, result);
            return result;
        });
    }

    del(keys) {
        this.cache.del(keys);
    }

    flush() {
        this.cache.flushAll();
    }
}


module.exports = Cache;