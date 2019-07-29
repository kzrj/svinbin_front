import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getSowsRequest: ['payload'],
    getCullingSowsFail: ['error'],
    getCullingSowsSuccess: ['payload'],

    getCullingSowRequest: ['payload'],
    getCullingSowFail: ['error'],
    getCullingSowSuccess: ['payload'],

    // getSowsByToursRequest: ['payload'],
    // getSowsByToursFail: ['error'],
    // getSowsByToursSuccess: ['payload'],

    cullingSowRequest: ['payload'],
    cullingSowFail: ['error'],
    cullingSowSuccess: ['payload'],

    // sowsMoveManyToRequest: ['payload'],
    // sowsMoveManyFail: ['error'],
    // sowsMoveManySuccess: ['payload'],

    // sowFarrowRequest: ['payload'],
    // sowFarrowFail: ['error'],
    // sowFarrowSuccess: ['payload'],
})

export const Ws2Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    cullingList: [],
    cullingSow: null,
    sowsByTours: [],
    error: '',
})

/* ------------- Selectors ------------- */

export const Ws2Selectors = {
    getCullingSows: state => state.ws2.cullingList,
    getCullingSow: state => state.ws2.cullingList,
    cullingSow: state => state.ws2.cullingSow,
    // getSowsByTours: state => state.ws2.sowsByTours,
    // sowsMoveMany: state => state.Sows.sow,
}

/* ------------- Reducers ------------- */
// Get culling list
export const getCullingSowsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, cullingList: [] })
}

export const getCullingSowsSuccess = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[1]
    return state.merge({ fetching: false, error: null, cullingList: payload, cullingSow: sow })
}

export const getCullingSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, cullingList: [] })
}

// Get one culling
export const getCullingSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getCullingSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, cullingSow: payload })
}

export const getCullingSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error, cullingSow: null })
}

// Get sows by tours
// export const getSowsByToursRequest = (state, { payload }) => {
//     return state.merge({ fetching: true, ultrasoundList: [] })
// }

// export const getSowsByToursSuccess = (state, { payload }) => {
//     return state.merge({ fetching: false, error: null, sowsByTours: payload})
// }

// export const getSowsByToursFail = (state, { error }) => {
//     return state.merge({ fetching: false, error, sowsByTours: [] })
// }

// Culling
export const cullingSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const cullingSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, cullingSow: payload.sow,  })
}

export const cullingSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// // Move to
// export const sowMoveToRequest = (state, { payload }) => {
//     return state.merge({ fetching: true })
// }

// export const sowMoveToSuccess = (state, { payload }) => {
//     return state.merge({ fetching: false, error: null, sow: payload.sow, sowEvent: payload.transaction })
// }

// export const sowMoveToFail = (state, { error }) => {
//     return state.merge({ fetching: false, error: error.data })
// }

// Get sows by tours
// export const getSowsByToursRequest = (state, { payload }) => {
//     return state.merge({ fetching: true, ultrasoundList: [] })
// }

// export const getSowsByToursSuccess = (state, { payload }) => {
//     return state.merge({ fetching: false, error: null, sowsByTours: payload})
// }

// export const getSowsByToursFail = (state, { error }) => {
//     return state.merge({ fetching: false, error, sowsByTours: [] })
// }


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_CULLING_SOWS_REQUEST]: getCullingSowsRequest,
    [Types.GET_CULLING_SOWS_SUCCESS]: getCullingSowsSuccess,
    [Types.GET_CULLING_SOWS_FAIL]: getCullingSowsFail,

    [Types.GET_CULLING_SOW_REQUEST]: getCullingSowRequest,
    [Types.GET_CULLING_SOW_SUCCESS]: getCullingSowSuccess,
    [Types.GET_CULLING_SOW_FAIL]: getCullingSowFail,

    [Types.CULLING_SOW_REQUEST]: cullingSowRequest,
    [Types.CULLING_SOW_SUCCESS]: cullingSowSuccess,
    [Types.CULLING_SOW_FAIL]: cullingSowFail,

    // [Types.GET_SOWS_BY_TOURS_REQUEST]: getSowsByToursRequest,
    // [Types.GET_SOWS_BY_TOURS_SUCCESS]: getSowsByToursSuccess,
    // [Types.GET_SOWS_BY_TOURS_FAIL]: getSowsByToursFail,

    // [Types.SOW_MOVE_TO_REQUEST]: sowMoveToRequest,
    // [Types.SOW_MOVE_TO_SUCCESS]: sowMoveToSuccess,
    // [Types.SOW_MOVE_TO_FAIL]: sowMoveToFail,

    // [Types.SOW_FARROW_REQUEST]: sowFarrowRequest,
    // [Types.SOW_FARROW_SUCCESS]: sowFarrowSuccess,
    // [Types.SOW_FARROW_FAIL]: sowFarrowFail,
})