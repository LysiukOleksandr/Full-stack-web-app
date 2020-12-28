import axios from 'axios'

export const setIsAuth = (bool) => ({
    type: 'SET_IS_AUTH',
    payload: bool
})

export const setUserData = (val) => ({
    type: 'SET_USER_DATA',
    payload: val
})

export const setMessage = (message) => ({
    type: 'SET_MESSAGE',
    payload: message
})


export const registerUser = (email, password) => (dispatch) => {
    axios.post(`http://localhost:8000/auth/register`, {
        email,
        password
    })
        .then((res) => {
            dispatch(setMessage(res.data.message))
        })
        .catch((err) => {
            dispatch(setMessage(err.response.data.message))
        })
}

export const loginUser = (email, password) => (dispatch) => {
    axios.post('http://localhost:8000/auth/login', {
        email,
        password
    })
        .then((res) => {
            dispatch(setMessage(res.data.message))
            if (res.status === 200) {
                dispatch(setUserData(res.data.user))
                localStorage.setItem('jwt', res.data.token)
            }
        })
        .catch((err) => {
            dispatch(setIsAuth(false))
            if (err.response) {
                dispatch(setMessage(err.response.data.message))
            }
        })
}


export const forgotPasswordUser = (email) => (dispatch) => {
    axios.post('http://localhost:8000/auth/forgotPassword', {
        email
    })
        .then((res) => {
            dispatch(setMessage(res.data.message))

        })
        .catch((err) => {
            dispatch(setMessage(err.response.data.message))
        })
}

export const changePasswordUser = (password, resetToken) => (dispatch) => {
    axios.post('http://localhost:8000/auth/resetPassword', {
            password: password
        },
        {
            headers: {
                'token': resetToken
            }
        }
    )
        .then((res) => {
            dispatch(setMessage(res.data.message))
            window.location.href = 'http://localhost:3000/login'
        })
        .catch((err) => {
            dispatch(setMessage(err.response.data.message))
        })
}

export const getUserData = () => (dispatch) => {
    const token = localStorage.getItem('jwt')
    axios.get('http://localhost:8000/user', {
        headers: {
            'Authorization': token
        }
    })
        .then((res) => {
            const {user} = res.data
            const {_id} = user
            delete user._id
            user.id = _id
            user.isAuth = true
            dispatch(setUserData(user))
        })
        .catch((err) => {
            if (err.data) {
                dispatch(setMessage(err.response.data.message))
            }
        })
}

export const logOutUser = () => (dispatch) => {
    localStorage.removeItem('jwt')
    dispatch(setIsAuth(false))
    dispatch(setUserData({}))
    dispatch(setMessage('Logout successful'))
}

export const changeUserData = (user) => (dispatch) => {
    const token = localStorage.getItem('jwt')
    axios.post('http://localhost:8000/user/change', {
        user
    }, {
        headers: {
            'Authorization': token
        }
    })
        .then((res) => {
            dispatch(setUserData(res.data.user))
            dispatch(setMessage(res.data.message))
        })
        .catch((err) => {
            if (err.response) {
                dispatch(setMessage(err.response.data.message))
            }
        })
}


export const changeUserPhoto = (fd) => (dispatch) => {
    const token = localStorage.getItem('jwt')

    axios.post('http://localhost:8000/user/change/userPhoto', fd, {
        headers: {
            'Authorization': token
        }
    })
        .then((res) => {
            dispatch(setUserData(res.data.user))
            dispatch(setMessage(res.data.message))
        })
        .catch((err) => {
            if (err.response) {
                dispatch(setMessage(err.response.data.message))
            }
        })
}

export const changeUserResume = (fd) => (dispatch) => {
    const token = localStorage.getItem('jwt')

    axios.post('http://localhost:8000/user/change/userResume', fd, {
        headers: {
            'Authorization': token
        }
    })
        .then((res) => {
            dispatch(setUserData(res.data.user))
            dispatch(setMessage(res.data.message))
        })
        .catch((err) => {
            dispatch(setMessage(err.response.data.message))
        })
}


export const downloadUserResume = () => (dispatch) => {
    const token = localStorage.getItem('jwt')

    fetch('http://localhost:8000/user/change/downloadResume', {
        headers: {
            'Authorization': token,
        }
    })
        .then(res => res.blob())
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `Resume.pdf`,
            );
            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        })
        .catch((err) => {
            if (err.response) {
                dispatch(setMessage(err.response.data.message))
            }
        })
}