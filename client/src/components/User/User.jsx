import React from 'react'
import './User.css'
import {Typography, Button, Image} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {downloadUserResume} from "../../redux/actions/userActionsCreator";

const {Text, Title} = Typography;

const User = () => {
    const dispatch = useDispatch()

    const {user} = useSelector(({userReducer}) => userReducer)

    const downloadResume = () => {
        dispatch(downloadUserResume())
    }

    return (
        <div className='user'>
            {user.isAuth ? <div className="user__wrapper">
                <div className="user__avatar">
                    <Image
                        width={200}
                        src={user.userPhoto && !user.userPhoto === {} ? 'http://localhost:8000/' + user.userPhoto : 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}
                    />

                </div>
                <div className="user__info">
                    <Title level={4}>{user.email ? user.email : ''}</Title>
                    <Text className='user__text' type="secondary">{user.name ? user.name : ''}</Text>
                    <Text className='user__text' type="secondary">{user.surname ? user.surname : ''}</Text>
                    <Text className='user__text' type="secondary">{user.birthday ? user.birthday : ''}</Text>
                    <div className="user__download">

                        <Button onClick={downloadResume} disabled={!user.userResume} type="primary" shape="round"
                                icon={<DownloadOutlined/>}
                                size='large'>
                            Download here
                        </Button>

                    </div>
                    <div className="user__change">
                        <Button size='large'>
                            <Link to='/user/change'>Change user info</Link>
                        </Button>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default User