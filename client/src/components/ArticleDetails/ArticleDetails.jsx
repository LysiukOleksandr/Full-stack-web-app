import React from 'react'
import './ArticleDetails.css'
import {Image, Typography} from "antd";
import axios from "axios";
import {setMessage} from "../../redux/actions/articleActionsCreator";
import {useDispatch} from "react-redux";
import Parser from 'html-react-parser'

const {Title} = Typography;

const ArticleDetails = ({match}) => {

    const dispatch = useDispatch()

    const [article, setArticle] = React.useState({})

    React.useEffect(() => {
        const token = localStorage.getItem('jwt')
        axios.get(`http://localhost:8000/article/${match.params.id}`, {
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setArticle(res.data.article)
            }).catch((err) => {
            if (err.response) {
                dispatch(setMessage(err.response.data.message))
            }
        })
    }, [match.params.id, dispatch])
    return (
        <div className='article-details'>
            <Image
                className='article-details__img'
                width={300}
                src={article.image && `http://localhost:8000/${article.image}`}
            />
            <Title level={3} className='article-details__title'>{article.title && article.title}</Title>
            <div className="article-details__description">{article.description && article.description}</div>
            <div className="article-details__text">{article.content && Parser(article.content)}</div>
        </div>
    )
}

export default ArticleDetails