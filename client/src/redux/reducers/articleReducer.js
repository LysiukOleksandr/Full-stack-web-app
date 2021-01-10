import {IS_FETCHING, SET_ARTICLES} from "../actions/constants";

const defaultState = {
    articles: [],
    count: 0,
    currentPage: 1,
    isFetching: false
}

const articleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ARTICLES:
            return {
                ...state,
                articles: [...action.payload[0]],
                count: action.payload[1]
            }

        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }

        default:
            return {
                ...state,
            }
    }
}

export default articleReducer