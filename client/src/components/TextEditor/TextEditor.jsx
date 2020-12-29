import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button, Input, Modal, Typography} from "antd";
import './TextEditor.css'

const {Title} = Typography

const TextEditor = () =>{

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [title,setTitle] = React.useState()
    const [description, setDescription] = React.useState()
    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChangeTitle = (e) =>{
        setTitle(e.target.value)
    }

    const onChangeDescription = (e, editor) =>{
        const data = editor.getData();
        setDescription(data)
        console.log(description)
    }

    return(
        <div className="editor">
            <Button onClick={showModal}>New Article</Button>
            <Modal
                title="CKeditor"
                visible={isModalVisible}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <Title level={4}>Image</Title>
                <input type='file' /><br/>
                <Title level={4}>Title</Title>
                <Input className='editor__input' onChange={onChangeTitle}/>
                <Title level={4}>Description</Title>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onChange={onChangeDescription}
                />
            </Modal>
        </div>
    )
}

export default TextEditor