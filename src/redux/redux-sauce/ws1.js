import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getSeminationSowsRequest: ['payload'],
    getSeminationSowsFail: ['error'],
    getSeminationSowsSuccess: ['payload'],

    getUltrasoundSowsRequest: ['payload'],
    getUltrasoundSowsFail: ['error'],
    getUltrasoundSowsSuccess: ['payload'],

    getCullingSowsRequest: ['payload'],
    getCullingSowsFail: ['error'],
    getCullingSowsSuccess: ['payload'],

    getSeminationSowRequest: ['payload'],
    getSeminationSowFail: ['error'],
    getSeminationSowSuccess: ['payload'],

    getUltrasoundSowRequest: ['payload'],
    getUltrasoundSowFail: ['error'],
    getUltrasoundSowSuccess: ['payload'],

    getCullingSowRequest: ['payload'],
    getCullingSowFail: ['error'],
    getCullingSowSuccess: ['payload'],

    seminationSowRequest: ['payload'],
    seminationSowFail: ['error'],
    seminationSowSuccess: ['payload'],

    ultrasoundSowRequest: ['payload'],
    ultrasoundSowFail: ['error'],
    ultrasoundSowSuccess: ['payload'],

    cullingSowRequest: ['payload'],
    cullingSowFail: ['error'],
    cullingSowSuccess: ['payload'],

    getSowsByToursRequest: ['payload'],
    getSowsByToursFail: ['error'],
    getSowsByToursSuccess: ['payload'],

    // sowMoveToRequest: ['payload'],
    // sowMoveToFail: ['error'],
    // sowMoveToSuccess: ['payload'],

    // sowsMoveManyToRequest: ['payload'],
    // sowsMoveManyFail: ['error'],
    // sowsMoveManySuccess: ['payload'],
})

export const Ws1Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    seminationList: [],
    ultrasoundList: [],
    cullingList: [],
    sow: null,
    seminationSow: null,
    ultrasoundSow: null,
    cullingSow: null,
    sowsByTours: [],
    error: '',
})

/* ------------- Selectors ------------- */

export const Ws1Selectors = {
    getSeminationSows: state => state.ws1.seminationList,
    getUltrasoundSows: state => state.ws1.ultrasoundList,
    getSeminationSow: state => state.ws1.seminationSow,
    getUltrasoundSow: state => state.ws1.ultrasoundSow,
    getCullingSows: state => state.ws1.cullingList,
    getCullingSow: state => state.ws1.cullingSow,
    seminationSow: state => state.ws1.seminationSow,
    ultrasoundSow: state => state.ws1.ultrasoundSow,
    cullingSow: state => state.ws1.cullingSow,
    getSowsByTours: state => state.ws1.sowsByTours,
    // sowMoveTo: state => state.Sows.sow,
    // // sowsMoveMany: state => state.Sows.sow,
}

/* ------------- Reducers ------------- */
// Get semination list
export const getSeminationSowsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, seminationList: [] })
}

export const getSeminationSowsSuccess = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[1]
    return state.merge({ fetching: false, error: null, seminationList: payload, seminationSow: sow })
}

export const getSeminationSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, seminationList: [] })
}

// Get ultrasound list
export const getUltrasoundSowsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, ultrasoundList: [] })
}

export const getUltrasoundSowsSuccess = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[1]
    return state.merge({ fetching: false, error: null, ultrasoundList: payload, ultrasoundSow: sow })
}

export const getUltrasoundSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundList: [] })
}

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

// Get one semination
export const getSeminationSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getSeminationSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, seminationSow: payload })
}

export const getSeminationSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error, seminationSow: null })
}

// Get one ultrasound
export const getUltrasoundSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getUltrasoundSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, ultrasoundSow: payload })
}

export const getUltrasoundSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundSow: null })
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

// Semination
export const seminationSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const seminationSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, seminationSow: payload.sow, })
}

export const seminationSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Ultrasound
export const ultrasoundSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const ultrasoundSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, ultrasoundSow: payload.sow, })
}

