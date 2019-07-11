import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getNomadPigletsRequest: ['payload'],
    getNomadPigletsFail: ['error'],
    getNomadPigletsSuccess: ['payload'],

    weighingPigletsRequest: ['payload'],
    weighingPigletsFail: ['error'],
    weighingPigletsSuccess: ['payload'],
})

export const NomadPigletsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    list: [],
    nomadGroup: null,
    event: null,
    error: ''
})

/* ------------- Selectors ------------- */

export const NomadPigletsSelectors = {
    getNomadPiglets: state => state.nomadPiglets.list,
    weighingPiglets: state => state.nomadPiglets.nomadGroup,
}

/* ------------- Reducers ------------- */

export const getNomadPigletsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, list: [] })
}

export const getNomadPigletsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, list: payload })
}

export const getNomadPigletsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, list: [] })
}

// Weighing
export const weighingPigletsRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const weighingPigletsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, nomadGroup: payload.piglets_group, 
        event: payload.weighing_record })
}

export const weighingPigletsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, nomadGroup: null, 
        event: null })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_NOMAD_PIGLETS_REQUEST]: getNomadPigletsRequest,
    [Types.GET_NOMAD_PIGLETS_SUCCESS]: getNomadPigletsSuccess,
    [Types.GET_NOMAD_PIGLETS_FAIL]: getNomadPigletsFail,

    [Types.WEIGHING_PIGLETS_REQUEST]: weighingPigletsRequest,
    [Types.WEIGHING_PIGLETS_SUCCESS]: weighingPigletsSuccess,
    [Types.WEIGHING_PIGLETS_FAIL]: weighingPigletsFail,
})
