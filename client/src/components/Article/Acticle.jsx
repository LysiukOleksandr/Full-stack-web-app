import React from 'react'
import './Acticle.css'
import {Card} from "antd";
import Avatar from "antd/es/avatar/avatar";
import Meta from "antd/es/card/Meta";
import {TranslationOutlined} from '@ant-design/icons';


const Article = () => {

    return (
        <div className='article'>
            <Card
                style={{width: 500}}
                cover={
                    <img
                        alt="example"
                        src="https://www.natureindex.com/news-blog/image/5b175525847f4ad8bb7d97cb"
                    />
                }
                actions={[
                    <TranslationOutlined key="ukr"/>,
                    <TranslationOutlined key="ru"/>,
                    <TranslationOutlined key="eng"/>
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                    title="Title"
                    description="This is the description"
                />
            </Card>
        </div>
    )
}


export default Article