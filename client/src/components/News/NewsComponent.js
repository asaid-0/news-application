import React from 'react';
import NewsCard from './NewsCard';

const NewsComponent = () => {
    return (
        <div className="d-flex flex-wrap justify-content-around">
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </div>
    );
}

export default NewsComponent;