import React from 'react'
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import {Route, Redirect} from 'react-router-dom'
import Register from "./components/Register/Register";
import Forgot from "./components/Forgot/Forgot";
import Home from './components/Home/Home'
import Reset from "./components/Reset/Reset";
import Header from "./components/Header/Header";
import UserChange from "./components/UserChange/UserChange";
import {notification} from "antd";
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getUserData, setIsAuth, setUserData} from "./redux/actions/userActionsCreator";
import User from "./components/User/User";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";

function App() {
    const history = useHistory()
    const dispatch = useDispatch()

    const state = useSelector(({userReducer}) => userReducer)

    const openNotification = (message) => {
        notification.open({
            message: 'Notification',
            description: `${message}`,
        });
    };

    React.useEffect(() => {
        const token = localStorage.getItem('jwt')
        console.log('effect')
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
                <Route exact path='/login' render={() => <LoginForm isAuth={state.user.isAuth} />}/>
                <Route exact path='/' render={() => <Home isAuth={state.user.isAuth} />}/>
                <ProtectedRoute exact path='/user' component={User} isAuth={state.user.isAuth}/>
                <ProtectedRoute exact path='/user/change' component={UserChange} isAuth={state.user.isAuth}/>
                {/*{state.user.isAuth === true ?*/}
                {/*    <>*/}
                {/*        {console.log('login')}*/}
                {/*        <Route exact path='/' render={() => <Home/>}/>*/}
                {/*        <Route exact path='/user/change' render={() => <UserChange/>}/>*/}
                {/*        <Route exact path='/user' render={() => <User/>}/>*/}
                {/*    </>*/}
                {/*    :*/}
                {/*    <>*/}
                {/*        {console.log('not')}*/}
                {/*        <Route exact path='/login' render={() => <LoginForm/>}/>*/}
                {/*        <Route exact path='/register' render={() => <Register/>}/>*/}
                {/*        <Route exact path='/forgot' render={() => <Forgot/>}/>*/}
                {/*        <Route path='/reset/:token' render={() => <Reset/>}/>*/}
                {/*    </>*/}
                {/*}*/}
            </div>
        </div>
    );
}

export default App
