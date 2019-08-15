import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getCullingSowsWs2Request: ['payload'],
    getCullingSowsWs2Fail: ['error'],
    getCullingSowsWs2Success: ['payload'],

    getCullingSowWs2Request: ['payload'],
    getCullingSowWs2Fail: ['error'],
    getCullingSowWs2Success: ['payload'],

    getSowsByToursWs2Request: ['payload'],
    getSowsByToursWs2Fail: ['error'],
    getSowsByToursWs2Success: ['payload'],

    cullingSowWs2Request: ['payload'],
    cullingSowWs2Fail: ['error'],
    cullingSowWs2Success: ['payload'],

    getUltrasoundV2SowWs2Request: ['payload'],
    getUltrasoundV2SowWs2Fail: ['error'],
    getUltrasoundV2SowWs2Success: ['payload'],

    getUltrasoundV2SowsWs2Request: ['payload'],
    getUltrasoundV2SowsWs2Fail: ['error'],
    getUltrasoundV2SowsWs2Success: ['payload'],

    ultrasoundV2SowWs2Request: ['payload'],
    ultrasoundV2SowWs2Fail: ['error'],
    ultrasoundV2SowWs2Success: ['payload'],

})

export const Ws2Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    cullingList: [],
    cullingSow: null,
    ultrasoundV2List: [],
    ultrasoundV2Sow: null,
    sowsByTours: [],
    error: '',
})

/* ------------- Selectors ------------- */

export const Ws2Selectors = {
    getCullingSowsWs2: state => state.ws2.cullingList,
    getCullingSowWs2: state => state.ws2.cullingSow,
    cullingSowWs2: state => state.ws2.cullingSow,
    getSowsByToursWs2: state => state.ws2.sowsByTours,
    getUltrasoundV2SowsWs2: state => state.ws2.ultrasoundV2List,
    getUltrasoundV2Ws2Sow: state => state.ws2.ultrasoundV2Sow,
    ultrasoundV2SowWs2: state => state.ws2.ultrasoundV2Sow,
}

/* ------------- Reducers ------------- */
// Get culling list
export const getCullingSowsWs2Request = (state, { payload }) => {
    return state.merge({ fetching: true, cullingList: [] })
}

export const getCullingSowsWs2Success = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, cullingList: payload, cullingSow: sow })
}

export const getCullingSowsWs2Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, cullingList: [] })
}

// Get one culling
export const getCullingSowWs2Request = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getCullingSowWs2Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, cullingSow: payload })
}

export const getCullingSowWs2Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, cullingSow: null })
}

// Get sows by tours
export const getSowsByToursWs2Request = (state, { payload }) => {
    return state.merge({ fetching: true, sowsByTours: [] })
}

export const getSowsByToursWs2Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sowsByTours: payload})
}

export const getSowsByToursWs2Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, sowsByTours: [] })
}

// Culling
export const cullingSowWs2Request = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const cullingSowWs2Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, cullingSow: payload.sow,  })
}

export const cullingSowWs2Fail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Get ultrasoundv2 list
export const getUltrasoundV2SowsWs2Request = (state, { payload }) => {
    return state.merge({ fetching: true, ultrasoundV2List: [] })
}

export const getUltrasoundV2SowsWs2Success = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, ultrasoundV2List: payload,
         ultrasoundV2Sow: sow })
}

export const getUltrasoundV2SowsWs2Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundV2List: [] })
}

// Get one ultrasoundV2
export const getUltrasoundV2SowWs2Request = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getUltrasoundV2SowWs2Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, ultrasoundV2Sow: payload })
}

export const getUltrasoundV2SowWs2Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundV2Sow: null })
}

// UltrasoundV2
export const ultrasoundV2SowWs2Request = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const ultrasoundV2SowWs2Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, ultrasoundV2Sow: payload.sow, })
}

export const ultrasoundV2SowWs2Fail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_CULLING_SOWS_WS2_REQUEST]: getCullingSowsWs2Request,
    [Types.GET_CULLING_SOWS_WS2_SUCCESS]: getCullingSowsWs2Success,
    [Types.GET_CULLING_SOWS_WS2_FAIL]: getCullingSowsWs2Fail,

    [Types.GET_CULLING_SOW_WS2_REQUEST]: getCullingSowWs2Request,
    [Types.GET_CULLING_SOW_WS2_SUCCESS]: getCullingSowWs2Success,
    [Types.GET_CULLING_SOW_WS2_FAIL]: getCullingSowWs2Fail,

    [Types.CULLING_SOW_WS2_REQUEST]: cullingSowWs2Request,
    [Types.CULLING_SOW_WS2_SUCCESS]: cullingSowWs2Success,
    [Types.CULLING_SOW_WS2_FAIL]: cullingSowWs2Fail,

    [Types.GET_SOWS_BY_TOURS_WS2_REQUEST]: getSowsByToursWs2Request,
    [Types.GET_SOWS_BY_TOURS_WS2_SUCCESS]: getSowsByToursWs2Success,
    [Types.GET_SOWS_BY_TOURS_WS2_FAIL]: getSowsByToursWs2Fail,

    [Types.GET_ULTRASOUND_V2_SOWS_WS2_REQUEST]: getUltrasoundV2SowsWs2Request,
    [Types.GET_ULTRASOUND_V2_SOWS_WS2_SUCCESS]: getUltrasoundV2SowsWs2Success,
    [Types.GET_ULTRASOUND_V2_SOWS_WS2_FAIL]: getUltrasoundV2SowsWs2Fail,

    [Types.GET_ULTRASOUND_V2_SOW_WS2_REQUEST]: getUltrasoundV2SowWs2Request,
    [Types.GET_ULTRASOUND_V2_SOW_WS2_SUCCESS]: getUltrasoundV2SowWs2Success,
    [Types.GET_ULTRASOUND_V2_SOW_WS2_FAIL]: getUltrasoundV2SowWs2Fail,

    [Types.ULTRASOUND_V2_SOW_WS2_REQUEST]: ultrasoundV2SowWs2Request,
    [Types.ULTRASOUND_V2_SOW_WS2_SUCCESS]: ultrasoundV2SowWs2Success,
    [Types.ULTRASOUND_V2_SOW_WS2_FAIL]: ultrasoundV2SowWs2Fail,
})