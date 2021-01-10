import React from 'react';
import Article from "../Article/Acticle";
import Preloader from "../Preloader/Preloader";

const Articles = ({articles, isFetching}) => {
    return (
        <div>
            {articles.length > 0 && !isFetching ? articles.map((item, index) => <Article
                    key={`${item}_${index}`} {...item} />)
                : <Preloader/>}
        </div>
    );
};

export default Articles;
