import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button, Modal} from "antd";

const TextEditor = () =>{

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return(
        <div className="editor">
            <Button onClick={showModal}>New Article</Button>
            <Modal
                title="CKeditor"
                visible={isModalVisible}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </Modal>
        </div>
    )
}

export default TextEditor