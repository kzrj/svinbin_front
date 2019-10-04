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

    cullingPigletsRequest: ['payload'],
    cullingPigletsFail: ['error'],
    cullingPigletsSuccess: ['payload'],

    cullingGiltPigletsRequest: ['payload'],
    cullingGiltPigletsFail: ['error'],
    cullingGiltPigletsSuccess: ['payload'],

    moveGroupFromCellToCellRequest: ['payload'],
    moveGroupFromCellToCellFail: ['error'],
    moveGroupFromCellToCellSuccess: ['payload'],

    moveToPigletsRequest: ['payload'],
    moveToPigletsFail: ['error'],
    moveToPigletsSuccess: ['payload'],
})

export const NomadPigletsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    eventFetching: false,
    listFetching: false,
    list: [],
    nomadGroup: null,
    weighing: null,
    event: null,
    message: null,
    error: ''
})

/* ------------- Selectors ------------- */

export const NomadPigletsSelectors = {
    getNomadPiglets: state => state.nomadPiglets.list,
    weighingPiglets: state => state.nomadPiglets.nomadGroup,
    cullingPiglets: state => state.nomadPiglets.nomadGroup,
    cullingGiltPiglets: state => state.nomadPiglets.nomadGroup,
    moveGroupFromCellToCell: state => state.nomadPiglets.nomadGroup,
    moveToPiglets: state => state.nomadPiglets.nomadGroup,
}

/* ------------- Reducers ------------- */
// Get
export const getNomadPigletsRequest = (state, { payload }) => {
    return state.merge({ listFetching: true, list: [] })
}

export const getNomadPigletsSuccess = (state, { payload }) => {
    return state.merge({ listFetching: false, error: null, list: payload })
}

export const getNomadPigletsFail = (state, { error }) => {
    return state.merge({ listFetching: false, error, list: [] })
}

// Weighing
export const weighingPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const weighingPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, nomadGroup: payload.piglets_group, 
        weighing: payload.weighing_record, message: payload.message })
}

export const weighingPigletsFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, nomadGroup: null, 
        weighing: null })
}

// Culling
export const cullingPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const cullingPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, nomadGroup: payload.piglets_group, 
        event: payload.culling })
}

export const cullingPigletsFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, nomadGroup: null, 
        event: null })
}

// Culling gilts
export const cullingGiltPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const cullingGiltPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, nomadGroup: payload.piglets_group, 
        event: payload.culling })
}

export const cullingGiltPigletsFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, nomadGroup: null, 
        event: null })
}

// Move from cell to cell 
export const moveGroupFromCellToCellRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const moveGroupFromCellToCellSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, nomadGroup: payload.piglets_group, 
        event: payload.transaction })
}

export const moveGroupFromCellToCellFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, nomadGroup: null, 
        event: null })
}

// Move to
export const moveToPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const moveToPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, error: null, nomadGroup: payload.piglets_group, 
        event: payload.transaction })
}

export const moveToPigletsFail = (state, { error }) => {
    return state.merge({ eventFetching: false, error, nomadGroup: null, 
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

    [Types.CULLING_PIGLETS_REQUEST]: cullingPigletsRequest,
    [Types.CULLING_PIGLETS_SUCCESS]: cullingPigletsSuccess,
    [Types.CULLING_PIGLETS_FAIL]: cullingPigletsFail,

    [Types.CULLING_GILT_PIGLETS_REQUEST]: cullingGiltPigletsRequest,
    [Types.CULLING_GILT_PIGLETS_SUCCESS]: cullingGiltPigletsSuccess,
    [Types.CULLING_GILT_PIGLETS_FAIL]: cullingGiltPigletsFail,

    [Types.MOVE_GROUP_FROM_CELL_TO_CELL_REQUEST]: moveGroupFromCellToCellRequest,
    [Types.MOVE_GROUP_FROM_CELL_TO_CELL_SUCCESS]: moveGroupFromCellToCellSuccess,
    [Types.MOVE_GROUP_FROM_CELL_TO_CELL_FAIL]: moveGroupFromCellToCellFail,

    [Types.MOVE_TO_PIGLETS_REQUEST]: moveToPigletsRequest,
    [Types.MOVE_TO_PIGLETS_SUCCESS]: moveToPigletsSuccess,
    [Types.MOVE_TO_PIGLETS_FAIL]: moveToPigletsFail,
})
