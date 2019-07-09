import { put, call } from 'redux-saga/effects';

import SowsActions from '../redux-sauce/sows'

export function* getSows(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(SowsActions.getSowsSuccess(response.results));
    } catch (err) {
        yield put(SowsActions.getSowsFail(err.message))
    }
}

export function* seminationSow(api, action) {
    try {
        let response = yield call(api.seminationSow, action.payload);
        yield put(SowsActions.seminationSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.seminationSowFail(err))
    }
}