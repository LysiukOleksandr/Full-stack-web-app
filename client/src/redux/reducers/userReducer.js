const defaultState = {
    user: {
        isAuth: false,
        email: '',
        name: '',
        surname: '',
        birthday: '',
        userPhoto: '',
        userResume: ''
    },
    message: ''
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_IS_AUTH':
            return {
                ...state,
                user: {
                    ...state.user,
                    isAuth: action.payload
                }
            }
        case 'SET_USER_DATA':
            console.log(action.payload, 'asdasdasd')
            return {
                ...state,
                user: {...state.user, ...action.payload}
            }
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}

export default userReducer