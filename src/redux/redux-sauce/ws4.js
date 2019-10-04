import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getNomadPigletsWs4Request: ['payload'],
    getNomadPigletsWs4Fail: ['error'],
    getNomadPigletsWs4Success: ['payload'],

    getSectionsWs4Request: ['payload'],
    getSectionsWs4Fail: ['error'],
    getSectionsWs4Success: ['payload'],

    getIncomeTabLocationsWs4Request: ['payload'],
    getIncomeTabLocationsWs4Fail: ['error'],
    getIncomeTabLocationsWs4Success: ['payload'],   

    setllePigletsWs4Request: ['payload'],
    setllePigletsWs4Fail: ['error'],
    setllePigletsWs4Success: ['payload'],

    getTransferPigletsWs4Request: ['payload'],
    getTransferPigletsWs4Fail: ['error'],
    getTransferPigletsWs4Success: ['payload'],

    getInnerTransferTabLocations1Ws4Request: ['payload'],
    getInnerTransferTabLocations1Ws4Fail: ['error'],
    getInnerTransferTabLocations1Ws4Success: ['payload'],

    getInnerTransferTabLocations2Ws4Request: ['payload'],
    getInnerTransferTabLocations2Ws4Fail: ['error'],
    getInnerTransferTabLocations2Ws4Success: ['payload'],

    // weighingPigletsWs4Request : ['payload'],
    // weighingPigletsWs4Fail : ['payload'],
    // weighingPigletsWs4Success : ['payload'],
})

export const Ws4Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    eventFetching: false,
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

export const Ws4Selectors = {
    getNomadPigletsWs4: state => state.ws4.incomingPigletsList,
    getSectionsWs4: state => state.ws4.incomingPigletsList,
    getIncomeTabLocationsWs4: state => state.ws4.incomeTabLocations,
    settlePigletsWs4: state => state.ws4.setlledPiglets,
    getTransferPigletsWs4: state => state.ws4.transferPiglets,
    getInnerTransferTabLocations1Ws4: state => state.ws4.innerTransferLocations1,
    getInnerTransferTabLocations2Ws4: state => state.ws4.innerTransferLocations2,
    // weighingPigletsWs4: state => state.ws4.weighingData,
}

/* ------------- Reducers ------------- */
// Get piglets
export const getNomadPigletsWs4Request = (state, { payload }) => {
    return state.merge({ fetching: true, incomingPigletsList: [] })
}

export const getNomadPigletsWs4Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, incomingPigletsList: payload })
}

export const getNomadPigletsWs4Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, incomingPigletsList: [] })
}

// Get sections
export const getSectionsWs4Request = (state, { payload }) => {
    return state.merge({ fetching: true, sections: [] })
}

export const getSectionsWs4Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, sections: payload })
}

export const getSectionsWs4Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, sections: [] })
}

// Get incomeTabLocations
export const getIncomeTabLocationsWs4Request = (state, { payload }) => {
    return state.merge({ fetching: true, incomeTabLocations: [] })
}

export const getIncomeTabLocationsWs4Success = (state, { payload }) => {
    return state.merge({ fetching: false,  error: null, incomeTabLocations: payload })
}

export const getIncomeTabLocationsWs4Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, incomeTabLocations: [] })
}

// Setlle
export const setllePigletsWs4Request = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const setllePigletsWs4Success = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, setlledPiglets: payload.piglets_group })
}

export const setllePigletsWs4Fail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, setlledPiglets: null })
}

// Get transfer piglets
export const getTransferPigletsWs4Request = (state, { payload }) => {
    return state.merge({ fetching: true, transferPiglets: [] })
}

export const getTransferPigletsWs4Success = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, transferPiglets: payload })
}

export const getTransferPigletsWs4Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, transferPiglets: [] })
}

// Get innerTransferLocations1
export const getInnerTransferTabLocations1Ws4Request = (state, { payload }) => {
    return state.merge({ fetching: true, innerTransferLocations1: [] })
}

