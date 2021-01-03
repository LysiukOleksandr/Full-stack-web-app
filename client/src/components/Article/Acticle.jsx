import React from 'react'
import './Acticle.css'
import {Card, Pagination} from "antd";
import Meta from "antd/es/card/Meta";
import Parser from "html-react-parser";
import {Link} from "react-router-dom";


const Article = ({_id:id,image, title, description}) => {
    return (
        <Link to={`/article/${id}`}>
        <div className='article'>
            <Card
                style={{width: 500}}
                cover={
                    <img
                        alt="example"
                        src={`http://localhost:8000/${image}`}
                    />
                }
            >
                <Meta
                    title={title}
                    description={Parser(description)}
                />
            </Card>


        </div>
        </Link>
    )
}


export default Article