import { put, call } from 'redux-saga/effects';

import SowsActions from '../redux-sauce/sows'

export function* getSows(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(SowsActions.getSowsSuccess(response.results));
    } catch (err) {
        yield put(SowsActions.getSowsFail(err.message))
    }
}

export function* seminationSow(api, action) {
    try {
        let response = yield call(api.seminationSow, action.payload);
        yield put(SowsActions.seminationSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.seminationSowFail(err))
    }
}

export function* ultrasoundSow(api, action) {
    try {
        let response = yield call(api.ultrasoundSow, action.payload);
        yield put(SowsActions.ultrasoundSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.ultrasoundSowFail(err))
    }
}

export function* cullingSow(api, action) {
    try {
        let response = yield call(api.cullingSow, action.payload);
        yield put(SowsActions.cullingSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.cullingSowFail(err))
    }
}

export function* sowMoveTo(api, action) {
    try {
        let response = yield call(api.sowMoveTo, action.payload);
        yield put(SowsActions.sowMoveToSuccess(response));
    } catch (err) {
        yield put(SowsActions.sowMoveToFail(err))
    }
}