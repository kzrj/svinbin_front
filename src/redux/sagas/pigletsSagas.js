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

export function* mergeFromInitListPiglets(api, action) {
    try {
        let response = yield call(api.mergeFromInitListPiglets, action.payload);
        yield put(PigletsActions.mergeFromInitListPigletsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.mergeFromInitListPigletsFail(err))
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

export function* recountWeighingPiglets(api, action) {
    try {
        let response = yield call(api.recountWeighingPiglets, action.payload);
        yield put(PigletsActions.recountWeighingPigletsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.recountWeighingPigletsFail(err))
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

export function* moveGiltsToWs1(api, action) {
    try {
        let response = yield call(api.moveGiltsToWs1, action.payload);
        yield put(PigletsActions.moveGiltsToWs1Success(response));
    } catch (err) {
        yield put(PigletsActions.moveGiltsToWs1Fail(err))
    }
}

export function* markAsGilts(api, action) {
    try {
        let response = yield call(api.markAsGilts, action.payload);
        yield put(PigletsActions.markAsGiltsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.markAsGiltsFail(err))
    }
}

export function* initPiglets(api, action) {
    try {
        let response = yield call(api.initPiglets, action.payload);
        yield put(PigletsActions.initPigletsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.initPigletsFail(err))
    }
}

export function* recountPiglets(api, action) {
    try {
        let response = yield call(api.recountPiglets, action.payload);
        yield put(PigletsActions.recountPigletsSuccess(response));
    } catch (err) {
        yield put(PigletsActions.recountPigletsFail(err))
    }
}