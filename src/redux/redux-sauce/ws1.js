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

    getCullingSowsWs1Request: ['payload'],
    getCullingSowsWs1Fail: ['error'],
    getCullingSowsWs1Success: ['payload'],

    getSeminationSowRequest: ['payload'],
    getSeminationSowFail: ['error'],
    getSeminationSowSuccess: ['payload'],

    getUltrasoundSowRequest: ['payload'],
    getUltrasoundSowFail: ['error'],
    getUltrasoundSowSuccess: ['payload'],

    getCullingSowWs1Request: ['payload'],
    getCullingSowWs1Fail: ['error'],
    getCullingSowWs1Success: ['payload'],

    seminationSowWs1Request: ['payload'],
    seminationSowWs1Fail: ['error'],
    seminationSowWs1Success: ['payload'],

    ultrasoundSowWs1Request: ['payload'],
    ultrasoundSowWs1Fail: ['error'],
    ultrasoundSowWs1Success: ['payload'],

    cullingSowWs1Request: ['payload'],
    cullingSowWs1Fail: ['error'],
    cullingSowWs1Success: ['payload'],

    getSowsByToursRequest: ['payload'],
    getSowsByToursFail: ['error'],
    getSowsByToursSuccess: ['payload'],

    setSeminationSow: ['payload'],

    getSeminatorsRequest: ['payload'],
    getSeminatorsFail: ['error'],
    getSeminatorsSuccess: ['payload'],

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
    seminators: [],
    error: '',
})

/* ------------- Selectors ------------- */

export const Ws1Selectors = {
    getSeminationSows: state => state.ws1.seminationList,
    getUltrasoundSows: state => state.ws1.ultrasoundList,
    getSeminationSow: state => state.ws1.seminationSow,
    getUltrasoundSow: state => state.ws1.ultrasoundSow,
    getCullingWs1Sows: state => state.ws1.cullingList,
    getCullingWs1Sow: state => state.ws1.cullingSow,
    seminationSowWs1: state => state.ws1.seminationSow,
    ultrasoundSowWs1: state => state.ws1.ultrasoundSow,
    cullingSowWs1: state => state.ws1.cullingSow,
    getSowsByTours: state => state.ws1.sowsByTours,
    setSeminationSow: state => state.ws1.seminationSow,
    getSeminators: state => state.ws1.seminators,
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
    if (payload.length > 0) sow = payload[0]
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
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, ultrasoundList: payload, ultrasoundSow: sow })
}

export const getUltrasoundSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundList: [] })
}

// Get culling list
export const getCullingSowsWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true, cullingList: [] })
}

export const getCullingSowsWs1Success = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, cullingList: payload, cullingSow: sow })
}

export const getCullingSowsWs1Fail = (state, { error }) => {
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
export const getCullingSowWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getCullingSowWs1Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, cullingSow: payload })
}

export const getCullingSowWs1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, cullingSow: null })
}

// Semination
export const seminationSowWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const seminationSowWs1Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, seminationSow: payload.sow, })
}

export const seminationSowWs1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Ultrasound
export const ultrasoundSowWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const ultrasoundSowWs1Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, ultrasoundSow: payload.sow, })
}

export const ultrasoundSowWs1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Culling
export const cullingSowWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const cullingSowWs1Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, cullingSow: payload.sow, })
}

export const cullingSowWs1Fail = (state, { error }) => {
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

// Set semination sow
export const setSeminationSow = (state, { payload }) => {
    return state.merge({seminationSow: payload, })
}

// Get semination list
export const getSeminatorsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, seminators: [] })
}

export const getSeminatorsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, seminators: payload, })
}

export const getSeminatorsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, seminators: [] })
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

    [Types.GET_CULLING_SOWS_WS1_REQUEST]: getCullingSowsWs1Request,
    [Types.GET_CULLING_SOWS_WS1_SUCCESS]: getCullingSowsWs1Success,
    [Types.GET_CULLING_SOWS_WS1_FAIL]: getCullingSowsWs1Fail,

    [Types.GET_SEMINATION_SOW_REQUEST]: getSeminationSowRequest,
    [Types.GET_SEMINATION_SOW_SUCCESS]: getSeminationSowSuccess,
    [Types.GET_SEMINATION_SOW_FAIL]: getSeminationSowFail,

    [Types.GET_ULTRASOUND_SOW_REQUEST]: getUltrasoundSowRequest,
    [Types.GET_ULTRASOUND_SOW_SUCCESS]: getUltrasoundSowSuccess,
    [Types.GET_ULTRASOUND_SOW_FAIL]: getUltrasoundSowFail,

    [Types.GET_CULLING_SOW_WS1_REQUEST]: getCullingSowWs1Request,
    [Types.GET_CULLING_SOW_WS1_SUCCESS]: getCullingSowWs1Success,
    [Types.GET_CULLING_SOW_WS1_FAIL]: getCullingSowWs1Fail,

    [Types.SEMINATION_SOW_WS1_REQUEST]: seminationSowWs1Request,
    [Types.SEMINATION_SOW_WS1_SUCCESS]: seminationSowWs1Success,
    [Types.SEMINATION_SOW_WS1_FAIL]: seminationSowWs1Fail,

    [Types.ULTRASOUND_SOW_WS1_REQUEST]: ultrasoundSowWs1Request,
    [Types.ULTRASOUND_SOW_WS1_SUCCESS]: ultrasoundSowWs1Success,
    [Types.ULTRASOUND_SOW_WS1_FAIL]: ultrasoundSowWs1Fail,

    [Types.CULLING_SOW_WS1_REQUEST]: cullingSowWs1Request,
    [Types.CULLING_SOW_WS1_SUCCESS]: cullingSowWs1Success,
    [Types.CULLING_SOW_WS1_FAIL]: cullingSowWs1Fail,

    [Types.GET_SOWS_BY_TOURS_REQUEST]: getSowsByToursRequest,
    [Types.GET_SOWS_BY_TOURS_SUCCESS]: getSowsByToursSuccess,
    [Types.GET_SOWS_BY_TOURS_FAIL]: getSowsByToursFail,

    [Types.SET_SEMINATION_SOW]: setSeminationSow,

    [Types.GET_SEMINATORS_REQUEST]: getSeminatorsRequest,
    [Types.GET_SEMINATORS_SUCCESS]: getSeminatorsSuccess,
    [Types.GET_SEMINATORS_FAIL]: getSeminatorsFail,

    // [Types.SOW_MOVE_TO_REQUEST]: sowMoveToRequest,
    // [Types.SOW_MOVE_TO_SUCCESS]: sowMoveToSuccess,
    // [Types.SOW_MOVE_TO_FAIL]: sowMoveToFail,
})