import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getToursRequest: ['payload'],
    getToursFail: ['error'],
    getToursSuccess: ['payload'],
})

export const ToursTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    list: [],
    error: ''
})

/* ------------- Selectors ------------- */

export const ToursSelectors = {
    getTours: state => state.Tours.list,
}

/* ------------- Reducers ------------- */

export const getToursRequest = (state, { payload }) => {
    return state.merge({ fetching: true, list: [] })
}

export const getToursSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, list: payload })
}

export const getToursFail = (state, { error }) => {
    return state.merge({ fetching: false, error, list: [] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_TOURS_REQUEST]: getToursRequest,
    [Types.GET_TOURS_SUCCESS]: getToursSuccess,
    [Types.GET_TOURS_FAIL]: getToursFail,
})
