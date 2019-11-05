import { put, call } from 'redux-saga/effects';

import WSDataActions from '../redux-sauce/wsData'

export function* getSeminators(api, action) {
    try {
        let response = yield call(api.getUsers, action.payload);
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