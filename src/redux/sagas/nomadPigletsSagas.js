import { put, call } from 'redux-saga/effects';

import NomadPigletsActions from '../redux-sauce/nomadPiglets'

export function* getNomadPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(NomadPigletsActions.getNomadPigletsSuccess(response.results));
    } catch (err) {
        yield put(NomadPigletsActions.getNomadPigletsFail(err))
    }
}

export function* weighingPiglets(api, action) {
    try {
        let response = yield call(api.weighingPiglets, action.payload);
        yield put(NomadPigletsActions.weighingPigletsSuccess(response));
    } catch (err) {
        yield put(NomadPigletsActions.weighingPigletsFail(err))
    }
}
