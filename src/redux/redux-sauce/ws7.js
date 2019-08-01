import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getNomadPigletsRequest: ['payload'],
    getNomadPigletsFail: ['error'],
    getNomadPigletsSuccess: ['payload'],

    getSectionsRequest: ['payload'],
    getSectionsFail: ['error'],
    getSectionsSuccess: ['payload'],

    getIncomeTabLocationsRequest: ['payload'],
    getIncomeTabLocationsFail: ['error'],
    getIncomeTabLocationsSuccess: ['payload'],

    setllePigletsRequest: ['payload'],
    setllePigletsFail: ['error'],
    setllePigletsSuccess: ['payload'],

    getTransferPigletsRequest: ['payload'],
    getTransferPigletsFail: ['error'],
    getTransferPigletsSuccess: ['payload'],

    getInnerTransferTabLocations1Request: ['payload'],
    getInnerTransferTabLocations1Fail: ['error'],
    getInnerTransferTabLocations1Success: ['payload'],

    getInnerTransferTabLocations2Request: ['payload'],
    getInnerTransferTabLocations2Fail: ['error'],
    getInnerTransferTabLocations2Success: ['payload'],

    weighingPigletsRequest : ['payload'],
    weighingPigletsFail : ['payload'],
    weighingPigletsSuccess : ['payload'],
})

export const Ws7Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    sections: [],
    incomingPigletsList: [],
    incomeTabLocations: [],
    setlledPiglets: null,
    transferPiglets: [],
    innerTransferLocations1: [],
    innerTransferLocations2: [],
    innerTransferPiglets: [],
    weighingData: {},
    error: '',
})

/* ------------- Selectors ------------- */

export const Ws7Selectors = {
    getNomadPiglets: state => state.ws7.incomingPigletsList,
    getSections: state => state.ws7.incomingPigletsList,
    getIncomeTabLocations: state => state.ws7.incomeTabLocations,
    settlePiglets: state => state.ws7.setlledPiglets,
    getTransferPiglets: state => state.ws7.transferPiglets,
    getInnerTransferTabLocations1: state => state.ws7.innerTransferLocations1,
    getInnerTransferTabLocations2: state => state.ws7.innerTransferLocations2,
    weighingPiglets: state => state.ws7.weighingData,
}

/* ------------- Reducers ------------- */
// Get piglets
export const getNomadPigletsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, incomingPigletsList: [] })
}

export const getNomadPigletsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, incomingPigletsList: payload })
}

export const getNomadPigletsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, incomingPigletsList: [] })
}

// Get sections
export const getSectionsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, sections: [] })
}

export const getSectionsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sections: payload })
}

export const getSectionsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, sections: [] })
}

// Get incomeTabLocations
export const getIncomeTabLocationsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, incomeTabLocations: [] })
}

export const getIncomeTabLocationsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false,  error: null, incomeTabLocations: payload })
}

export const getIncomeTabLocationsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, incomeTabLocations: [] })
}

// Setlle
export const setllePigletsRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const setllePigletsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, setlledPiglets: payload.piglets_group })
}

export const setllePigletsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, setlledPiglets: null })
}

// Get transfer piglets
export const getTransferPigletsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, transferPiglets: [] })
}

export const getTransferPigletsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, transferPiglets: payload })
}

export const getTransferPigletsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, transferPiglets: [] })
}

// Get innerTransferLocations1
export const getInnerTransferTabLocations1Request = (state, { payload }) => {
    return state.merge({ fetching: true, innerTransferLocations1: [] })
}

export const getInnerTransferTabLocations1Success = (state, { payload }) => {
    return state.merge({ fetching: false,  error: null, innerTransferLocations1: payload })
}

export const getInnerTransferTabLocations1Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, innerTransferLocations1: [] })
}

// Get innerTransferLocations2
export const getInnerTransferTabLocations2Request = (state, { payload }) => {
    return state.merge({ fetching: true, innerTransferLocations2: [] })
}

export const getInnerTransferTabLocations2Success = (state, { payload }) => {
    return state.merge({ fetching: false,  error: null, innerTransferLocations2: payload })
}

export const getInnerTransferTabLocations2Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, innerTransferLocations2: [] })
}

// Weighing
export const weighingPigletsRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const weighingPigletsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, weighingData: payload, })
}

export const weighingPigletsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, weighingData: null, 
        event: null })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_NOMAD_PIGLETS_REQUEST]: getNomadPigletsRequest,
    [Types.GET_NOMAD_PIGLETS_SUCCESS]: getNomadPigletsSuccess,
    [Types.GET_NOMAD_PIGLETS_FAIL]: getNomadPigletsFail,

    [Types.GET_SECTIONS_REQUEST]: getSectionsRequest,
    [Types.GET_SECTIONS_SUCCESS]: getSectionsSuccess,
    [Types.GET_SECTIONS_FAIL]: getSectionsFail,

    [Types.GET_INCOME_TAB_LOCATIONS_REQUEST]: getIncomeTabLocationsRequest,
    [Types.GET_INCOME_TAB_LOCATIONS_SUCCESS]: getIncomeTabLocationsSuccess,
    [Types.GET_INCOME_TAB_LOCATIONS_FAIL]: getIncomeTabLocationsFail,

    [Types.SETLLE_PIGLETS_REQUEST]: setllePigletsRequest,
    [Types.SETLLE_PIGLETS_SUCCESS]: setllePigletsSuccess,
    [Types.SETLLE_PIGLETS_FAIL]: setllePigletsFail,

    [Types.GET_TRANSFER_PIGLETS_REQUEST]: getTransferPigletsRequest,
    [Types.GET_TRANSFER_PIGLETS_SUCCESS]: getTransferPigletsSuccess,
    [Types.GET_TRANSFER_PIGLETS_FAIL]: getTransferPigletsFail,

    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST]: getInnerTransferTabLocations1Request,
    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_SUCCESS]: getInnerTransferTabLocations1Success,
    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_FAIL]: getInnerTransferTabLocations1Fail,

    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST]: getInnerTransferTabLocations2Request,
    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_SUCCESS]: getInnerTransferTabLocations2Success,
    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_FAIL]: getInnerTransferTabLocations2Fail,

    [Types.WEIGHING_PIGLETS_REQUEST]: weighingPigletsRequest,
    [Types.WEIGHING_PIGLETS_SUCCESS]: weighingPigletsSuccess,
    [Types.WEIGHING_PIGLETS_FAIL]: weighingPigletsFail,
})