import { put, call } from 'redux-saga/effects';

import WS4Actions from '../redux-sauce/ws4'

export function* getNomadPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS4Actions.getNomadPigletsSuccess(response.results));
    } catch (err) {
        yield put(WS4Actions.getNomadPigletsFail(err))
    }
}

export function* getSections(api, action) {
    try {
        let response = yield call(api.getSections, action.payload);
        yield put(WS4Actions.getSectionsSuccess(response.results));
    } catch (err) {
        yield put(WS4Actions.getSectionsFail(err.message))
    }
}

export function* getIncomeTabLocations(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS4Actions.getIncomeTabLocationsSuccess(response.results));
    } catch (err) {
        yield put(WS4Actions.getIncomeTabLocationsFail(err.message))
    }
}

export function* setllePiglets(api, action) {
    try {
        let response = yield call(api.moveToPiglets, action.payload);
        yield put(WS4Actions.setllePigletsSuccess(response));
    } catch (err) {
        yield put(WS4Actions.setllePigletsFail(err))
    }
}

export function* getTransferPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS4Actions.getTransferPigletsSuccess(response.results));
    } catch (err) {
        yield put(WS4Actions.getTransferPigletsFail(err))
    }
}

export function* getInnerTransferTabLocations1(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS4Actions.getInnerTransferTabLocations1Success(response.results));
    } catch (err) {
        yield put(WS4Actions.getInnerTransferTabLocations1Fail(err.message))
    }
}

export function* getInnerTransferTabLocations2(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS4Actions.getInnerTransferTabLocations2Success(response.results));
    } catch (err) {
        yield put(WS4Actions.getInnerTransferTabLocations2Fail(err.message))
    }
}