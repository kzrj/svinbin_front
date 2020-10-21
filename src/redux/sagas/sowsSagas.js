import { put, call } from 'redux-saga/effects';

import SowsActions from '../redux-sauce/sows'

export function* getSows(api, action) {
    try {
        let response = yield call(api.getSows, action.payload);
        yield put(SowsActions.getSowsSuccess(response));
    } catch (err) {
        yield put(SowsActions.getSowsFail(err))
    }
}

export function* getSow(api, action) {
    try {
        let response = yield call(api.getSow, action.payload);
        yield put(SowsActions.getSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.getSowFail(err))
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

export function* ultrasoundSow(api, action) {
    try {
        let response = yield call(api.ultrasoundSow, action.payload);
        yield put(SowsActions.ultrasoundSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.ultrasoundSowFail(err))
    }
}

export function* cullingSow(api, action) {
    try {
        let response = yield call(api.cullingSow, action.payload);
        yield put(SowsActions.cullingSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.cullingSowFail(err))
    }
}

export function* cullingSowWs3(api, action) {
    try {
        let response = yield call(api.cullingSowWs3, action.payload);
        yield put(SowsActions.cullingSowWs3Success(response));
    } catch (err) {
        yield put(SowsActions.cullingSowWs3Fail(err))
    }
}

export function* sowMoveTo(api, action) {
    try {
        let response = yield call(api.sowMoveTo, action.payload);
        yield put(SowsActions.sowMoveToSuccess(response));
    } catch (err) {
        yield put(SowsActions.sowMoveToFail(err))
    }
}

export function* sowsMoveMany(api, action) {
    try {
        let response = yield call(api.sowsMoveMany, action.payload);
        yield put(SowsActions.sowsMoveManySuccess(response));
    } catch (err) {
        yield put(SowsActions.sowsMoveManyFail(err))
    }
}

export function* sowsMoveManyWs3(api, action) {
    try {
        let response = yield call(api.sowsMoveManyWs3, action.payload);
        yield put(SowsActions.sowsMoveManyWs3Success(response));
    } catch (err) {
        yield put(SowsActions.sowsMoveManyWs3Fail(err))
    }
}

export function* sowFarrow(api, action) {
    try {
        let response = yield call(api.sowFarrow, action.payload);
        yield put(SowsActions.sowFarrowSuccess(response));
    } catch (err) {
        yield put(SowsActions.sowFarrowFail(err))
    }
}

export function* createNewSow(api, action) {
    try {
        let response = yield call(api.createNewSow, action.payload);
        yield put(SowsActions.createNewSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.createNewSowFail(err))
    }
}

export function* createNewNonameSow(api, action) {
    try {
        let response = yield call(api.createNewNonameSow, action.payload);
        yield put(SowsActions.createNewNonameSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.createNewNonameSowFail(err))
    }
}

export function* addNewSeminatedToWs1(api, action) {
    try {
        let response = yield call(api.addNewSeminatedToWs1, action.payload);
        yield put(SowsActions.addNewSeminatedToWs1Success(response));
    } catch (err) {
        yield put(SowsActions.addNewSeminatedToWs1Fail(err))
    }
}

export function* massSemination(api, action) {
    try {
        let response = yield call(api.massSemination, action.payload);
        yield put(SowsActions.massSeminationSuccess(response));
    } catch (err) {
        yield put(SowsActions.massSeminationFail(err))
    }
}

export function* massUltrasound(api, action) {
    try {
        let response = yield call(api.massUltrasound, action.payload);
        yield put(SowsActions.massUltrasoundSuccess(response));
    } catch (err) {
        yield put(SowsActions.massUltrasoundFail(err))
    }
}

export function* massCulling(api, action) {
    try {
        let response = yield call(api.massCulling, action.payload);
        yield put(SowsActions.massCullingSuccess(response));
    } catch (err) {
        yield put(SowsActions.massCullingFail(err))
    }
}

export function* abortionSow(api, action) {
    try {
        let response = yield call(api.abortionSow, action.payload);
        yield put(SowsActions.abortionSowSuccess(response));
    } catch (err) {
        yield put(SowsActions.abortionSowFail(err))
    }
}

export function* abortionSowWs3(api, action) {
    try {
        let response = yield call(api.abortionSowWs3, action.payload);
        yield put(SowsActions.abortionSowWs3Success(response));
    } catch (err) {
        yield put(SowsActions.abortionSowWs3Fail(err))
    }
}

export function* massInitTransfer(api, action) {
    try {
        let response = yield call(api.massInitTransfer, action.payload);
        yield put(SowsActions.massInitTransferSuccess(response));
    } catch (err) {
        yield put(SowsActions.massInitTransferFail(err))
    }
}

export function* markAsNurse(api, action) {
    try {
        let response = yield call(api.markAsNurse, action.payload);
        yield put(SowsActions.markAsNurseSuccess(response));
    } catch (err) {
        yield put(SowsActions.markAsNurseFail(err))
    }
}

// boars
export function* getBoars(api, action) {
    try {
        let response = yield call(api.getBoars, action.payload);
        yield put(SowsActions.getBoarsSuccess(response.results));
    } catch (err) {
        yield put(SowsActions.getBoarsFail(err))
    }
}

export function* createBoar(api, action) {
    try {
        let response = yield call(api.createBoar, action.payload);
        yield put(SowsActions.createBoarSuccess(response));
    } catch (err) {
        yield put(SowsActions.createBoarFail(err))
    }
}

export function* cullingBoar(api, action) {
    try {
        let response = yield call(api.cullingBoar, action.payload);
        yield put(SowsActions.cullingBoarSuccess(response));
    } catch (err) {
        yield put(SowsActions.cullingBoarFail(err))
    }
}

export function* getBoarBreed(api, action) {
    try {
        let response = yield call(api.getBoarBreed, action.payload);
        yield put(SowsActions.getBoarBreedSuccess(response.results));
    } catch (err) {
        yield put(SowsActions.getBoarBreedFail(err))
    }
}

export function* semenBoar(api, action) {
    try {
        let response = yield call(api.semenBoar, action.payload);
        yield put(SowsActions.semenBoarSuccess(response));
    } catch (err) {
        yield put(SowsActions.semenBoarFail(err))
    }
}

export function* getSemenBoarList(api, action) {
    try {
        let response = yield call(api.getSemenBoarList, action.payload);
        yield put(SowsActions.getSemenBoarListSuccess(response.results));
    } catch (err) {
        yield put(SowsActions.getSemenBoarListFail(err))
    }
}

export function* createGilt(api, action) {
    try {
        let response = yield call(api.createGilt, action.payload);
        yield put(SowsActions.createGiltSuccess(response));
    } catch (err) {
        yield put(SowsActions.createGiltFail(err))
    }
}