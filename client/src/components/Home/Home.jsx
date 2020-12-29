import React from 'react'
import DrawerMenu from '../Drawer/DrawerMenu'
import Article from "../Article/Acticle";


const Home = () => {

    return (
        <div className='home'>
            <DrawerMenu/>
            <div className="articles">
            <Article />
            </div>
        </div>
    )
}

export default Home;