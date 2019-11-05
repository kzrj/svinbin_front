import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getSeminatorsRequest: ['payload'],
    getSeminatorsFail: ['error'],
    getSeminatorsSuccess: ['payload'],

    importSeminationsFromFarmRequest: ['payload'],
    importSeminationsFromFarmFail: ['error'],
    importSeminationsFromFarmSuccess: ['payload'],

    getInfoWs3Request: ['payload'],
    getInfoWs3Fail: ['error'],
    getInfoWs3Success: ['payload'],
})

export const WsDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    seminators: [],
    import_from_file_data: null,
    info_ws3: null,
    error: null,
    message: null
})

/* ------------- Selectors ------------- */

export const WsDataSelectors = {
    getSeminators: state => state.ws1.seminators,
}

/* ------------- Reducers ------------- */

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

// import farm
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

// info ws3
export const getInfoWs3Request = (state, { payload }) => {
    return state.merge({ fetching: true, info_ws3: null })
}

export const getInfoWs3Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, info_ws3: payload,
        message: payload.message })
}

export const getInfoWs3Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, info_ws3: null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SEMINATORS_REQUEST]: getSeminatorsRequest,
    [Types.GET_SEMINATORS_SUCCESS]: getSeminatorsSuccess,
    [Types.GET_SEMINATORS_FAIL]: getSeminatorsFail,

    [Types.IMPORT_SEMINATIONS_FROM_FARM_REQUEST]: importSeminationsFromFarmRequest,
    [Types.IMPORT_SEMINATIONS_FROM_FARM_SUCCESS]: importSeminationsFromFarmSuccess,
    [Types.IMPORT_SEMINATIONS_FROM_FARM_FAIL]: importSeminationsFromFarmFail,

    [Types.GET_INFO_WS3_REQUEST]: getInfoWs3Request,
    [Types.GET_INFO_WS3_SUCCESS]: getInfoWs3Success,
    [Types.GET_INFO_WS3_FAIL]: getInfoWs3Fail,
})