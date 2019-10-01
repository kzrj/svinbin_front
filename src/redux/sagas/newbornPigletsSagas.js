import { put, call } from 'redux-saga/effects';

import NewbornPigletsActions from '../redux-sauce/newbornPiglets'

export function* getNewbornPiglets(api, action) {
    try {
        let response = yield call(api.getNewbornPiglets, action.payload);
        yield put(NewbornPigletsActions.getNewbornPigletsSuccess(response.results));
    } catch (err) {
        yield put(NewbornPigletsActions.getNewbornPigletsFail(err))
    }
}

export function* mergeNewbornPiglets(api, action) {
    try {
        let response = yield call(api.mergeNewbornPiglets, action.payload);
        yield put(NewbornPigletsActions.mergeNewbornPigletsSuccess(response));
    } catch (err) {
        yield put(NewbornPigletsActions.mergeNewbornPigletsFail(err))
    }
}

// export function* cullingPiglets(api, action) {
//     try {
//         let response = yield call(api.cullingPiglets, action.payload);
//         yield put(NewbornPigletsActions.cullingPigletsSuccess(response));
//     } catch (err) {
//         yield put(NewbornPigletsActions.cullingPigletsFail(err))
//     }
// }

// export function* cullingGiltPiglets(api, action) {
//     try {
//         let response = yield call(api.cullingGiltPiglets, action.payload);
//         yield put(NewbornPigletsActions.cullingGiltPigletsSuccess(response));
//     } catch (err) {
//         yield put(NewbornPigletsActions.cullingGiltPigletsFail(err))
//     }
// }