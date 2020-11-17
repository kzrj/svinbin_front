import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getLocationsRequest: ['payload'],
    getLocationsFail: ['error'],
    getLocationsSuccess: ['payload'],
    
    getLocationsAdditionalRequest: ['payload'],
    getLocationsAdditionalFail: ['error'],
    getLocationsAdditionalSuccess: ['payload'],

    resetLocations: null
})

export const LocationsTypes = Types
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

export const LocationsSelectors = {
    getLocations: state => state.Locations.list,
    getLocationsAdditional: state => state.Locations.additional_list,
}

/* ------------- Reducers ------------- */

export const getLocationsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, list: [] })
}

export const getLocationsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, errorList: null, list: payload })
}

export const getLocationsFail = (state, { error }) => {
    return state.merge({ fetching: false, errorList: error, list: [] })
}

export const getLocationsAdditionalRequest = (state, { payload }) => {
    return state.merge({ fetchingAdditional: true, additional_list: [] })
}

export const getLocationsAdditionalSuccess = (state, { payload }) => {
    return state.merge({ fetchingAdditional: false, errorAdditional: null, 
        additional_list: payload })
}

export const getLocationsAdditionalFail = (state, { error }) => {
    return state.merge({ fetchingAdditional: false, errorAdditional: error, additional_list: []})
}

// reset
export const resetLocations = (state) => {
    return state.merge({ fetching: false, list: [] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_LOCATIONS_REQUEST]: getLocationsRequest,
    [Types.GET_LOCATIONS_SUCCESS]: getLocationsSuccess,
    [Types.GET_LOCATIONS_FAIL]: getLocationsFail,

    [Types.GET_LOCATIONS_ADDITIONAL_REQUEST]: getLocationsAdditionalRequest,
    [Types.GET_LOCATIONS_ADDITIONAL_SUCCESS]: getLocationsAdditionalSuccess,
    [Types.GET_LOCATIONS_ADDITIONAL_FAIL]: getLocationsAdditionalFail,

    [Types.RESET_LOCATIONS]: resetLocations,
})
