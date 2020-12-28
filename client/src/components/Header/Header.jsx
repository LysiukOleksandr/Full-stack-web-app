import React from 'react'
import {Link} from 'react-router-dom'
import {Layout, Avatar} from 'antd'
import './Header.css'
import Logout from "../Logout/Logout";

const Header = ({isAuth, userPhoto}) => {

    const {Header} = Layout;

    return (
        <Header style={{width: '100%'}}>
            <div className="header__wrapper">
                <div className="logo">
                    <Link className='header__logo' to='/'>
                        <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png"
                             alt="header__logo"/>
                    </Link>
                </div>
                <div className="header__buttons">
                    {isAuth ?
                        <div className="header__avatar">
                            <Link to='/user'>
                                <Avatar className='header__img'
                                        src={userPhoto ? "http://localhost:8000/" + userPhoto : 'https://secure.gravatar.com/avatar/ec67e4417439c9ca226ec53d4014fd9c?s=150&r=g&d=https://www.russianwithmax.com/wp-content/plugins/userswp/assets/images/no_profile.png'}/>

                            </Link>
                        </div>
                        : null}
                    {isAuth ? <Logout/> : null}

                </div>
            </div>
        </Header>
    )
}


export default Header