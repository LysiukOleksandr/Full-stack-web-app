import React from 'react'
// import Drawer from '../Drawer/Drawer'
import {useHistory} from 'react-router-dom'


const Home = ({isAuth}) => {

    const history = useHistory()

    React.useEffect(()=>{
        if(!isAuth){
            history.push('/login')
        }
    },[isAuth])

    return (
        <div className='home'>
            <h1>Home page</h1>
            {/*<Drawer/>*/}
        </div>
    )
}

export default Home;