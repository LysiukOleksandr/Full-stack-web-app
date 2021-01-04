import React from 'react'
import './Home.css'
import DrawerMenu from '../Drawer/DrawerMenu'
import Article from "../Article/Acticle";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "antd";
import {fetchArticles} from "../../redux/actions/articleActionsCreator";
import SearchInput from "../SearchInput/SearchInput";

const Home = () => {

    const dispatch = useDispatch()

    const {articles, count} = useSelector(({articleReducer}) => articleReducer)


    const limit = 10;
    let offset = 0;

    const [currentPage, setCurrentPage] = React.useState(1)

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        dispatch(fetchArticles(page, limit, offset))
    }

    return (
        <div className='home'>
            <DrawerMenu/>
             <SearchInput/>
            {articles.length > 0 && articles.map((item, index) => <Article key={`${item}_${index}`} {...item} />)}
            <div className="pagination">
                {articles.length > 0 &&
                <Pagination onChange={onChange} defaultCurrent={currentPage} total={count}/>}
            </div>
        </div>
    )
}

export default Home;