import { put, call } from 'redux-saga/effects';

import LocationsActions from '../redux-sauce/locations'

export function* getLocations(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(LocationsActions.getLocationsSuccess(response.results));
    } catch (err) {
        yield put(LocationsActions.getLocationsFail(err.message))
    }
}

export function* getLocationsAdditional(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(LocationsActions.getLocationsAdditionalSuccess(response.results));
    } catch (err) {
        yield put(LocationsActions.getLocationsAdditionalFail(err.message))
    }
}