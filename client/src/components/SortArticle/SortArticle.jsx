import React from 'react';
import './SortArticle.css'
import {Select} from "antd";

const {Option} = Select

const sortBy = [
    {id: 0, value: 'desc', description: 'Date(Descending)'},
    {id: 1, value: 'asc', description: 'Date(Ascending)'}
]

const SortArticle = ({onChangeSort}) => {

    const handleChange = (value) => {
        onChangeSort(value)
    }

    // page, limit, search, sort

    return (
        <div className='sort-article'>
            <Select defaultValue="Sort by" style={{width: 150}} onChange={handleChange}>
                {sortBy && sortBy.map((option, i) => (
                    <Option key={`${option.value}_${i}`} value={option.value}>{option.description}</Option>
                ))}
            </Select>
        </div>
    );
};

export default SortArticle;
