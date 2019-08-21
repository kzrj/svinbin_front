import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getIncomeSowsWs3Request: ['payload'],
    getIncomeSowsWs3Fail: ['error'],
    getIncomeSowsWs3Success: ['payload'],

    getIncomeSowWs3Request: ['payload'],
    getIncomeSowWs3Fail: ['error'],
    getIncomeSowWs3Success: ['payload'],

    getSectionsWs3Request: ['payload'],
    getSectionsWs3Fail: ['error'],
    getSectionsWs3Success: ['payload'],

    getSowIncomeTabLocationsWs3Request: ['payload'],
    getSowIncomeTabLocationsWs3Fail: ['error'],
    getSowIncomeTabLocationsWs3Success: ['payload'],

})

export const Ws3Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    incomeSows: [],
    incomeSow: null,
    sections: [],
    incomeTabLocations: [],
    error: '',
})

/* ------------- Selectors ------------- */

export const Ws3Selectors = {
    getIncomeSowsWs3: state => state.ws3.incomeSows,
    getIncomeSowWs3: state => state.ws3.incomeSow,
    getSectionsWs3: state => state.ws3.sections,
    getSowIncomeTabLocationsWs3: state => state.ws3.incomeTabLocations,
}

/* ------------- Reducers ------------- */
// Get income sows
export const getIncomeSowsWs3Request = (state, { payload }) => {
    return state.merge({ fetching: true, incomeSows: [] })
}

export const getIncomeSowsWs3Success = (state, { payload }) => {
    let sow = null
    if (payload.length > 0) sow = payload[0]
    return state.merge({ fetching: false, error: null, incomeSows: payload, incomeSow: sow })
}

export const getIncomeSowsWs3Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, incomeSows: [] })
}

// Get one income sow
export const getIncomeSowWs3Request = (state, { payload }) => {
    return state.merge({ fetching: true, })
}

export const getIncomeSowWs3Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, incomeSow: payload })
}

export const getIncomeSowWs3Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, incomeSow: null })
}

// Get sections
export const getSectionsWs3Request = (state, { payload }) => {
    return state.merge({ fetching: true, sections: [] })
}

export const getSectionsWs3Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sections: payload })
}

export const getSectionsWs3Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, sections: [] })
}

// Get SowIncomeTabLocations
export const getSowIncomeTabLocationsWs3Request = (state, { payload }) => {
    return state.merge({ fetching: true, incomeTabLocations: [] })
}

export const getSowIncomeTabLocationsWs3Success = (state, { payload }) => {
    return state.merge({ fetching: false,  error: null, incomeTabLocations: payload })
}

export const getSowIncomeTabLocationsWs3Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, incomeTabLocations: [] })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_INCOME_SOWS_WS3_REQUEST]: getIncomeSowsWs3Request,
    [Types.GET_INCOME_SOWS_WS3_SUCCESS]: getIncomeSowsWs3Success,
    [Types.GET_INCOME_SOWS_WS3_FAIL]: getIncomeSowsWs3Fail,

    [Types.GET_INCOME_SOW_WS3_REQUEST]: getIncomeSowWs3Request,
    [Types.GET_INCOME_SOW_WS3_SUCCESS]: getIncomeSowWs3Success,
    [Types.GET_INCOME_SOW_WS3_FAIL]: getIncomeSowWs3Fail,

    [Types.GET_SECTIONS_WS3_REQUEST]: getSectionsWs3Request,
    [Types.GET_SECTIONS_WS3_SUCCESS]: getSectionsWs3Success,
    [Types.GET_SECTIONS_WS3_FAIL]: getSectionsWs3Fail,

    [Types.GET_SOW_INCOME_TAB_LOCATIONS_WS3_REQUEST]: getSowIncomeTabLocationsWs3Request,
    [Types.GET_SOW_INCOME_TAB_LOCATIONS_WS3_SUCCESS]: getSowIncomeTabLocationsWs3Success,
    [Types.GET_SOW_INCOME_TAB_LOCATIONS_WS3_FAIL]: getSowIncomeTabLocationsWs3Fail,

})