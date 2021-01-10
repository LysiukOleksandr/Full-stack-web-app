import React from 'react'
import './Home.css'
import DrawerMenu from '../Drawer/DrawerMenu'
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "antd";
import {fetchArticles} from "../../redux/actions/articleActionsCreator";
import SearchInput from "../SearchInput/SearchInput";
import SortArticle from "../SortArticle/SortArticle";
import Articles from "../Articles/Articles";
import { Empty } from 'antd';

const Home = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = React.useState(1)
    const [sort, setSort] = React.useState(null)
    const [inputValue, setInputValue] = React.useState('')
    const [limit, setLimit] = React.useState(10)
    const {articles, count, isFetching} = useSelector(({articleReducer}) => articleReducer)

    const onChange = (page) => {
        setCurrentPage(page)
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
    }, [sort, limit, currentPage])

    return (
        <div className='home'>
            <DrawerMenu/>
            <div className="home-menu">
                <SearchInput sort={sort} limit={limit} onChangeInputValue={onChangeInputValue}
                />
                <SortArticle onChangeSort={onChangeSort}/>
            </div>
            {articles.length === 0 ? (
                    <div className='empty'>
                <Empty/>
                    </div>
            ):(
                <Articles articles={articles} isFetching={isFetching} />
            )}

            <div className="pagination">
                {count > 10 &&
                <Pagination onChange={onChange} defaultCurrent={currentPage} total={count}/>}
            </div>
        </div>
    )
}

export default Home;