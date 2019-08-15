import { put, call } from 'redux-saga/effects';

import WS2Actions from '../redux-sauce/ws2'

export function* getCullingSowsWs2(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(WS2Actions.getCullingSowsWs2Success(response.results));
    } catch (err) {
        yield put(WS2Actions.getCullingSowsWs2Fail(err))
    }
}

export function* getCullingSowWs2(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(WS2Actions.getCullingSowWs2Success(response));
    } catch (err) {
        yield put(WS2Actions.getCullingSowWs2Fail(err))
    }
}

export function* getSowsByToursWs2(api, action) {
    try {
        let response = yield call(api.getSowsByToursWs2, action.payload);
        yield put(WS2Actions.getSowsByToursWs2Success(response));
    } catch (err) {
        yield put(WS2Actions.getSowsByToursWs2Fail(err))
    }
}

export function* cullingSowWs2(api, action) {
    try {
        let response = yield call(api.cullingSow, action.payload);
        yield put(WS2Actions.cullingSowWs2Success(response));
    } catch (err) {
        yield put(WS2Actions.cullingSowWs2Fail(err))
    }
}

export function* getUltrasoundV2SowsWs2(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(WS2Actions.getUltrasoundV2SowsWs2Success(response.results));
    } catch (err) {
        yield put(WS2Actions.getUltrasoundV2SowsWs2Fail(err))
    }
}

export function* getUltrasoundV2SowWs2(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(WS2Actions.getUltrasoundV2SowWs2Success(response));
    } catch (err) {
        yield put(WS2Actions.getUltrasoundV2SowWs2Fail(err))
    }
}

export function* ultrasoundV2SowWs2(api, action) {
    try {
        let response = yield call(api.ultrasoundV2Sow, action.payload);
        yield put(WS2Actions.ultrasoundV2SowWs2Success(response));
    } catch (err) {
        yield put(WS2Actions.ultrasoundV2SowWs2Fail(err))
    }
}