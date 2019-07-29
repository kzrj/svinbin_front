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