import { put, call } from 'redux-saga/effects';

import WS75Actions from '../redux-sauce/ws75'

export function* getNomadPiglets(api, action) {
    try {
        let response = yield call(api.getNomadPiglets, action.payload);
        yield put(WS75Actions.getNomadPigletsSuccess(response.results));
    } catch (err) {
        yield put(WS75Actions.getNomadPigletsFail(err))
    }
}

export function* setllePiglets(api, action) {
    try {
        let response = yield call(api.moveToPiglets, action.payload);
        yield put(WS75Actions.setllePigletsSuccess(response));
    } catch (err) {
        yield put(WS75Actions.setllePigletsFail(err))
    }
}

// export function* getLocations(api, action) {
//     try {
//         let response = yield call(api.getLocations, action.payload);
//         yield put(WS75Actions.getLocationsSuccess(response.results));
//     } catch (err) {
//         yield put(WS75Actions.getLocationsFail(err))
//     }
// }