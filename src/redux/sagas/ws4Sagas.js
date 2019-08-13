import { put, call } from 'redux-saga/effects';

import WS4Actions from '../redux-sauce/ws4'

export function* getNomadPigletsWs4(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS4Actions.getNomadPigletsWs4Success(response.results));
    } catch (err) {
        yield put(WS4Actions.getNomadPigletsWs4Fail(err))
    }
}

export function* getSectionsWs4(api, action) {
    try {
        let response = yield call(api.getSections, action.payload);
        yield put(WS4Actions.getSectionsWs4Success(response.results));
    } catch (err) {
        yield put(WS4Actions.getSectionsWs4Fail(err.message))
    }
}

export function* getIncomeTabLocationsWs4(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS4Actions.getIncomeTabLocationsWs4Success(response.results));
    } catch (err) {
        yield put(WS4Actions.getIncomeTabLocationsWs4Fail(err.message))
    }
}

export function* setllePigletsWs4(api, action) {
    try {
        let response = yield call(api.moveToPiglets, action.payload);
        yield put(WS4Actions.setllePigletsWs4Success(response));
    } catch (err) {
        yield put(WS4Actions.setllePigletsWs4Fail(err))
    }
}

export function* getTransferPigletsWs4(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS4Actions.getTransferPigletsWs4Success(response.results));
    } catch (err) {
        yield put(WS4Actions.getTransferPigletsWs4Fail(err))
    }
}

export function* getInnerTransferTabLocations1Ws4(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS4Actions.getInnerTransferTabLocations1Ws4Success(response.results));
    } catch (err) {
        yield put(WS4Actions.getInnerTransferTabLocations1Ws4Fail(err.message))
    }
}

export function* getInnerTransferTabLocations2Ws4(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS4Actions.getInnerTransferTabLocations2Ws4Success(response.results));
    } catch (err) {
        yield put(WS4Actions.getInnerTransferTabLocations2Ws4Fail(err.message))
    }
}