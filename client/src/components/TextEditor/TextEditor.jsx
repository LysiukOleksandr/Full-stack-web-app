import React from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Input, Typography,} from "antd";
import './TextEditor.css'


const {Title} = Typography

const TextEditor = ({
                        id,
                        image,
                        title,
                        description,
                        content,
                        upload,
                    }) => {
    return (
        <div>
            {id === 0 ? <div>
                <Title level={4}>{image}</Title>
                <label className='editor__image' htmlFor="editor__image">Upload</label>
                <input id='editor__image' type='file'/>
            </div> : ''}

            <br/>
            <Title level={4}>{title}</Title>
            <Input className='editor__input'/>
            <Title level={4}>{description}</Title>
            <Input className='editor__description'/>
            <Title level={4}>{content}</Title>
            <CKEditor
                editor={ClassicEditor}
            />
        </div>
    )
}


export default TextEditor