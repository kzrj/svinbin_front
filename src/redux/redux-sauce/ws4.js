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
})

export const Ws4Types = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    sections: [],
    incomingPigletsList: [],
    error: '',
})

/* ------------- Selectors ------------- */

export const Ws2Selectors = {
    getNomadPiglets: state => state.ws2.incomingPigletsList,
}

/* ------------- Reducers ------------- */
// Get
export const getNomadPigletsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, incomingPigletsList: [] })
}

export const getNomadPigletsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, incomingPigletsList: payload })
}

export const getNomadPigletsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, incomingPigletsList: [] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_NOMAD_PIGLETS_REQUEST]: getNomadPigletsRequest,
    [Types.GET_NOMAD_PIGLETS_SUCCESS]: getNomadPigletsSuccess,
    [Types.GET_NOMAD_PIGLETS_FAIL]: getNomadPigletsFail,
})