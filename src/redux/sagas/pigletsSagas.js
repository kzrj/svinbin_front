import { put, call } from 'redux-saga/effects';

import PigletsActions from '../redux-sauce/piglets'

export function* getPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(PigletsActions.getNomadPigletsSuccess(response.results));
    } catch (err) {
        yield put(PigletsActions.getNomadPigletsFail(err))
    }
}

export function* mergeFromListPiglets(api, action) {
    try {
        let response = yield call(api.mergeFromListPiglets, action.payload);
        yield put(PigletsActions.mergeFromListPigletsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.mergeFromListPigletsFail(err))
    }
}

export function* cullingPiglets(api, action) {
    try {
        let response = yield call(api.cullingPiglets, action.payload);
        yield put(PigletsActions.cullingPigletsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.cullingPigletsFail(err))
    }
}