export const ultrasoundSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Culling
export const cullingSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const cullingSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, cullingSow: payload.sow, })
}

export const cullingSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Get sows by tours
export const getSowsByToursRequest = (state, { payload }) => {
    return state.merge({ fetching: true, ultrasoundList: [] })
}

export const getSowsByToursSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sowsByTours: payload})
}

export const getSowsByToursFail = (state, { error }) => {
    return state.merge({ fetching: false, error, sowsByTours: [] })
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

// // Sow Farrow
// export const sowFarrowRequest = (state, { payload }) => {
//     return state.merge({ fetching: true })
// }

// export const sowFarrowSuccess = (state, { payload }) => {
//     return state.merge({ fetching: false, error: null, sow: payload.sow, sowEvent: payload.farrow })
// }

// export const sowFarrowFail = (state, { error }) => {
//     return state.merge({ fetching: false, error: error.data })
// }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SEMINATION_SOWS_REQUEST]: getSeminationSowsRequest,
    [Types.GET_SEMINATION_SOWS_SUCCESS]: getSeminationSowsSuccess,
    [Types.GET_SEMINATION_SOWS_FAIL]: getSeminationSowsFail,

    [Types.GET_ULTRASOUND_SOWS_REQUEST]: getUltrasoundSowsRequest,
    [Types.GET_ULTRASOUND_SOWS_SUCCESS]: getUltrasoundSowsSuccess,
    [Types.GET_ULTRASOUND_SOWS_FAIL]: getUltrasoundSowsFail,

    [Types.GET_CULLING_SOWS_REQUEST]: getCullingSowsRequest,
    [Types.GET_CULLING_SOWS_SUCCESS]: getCullingSowsSuccess,
    [Types.GET_CULLING_SOWS_FAIL]: getCullingSowsFail,

    [Types.GET_SEMINATION_SOW_REQUEST]: getSeminationSowRequest,
    [Types.GET_SEMINATION_SOW_SUCCESS]: getSeminationSowSuccess,
    [Types.GET_SEMINATION_SOW_FAIL]: getSeminationSowFail,

    [Types.GET_ULTRASOUND_SOW_REQUEST]: getUltrasoundSowRequest,
    [Types.GET_ULTRASOUND_SOW_SUCCESS]: getUltrasoundSowSuccess,
    [Types.GET_ULTRASOUND_SOW_FAIL]: getUltrasoundSowFail,

    [Types.GET_CULLING_SOW_REQUEST]: getCullingSowRequest,
    [Types.GET_CULLING_SOW_SUCCESS]: getCullingSowSuccess,
    [Types.GET_CULLING_SOW_FAIL]: getCullingSowFail,

    [Types.SEMINATION_SOW_REQUEST]: seminationSowRequest,
    [Types.SEMINATION_SOW_SUCCESS]: seminationSowSuccess,
    [Types.SEMINATION_SOW_FAIL]: seminationSowFail,

    [Types.ULTRASOUND_SOW_REQUEST]: ultrasoundSowRequest,
    [Types.ULTRASOUND_SOW_SUCCESS]: ultrasoundSowSuccess,
    [Types.ULTRASOUND_SOW_FAIL]: ultrasoundSowFail,

    [Types.CULLING_SOW_REQUEST]: cullingSowRequest,
    [Types.CULLING_SOW_SUCCESS]: cullingSowSuccess,
    [Types.CULLING_SOW_FAIL]: cullingSowFail,

    [Types.GET_SOWS_BY_TOURS_REQUEST]: getSowsByToursRequest,
    [Types.GET_SOWS_BY_TOURS_SUCCESS]: getSowsByToursSuccess,
    [Types.GET_SOWS_BY_TOURS_FAIL]: getSowsByToursFail,

    // [Types.SOW_MOVE_TO_REQUEST]: sowMoveToRequest,
    // [Types.SOW_MOVE_TO_SUCCESS]: sowMoveToSuccess,
    // [Types.SOW_MOVE_TO_FAIL]: sowMoveToFail,
})