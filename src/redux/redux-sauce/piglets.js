import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getPigletsRequest: ['payload'],
    getPigletsFail: ['payload'],
    getPigletsSuccess: ['payload'],

    mergeFromListPigletsRequest: ['payload'],
    mergeFromListPigletsFail: ['payload'],
    mergeFromListPigletsSuccess: ['payload'],

    mergeFromInitListPigletsRequest: ['payload'],
    mergeFromInitListPigletsFail: ['payload'],
    mergeFromInitListPigletsSuccess: ['payload'],

    cullingPigletsRequest: ['payload'],
    cullingPigletsFail: ['payload'],
    cullingPigletsSuccess: ['payload'],

    weighingPigletsRequest: ['payload'],
    weighingPigletsFail: ['payload'],
    weighingPigletsSuccess: ['payload'],

    movePigletsRequest: ['payload'],
    movePigletsFail: ['payload'],
    movePigletsSuccess: ['payload'],

    markAsGiltsRequest: ['payload'],
    markAsGiltsFail: ['payload'],
    markAsGiltsSuccess: ['payload'],

    moveGiltsToWs1Request: ['payload'],
    moveGiltsToWs1Fail: ['payload'],
    moveGiltsToWs1Success: ['payload'],

    pigletsResetErrorsAndMessages: null,
})

export const PigletsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    listFetching: false,
    list: [],
    piglets: null,
    errorList: null,

    eventFetching: false,
    weighing: null,
    event: null,
    eventError: null,

    message: '',
})

/* ------------- Selectors ------------- */

export const PigletsSelectors = {
    getPiglets: state => state.piglets.list,
    mergeFromListPiglets: state => state.piglets.message,
    mergeFromInitListPiglets: state => state.piglets.message,
    cullingPiglets: state => state.piglets.message,
    weighingPiglets: state => state.piglets.weighing,
    movePiglets: state => state.piglets.message,
    moveGiltsToWs1: state => state.piglets.message,
    markAsGilts: state => state.piglets.message,
}

/* ------------- Reducers ------------- */
// Get
export const getPigletsRequest = (state, { payload }) => {
    return state.merge({ listFetching: true, list: [] })
}

export const getPigletsSuccess = (state, { payload }) => {
    return state.merge({ listFetching: false, errorList: null, list: payload })
}

export const getPigletsFail = (state, { payload }) => {
    return state.merge({ listFetching: false, errorList:payload, list: [] })
}

// mergeFromListPiglets
export const mergeFromListPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const mergeFromListPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, message: payload.message })
}

export const mergeFromListPigletsFail = (state, { payload } ) => {
    return state.merge({ eventFetching: false, eventError: payload, message: ''})
}

// mergeFromInitListPiglets
export const mergeFromInitListPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const mergeFromInitListPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, message: payload.message })
}

export const mergeFromInitListPigletsFail = (state, { payload } ) => {
    return state.merge({ eventFetching: false, eventError: payload, message: ''})
}

// culling
export const cullingPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const cullingPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, message: payload.message })
}

export const cullingPigletsFail = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: payload, message: ''})
}

// weighing
export const weighingPigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const weighingPigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, message: payload.message, weighing: payload.weighing_record })
}

export const weighingPigletsFail = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: payload, message: ''})
}

// move
export const movePigletsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const movePigletsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, message: payload.message })
}

export const movePigletsFail = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: payload, message: ''})
}

// moveGiltsToWs1
export const moveGiltsToWs1Request = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const moveGiltsToWs1Success = (state, { payload }) => {
    return state.merge({ eventFetching: false, message: payload.message })
}

export const moveGiltsToWs1Fail = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: payload, message: ''})
}

// mark as gilts
export const markAsGiltsRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const markAsGiltsSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, message: payload.message })
}

export const markAsGiltsFail = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: payload, message: ''})
}

// resetErrorsAndMessages
export const pigletsResetErrorsAndMessages = (state) => {
    return state.merge({ fetching: false, eventError: null, errorList: null, message: '' })
  }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_PIGLETS_REQUEST]: getPigletsRequest,
    [Types.GET_PIGLETS_SUCCESS]: getPigletsSuccess,
    [Types.GET_PIGLETS_FAIL]: getPigletsFail,

    [Types.MERGE_FROM_LIST_PIGLETS_REQUEST]: mergeFromListPigletsRequest,
    [Types.MERGE_FROM_LIST_PIGLETS_SUCCESS]: mergeFromListPigletsSuccess,
    [Types.MERGE_FROM_LIST_PIGLETS_FAIL]: mergeFromListPigletsFail,

    [Types.MERGE_FROM_INIT_LIST_PIGLETS_REQUEST]: mergeFromInitListPigletsRequest,
    [Types.MERGE_FROM_INIT_LIST_PIGLETS_SUCCESS]: mergeFromInitListPigletsSuccess,
    [Types.MERGE_FROM_INIT_LIST_PIGLETS_FAIL]: mergeFromInitListPigletsFail,

    [Types.CULLING_PIGLETS_REQUEST]: cullingPigletsRequest,
    [Types.CULLING_PIGLETS_SUCCESS]: cullingPigletsSuccess,
    [Types.CULLING_PIGLETS_FAIL]: cullingPigletsFail,

    [Types.WEIGHING_PIGLETS_REQUEST]: weighingPigletsRequest,
    [Types.WEIGHING_PIGLETS_SUCCESS]: weighingPigletsSuccess,
    [Types.WEIGHING_PIGLETS_FAIL]: weighingPigletsFail,

    [Types.MOVE_PIGLETS_REQUEST]: movePigletsRequest,
    [Types.MOVE_PIGLETS_SUCCESS]: movePigletsSuccess,
    [Types.MOVE_PIGLETS_FAIL]: movePigletsFail,

    [Types.MOVE_GILTS_TO_WS1_REQUEST]: moveGiltsToWs1Request,
    [Types.MOVE_GILTS_TO_WS1_SUCCESS]: moveGiltsToWs1Success,
    [Types.MOVE_GILTS_TO_WS1_FAIL]: moveGiltsToWs1Fail,

    [Types.MARK_AS_GILTS_REQUEST]: markAsGiltsRequest,
    [Types.MARK_AS_GILTS_SUCCESS]: markAsGiltsSuccess,
    [Types.MARK_AS_GILTS_FAIL]: markAsGiltsFail,

    [Types.PIGLETS_RESET_ERRORS_AND_MESSAGES]: pigletsResetErrorsAndMessages,
})
