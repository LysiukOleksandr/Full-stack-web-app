import React from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Input, Typography,} from "antd";
import './TextEditor.css'


const {Title} = Typography

const TextEditor = ({
                        state,
                        id,
                        image,
                        title,
                        description,
                        content,
                        lang,
                        onChangeState,
                        onChangeImage,

                    }) => {
    return (
        <div>
            {id === 0 ? <div>
                <Title level={4}>{image}</Title>
                <label className='editor__image' htmlFor="editor__image">Upload</label>
                <input id='editor__image' type='file' onChange={(e) => onChangeImage(e.target.files[0])}/>
            </div> : ''}
            <br/>
            <Title level={4}>{title}</Title>
            <Input className='editor__input' value={state[lang].title}
                   onChange={(e) => onChangeState(e.target.value, lang, 'title')}/>
            <Title level={4}>{description}</Title>
            <Input className='editor__description'
                   value={state[lang].description}
                   onChange={(e) => onChangeState(e.target.value, lang, 'description')}/>
            <Title level={4}>{content}</Title>
            <CKEditor
                editor={ClassicEditor}
                data={state[lang].content}
                onChange={(e, editor) => {
                    const data = editor.getData()
                    onChangeState(data, lang, 'content')
                }}
            />
        </div>
    )
}

export default TextEditor