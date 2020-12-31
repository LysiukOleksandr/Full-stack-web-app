import React from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button, Input, Modal, Typography} from "antd";
import {useDispatch} from 'react-redux'
import './TextEditor.css'
import {uploadArticle} from "../../redux/actions/articleActionsCreator";

const {Title} = Typography

const TextEditor = () => {

    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [image, setImage] = React.useState()
    const [title, setTitle] = React.useState()
    const [description, setDescription] = React.useState()
    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        if (image && title && description) {
            const fd = new FormData()
            fd.append('articleImage', image, image.name)
            fd.append('articleTitle', title)
            fd.append('articleDescription', description)
            dispatch(uploadArticle(fd))

            setImage('')
            setTitle('')
            setDescription('')
        }
        setIsModalVisible(false);
    }

    const onChangeImage = (e) => {
        setImage(e.target.files[0])
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDescription = (e, editor) => {
        const data = editor.getData();
        setDescription(data)
        console.log(description)
    }

    return (
        <div className="editor">
            <Button onClick={showModal}>New Article</Button>
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
                <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={onChangeDescription}
                />
            </Modal>
        </div>
    )
}

export default TextEditor