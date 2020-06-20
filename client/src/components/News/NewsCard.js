import React from 'react';
import styles from './NewsCard.module.css';


const NewsCard = (props) => {
    const wrapperStyle = {
        backgroundImage: "url(https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80)"
       
    }
    return (
            <div className={`${styles.newsCard} ${styles.card}`}>
                <div className={styles.wrapper} style={wrapperStyle}>
                    <div className={styles.date}>
                        <span className={styles.day}>12</span>
                        <span className={styles.month}>Aug</span>
                        <span className={styles.year}>2016</span>
                    </div>
                    <div className={styles.data}>
                        <div className={styles.content}>
                            <span className={styles.author}>Jane Doe</span>
                            <h1 className={styles.title}><a href="#">Boxing icon has the will for a couple more fights</a></h1>
                            <p className={styles.text}>The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.</p>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default NewsCard;