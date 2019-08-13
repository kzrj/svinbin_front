import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getNomadPigletsRequest: ['payload'],
    getNomadPigletsFail: ['error'],
    getNomadPigletsSuccess: ['payload'],

    getLocationsRequest: ['payload'],
    getLocationsFail: ['error'],
    getLocationsSuccess: ['payload'],

    setllePigletsRequest: ['payload'],
    setllePigletsFail: ['error'],
    setllePigletsSuccess: ['payload'],
})

export const Ws75Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    locations: [],
    incomingPigletsList: [],
    setlledPiglets: null,
    error: '',
})

/* ------------- Selectors ------------- */

export const Ws75Selectors = {
    getNomadPiglets: state => state.ws75.incomingPigletsList,
    getLocations: state => state.ws75.locations,
    settlePiglets: state => state.ws75.setlledPiglets,
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

// Get Locations
export const getLocationsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, locations: [] })
}

export const getLocationsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false,  error: null, locations: payload })
}

export const getLocationsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, locations: [] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_NOMAD_PIGLETS_REQUEST]: getNomadPigletsRequest,
    [Types.GET_NOMAD_PIGLETS_SUCCESS]: getNomadPigletsSuccess,
    [Types.GET_NOMAD_PIGLETS_FAIL]: getNomadPigletsFail,

    [Types.SETLLE_PIGLETS_REQUEST]: setllePigletsRequest,
    [Types.SETLLE_PIGLETS_SUCCESS]: setllePigletsSuccess,
    [Types.SETLLE_PIGLETS_FAIL]: setllePigletsFail,

    [Types.GET_LOCATIONS_REQUEST]: getLocationsRequest,
    [Types.GET_LOCATIONS_SUCCESS]: getLocationsSuccess,
    [Types.GET_LOCATIONS_FAIL]: getLocationsFail,
})