import React from 'react'
import './ArticleDetails.css'
import {Image, Typography} from "antd";

const {Title} = Typography;

const ArticleDetails = () =>{
    return(
        <div className='article-details'>
            <Image
                className='article-details__img'
                width={300}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Title level={3} className='article-details__title'>Title here</Title>
            <div className="article-details__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis dolorem error et ipsa molestiae nostrum repellendus voluptate. Animi asperiores assumenda consectetur dicta dolore dolorem dolorum exercitationem expedita fuga id itaque magni molestias nihil nobis numquam quae quo quod, quos recusandae repellat sed, suscipit unde. Accusantium at consequatur consequuntur debitis, dicta, dignissimos dolores doloribus dolorum eligendi error est ex excepturi fugit hic labore minima minus molestias nam nobis odit officia quas reiciendis rerum sed tempore ullam voluptas voluptatum. Adipisci aliquam animi aspernatur, consectetur consequuntur dicta dolorum ea facere magnam minus, nam nemo neque odio quasi reprehenderit similique soluta veritatis voluptate?</div>
        </div>
    )
}

export default ArticleDetails