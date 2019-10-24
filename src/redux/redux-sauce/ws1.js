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

    getUltrasoundV2SowWs1Request: ['payload'],
    getUltrasoundV2SowWs1Fail: ['error'],
    getUltrasoundV2SowWs1Success: ['payload'],

    getCullingSowWs1Request: ['payload'],
    getCullingSowWs1Fail: ['error'],
    getCullingSowWs1Success: ['payload'],

    seminationSowWs1Request: ['payload'],
    seminationSowWs1Fail: ['error'],
    seminationSowWs1Success: ['payload'],

    ultrasoundSowWs1Request: ['payload'],
    ultrasoundSowWs1Fail: ['error'],
    ultrasoundSowWs1Success: ['payload'],

    ultrasoundV2SowWs1Request: ['payload'],
    ultrasoundV2SowWs1Fail: ['error'],
    ultrasoundV2SowWs1Success: ['payload'],

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

    getUltrasoundV2SowsWs1Request: ['payload'],
    getUltrasoundV2SowsWs1Fail: ['error'],
    getUltrasoundV2SowsWs1Success: ['payload'],
    
    createNewSowWs1Request: ['payload'],
    createNewSowWs1Fail: ['error'],
    createNewSowWs1Success: ['payload'],

    importSeminationsFromFarmRequest: ['payload'],
    importSeminationsFromFarm1Fail: ['error'],
    importSeminationsFromFarmSuccess: ['payload'],

})

export const Ws1Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    seminationList: [],
    ultrasoundList: [],
    ultrasoundV2List: [],
    cullingList: [],
    sow: null,
    tours_info: [],
    seminationSow: null,
    ultrasoundSow: null,
    ultrasoundV2Sow: null,
    cullingSow: null,
    sowsByTours: [],
    seminators: [],
    createdSow: null,
    import_from_file_data: null,
    error: null,
    message: null
})

/* ------------- Selectors ------------- */

export const Ws1Selectors = {
    getSeminationSows: state => state.ws1.seminationList,
    getUltrasoundSows: state => state.ws1.ultrasoundList,
    getUltrasoundV2SowsWs1: state => state.ws1.ultrasoundV2List,
    getSeminationSow: state => state.ws1.seminationSow,
    getUltrasoundSow: state => state.ws1.ultrasoundSow,
    getUltrasoundV2Ws1Sow: state => state.ws1.ultrasoundV2Sow,
    getCullingWs1Sows: state => state.ws1.cullingList,
    getCullingWs1Sow: state => state.ws1.cullingSow,
    seminationSowWs1: state => state.ws1.seminationSow,
    ultrasoundSowWs1: state => state.ws1.ultrasoundSow,
    ultrasoundV2SowWs1: state => state.ws1.ultrasoundV2Sow,
    cullingSowWs1: state => state.ws1.cullingSow,
    getSowsByTours: state => state.ws1.sowsByTours,
    setSeminationSow: state => state.ws1.seminationSow,
    getSeminators: state => state.ws1.seminators,
    createNewSowWs1: state => state.ws1.createdSow,
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
    return state.merge({ fetching: false, error: null, seminationList: payload, 
        seminationSow: sow })
}

export const getSeminationSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, seminationList: [], seminationSow: null })
}

// Get ultrasound list
export const getUltrasoundSowsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, ultrasoundList: [] })
}

export const getUltrasoundSowsSuccess = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, ultrasoundList: payload, 
        ultrasoundSow: sow, })
}

export const getUltrasoundSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundList: [], ultrasoundSow: null })
}

// Get ultrasoundv2 list
export const getUltrasoundV2SowsWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true, ultrasoundV2List: [] })
}

export const getUltrasoundV2SowsWs1Success = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, ultrasoundV2List: payload,
         ultrasoundV2Sow: sow })
}

export const getUltrasoundV2SowsWs1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundV2List: [] })
}

// Get culling list
export const getCullingSowsWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true, cullingList: [] })
}

export const getCullingSowsWs1Success = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, cullingList: payload,
         cullingSow: sow, })
}

export const getCullingSowsWs1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, cullingList: [], cullingSow: null })
}

// Get one semination
export const getSeminationSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getSeminationSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, seminationSow: payload.sow,
    tours_info: payload.tours_info })
}

export const getSeminationSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error, seminationSow: null, tours_info: []})
}

// Get one ultrasound
export const getUltrasoundSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getUltrasoundSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, ultrasoundSow: payload.sow, 
        tours_info: payload.tours_info})
}

export const getUltrasoundSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundSow: null, tours_info: [] })
}

// Get one ultrasoundV2
export const getUltrasoundV2SowWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getUltrasoundV2SowWs1Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, ultrasoundV2Sow: payload.sow,
        tours_info: payload.tours_info})
}

export const getUltrasoundV2SowWs1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, ultrasoundV2Sow: null, tours_info: [] })
}

// Get one culling
export const getCullingSowWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getCullingSowWs1Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, cullingSow: payload.sow,
        tours_info: payload.tours_info})
}

export const getCullingSowWs1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, cullingSow: null, tours_info: []})
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

// UltrasoundV2
export const ultrasoundV2SowWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const ultrasoundV2SowWs1Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, ultrasoundV2Sow: payload.sow, })
}

