import { put, call } from 'redux-saga/effects';

import WS2Actions from '../redux-sauce/ws2'

export function* getCullingSows(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(WS2Actions.getCullingSowsSuccess(response.results));
    } catch (err) {
        yield put(WS2Actions.getCullingSowsFail(err))
    }
}

export function* getCullingSow(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(WS2Actions.getCullingSowSuccess(response));
    } catch (err) {
        yield put(WS2Actions.getCullingSowFail(err))
    }
}

// export function* getSowsByTours(api, action) {
//     try {
//         let response = yield call(api.getSowsByTours, action.payload);
//         yield put(WS1Actions.getSowsByToursSuccess(response));
//     } catch (err) {
//         yield put(WS1Actions.getSowsByToursFail(err))
//     }
// }

export function* cullingSow(api, action) {
    try {
        let response = yield call(api.cullingSow, action.payload);
        yield put(WS2Actions.cullingSowSuccess(response));
    } catch (err) {
        yield put(WS2Actions.cullingSowFail(err))
    }
}

// export function* sowMoveTo(api, action) {
//     try {
//         let response = yield call(api.sowMoveTo, action.payload);
//         yield put(SowsActions.sowMoveToSuccess(response));
//     } catch (err) {
//         yield put(SowsActions.sowMoveToFail(err))
//     }
// }
