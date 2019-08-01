import { put, call } from 'redux-saga/effects';

import WS5Actions from '../redux-sauce/ws5'

export function* getNomadPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS5Actions.getNomadPigletsSuccess(response.results));
    } catch (err) {
        yield put(WS5Actions.getNomadPigletsFail(err))
    }
}

export function* getSections(api, action) {
    try {
        let response = yield call(api.getSections, action.payload);
        yield put(WS5Actions.getSectionsSuccess(response.results));
    } catch (err) {
        yield put(WS5Actions.getSectionsFail(err.message))
    }
}

export function* getIncomeTabLocations(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS5Actions.getIncomeTabLocationsSuccess(response.results));
    } catch (err) {
        yield put(WS5Actions.getIncomeTabLocationsFail(err.message))
    }
}

export function* setllePiglets(api, action) {
    try {
        let response = yield call(api.moveToPiglets, action.payload);
        yield put(WS5Actions.setllePigletsSuccess(response));
    } catch (err) {
        yield put(WS5Actions.setllePigletsFail(err))
    }
}

export function* getTransferPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS5Actions.getTransferPigletsSuccess(response.results));
    } catch (err) {
        yield put(WS5Actions.getTransferPigletsFail(err))
    }
}

export function* getInnerTransferTabLocations1(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS5Actions.getInnerTransferTabLocations1Success(response.results));
    } catch (err) {
        yield put(WS5Actions.getInnerTransferTabLocations1Fail(err.message))
    }
}

export function* getInnerTransferTabLocations2(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS5Actions.getInnerTransferTabLocations2Success(response.results));
    } catch (err) {
        yield put(WS5Actions.getInnerTransferTabLocations2Fail(err.message))
    }
}