export const getInnerTransferTabLocations1Ws4Success = (state, { payload }) => {
    return state.merge({ fetching: false,  error: null, innerTransferLocations1: payload })
}

export const getInnerTransferTabLocations1Ws4Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, innerTransferLocations1: [] })
}

// Get innerTransferLocations2
export const getInnerTransferTabLocations2Ws4Request = (state, { payload }) => {
    return state.merge({ fetching: true, innerTransferLocations2: [] })
}

export const getInnerTransferTabLocations2Ws4Success = (state, { payload }) => {
    return state.merge({ fetching: false,  error: null, innerTransferLocations2: payload })
}

export const getInnerTransferTabLocations2Ws4Fail = (state, { error }) => {
    return state.merge({ fetching: false, error, innerTransferLocations2: [] })
}

// // Weighing
// export const weighingPigletsWs4Request = (state, { payload }) => {
//     return state.merge({ eventFetching: true })
// }

// export const weighingPigletsWs4Success = (state, { payload }) => {
//     return state.merge({ eventFetching: false, error: null, weighingData: payload, })
// }

// export const weighingPigletsWs4Fail = (state, { error }) => {
//     return state.merge({ eventFetching: false, error, weighingData: null, 
//         event: null })
// }
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_NOMAD_PIGLETS_WS4_REQUEST]: getNomadPigletsWs4Request,
    [Types.GET_NOMAD_PIGLETS_WS4_SUCCESS]: getNomadPigletsWs4Success,
    [Types.GET_NOMAD_PIGLETS_WS4_FAIL]: getNomadPigletsWs4Fail,

    [Types.GET_SECTIONS_WS4_REQUEST]: getSectionsWs4Request,
    [Types.GET_SECTIONS_WS4_SUCCESS]: getSectionsWs4Success,
    [Types.GET_SECTIONS_WS4_FAIL]: getSectionsWs4Fail,

    [Types.GET_INCOME_TAB_LOCATIONS_WS4_REQUEST]: getIncomeTabLocationsWs4Request,
    [Types.GET_INCOME_TAB_LOCATIONS_WS4_SUCCESS]: getIncomeTabLocationsWs4Success,
    [Types.GET_INCOME_TAB_LOCATIONS_WS4_FAIL]: getIncomeTabLocationsWs4Fail,

    [Types.SETLLE_PIGLETS_WS4_REQUEST]: setllePigletsWs4Request,
    [Types.SETLLE_PIGLETS_WS4_SUCCESS]: setllePigletsWs4Success,
    [Types.SETLLE_PIGLETS_WS4_FAIL]: setllePigletsWs4Fail,

    [Types.GET_TRANSFER_PIGLETS_WS4_REQUEST]: getTransferPigletsWs4Request,
    [Types.GET_TRANSFER_PIGLETS_WS4_SUCCESS]: getTransferPigletsWs4Success,
    [Types.GET_TRANSFER_PIGLETS_WS4_FAIL]: getTransferPigletsWs4Fail,

    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_WS4_REQUEST]: getInnerTransferTabLocations1Ws4Request,
    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_WS4_SUCCESS]: getInnerTransferTabLocations1Ws4Success,
    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_WS4_FAIL]: getInnerTransferTabLocations1Ws4Fail,

    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_WS4_REQUEST]: getInnerTransferTabLocations2Ws4Request,
    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_WS4_SUCCESS]: getInnerTransferTabLocations2Ws4Success,
    [Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_WS4_FAIL]: getInnerTransferTabLocations2Ws4Fail,

    // [Types.WEIGHING_PIGLETS_WS4_REQUEST]: weighingPigletsWs4Request,
    // [Types.WEIGHING_PIGLETS_WS4_SUCCESS]: weighingPigletsWs4Success,
    // [Types.WEIGHING_PIGLETS_WS4_FAIL]: weighingPigletsWs4Fail,
})