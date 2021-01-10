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

const defaultState = {
    eng: {
        title: '',
        description: '',
        content: ''
    },
    ru: {
        title: '',
        description: '',
        content: ''
    },
    ua: {
        title: '',
        description: '',
        content: ''
    }
}

const ModalWindow = () => {

    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [image, setImage] = React.useState(null)
    const [state, setState] = React.useState(defaultState)

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        let engArr = Object.values(state.eng)
        engArr = engArr.filter(item => item !== '')
        if (engArr.length === 3 && image !== null) {
            const fd = new FormData()
            fd.append('articleImage', image, image.name)
            fd.append('articles', JSON.stringify(state))
            dispatch(uploadArticle(fd))
            setIsModalVisible(false);
            setImage(null)
            setState(defaultState)
        }
    }

    const onChangeState = (value, lang, elem) => {
        setState(s => ({...s, [lang]: {...s[lang], [elem]: value}}))
    }

    const onChangeImage = (img) => {
        setImage(img)
    }

    return (
        <div className="modal">
            <Button onClick={showModal}>New Article</Button>
            <Modal
                title="CKeditor"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Tabs defaultActiveKey="0">
                    {tabs && tabs.map((tab) => (
                        <TabPane tab={tab.lang} key={tab.id}>
                            <TextEditor
                                {...tab}
                                state={state}
                                onChangeState={onChangeState}
                                onChangeImage={onChangeImage}
                            />
                        </TabPane>
                    ))}
                </Tabs>

            </Modal>
        </div>
    )
}

export default ModalWindow