import React from 'react'
import './ArticleDetailsTab.css'
import {Image, Typography} from "antd";
import Parser from 'html-react-parser'

const {Title} = Typography;

const ArticleDetailsTab = ({image, title, description, content}) => {
    return (
        <div className='article-details-tab'>

            <Image
                className='article-details-tab__img'
                src={image && `http://localhost:8000/${image}`}
            />
            <Title level={3} className='article-details-tab__title'>{title && title}</Title>
            <div className="article-details-tab__description">{description && description}</div>
            <div className="article-details-tab__text">{content && Parser(content)}</div>
        </div>
    )
}

export default ArticleDetailsTab