import { put, call } from 'redux-saga/effects';

import NomadPigletsActions from '../redux-sauce/nomadPiglets'

export function* getNomadPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(NomadPigletsActions.getNomadPigletsSuccess(response.results));
    } catch (err) {
        yield put(NomadPigletsActions.getNomadPigletsFail(err))
    }
}

export function* weighingPiglets(api, action) {
    try {
        let response = yield call(api.weighingPiglets, action.payload);
        yield put(NomadPigletsActions.weighingPigletsSuccess(response));
    } catch (err) {
        yield put(NomadPigletsActions.weighingPigletsFail(err))
    }
}

export function* cullingPiglets(api, action) {
    try {
        let response = yield call(api.cullingPiglets, action.payload);
        yield put(NomadPigletsActions.cullingPigletsSuccess(response));
    } catch (err) {
        yield put(NomadPigletsActions.cullingPigletsFail(err))
    }
}

export function* cullingGiltPiglets(api, action) {
    try {
        let response = yield call(api.cullingGiltPiglets, action.payload);
        yield put(NomadPigletsActions.cullingGiltPigletsSuccess(response));
    } catch (err) {
        yield put(NomadPigletsActions.cullingGiltPigletsFail(err))
    }
}

export function* moveGroupFromCellToCell(api, action) {
    try {
        let response = yield call(api.moveGroupFromCellToCell, action.payload);
        yield put(NomadPigletsActions.moveGroupFromCellToCellSuccess(response));
    } catch (err) {
        yield put(NomadPigletsActions.moveGroupFromCellToCellFail(err))
    }
}

export function* moveToPiglets(api, action) {
    try {
        let response = yield call(api.moveToPiglets, action.payload);
        yield put(NomadPigletsActions.moveToPigletsSuccess(response));
    } catch (err) {
        yield put(NomadPigletsActions.moveToPigletsFail(err))
    }
}