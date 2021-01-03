import React from 'react'
import './Translate.css'
import {Button} from "antd";
import {TranslationOutlined} from "@ant-design/icons";

const Translate = ({id, value, description, current, onChangeCurrentItem}) => {
    return (
        <div className='translate-item'>
            <Button
                type={current === id ? 'primary' : ''}
                onClick={() => onChangeCurrentItem(id)}
                className='translate-item__btn'
                icon={<TranslationOutlined/>}
            >
                {value}
            </Button>
        </div>
    )
}

export default Translate