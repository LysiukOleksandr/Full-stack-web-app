const defaultState = {
    articles: []
}

const articleReducer = (state = defaultState, action) => {
    switch (action.type) {

        case 'TEST':
            return {
                ...state
            }

        default:
            return {
                ...state,
            }
    }
}