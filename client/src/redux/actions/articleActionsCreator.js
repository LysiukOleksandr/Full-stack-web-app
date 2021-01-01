import axios from 'axios'
import {SET_ARTICLES, SET_MESSAGE} from "./constants";

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})

export const setArticles = (val) => ({
    type: SET_ARTICLES,
    payload: val
})

export const uploadArticle = (fd) => (dispatch) => {
    const token = localStorage.getItem('jwt')
    axios.post('http://localhost:8000/article', fd, {
        headers: {
            'Authorization': token
        }
    })
        .then((res) => {
            console.log(res)
            dispatch(setMessage(res.data.message))
        })
        .catch((err) => {
            if (err) {
                dispatch(setMessage(err.response.data.message))
            }
        })
}


export const fetchArticles = () => (dispatch) => {
    const token = localStorage.getItem('jwt')
    axios.get('http://localhost:8000/article?limit=10&offset=0', {
        headers:{
            'Authorization': token
        }
    })
        .then((res)=>{
            console.log(res)
            dispatch(setArticles(res.data.articles))
        })
        .catch((err)=>{
            if(err){
                dispatch(setMessage(err.response.data.message))
            }
        })
}