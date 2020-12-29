import React from 'react'
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import {Route, Redirect, Link} from 'react-router-dom'
import Register from "./components/Register/Register";
import Forgot from "./components/Forgot/Forgot";
import Home from './components/Home/Home'
import Reset from "./components/Reset/Reset";
import Header from "./components/Header/Header";
import UserChange from "./components/UserChange/UserChange";
import {notification} from "antd";
import {useDispatch, useSelector} from 'react-redux'
import {getUserData} from "./redux/actions/userActionsCreator";
import User from "./components/User/User";
import ProtectedRouter from "./ProtectedRouter";
import ProtectedAuthRouter from "./ProtectedAuthRouter";
import ArticleDetails from "./components/ArticleDetails/ArticleDetails";

function App() {
    const dispatch = useDispatch()

    const state = useSelector(({userReducer}) => userReducer)

    const openNotification = (message) => {
        notification.open({
            message: 'Notification',
            description: `${message}`,
        });
    };

    React.useEffect(()=>{
        if(state.message && state.message.length > 1){
            openNotification(state.message)
        }
    }, [state.message])

    React.useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (token) {
            dispatch(getUserData())
        } else if (!token) {
            return <Redirect to='/login'/>
        }
    }, [])


    return (
        <div className="App">
            <div className="header">
                <Header isAuth={state.user.isAuth} userPhoto={state.user.userPhoto}/>
            </div>
            <div className="router-group">
                <Route exact path='/' render={() => <Home isAuth={state.user.isAuth} />}/>
                <ProtectedAuthRouter exact path='/login' component={LoginForm} isAuth={state.user.isAuth} />
                <ProtectedAuthRouter exact path='/forgot' component={Forgot} isAuth={state.user.isAuth} />
                <ProtectedAuthRouter exact path='/register' component={Register} isAuth={state.user.isAuth} />
                <ProtectedAuthRouter path='/reset/:token' component={Reset} isAuth={state.user.isAuth} />
                <ProtectedRouter exact path='/user' component={User} isAuth={state.user.isAuth}/>
                <ProtectedRouter exact path='/user/change' component={UserChange} isAuth={state.user.isAuth}/>
                <ProtectedRouter exact path='/article' component={ArticleDetails} isAuth={state.user.isAuth} />
            </div>
        </div>
    );
}

export default App
