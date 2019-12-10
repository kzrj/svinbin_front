import { put, call } from 'redux-saga/effects';

import PigletsActions from '../redux-sauce/piglets'

export function* getPiglets(api, action) {
    try {
        let response = yield call(api.getPiglets, action.payload);
        yield put(PigletsActions.getPigletsSuccess(response.results));
    } catch (err) {
        yield put(PigletsActions.getPigletsFail(err))
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

export function* weighingPiglets(api, action) {
    try {
        let response = yield call(api.weighingPiglets, action.payload);
        yield put(PigletsActions.weighingPigletsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.weighingPigletsFail(err))
    }
}

export function* movePiglets(api, action) {
    try {
        let response = yield call(api.movePiglets, action.payload);
        yield put(PigletsActions.movePigletsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.movePigletsFail(err))
    }
}