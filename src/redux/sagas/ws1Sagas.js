import { put, call } from 'redux-saga/effects';

import WS1Actions from '../redux-sauce/ws1'

export function* getSeminationSows(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(WS1Actions.getSeminationSowsSuccess(response.results));
    } catch (err) {
        yield put(WS1Actions.getSeminationSowsFail(err))
    }
}

export function* getUltrasoundSows(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(WS1Actions.getUltrasoundSowsSuccess(response.results));
    } catch (err) {
        yield put(WS1Actions.getUltrasoundSowsFail(err))
    }
}

export function* getCullingSowsWs1(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(WS1Actions.getCullingSowsWs1Success(response.results));
    } catch (err) {
        yield put(WS1Actions.getCullingSowsWs1Fail(err))
    }
}

export function* getSeminationSow(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(WS1Actions.getSeminationSowSuccess(response));
    } catch (err) {
        yield put(WS1Actions.getSeminationSowFail(err))
    }
}

export function* getUltrasoundSow(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(WS1Actions.getUltrasoundSowSuccess(response));
    } catch (err) {
        yield put(WS1Actions.getUltrasoundSowFail(err))
    }
}

export function* getCullingSowWs1(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(WS1Actions.getCullingSowWs1Success(response));
    } catch (err) {
        yield put(WS1Actions.getCullingSowWs1Fail(err))
    }
}

export function* seminationSowWs1(api, action) {
    try {
        let response = yield call(api.seminationSow, action.payload);
        yield put(WS1Actions.seminationSowWs1Success(response));
    } catch (err) {
        yield put(WS1Actions.seminationSowWs1Fail(err))
    }
}

export function* ultrasoundSowWs1(api, action) {
    try {
        let response = yield call(api.ultrasoundSow, action.payload);
        yield put(WS1Actions.ultrasoundSowWs1Success(response));
    } catch (err) {
        yield put(WS1Actions.ultrasoundSowWs1Fail(err))
    }
}

export function* cullingSowWs1(api, action) {
    try {
        let response = yield call(api.cullingSow, action.payload);
        yield put(WS1Actions.cullingSowWs1Success(response));
    } catch (err) {
        yield put(WS1Actions.cullingSowWs1Fail(err))
    }
}

export function* getSowsByTours(api, action) {
    try {
        let response = yield call(api.getSowsByTours, action.payload);
        yield put(WS1Actions.getSowsByToursSuccess(response));
    } catch (err) {
        yield put(WS1Actions.getSowsByToursFail(err))
    }
}

export function* setSeminationSow(sow) {
    // console.log('111')
    // let sow = yield call(api.setSow, action.payload);
    yield put(WS1Actions.setSeminationSow(sow));
}

export function* getSeminators(api, action) {
    try {
        let response = yield call(api.getUsers, action.payload);
        yield put(WS1Actions.getSeminatorsSuccess(response.results));
    } catch (err) {
        yield put(WS1Actions.getSeminatorsFail(err))
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