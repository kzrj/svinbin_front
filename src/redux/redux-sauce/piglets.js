import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getPigletsRequest: ['payload'],
    getPigletsFail: ['error'],
    getPigletsSuccess: ['payload'],

    mergeFromListPigletsRequest: ['payload'],
    mergeFromListPigletsFail: ['payload'],
    mergeFromListPigletsSuccess: ['payload'],

    cullingPigletsRequest: ['payload'],
    cullingPigletsFail: ['payload'],
    cullingPigletsSuccess: ['payload'],
})

export const PigletsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    listFetching: false,
    list: [],
    piglets: null,
    errorList: null,

    eventFetching: false,
    weighing: null,
    event: null,
    errorEvent: null,

    message: '',
})

/* ------------- Selectors ------------- */

export const PigletsSelectors = {
    getPiglets: state => state.piglets.list,
    mergeFromListPiglets: state => state.piglets.message,
    cullingPiglets: state => state.piglets.message,
}

/* ------------- Reducers ------------- */
// Get
export const getPigletsRequest = (state, { payload }) => {
    return state.merge({ listFetching: true, list: [] })
}

export const getPigletsSuccess = (state, { payload }) => {
    return state.merge({ listFetching: false, errorList: null, list: payload })
}

export const getPigletsFail = (state, { error }) => {
    return state.merge({ listFetching: false, errorList:error, list: [] })
}

// mergeFromListPiglets
export const mergeFromListPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const mergeFromListPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, errorEvent: null, message: payload.message })
}

export const mergeFromListPigletsFail = (state, { error }) => {
    return state.merge({ eventFetching: false, errorEvent: error, message: ''})
}

// culling
export const cullingPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const cullingPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, message: payload.message })
}

export const cullingPigletsFail = (state, { error }) => {
    return state.merge({ eventFetching: false, errorEvent: error, message: ''})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_PIGLETS_REQUEST]: getPigletsRequest,
    [Types.GET_PIGLETS_SUCCESS]: getPigletsSuccess,
    [Types.GET_PIGLETS_FAIL]: getPigletsFail,

    [Types.MERGE_FROM_LIST_PIGLETS_REQUEST]: mergeFromListPigletsRequest,
    [Types.MERGE_FROM_LIST_PIGLETS_SUCCESS]: mergeFromListPigletsSuccess,
    [Types.MERGE_FROM_LIST_PIGLETS_FAIL]: mergeFromListPigletsFail,

    [Types.CULLING_PIGLETS_REQUEST]: cullingPigletsRequest,
    [Types.CULLING_PIGLETS_SUCCESS]: cullingPigletsSuccess,
    [Types.CULLING_PIGLETS_FAIL]: cullingPigletsFail,
})
