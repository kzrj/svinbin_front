import { put, call } from 'redux-saga/effects';

import WS1Actions from '../redux-sauce/ws1'

export function* getSeminators(api, action) {
    try {
        let response = yield call(api.getUsers, action.payload);
        yield put(WS1Actions.getSeminatorsSuccess(response.results));
    } catch (err) {
        yield put(WS1Actions.getSeminatorsFail(err))
    }
}

export function* importSeminationsFromFarm(api, action) {
    try {
        let response = yield call(api.importSeminationsFromFarm, action.payload);
        yield put(WS1Actions.importSeminationsFromFarmSuccess(response));
    } catch (err) {
        yield put(WS1Actions.importSeminationsFromFarmFail(err))
    }
}