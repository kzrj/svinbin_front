import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getSowsRequest: ['payload'],
    getSowsFail: ['error'],
    getSowsSuccess: ['payload'],

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

    // sowsMoveManyToRequest: ['payload'],
    // sowsMoveManyFail: ['error'],
    // sowsMoveManySuccess: ['payload'],

    sowFarrowRequest: ['payload'],
    sowFarrowFail: ['error'],
    sowFarrowSuccess: ['payload'],
})

export const SowsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    list: [],
    error: '',
    sow: null,
    sowEvent: null
})

/* ------------- Selectors ------------- */

export const SowsSelectors = {
    getSows: state => state.Sows.list,
    seminationSow: state => state.Sows.sow,
    ultrasoundSow: state => state.Sows.sow,
    cullingSow: state => state.Sows.sow,
    sowMoveTo: state => state.Sows.sow,
    // sowsMoveMany: state => state.Sows.sow,
    sowFarrow: state => state.Sows.sow,
}

/* ------------- Reducers ------------- */
// Get list
export const getSowsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, list: [] })
}

export const getSowsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, list: payload })
}

export const getSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, list: [] })
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SOWS_REQUEST]: getSowsRequest,
    [Types.GET_SOWS_SUCCESS]: getSowsSuccess,
    [Types.GET_SOWS_FAIL]: getSowsFail,

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

    [Types.SOW_FARROW_REQUEST]: sowFarrowRequest,
    [Types.SOW_FARROW_SUCCESS]: sowFarrowSuccess,
    [Types.SOW_FARROW_FAIL]: sowFarrowFail,
})