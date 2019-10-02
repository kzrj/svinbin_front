import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getNewbornPigletsRequest: ['payload'],
    getNewbornPigletsFail: ['error'],
    getNewbornPigletsSuccess: ['payload'],

    // cullingNewbornPigletsRequest: ['payload'],
    // cullingNewbornPigletsFail: ['error'],
    // cullingNewbornPigletsSuccess: ['payload'],

    // cullingGiltNewbornPigletsRequest: ['payload'],
    // cullingGiltNewbornPigletsFail: ['error'],
    // cullingGiltNewbornPigletsSuccess: ['payload'],

    mergeNewbornPigletsRequest: ['payload'],
    mergeNewbornPigletsFail: ['payload'],
    mergeNewbornPigletsSuccess: ['payload'],

    createGiltRequest: ['payload'],
    createGiltFail: ['payload'],
    createGiltSuccess: ['payload'],
})

export const NewbornPigletsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    listFetching: false,
    eventFetching: false,
    list: [],
    newbornGroup: null,
    event: null,
    merge: null,
    error: ''
})

/* ------------- Selectors ------------- */

export const NewbornPigletsSelectors = {
    getNewbornPigletsRequest: state => state.newbornPiglets.list,
    // cullingNewbornPigletsRequest: state => state.newbornPiglets.newbornGroup,
    // cullingGiltPiglets: state => state.newbornPiglets.newbornGroup,
    mergeNewbornPiglets: state => state.newbornPiglets.merge,
    // createGilt: state => state.createGilt.merge,
}

/* ------------- Reducers ------------- */
// Get
export const getNewbornPigletsRequest = (state, { payload }) => {
    return state.merge({ listFetching: true, list: [] })
}

export const getNewbornPigletsSuccess = (state, { payload }) => {
    return state.merge({ listFetching: false, error: null, list: payload })
}

export const getNewbornPigletsFail = (state, { error }) => {
    return state.merge({ listFetching: false, error, list: [] })
}

// // Culling
// export const cullingNewbornPigletsRequest = (state, { payload }) => {
//     return state.merge({ eventFetching: true })
// }

// export const cullingNewbornPigletsSuccess = (state, { payload }) => {
//     return state.merge({ eventFetching: false, error: null, newbornGroup: payload.piglets_group, 
//         event: payload.culling })
// }

// export const cullingNewbornPigletsFail = (state, { error }) => {
//     return state.merge({ eventFetching: false, error, newbornGroup: null, 
//         event: null })
// }

// // Culling gilts
// export const cullingGiltNewbornPigletsRequest = (state, { payload }) => {
//     return state.merge({ eventFetching: true })
// }

// export const cullingGiltNewbornPigletsSuccess = (state, { payload }) => {
//     return state.merge({ eventFetching: false, error: null, newbornGroup: payload.piglets_group, 
//         event: payload.culling })
// }

// export const cullingGiltNewbornPigletsFail = (state, { error }) => {
//     return state.merge({ eventFetching: false, error, newbornGroup: null, 
//         event: null })
// }

// Merge
export const mergeNewbornPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const mergeNewbornPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, newbornGroup: payload.piglets_group, 
        event: payload.transaction })
}

export const mergeNewbornPigletsFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, newbornGroup: null, 
        event: null })
}

// Create gilt
export const createGiltRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const createGiltSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, })
}

export const createGiltFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_NEWBORN_PIGLETS_REQUEST]: getNewbornPigletsRequest,
    [Types.GET_NEWBORN_PIGLETS_SUCCESS]: getNewbornPigletsSuccess,
    [Types.GET_NEWBORN_PIGLETS_FAIL]: getNewbornPigletsFail,

    // [Types.CULLING_NEWBORN_PIGLETS_REQUEST]: cullingNewbornPigletsRequest,
    // [Types.CULLING_NEWBORN_PIGLETS_SUCCESS]: cullingNewbornPigletsSuccess,
    // [Types.CULLING_NEWBORN_PIGLETS_FAIL]: cullingNewbornPigletsFail,

    // [Types.CULLING_GILT_PIGLETS_REQUEST]: cullingGiltNewbornPigletsRequest,
    // [Types.CULLING_GILT_PIGLETS_SUCCESS]: cullingGiltNewbornPigletsSuccess,
    // [Types.CULLING_GILT_PIGLETS_FAIL]: cullingGiltNewbornPigletsFail,

    [Types.MERGE_NEWBORN_PIGLETS_REQUEST]: mergeNewbornPigletsRequest,
    [Types.MERGE_NEWBORN_PIGLETS_SUCCESS]: mergeNewbornPigletsSuccess,
    [Types.MERGE_NEWBORN_PIGLETS_FAIL]: mergeNewbornPigletsFail,

    [Types.CREATE_GILT_REQUEST]: createGiltRequest,
    [Types.CREATE_GILT_SUCCESS]: createGiltSuccess,
    [Types.CREATE_GILT_FAIL]: createGiltFail,
})
