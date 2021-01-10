import React from 'react'
import './Acticle.css'
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import Parser from "html-react-parser";
import {Link} from "react-router-dom";


const Article = ({_id: id, languages, image}) => {

    const {title, description} = languages.eng

    return (
        <div className='article'>
            <Link to={`/article/${id}`}>
                <Card
                    // style={{width: 500}}
                    className='article__card'
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
            </Link>
        </div>

    )
}


export default Article