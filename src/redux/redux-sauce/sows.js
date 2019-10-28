import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getSowsRequest: ['payload'],
    getSowsFail: ['error'],
    getSowsSuccess: ['payload'],

    getSowRequest: ['payload'],
    getSowFail: ['error'],
    getSowSuccess: ['payload'],

    seminationSowRequest: ['payload'],
    seminationSowFail: ['error'],
    seminationSowSuccess: ['payload'],

    ultrasoundSowRequest: ['payload'],
    ultrasoundSowFail: ['error'],
    ultrasoundSowSuccess: ['payload'],

    cullingSowRequest: ['payload'],
    cullingSowFail: ['error'],
    cullingSowSuccess: ['payload'],

    sowMoveToRequest: ['payload'],
    sowMoveToFail: ['error'],
    sowMoveToSuccess: ['payload'],

    sowsMoveManyRequest: ['payload'],
    sowsMoveManyFail: ['error'],
    sowsMoveManySuccess: ['payload'],

    sowFarrowRequest: ['payload'],
    sowFarrowFail: ['error'],
    sowFarrowSuccess: ['payload'],

    createNewSowRequest: ['payload'],
    createNewSowFail: ['error'],
    createNewSowSuccess: ['payload'],

    createNewNonameSowRequest: ['payload'],
    createNewNonameSowFail: ['error'],
    createNewNonameSowSuccess: ['payload'],

    getBoarsRequest: ['payload'],
    getBoarsFail: ['error'],
    getBoarsSuccess: ['payload'],

    addNewSeminatedToWs1Request: ['payload'],
    addNewSeminatedToWs1Fail: ['error'],
    addNewSeminatedToWs1Success: ['payload'],

    massSeminationRequest: ['payload'],
    massSeminationFail: ['error'],
    massSeminationSuccess: ['payload'],

    massUltrasoundRequest: ['payload'],
    massUltrasoundFail: ['error'],
    massUltrasoundSuccess: ['payload'],

    abortionSowRequest: ['payload'],
    abortionSowFail: ['error'],
    abortionSowSuccess: ['payload'],

    massInitTransferRequest: ['payload'],
    massInitTransferFail: ['error'],
    massInitTransferSuccess: ['payload'],
})

export const SowsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    list: [],

    eventFetching: false,

    sow: null,
    sowSingleFetching: false,

    seminationSow: null,
    ultrasoundSow: null,
    cullingSow: null,
    sowEvent: null,
    createdSow: null,
    createdNonameSow: null,
    nonameSowsCount: null,
    boars: [],
    initData: null,

    message: null,
    error: '',
})

/* ------------- Selectors ------------- */

export const SowsSelectors = {
    getSows: state => state.Sows.list,
    getSow: state => state.Sows.sow,
    seminationSow: state => state.Sows.sow,
    ultrasoundSow: state => state.Sows.sow,
    cullingSow: state => state.Sows.sow,
    sowMoveTo: state => state.Sows.sow,
    sowsMoveMany: state => state.Sows.sow,
    sowFarrow: state => state.Sows.sow,
    createNewSow: state => state.sows.createdSow,
    createNewNonameSow: state => state.sows.createdSowNoname,
    createNewNonameSow: state => state.sows.nonameSowsCount,
    getBoars: state => state.sows.boars,
    addNewSeminatedToWs1: state => state.sows.initData,
    abortionsSow: state => state.sows.sow
}

/* ------------- Reducers ------------- */
// Get list
export const getSowsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, list: [] })
}

export const getSowsSuccess = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, list: payload, sow: sow })
}

export const getSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, list: [] })
}

// Get one
export const getSowRequest = (state, { payload }) => {
    return state.merge({ sowSingleFetching: true, })
}

export const getSowSuccess = (state, { payload }) => {
    return state.merge({ sowSingleFetching: false, error: null, sow: payload.sow })
}

export const getSowFail = (state, { error }) => {
    return state.merge({ sowSingleFetching: false, error, sow: null })
}

// Semination
export const seminationSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const seminationSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, sow: payload.sow, sowEvent: payload.semination })
}

export const seminationSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// Ultrasound
export const ultrasoundSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const ultrasoundSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, sow: payload.sow, sowEvent: payload.ultrasound })
}

export const ultrasoundSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// Culling
export const cullingSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const cullingSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, sow: payload.sow, sowEvent: payload.culling })
}

export const cullingSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// Move to
export const sowMoveToRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const sowMoveToSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, sow: payload.sow, sowEvent: payload.transaction })
}

export const sowMoveToFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// Move many
export const sowsMoveManyRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const sowsMoveManySuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, sowEvent: payload.transaction_ids })
}

export const sowsMoveManyFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// Sow Farrow
export const sowFarrowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const sowFarrowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, sow: payload.sow, sowEvent: payload.farrow })
}

export const sowFarrowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// Get create new
export const createNewSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true, createdSow: [] })
}

export const createNewSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, createdSow: payload })
}

export const createNewSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, createdSow: [] })
}

// Get create new noname
export const createNewNonameSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true, createdNonameSow: null, nonameSowsCount: null })
}

export const createNewNonameSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, createdNonameSow: payload.sow, 
        nonameSowsCount: payload.noname_sows_count })
}

