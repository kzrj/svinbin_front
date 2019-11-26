import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getSectionsRequest: ['payload'],
    getSectionsFail: ['error'],
    getSectionsSuccess: ['payload'],

    getSectionsAdditionalRequest: ['payload'],
    getSectionsAdditionalFail: ['error'],
    getSectionsAdditionalSuccess: ['payload'],
})

export const SectionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    list: [],
    errorList: null,

    additional_list: [],
    fetchingAdditional: false,
    errorAdditional: null,

    message: ''
})

/* ------------- Selectors ------------- */

export const SectionsSelectors = {
    getSections: state => state.Sections.list,
    getSectionsAdditional: state => state.Sections.additional_list,
}

/* ------------- Reducers ------------- */

export const getSectionsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, list: [] })
}

export const getSectionsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, errorList: null, list: payload })
}

export const getSectionsFail = (state, { error }) => {
    return state.merge({ fetching: false, errorList: error, list: [] })
}

export const getSectionsAdditionalRequest = (state, { payload }) => {
    return state.merge({ fetchingAdditional: true, additional_list: [] })
}

export const getSectionsAdditionalSuccess = (state, { payload }) => {
    return state.merge({ fetchingAdditional: false, errorAdditional: null, 
        additional_list: payload })
}

export const getSectionsAdditionalFail = (state, { error }) => {
    return state.merge({ fetchingAdditional: false, errorAdditional: error, additional_list: [] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SECTIONS_REQUEST]: getSectionsRequest,
    [Types.GET_SECTIONS_SUCCESS]: getSectionsSuccess,
    [Types.GET_SECTIONS_FAIL]: getSectionsFail,

    [Types.GET_SECTIONS_ADDITIONAL_REQUEST]: getSectionsAdditionalRequest,
    [Types.GET_SECTIONS_ADDITIONAL_SUCCESS]: getSectionsAdditionalSuccess,
    [Types.GET_SECTIONS_ADDITIONAL_FAIL]: getSectionsAdditionalFail,
})
