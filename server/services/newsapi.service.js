const newsAxios = require('../helpers/newsapi.axios');
const cacheService = require('./cache.service');

const cache = new cacheService();

const getSources = async () => {
    try {
        // Fetching sources list from cache
        // if not found or expired will fetch from API and then caching it
        const result = await cache.get("sources", async () => {
            const response = await newsAxios.get('/sources');
            // get data from the response object
            return response.data;
        });
        return result;
    } catch (error) {
        throw new ErrorHandler(500, 'Server Error fetching news');
    }
}

const getNews = async (sources, page) => {
    const sourcesList = sources.join(",");
    const params = { sources: sourcesList, page };
    try {
        // const result = await newsAxios.get('/everything', { params });
        const result = await cache.get(`${sourcesList}_page_${page}`, async () => {
            const response = await newsAxios.get('/everything', { params });
            // get data from the response object
            return response.data;
        });
        return result;
    } catch (error) {
        throw new ErrorHandler(500, 'Server Error fetching news');
    }
}


module.exports = {
    getSources,
    getNews
}