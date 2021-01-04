import axios from 'axios'
import {SET_ARTICLES, SET_MESSAGE} from "./constants";

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})

export const setArticles = (arr, val) => ({
    type: SET_ARTICLES,
    payload: [arr, val]
})

export const uploadArticle = (fd) => (dispatch) => {
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
        })
}


export const fetchArticles = (page, limit) => (dispatch) => {
    const token = localStorage.getItem('jwt')
    const offset = (page - 1) * limit
    axios.get(`http://localhost:8000/article/get?limit=${limit}&offset=${offset}&sort`, {
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
}


export const searchArticles = (value) => (dispatch) => {
    const token = localStorage.getItem('jwt')
    axios.get(`http://localhost:8000/article/search?value=${value}`, {
        headers: {
            'Authorization': token
        }
    })
        .then((res) => {
            dispatch(setArticles(res.data.articles, res.data.count))
        })
        .catch((err) => {
            console.log(err.response.data.message)
        })
}