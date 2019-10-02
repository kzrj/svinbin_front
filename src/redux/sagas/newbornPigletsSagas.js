import { put, call } from 'redux-saga/effects';

import NewbornPigletsActions from '../redux-sauce/newbornPiglets'

export function* getNewbornPiglets(api, action) {
    try {
        let response = yield call(api.getNewbornPiglets, action.payload);
        yield put(NewbornPigletsActions.getNewbornPigletsSuccess(response.results));
    } catch (err) {
        yield put(NewbornPigletsActions.getNewbornPigletsFail(err))
    }
}

export function* mergeNewbornPiglets(api, action) {
    try {
        let response = yield call(api.mergeNewbornPiglets, action.payload);
        yield put(NewbornPigletsActions.mergeNewbornPigletsSuccess(response));
    } catch (err) {
        yield put(NewbornPigletsActions.mergeNewbornPigletsFail(err))
    }
}

export function* createGilt(api, action) {
    try {
        let response = yield call(api.createGilt, action.payload);
        yield put(NewbornPigletsActions.createGiltSuccess(response));
    } catch (err) {
        yield put(NewbornPigletsActions.createGiltFail(err))
    }
}

export function* cullingNewbornPiglets(api, action) {
    try {
        let response = yield call(api.cullingNewbornPiglets, action.payload);
        yield put(NewbornPigletsActions.cullingNewbornPigletsSuccess(response));
    } catch (err) {
        yield put(NewbornPigletsActions.cullingNewbornPigletsFail(err))
    }
}

export function* cullingGiltNewbornPiglets(api, action) {
    try {
        let response = yield call(api.cullingGiltNewbornPiglets, action.payload);
        yield put(NewbornPigletsActions.cullingGiltNewbornPigletsSuccess(response));
    } catch (err) {
        yield put(NewbornPigletsActions.cullingGiltNewbornPigletsFail(err))
    }
}