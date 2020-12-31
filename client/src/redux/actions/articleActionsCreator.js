import axios from 'axios'


export const addArticle = (val) => ({
    type: 'ADD_ARTICLE',
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
        })
        .catch((err) => {
            if (err) {
                console.log(err)
            }
        })
}
