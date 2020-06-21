import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { GetNews } from '../../API/user.api';
import { Pagination } from 'react-bootstrap';

const NewsComponent = () => {
    const [userNews, setUserNews] = useState([]);
    const [paginate, setPaginate] = useState({
        currentPage: 1,
        totalPages: 5, // "default" this is the maximum number allowed by API itself i will reset it later in codes
        itemsPerPage: 20
    });

    const GetuserNews = async (page) => {
        try {

            const news = await GetNews(page);
            if (news.status && news.status === "ok") {
                setUserNews(news.articles);
                setPaginate({ ...paginate, currentPage: page })
                if (news.totalResults <= 100) {
                    const totalPages = Math.ceil(news.totalResults / paginate.itemsPerPage);
                    setPaginate({ ...paginate, currentPage: page, totalPages })
                }
            }
        } catch (error) {
            console.log("server error: ", error);
        }
    }

    useEffect(() => {
        GetuserNews(1);
    }, []);

    // rendering pagination
    let items = [];
    if (userNews.length) {
        for (let number = 1; number <= paginate.totalPages; number++) {
            items.push(
                <Pagination.Item onClick={() => GetuserNews(number)} key={number} disabled={number === paginate.currentPage}>
                    {number}
                </Pagination.Item>
            );
        }
    }
    
    const news = userNews.map(article => <NewsCard key={article.url} article={article} />);
    return (
        <>
            <div className="row">
                <div className="mx-auto">
                    <Pagination size="sm">{items}</Pagination>
                </div>
            </div>
            <div className="d-flex flex-wrap justify-content-around">
                {news}
                {!userNews.length ? <h2>please subscribe to sources to be able to see news</h2> : ""}
            </div>


        </>
    );
}

export default NewsComponent;