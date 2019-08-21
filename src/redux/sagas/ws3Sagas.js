import { put, call } from 'redux-saga/effects';

import WS3Actions from '../redux-sauce/ws3'

export function* getIncomeSowsWs3(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(WS3Actions.getIncomeSowsWs3Success(response.results));
    } catch (err) {
        yield put(WS3Actions.getIncomeSowsWs3Fail(err))
    }
}

export function* getIncomeSowWs3(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(WS3Actions.getIncomeSowWs3Success(response));
    } catch (err) {
        yield put(WS3Actions.getIncomeSowWs3Fail(err))
    }
}

export function* getSectionsWs3(api, action) {
    try {
        let response = yield call(api.getSections, action.payload);
        yield put(WS3Actions.getSectionsWs3Success(response.results));
    } catch (err) {
        yield put(WS3Actions.getSectionsWs3Fail(err.message))
    }
}

export function* getSowIncomeTabLocationsWs3(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS3Actions.getSowIncomeTabLocationsWs3Success(response.results));
    } catch (err) {
        yield put(WS3Actions.getSowIncomeTabLocationsWs3Fail(err.message))
    }
}

export function* getSowInnerTransferTabLocations1Ws3(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS3Actions.getSowInnerTransferTabLocations1Ws3Success(response.results));
    } catch (err) {
        yield put(WS3Actions.getSowInnerTransferTabLocations1Ws3Fail(err.message))
    }
}

export function* getSowInnerTransferTabLocations2Ws3(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS3Actions.getSowInnerTransferTabLocations2Ws3Success(response.results));
    } catch (err) {
        yield put(WS3Actions.getSowInnerTransferTabLocations2Ws3Fail(err.message))
    }
}

export function* getSowFarrowTabLocationsWs3(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS3Actions.getSowFarrowTabLocationsWs3Success(response.results));
    } catch (err) {
        yield put(WS3Actions.getSowFarrowTabLocationsWs3Fail(err.message))
    }
}