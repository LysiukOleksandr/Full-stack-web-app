import React from 'react'
import DrawerMenu from '../Drawer/DrawerMenu'
import Article from "../Article/Acticle";
import {useDispatch} from "react-redux";
import {fetchArticles} from "../../redux/actions/articleActionsCreator";


const Home = () => {

    const dispatch = useDispatch()

    React.useEffect(()=>{
            dispatch(fetchArticles())

    }, [])

    return (
        <div className='home'>
            <DrawerMenu/>
                <Article/>
        </div>
    )
}

export default Home;