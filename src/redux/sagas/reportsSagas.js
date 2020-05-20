import { put, call } from 'redux-saga/effects';

import ReportsActions from '../redux-sauce/reports'

export function* getTourReports(api, action) {
    try {
        let response = yield call(api.getTourReports, action.payload);
        yield put(ReportsActions.getTourReportsSuccess(response.results));
    } catch (err) {
        yield put(ReportsActions.getTourReportsFail(err.message))
    }
}

export function* getDirReport(api, action) {
    try {
        let response = yield call(api.getDirReport, action.payload);
        yield put(ReportsActions.getDirReportSuccess(response));
    } catch (err) {
        yield put(ReportsActions.getDirReportFail(err.message))
    }
}

export function* getPigsCountReport(api, action) {
    try {
        let response = yield call(api.getPigsCountReport, action.payload);
        yield put(ReportsActions.getPigsCountReportSuccess(response));
    } catch (err) {
        yield put(ReportsActions.getPigsCountReportFail(err.message))
    }
}
