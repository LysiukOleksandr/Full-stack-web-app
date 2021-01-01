import {SET_ARTICLES} from "../actions/constants";

const defaultState = {
    articles: []
}

const articleReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_ARTICLES:
            return {
                ...state,
                articles: {
                    ...state.articles,
                    ...action.payload
                }
            }

        default:
            return {
                ...state,
            }
    }
}

export default articleReducer