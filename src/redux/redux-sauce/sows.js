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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SOWS_REQUEST]: getSowsRequest,
    [Types.GET_SOWS_SUCCESS]: getSowsSuccess,
    [Types.GET_SOWS_FAIL]: getSowsFail,

    [Types.SEMINATION_SOW_REQUEST]: seminationSowRequest,
    [Types.SEMINATION_SOW_SUCCESS]: seminationSowSuccess,
    [Types.SEMINATION_SOW_FAIL]: seminationSowFail,
})