export const createNewNonameSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, createdNonameSow: null, nonameSowsCount: null })
}

// Get boars list
export const getBoarsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, boars: [] })
}

export const getBoarsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, boars: payload, })
}

export const getBoarsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, boars: [] })
}

// Sow addNewSeminatedToWs1
export const addNewSeminatedToWs1Request = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const addNewSeminatedToWs1Success = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, initData: payload })
}

export const addNewSeminatedToWs1Fail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// Mass semination
export const massSeminationRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const massSeminationSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, })
}

export const massSeminationFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// Mass ultrasound
export const massUltrasoundRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const massUltrasoundSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, })
}

export const massUltrasoundFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data })
}

// AbortionSow
export const abortionSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true, })
}

export const abortionSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, sow: payload })
}

export const abortionSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, sow: null })
}


// Mass init and transfer
export const massInitTransferRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const massInitTransferSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, message: payload.message})
}

export const massInitTransferFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error: error.data, message: null })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SOWS_REQUEST]: getSowsRequest,
    [Types.GET_SOWS_SUCCESS]: getSowsSuccess,
    [Types.GET_SOWS_FAIL]: getSowsFail,

    [Types.GET_SOW_REQUEST]: getSowRequest,
    [Types.GET_SOW_SUCCESS]: getSowSuccess,
    [Types.GET_SOW_FAIL]: getSowFail,

    [Types.SEMINATION_SOW_REQUEST]: seminationSowRequest,
    [Types.SEMINATION_SOW_SUCCESS]: seminationSowSuccess,
    [Types.SEMINATION_SOW_FAIL]: seminationSowFail,

    [Types.ULTRASOUND_SOW_REQUEST]: ultrasoundSowRequest,
    [Types.ULTRASOUND_SOW_SUCCESS]: ultrasoundSowSuccess,
    [Types.ULTRASOUND_SOW_FAIL]: ultrasoundSowFail,

    [Types.CULLING_SOW_REQUEST]: cullingSowRequest,
    [Types.CULLING_SOW_SUCCESS]: cullingSowSuccess,
    [Types.CULLING_SOW_FAIL]: cullingSowFail,

    [Types.SOW_MOVE_TO_REQUEST]: sowMoveToRequest,
    [Types.SOW_MOVE_TO_SUCCESS]: sowMoveToSuccess,
    [Types.SOW_MOVE_TO_FAIL]: sowMoveToFail,

    [Types.SOWS_MOVE_MANY_REQUEST]: sowsMoveManyRequest,
    [Types.SOWS_MOVE_MANY_SUCCESS]: sowsMoveManySuccess,
    [Types.SOWS_MOVE_MANY_FAIL]: sowsMoveManyFail,

    [Types.SOW_FARROW_REQUEST]: sowFarrowRequest,
    [Types.SOW_FARROW_SUCCESS]: sowFarrowSuccess,
    [Types.SOW_FARROW_FAIL]: sowFarrowFail,

    [Types.CREATE_NEW_SOW_REQUEST]: createNewSowRequest,
    [Types.CREATE_NEW_SOW_SUCCESS]: createNewSowSuccess,
    [Types.CREATE_NEW_SOW_FAIL]: createNewSowFail,

    [Types.CREATE_NEW_NONAME_SOW_REQUEST]: createNewNonameSowRequest,
    [Types.CREATE_NEW_NONAME_SOW_SUCCESS]: createNewNonameSowSuccess,
    [Types.CREATE_NEW_NONAME_SOW_FAIL]: createNewNonameSowFail,

    [Types.GET_BOARS_REQUEST]: getBoarsRequest,
    [Types.GET_BOARS_SUCCESS]: getBoarsSuccess,
    [Types.GET_BOARS_FAIL]: getBoarsFail,

    [Types.ADD_NEW_SEMINATED_TO_WS1_REQUEST]: addNewSeminatedToWs1Request,
    [Types.ADD_NEW_SEMINATED_TO_WS1_SUCCESS]: addNewSeminatedToWs1Success,
    [Types.ADD_NEW_SEMINATED_TO_WS1_FAIL]: addNewSeminatedToWs1Fail,

    [Types.MASS_SEMINATION_REQUEST]: massSeminationRequest,
    [Types.MASS_SEMINATION_SUCCESS]: massSeminationSuccess,
    [Types.MASS_SEMINATION_FAIL]: massSeminationFail,

    [Types.MASS_ULTRASOUND_REQUEST]: massUltrasoundRequest,
    [Types.MASS_ULTRASOUND_SUCCESS]: massUltrasoundSuccess,
    [Types.MASS_ULTRASOUND_FAIL]: massUltrasoundFail,

    [Types.ABORTION_SOW_REQUEST]: abortionSowRequest,
    [Types.ABORTION_SOW_SUCCESS]: abortionSowSuccess,
    [Types.ABORTION_SOW_FAIL]: abortionSowFail,

    [Types.MASS_INIT_TRANSFER_REQUEST]: massInitTransferRequest,
    [Types.MASS_INIT_TRANSFER_SUCCESS]: massInitTransferSuccess,
    [Types.MASS_INIT_TRANSFER_FAIL]: massInitTransferFail,
})