import React from 'react'
import {Input, DatePicker, Button, Form, Typography} from 'antd';
import './UserChange.css'
import {useDispatch, useSelector} from "react-redux";
import {changeUserData, changeUserPhoto, changeUserResume} from "../../redux/actions/userActionsCreator"
import {Link, useHistory} from "react-router-dom";

const {Title} = Typography

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 24},
};

const tailLayout = {
    wrapperCol: {offset: 0, span: 16},
};

const UserChange = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const {user} = useSelector(({userReducer}) => userReducer)

    const [name, setName] = React.useState()
    const [surname, setSurname] = React.useState()
    const [birthday, setBirthday] = React.useState()
    const [selectedImg, setSelectedImg] = React.useState(null)
    const [selectedResume, setSelectedResume] = React.useState(null)

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeSurname = (e) => {
        setSurname(e.target.value)
    }

    const onChangeBirthday = (_, dateString) => {
        setBirthday(dateString)
    }

    const onFinish = () => {
        dispatch(changeUserData({
            name,
            surname,
            birthday
        }))
        history.push('/user')
    }

    const onChangeUserPhoto = (e) => {
        setSelectedImg(e.target.files[0])
    }

    const onUploadUserPhoto = () => {
        const fd = new FormData()
        fd.append('userPhoto', selectedImg, selectedImg.name)

        dispatch(changeUserPhoto(fd))
        setSelectedImg(null)
    }

    const onChangeUserResume = (e) => {
        setSelectedResume(e.target.files[0])
    }

    const onUploadUserResume = () => {
        const fd = new FormData()
        fd.append('userResume', selectedResume, selectedResume.name)
        dispatch(changeUserResume(fd))
        setSelectedResume(null)
    }

    return (
        <div className='user-change'>
            <Title level={2} className='user-change__title'>Change personal information</Title>
            <div className="user-change__photo">
                <input type='file' onChange={onChangeUserPhoto}/><br/>
                <Button
                    className='user-change__upload-photo'
                    type='primary'
                    onClick={onUploadUserPhoto}
                    disabled={selectedImg === null}
                >Upload</Button>
            </div>
            <div className="user-change__photo">

            </div>
            <Form
                className='user-change__form'
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >

                <Form.Item
                    labelCol={{span: 24}}
                    label='Name'
                    name="username"
                    onChange={onChangeName}
                    initialValue={user.name}
                    rules={[{min: 2, message: 'Name must be 2 characters or more'}, {
                        max: 20,
                        message: 'Name must be 20 characters or less'
                    },
                        {
                            pattern: /[A-Za-z]/, message: 'There should be no numbers or symbols'
                        }]}
                >
                    <Input
                    />
                </Form.Item>

                <Form.Item
                    labelCol={{span: 24}}
                    label="Surname"
                    name="surname"
                    onChange={onChangeSurname}
                    initialValue={user.surname}
                    rules={[{min: 5, message: 'Name must be 5 characters or more'}, {
                        max: 20,
                        message: 'Name must be 20 characters or less'
                    },
                        {
                            pattern: /[A-Za-z]/, message: 'There should be no numbers or symbols'
                        }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    labelCol={{span: 24}}
                    label="Birthday"
                >
                    <DatePicker onChange={onChangeBirthday}/>
                </Form.Item>
                <div className="user-change__resume">
                    <input type='file' onChange={onChangeUserResume}/><br/>
                    <Button
                        // className='user-change__upload-resume'
                        type='primary'
                        onClick={onUploadUserResume}
                        disabled={selectedResume === null}
                    >Upload Resume</Button>
                </div>
                <Form.Item {...tailLayout}>
                    <Button type="default" htmlType="submit">
                        Save changes
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type='primary'>
                        <Link to='/user'>Back</Link>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserChange



