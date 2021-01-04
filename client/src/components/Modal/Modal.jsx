import React from 'react'
import {Button, Modal, Tabs} from "antd";
import {useDispatch} from 'react-redux'
import {fetchArticles, uploadArticle} from "../../redux/actions/articleActionsCreator";
import TextEditor from "../TextEditor/TextEditor";

const {TabPane} = Tabs;

const tabs = [
    {
        id: 0,
        lang: 'eng',
        title: 'Title',
        image: 'Image',
        description: 'Description',
        content: 'Content'
    },
    {
        id: 1,
        lang: 'ru',
        title: 'Заглавие',
        image: 'Изображение',
        description: 'Описание',
        content: 'Содержание'
    },
    {
        id: 2,
        lang: 'ua',
        title: 'Заголовок',
        image: 'Зображення',
        description: 'Опис',
        content: 'Зміст'
    }
]

const ModalWindow = () => {

    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [image, setImage] = React.useState()

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {

        // const fd = new FormData()
        //  fd.append('articleImage', image, image.name)
        // fd.append('articleTitle', title)
        //  fd.append('articleContent', content)
        //   fd.append('articleDescription', description)

        //   dispatch(uploadArticle(fd))

        // setImage('')
        // setTitle('')
        // setDescription('')
        // setContent('')

        setIsModalVisible(false);
    }


    // const onChangeImage = (e) => {
    //   setImage(e.target.files[0])
    // }

    // const onChangeTitle = (e) => {
    //    setTitle(e.target.value)
    // }

    // const onChangeDescription = (e) => {
    //     setDescription(e.target.value)
    // }

    // const onChangeContent = (e, editor) => {
    //    const data = editor.getData();
    //    setContent(data)
    // }

    const onArticlesRender = () => {
        dispatch(fetchArticles())
    }

    return (
        <div className="modal">
            <Button onClick={showModal}>New Article</Button>
            <Button className='drawer__btn-articles' onClick={onArticlesRender}>Show articles</Button>
            <Modal
                title="CKeditor"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Tabs defaultActiveKey="0">
                    {tabs && tabs.map((tab, index) => (
                        <TabPane tab={tab.lang} key={tab.id}><TextEditor {...tab}/></TabPane>
                    ))}
                </Tabs>

            </Modal>
        </div>
    )
}

export default ModalWindow