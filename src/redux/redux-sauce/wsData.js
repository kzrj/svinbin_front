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

    getBalancesByToursWs3Request: ['payload'],
    getBalancesByToursWs3Fail: ['error'],
    getBalancesByToursWs3Success: ['payload'],

    ws3TransferSowAndPigletsRequest: ['payload'],
    ws3TransferSowAndPigletsFail: ['error'],
    ws3TransferSowAndPigletsSuccess: ['payload'],

    wsDataResetErrorsAndMessages: null,
})

export const WsDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    seminators: [],
    import_from_file_data: null,
    balances_by_tours: null,
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

// balances by tours ws3
export const getBalancesByToursWs3Request = (state, { payload }) => {
    return state.merge({ fetching: true, balances_by_tours: null })
}

export const getBalancesByToursWs3Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, balances_by_tours: payload,
        message: payload.message })
}

export const getBalancesByToursWs3Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, balances_by_tours: null })
}

// ws3TransferSowAndPiglets
export const ws3TransferSowAndPigletsRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const ws3TransferSowAndPigletsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, message: payload.message })
}

export const ws3TransferSowAndPigletsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, message: null })
}

// resetErrorsAndMessages
export const wsDataResetErrorsAndMessages = (state) => {
    return state.merge({ fetching: false, error: null, message: '' })
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

    [Types.GET_BALANCES_BY_TOURS_WS3_REQUEST]: getBalancesByToursWs3Request,
    [Types.GET_BALANCES_BY_TOURS_WS3_SUCCESS]: getBalancesByToursWs3Success,
    [Types.GET_BALANCES_BY_TOURS_WS3_FAIL]: getBalancesByToursWs3Fail,

    [Types.WS3_TRANSFER_SOW_AND_PIGLETS_REQUEST]: ws3TransferSowAndPigletsRequest,
    [Types.WS3_TRANSFER_SOW_AND_PIGLETS_SUCCESS]: ws3TransferSowAndPigletsSuccess,
    [Types.WS3_TRANSFER_SOW_AND_PIGLETS_FAIL]: ws3TransferSowAndPigletsFail,

    [Types.WS_DATA_RESET_ERRORS_AND_MESSAGES]: wsDataResetErrorsAndMessages,
})