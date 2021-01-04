import React from 'react'
import './SearchInput.css'
import {Input} from 'antd';
import {useDispatch} from "react-redux";
import {searchArticles} from "../../redux/actions/articleActionsCreator";

const {Search} = Input;


const SearchInput = () => {

    const dispatch = useDispatch()

    const onSearch = (value) => {
        dispatch(searchArticles(value))
    }

    return (
        <div className='search-input'>
            <Search
                className='search-input__field'
                placeholder="Search article"
                allowClear
                onSearch={onSearch}
                style={{width: 200, margin: '0 10px'}}
            />
        </div>
    )
}

export default SearchInput