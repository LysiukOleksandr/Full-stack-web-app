import React from 'react'
import './ArticleDetails.css'
import {Image, Tabs, Typography} from "antd";
import axios from "axios";
import {setMessage} from "../../redux/actions/articleActionsCreator";
import {useDispatch} from "react-redux";
import ArticleDetailsTab from "../ArticleDetailsTab/ArticleDetailsTab";

const {TabPane} = Tabs;

const ArticleDetails = ({match}) => {

    const dispatch = useDispatch()

    const [article, setArticle] = React.useState(null)
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
            <Tabs defaultActiveKey="1" centered>
                   {article && Object.keys(article.languages).map((tab, i) => (
                        <TabPane tab={tab} key={`${tab}_${i}`} disabled={!article.languages[tab].title}>
                        <ArticleDetailsTab {...article.languages[tab]} image={article.image}/>
                    </TabPane>
                ))}
            </Tabs>
        </div>
    )
}

export default ArticleDetails