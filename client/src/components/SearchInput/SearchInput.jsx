import React from 'react'
import './SearchInput.css'
import {Input} from 'antd';
import {useDispatch} from "react-redux";
import {fetchArticles} from "../../redux/actions/articleActionsCreator";
// import {searchArticles} from "../../redux/actions/articleActionsCreator";

const {Search} = Input;

const SearchInput = ({sort, currentPage, limit, onChangeInputValue, inputValue}) => {

    const dispatch = useDispatch()

    const onSearch = (value) => {
        if (value !== '') dispatch(fetchArticles(1, limit, value, sort))
    }

    const onChange = (e) => {
        onChangeInputValue(e.target.value)
    }

    return (
        <div className='search-input'>
            <Search
                className='search-input__field'
                placeholder="Search article"
                allowClear
                onSearch={onSearch}
                onChange={onChange}
                style={{width: 200, margin: '0 10px'}}
            />
        </div>
    )
}

export default SearchInput