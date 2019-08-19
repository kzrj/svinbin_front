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
})

export const SowsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    list: [],
    error: '',
    sow: null,
    seminationSow: null,
    ultrasoundSow: null,
    cullingSow: null,
    sowEvent: null,
    createdSow: null,
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
    createNewSow: state => state.ws1.createdSow,
}

/* ------------- Reducers ------------- */
// Get list
export const getSowsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, list: [] })
}

export const getSowsSuccess = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[1]
    return state.merge({ fetching: false, error: null, list: payload, sow: sow })
}

export const getSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, list: [] })
}

// Get one
export const getSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sow: payload })
}

export const getSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error, sow: null })
}

// Semination
export const seminationSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const seminationSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sow: payload.sow, sowEvent: payload.semination })
}

export const seminationSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Ultrasound
export const ultrasoundSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const ultrasoundSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sow: payload.sow, sowEvent: payload.ultrasound })
}

export const ultrasoundSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Culling
export const cullingSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const cullingSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sow: payload.sow, sowEvent: payload.culling })
}

export const cullingSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Move to
export const sowMoveToRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const sowMoveToSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sow: payload.sow, sowEvent: payload.transaction })
}

export const sowMoveToFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Move many
export const sowsMoveManyRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const sowsMoveManySuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sowEvent: payload.transaction_ids })
}

export const sowsMoveManyFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}

// Sow Farrow
export const sowFarrowRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const sowFarrowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sow: payload.sow, sowEvent: payload.farrow })
}

export const sowFarrowFail = (state, { error }) => {
    return state.merge({ fetching: false, error: error.data })
}


// Get create new
export const createNewSowRequest = (state, { payload }) => {
    return state.merge({ fetching: true, createdSow: [] })
}

export const createNewSowSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, createdSow: payload })
}

export const createNewSowFail = (state, { error }) => {
    return state.merge({ fetching: false, error, createdSow: [] })
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
})