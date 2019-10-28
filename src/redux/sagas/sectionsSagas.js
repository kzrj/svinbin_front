import { put, call } from 'redux-saga/effects';

import SectionsActions from '../redux-sauce/sections'

export function* getSections(api, action) {
    try {
        let response = yield call(api.getSections, action.payload);
        yield put(SectionsActions.getSectionsSuccess(response.results));
    } catch (err) {
        yield put(SectionsActions.getSectionsFail(err.message))
    }
}

export function* getSectionsAdditional(api, action) {
    try {
        let response = yield call(api.getSections, action.payload);
        yield put(SectionsActions.getSectionsAdditionalSuccess(response.results));
    } catch (err) {
        yield put(SectionsActions.getSectionsAdditionalFail(err.message))
    }
}