export const ultrasoundV2SowWs1Fail = (state, { error }) => {
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

// Get create new
export const createNewSowWs1Request = (state, { payload }) => {
    return state.merge({ fetching: true, createdSow: [] })
}

export const createNewSowWs1Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, createdSow: payload.sow,
        message: payload.message })
}

export const createNewSowWs1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, createdSow: [] })
}

// Get create new
export const importSeminationsFromFarmRequest = (state, { payload }) => {
    return state.merge({ fetching: true, import_from_file_data: null })
}

export const importSeminationsFromFarmSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, import_from_file_data: payload,
        message: payload.message })
}

export const importSeminationsFromFarmFail = (state, { error }) => {
    return state.merge({ fetching: false, error, import_from_file_data: null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SEMINATION_SOWS_REQUEST]: getSeminationSowsRequest,
    [Types.GET_SEMINATION_SOWS_SUCCESS]: getSeminationSowsSuccess,
    [Types.GET_SEMINATION_SOWS_FAIL]: getSeminationSowsFail,

    [Types.GET_ULTRASOUND_SOWS_REQUEST]: getUltrasoundSowsRequest,
    [Types.GET_ULTRASOUND_SOWS_SUCCESS]: getUltrasoundSowsSuccess,
    [Types.GET_ULTRASOUND_SOWS_FAIL]: getUltrasoundSowsFail,

    [Types.GET_ULTRASOUND_V2_SOWS_WS1_REQUEST]: getUltrasoundV2SowsWs1Request,
    [Types.GET_ULTRASOUND_V2_SOWS_WS1_SUCCESS]: getUltrasoundV2SowsWs1Success,
    [Types.GET_ULTRASOUND_V2_SOWS_WS1_FAIL]: getUltrasoundV2SowsWs1Fail,

    [Types.GET_CULLING_SOWS_WS1_REQUEST]: getCullingSowsWs1Request,
    [Types.GET_CULLING_SOWS_WS1_SUCCESS]: getCullingSowsWs1Success,
    [Types.GET_CULLING_SOWS_WS1_FAIL]: getCullingSowsWs1Fail,

    [Types.GET_SEMINATION_SOW_REQUEST]: getSeminationSowRequest,
    [Types.GET_SEMINATION_SOW_SUCCESS]: getSeminationSowSuccess,
    [Types.GET_SEMINATION_SOW_FAIL]: getSeminationSowFail,

    [Types.GET_ULTRASOUND_SOW_REQUEST]: getUltrasoundSowRequest,
    [Types.GET_ULTRASOUND_SOW_SUCCESS]: getUltrasoundSowSuccess,
    [Types.GET_ULTRASOUND_SOW_FAIL]: getUltrasoundSowFail,

    [Types.GET_ULTRASOUND_V2_SOW_WS1_REQUEST]: getUltrasoundV2SowWs1Request,
    [Types.GET_ULTRASOUND_V2_SOW_WS1_SUCCESS]: getUltrasoundV2SowWs1Success,
    [Types.GET_ULTRASOUND_V2_SOW_WS1_FAIL]: getUltrasoundV2SowWs1Fail,

    [Types.GET_CULLING_SOW_WS1_REQUEST]: getCullingSowWs1Request,
    [Types.GET_CULLING_SOW_WS1_SUCCESS]: getCullingSowWs1Success,
    [Types.GET_CULLING_SOW_WS1_FAIL]: getCullingSowWs1Fail,

    [Types.SEMINATION_SOW_WS1_REQUEST]: seminationSowWs1Request,
    [Types.SEMINATION_SOW_WS1_SUCCESS]: seminationSowWs1Success,
    [Types.SEMINATION_SOW_WS1_FAIL]: seminationSowWs1Fail,

    [Types.ULTRASOUND_SOW_WS1_REQUEST]: ultrasoundSowWs1Request,
    [Types.ULTRASOUND_SOW_WS1_SUCCESS]: ultrasoundSowWs1Success,
    [Types.ULTRASOUND_SOW_WS1_FAIL]: ultrasoundSowWs1Fail,

    [Types.ULTRASOUND_V2_SOW_WS1_REQUEST]: ultrasoundV2SowWs1Request,
    [Types.ULTRASOUND_V2_SOW_WS1_SUCCESS]: ultrasoundV2SowWs1Success,
    [Types.ULTRASOUND_V2_SOW_WS1_FAIL]: ultrasoundV2SowWs1Fail,

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

    [Types.CREATE_NEW_SOW_WS1_REQUEST]: createNewSowWs1Request,
    [Types.CREATE_NEW_SOW_WS1_SUCCESS]: createNewSowWs1Success,
    [Types.CREATE_NEW_SOW_WS1_FAIL]: createNewSowWs1Fail,

    [Types.IMPORT_SEMINATIONS_FROM_FARM_REQUEST]: importSeminationsFromFarmRequest,
    [Types.IMPORT_SEMINATIONS_FROM_FARM_SUCCESS]: importSeminationsFromFarmSuccess,
    [Types.IMPORT_SEMINATIONS_FROM_FARM_FAIL]: importSeminationsFromFarmFail,
})