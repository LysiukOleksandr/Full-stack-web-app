import React from 'react';
import 'antd/dist/antd.css';
import './Forgot.css';
import {Form, Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {forgotPasswordUser} from '../../redux/actions/userActionsCreator'
const Forgot = () => {

    const dispatch = useDispatch()

    const onFinish = () => {
        dispatch(forgotPasswordUser(email))
    }

    const [email, setEmail] = React.useState('')

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className='forgot'>
            <h1>Recover Password</h1>
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
                            message: 'Please input your Email!',
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Submit
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

export default Forgot
