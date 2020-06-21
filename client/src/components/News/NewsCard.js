import React from 'react';
import styles from './NewsCard.module.css';


const NewsCard = (props) => {
    const { publishedAt, source, title, description, urlToImage, url } = props.article;
    const articleDate = new Date(publishedAt);

    const wrapperStyle = {
        backgroundImage: `url(${urlToImage === "null" ? process.env.PUBLIC_URL + '/logo512.png' : urlToImage})`
    }
    return (
        <div className={`${styles.newsCard} ${styles.card}`}>
            <div className={styles.wrapper} style={wrapperStyle}>
                <div className={styles.date}>
                    <span className={styles.day}>{articleDate.getDate()}</span>
                    <span className={styles.month}>{articleDate.toLocaleString('default', {month: 'short'})}</span>
                    <span className={styles.year}>{articleDate.getFullYear()}</span>
                </div>
                <div className={styles.data}>
                    <div className={styles.content}>
                        <span className={styles.author}>{source.name}</span>
                        <h1 className={styles.title}><a href={url}>{title}</a></h1>
                        <p className={styles.text}>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;