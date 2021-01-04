import {SET_ARTICLES} from "../actions/constants";

const defaultState = {
    articles: [],
    count: 0,
    currentPage: 1,
    offset: 0
}

const articleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ARTICLES:
            return {
                ...state,
                articles: [...action.payload[0]],
                count: action.payload[1]
            }

        default:
            return {
                ...state,
            }
    }
}

export default articleReducer