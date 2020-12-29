import React from 'react';
import 'antd/dist/antd.css';
import './Reset.css';
import {Form, Input, Button} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux'
import {changePasswordUser} from "../../redux/actions/userActionsCreator";

const Reset = () => {

    const dispatch = useDispatch()

    const onFinish = () => {
        if (password === repeatPassword) {
            const resetToken = window.location.href.split('/')[window.location.href.split('/').length - 1]
            dispatch(changePasswordUser(password,resetToken))
        } else {
            alert('unequal passwords')
        }
    }

    const [password, setPassword] = React.useState('')
    const [repeatPassword, setRepeatPassword] = React.useState('')

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeRepeatPassword = (e) => {
        setRepeatPassword(e.target.value)
    }


    return (
        <div className='reset'>
            <h1 className='register-title'>Reset your password</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        {
                            min: 6,
                            message: '6 characters or more'
                        },
                        {
                            max: 40,
                            message: '40 characters or less'
                        }
                    ]}
                    onChange={onChangePassword}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="password-repeat"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password again!',
                        },
                        {
                            min: 6,
                            message: '6 characters or more'
                        },
                        {
                            max: 25,
                            message: '25 characters or less'
                        }
                    ]}
                    onChange={onChangeRepeatPassword}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Repeat password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Change password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Reset