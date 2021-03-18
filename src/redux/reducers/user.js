import * as actionTypes from '../actionTypes'
export const CachedUser = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.USER_INFO:
            return action.data;
        default:
            return state;
    }
}