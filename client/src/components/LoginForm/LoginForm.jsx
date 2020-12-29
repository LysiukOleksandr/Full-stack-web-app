import React from 'react';
import 'antd/dist/antd.css';
import './LoginForm.css';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {loginUser} from '../../redux/actions/userActionsCreator'
import {useDispatch} from 'react-redux'

const LoginForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const dispatch = useDispatch()

    const onFinish = () => {
        dispatch(loginUser(email, password))
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid Email'
                    },
                    {
                        required: true,
                        message: 'Please input your Email!'
                    },
                    {
                        min: 10,
                        message: '10 characters or more'
                    },
                    {
                        max: 40,
                        message: '40 characters or less'
                    }
                ]}
                onChange={onChangeEmail}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
            </Form.Item>
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
                        max: 25,
                        message: '25 characters or less'
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
            <Form.Item>

                <Link to='/forgot' className="login-form-forgot">
                    Forgot password
                </Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to='/register'>register now!</Link>
            </Form.Item>
        </Form>
    );
};

export default LoginForm
