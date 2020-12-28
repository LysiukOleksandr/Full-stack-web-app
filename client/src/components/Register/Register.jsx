import React from 'react';
import 'antd/dist/antd.css';
import './Register.css';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {registerUser} from "../../redux/actions/userActionsCreator";
import {useDispatch} from 'react-redux'

const Register = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repeatPassword, setRepeatPassword] = React.useState('')

    const onFinish = () => {
        if (password === repeatPassword) {
            dispatch(registerUser(email, password))
        }
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeRepeatPassword = (e) => {
        setRepeatPassword(e.target.value)
    }

    return (
        <div>
            <h1 className='register-title'>Registration</h1>
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
                            message: "The input is not valid Email"
                        },
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                        {
                            min: 10,
                            message: '10 characters or more'
                        },
                        {
                            max: 40,
                            message: '40 characters or less'
                        },
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
                        Register now
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        <Link to='/login'>Back to login</Link>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register