import { put, call } from 'redux-saga/effects';

import WSDataActions from '../redux-sauce/wsData'

export function* getSeminators(api, action) {
    try {
        let response = yield call(api.getSemenators, action.payload);
        yield put(WSDataActions.getSeminatorsSuccess(response.results));
    } catch (err) {
        yield put(WSDataActions.getSeminatorsFail(err))
    }
}

export function* importSeminationsFromFarm(api, action) {
    try {
        let response = yield call(api.importSeminationsFromFarm, action.payload);
        yield put(WSDataActions.importSeminationsFromFarmSuccess(response));
    } catch (err) {
        yield put(WSDataActions.importSeminationsFromFarmFail(err))
    }
}

export function* getInfoWs3(api, action) {
    try {
        let response = yield call(api.getInfoWs3, action.payload);
        yield put(WSDataActions.getInfoWs3Success(response));
    } catch (err) {
        yield put(WSDataActions.getInfoWs3Fail(err))
    }
}

export function* getBalancesByToursWs3(api, action) {
    try {
        let response = yield call(api.getBalancesByToursWs3, action.payload);
        yield put(WSDataActions.getBalancesByToursWs3Success(response));
    } catch (err) {
        yield put(WSDataActions.getBalancesByToursWs3Fail(err))
    }
}

export function* ws3TransferSowAndPiglets(api, action) {
    try {
        let response = yield call(api.ws3TransferSowAndPiglets, action.payload);
        yield put(WSDataActions.ws3TransferSowAndPigletsSuccess(response));
    } catch (err) {
        yield put(WSDataActions.ws3TransferSowAndPigletsFail(err))
    }
}

export function* getWs3GiltJournal(api, action) {
    try {
        let response = yield call(api.getWs3GiltJournal, action.payload);
        yield put(WSDataActions.getWs3GiltJournalSuccess(response.results));
    } catch (err) {
        yield put(WSDataActions.getWs3GiltJournalFail(err))
    }
}