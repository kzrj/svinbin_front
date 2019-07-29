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

export function* getCullingSows(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(WS1Actions.getCullingSowsSuccess(response.results));
    } catch (err) {
        yield put(WS1Actions.getCullingSowsFail(err))
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

export function* getCullingSow(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(WS1Actions.getCullingSowSuccess(response));
    } catch (err) {
        yield put(WS1Actions.getCullingSowFail(err))
    }
}

export function* seminationSow(api, action) {
    try {
        let response = yield call(api.seminationSow, action.payload);
        yield put(WS1Actions.seminationSowSuccess(response));
    } catch (err) {
        yield put(WS1Actions.seminationSowFail(err))
    }
}

export function* ultrasoundSow(api, action) {
    try {
        let response = yield call(api.ultrasoundSow, action.payload);
        yield put(WS1Actions.ultrasoundSowSuccess(response));
    } catch (err) {
        yield put(WS1Actions.ultrasoundSowFail(err))
    }
}

export function* cullingSow(api, action) {
    try {
        let response = yield call(api.cullingSow, action.payload);
        yield put(WS1Actions.cullingSowSuccess(response));
    } catch (err) {
        yield put(WS1Actions.cullingSowFail(err))
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

// export function* sowMoveTo(api, action) {
//     try {
//         let response = yield call(api.sowMoveTo, action.payload);
//         yield put(SowsActions.sowMoveToSuccess(response));
//     } catch (err) {
//         yield put(SowsActions.sowMoveToFail(err))
//     }
// }