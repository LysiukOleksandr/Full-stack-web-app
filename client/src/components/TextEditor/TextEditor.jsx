import React from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button, Input, Modal, Typography} from "antd";
import {useDispatch} from 'react-redux'
import './TextEditor.css'
import {fetchArticles, uploadArticle} from "../../redux/actions/articleActionsCreator";

const {Title} = Typography

const TextEditor = () => {

    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [image, setImage] = React.useState()
    const [title, setTitle] = React.useState()
    const [description, setDescription] = React.useState()
    const [content, setContent] = React.useState()
    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        if (image && title && content) {
            const fd = new FormData()
            fd.append('articleImage', image, image.name)
            fd.append('articleTitle', title)
            fd.append('articleContent', content)
            fd.append('articleDescription', description)

            dispatch(uploadArticle(fd))

            setImage('')
            setTitle('')
            setDescription('')
            setContent('')
        }
        setIsModalVisible(false);
    }

    const onChangeImage = (e) => {
        setImage(e.target.files[0])
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onChangeContent = (e, editor) => {
        const data = editor.getData();
        setContent(data)
    }

    const onArticlesRender = () => {
        dispatch(fetchArticles())
    }

    return (
        <div className="editor">
            <Button onClick={showModal}>New Article</Button>
            <Button className='drawer__btn-articles' onClick={onArticlesRender}>Show articles</Button>
            <Modal
                title="CKeditor"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Title level={4}>Image</Title>
                <label className='editor__image' htmlFor="editor__image">Upload</label>
                <input id='editor__image' type='file' onChange={onChangeImage}/><br/>
                <Title level={4}>Title</Title>
                <Input className='editor__input' value={title} onChange={onChangeTitle}/>
                <Title level={4}>Description</Title>
                <Input className='editor__description' value={description} onChange={onChangeDescription}/>
                <Title level={4}>Content</Title>
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={onChangeContent}
                />
            </Modal>
        </div>
    )
}

export default TextEditor