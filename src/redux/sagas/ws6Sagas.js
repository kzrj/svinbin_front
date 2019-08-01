import { put, call } from 'redux-saga/effects';

import WS6Actions from '../redux-sauce/ws6'

export function* getNomadPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS6Actions.getNomadPigletsSuccess(response.results));
    } catch (err) {
        yield put(WS6Actions.getNomadPigletsFail(err))
    }
}

export function* getSections(api, action) {
    try {
        let response = yield call(api.getSections, action.payload);
        yield put(WS6Actions.getSectionsSuccess(response.results));
    } catch (err) {
        yield put(WS6Actions.getSectionsFail(err.message))
    }
}

export function* getIncomeTabLocations(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS6Actions.getIncomeTabLocationsSuccess(response.results));
    } catch (err) {
        yield put(WS6Actions.getIncomeTabLocationsFail(err.message))
    }
}

export function* setllePiglets(api, action) {
    try {
        let response = yield call(api.moveToPiglets, action.payload);
        yield put(WS6Actions.setllePigletsSuccess(response));
    } catch (err) {
        yield put(WS6Actions.setllePigletsFail(err))
    }
}

export function* getTransferPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS6Actions.getTransferPigletsSuccess(response.results));
    } catch (err) {
        yield put(WS6Actions.getTransferPigletsFail(err))
    }
}

export function* getInnerTransferTabLocations1(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS6Actions.getInnerTransferTabLocations1Success(response.results));
    } catch (err) {
        yield put(WS6Actions.getInnerTransferTabLocations1Fail(err.message))
    }
}

export function* getInnerTransferTabLocations2(api, action) {
    try {
        let response = yield call(api.getLocations, action.payload);
        yield put(WS6Actions.getInnerTransferTabLocations2Success(response.results));
    } catch (err) {
        yield put(WS6Actions.getInnerTransferTabLocations2Fail(err.message))
    }
}