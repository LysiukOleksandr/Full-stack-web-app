import React from 'react'
import './Home.css'
import DrawerMenu from '../Drawer/DrawerMenu'
import Article from "../Article/Acticle";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "antd";
import {fetchArticles} from "../../redux/actions/articleActionsCreator";
import SearchInput from "../SearchInput/SearchInput";
import SortArticle from "../SortArticle/SortArticle";

const Home = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = React.useState(1)
    const [sort, setSort] = React.useState(null)
    const [inputValue, setInputValue] = React.useState('')
    const [limit, setLimit] = React.useState(10)
    const {articles, count} = useSelector(({articleReducer}) => articleReducer)

    const onChange = (page) => {
        setCurrentPage(page)
        console.log(page)
        dispatch(fetchArticles(page, limit, inputValue, sort))
    }

    const onChangeSort = (sort) => {
        setSort(sort)
        dispatch(fetchArticles(1, limit, inputValue, sort))
    }

    const onChangeInputValue = (value) => {
        setInputValue(value)
    }

    React.useEffect(() => {
        dispatch(fetchArticles(currentPage, limit, inputValue, sort))
    }, [sort,limit])

    return (
        <div className='home'>
            <DrawerMenu/>
            <div className="home-menu">
                <SearchInput currentPage={currentPage} sort={sort} limit={limit} onChangeInputValue={onChangeInputValue}
                             inputValue={inputValue}/>
                <SortArticle sort={sort} onChangeSort={onChangeSort} limit={limit} inputValue={inputValue}/>
            </div>
            {articles.length > 0 && articles.map((item, index) => <Article key={`${item}_${index}`} {...item} />)}
            <div className="pagination">
                {articles.length > 0 &&
                <Pagination onChange={onChange} defaultCurrent={currentPage} total={count}/>}
            </div>
        </div>
    )
}

export default Home;