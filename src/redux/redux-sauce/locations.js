import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getLocationsRequest: [],
    getLocationsFail: ['error'],
    getLocationsSuccess: ['payload'],
})

export const LocationsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    list: [],
    error: ''
})

/* ------------- Selectors ------------- */

export const LocationsSelectors = {
    getLocations: state => state.Locations.list,
}

/* ------------- Reducers ------------- */

export const getLocationsRequest = (state) => {
    return state.merge({ fetching: true, list: [] })
}

export const getLocationsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, error: null, list: payload })
}

export const getLocationsFail = (state, { error }) => {
    return state.merge({ fetching: false, error, list: [] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_LOCATIONS_REQUEST]: getLocationsRequest,
    [Types.GET_LOCATIONS_SUCCESS]: getLocationsSuccess,
    [Types.GET_LOCATIONS_FAIL]: getLocationsFail,
})
