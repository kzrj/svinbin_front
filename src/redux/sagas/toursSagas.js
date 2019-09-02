import { put, call } from 'redux-saga/effects';

import ToursActions from '../redux-sauce/tours'

export function* getTours(api, action) {
    try {
        let response = yield call(api.getTours, action.payload);
        yield put(ToursActions.getToursSuccess(response.results));
    } catch (err) {
        yield put(ToursActions.getToursFail(err.message))
    }
}
