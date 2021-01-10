import axios from 'axios'
import {IS_FETCHING, SET_ARTICLES, SET_MESSAGE} from "./constants";

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})

export const setArticles = (arr, val) => ({
    type: SET_ARTICLES,
    payload: [arr, val]
})

export const isFetching = (bool) =>({
    type: IS_FETCHING,
    payload: bool
})

export const uploadArticle = (fd) => (dispatch) => {
    dispatch(isFetching(true))
    const token = localStorage.getItem('jwt')
    axios.post('http://localhost:8000/article', fd, {
        headers: {
            'Authorization': token
        }
    })
        .then((res) => {
            dispatch(setMessage(res.data.message))
        })
        .catch((err) => {
            if (err) {
                dispatch(setMessage(err.response.data.message))
            }
        }).finally(() => {
        dispatch(isFetching(false))
    })
}

export const fetchArticles = (page = 1, limit = 10, search, sort) => (dispatch) => {
    dispatch(isFetching(true))
    const token = localStorage.getItem('jwt')
    const offset = (page - 1) * limit
    axios.get(`http://localhost:8000/article/get?limit=${limit}&offset=${offset}${search ? `&search=${search}` : ''}${sort ? `&sort=${sort}` : ''}`, {
        headers: {
            'Authorization': token
        }
    })
        .then((res) => {
            dispatch(setArticles(res.data.articles, res.data.count))
        })
        .catch((err) => {
            if (err.response) {
                dispatch(setMessage(err.response.data.message))
            }
        })
        .finally(() => {
            dispatch(isFetching(false))
        })
}