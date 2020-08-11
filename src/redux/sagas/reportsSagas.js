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

export function* getOperationsReport(api, action) {
    try {
        let response = yield call(api.getOperationsReport, action.payload);
        yield put(ReportsActions.getOperationsReportSuccess(response));
    } catch (err) {
        yield put(ReportsActions.getOperationsReportFail(err.message))
    }
}

export function* getWs3Report(api, action) {
    try {
        let response = yield call(api.getWs3Report, action.payload);
        yield put(ReportsActions.getWs3ReportSuccess(response));
    } catch (err) {
        yield put(ReportsActions.getWs3ReportFail(err.message))
    }
}

export function* getWsReportPigsCount(api, action) {
    try {
        let response = yield call(api.getWsReportPigsCount, action.payload);
        yield put(ReportsActions.getWsReportPigsCountSuccess(response));
    } catch (err) {
        yield put(ReportsActions.getWsReportPigsCountFail(err.message))
    }
}

export function* getWsReport(api, action) {
    try {
        let response = yield call(api.getWsReport, action.payload);
        yield put(ReportsActions.getWsReportSuccess(response));
    } catch (err) {
        yield put(ReportsActions.getWsReportFail(err.message))
    }
}
