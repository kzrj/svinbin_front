import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getTourReportsRequest: ['payload'],
    getTourReportsFail: ['error'],
    getTourReportsSuccess: ['payload'],

    getDirReportRequest: ['payload'],
    getDirReportFail: ['error'],
    getDirReportSuccess: ['payload'],

    getPigsCountReportRequest: ['payload'],
    getPigsCountReportFail: ['error'],
    getPigsCountReportSuccess: ['payload'],

    getOperationsReportRequest: ['payload'],
    getOperationsReportFail: ['error'],
    getOperationsReportSuccess: ['payload'],

    getWs3ReportRequest: ['payload'],
    getWs3ReportFail: ['error'],
    getWs3ReportSuccess: ['payload'],

    getWsReportPigsCountRequest: ['payload'],
    getWsReportPigsCountFail: ['error'],
    getWsReportPigsCountSuccess: ['payload'],

    getWsReportRequest: ['payload'],
    getWsReportFail: ['error'],
    getWsReportSuccess: ['payload'],
})

export const ReportsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    reportsFetching: false,
    tourReportslist: [],
    reportsErrorFetching: null,

    dirReport: {},
    
    pigsCount: {},

    ws3Report: {},

    wsReport: {},

    wsReportPigsCount: {},

    operations: [],
    operations_add_data: {},
})

/* ------------- Selectors ------------- */

export const TourReportsSelectors = {
    getTourReports: state => state.tourReportslist,
    getDirReport: state => state.dirReport,
    getPigsCountReport: state => state.pigsCount,
    getOperationsReport: state => state.operations,
    getWs3Report: state => state.ws3Report,
    getWsReportPigsCount: state => state.wsReportPigsCount,
    getWsReport: state => state.wsReport,
}

/* ------------- Reducers ------------- */

export const getTourReportsRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, tourReportslist: [] })
}

export const getTourReportsSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
         tourReportslist: payload })
}

export const getTourReportsFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, tourReportslist: [] })
}

export const getDirReportRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, dirReport: {} })
}

export const getDirReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        dirReport: payload })
}

export const getDirReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, dirReport: {} })
}

export const getPigsCountReportRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, pigsCount: {} })
}

export const getPigsCountReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        pigsCount: payload })
}

export const getPigsCountReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, pigsCount: {} })
}

export const getOperationsReportRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, operations: [], operations_add_data: {}})
}

export const getOperationsReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        operations: payload.results, operations_add_data: payload.additional_data })
}

export const getOperationsReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, operations: [],
        operations_add_data: {} })
}

export const getWs3ReportRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, ws3Report: {} })
}

export const getWs3ReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        ws3Report: payload })
}

export const getWs3ReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, ws3Report: {} })
}

export const getWsReportPigsCountRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, wsReportPigsCount: {} })
}

export const getWsReportPigsCountSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        wsReportPigsCount: payload })
}

export const getWsReportPigsCountFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, wsReportPigsCount: {} })
}

export const getWsReportRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, wsReport: {} })
}

export const getWsReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        wsReport: payload })
}

export const getWsReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, wsReport: {} })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_TOUR_REPORTS_REQUEST]: getTourReportsRequest,
    [Types.GET_TOUR_REPORTS_SUCCESS]: getTourReportsSuccess,
    [Types.GET_TOUR_REPORTS_FAIL]: getTourReportsFail,

    [Types.GET_DIR_REPORT_REQUEST]: getDirReportRequest,
    [Types.GET_DIR_REPORT_SUCCESS]: getDirReportSuccess,
    [Types.GET_DIR_REPORT_FAIL]: getDirReportFail,

    [Types.GET_PIGS_COUNT_REPORT_REQUEST]: getPigsCountReportRequest,
    [Types.GET_PIGS_COUNT_REPORT_SUCCESS]: getPigsCountReportSuccess,
    [Types.GET_PIGS_COUNT_REPORT_FAIL]: getPigsCountReportFail,

    [Types.GET_OPERATIONS_REPORT_REQUEST]: getOperationsReportRequest,
    [Types.GET_OPERATIONS_REPORT_SUCCESS]: getOperationsReportSuccess,
    [Types.GET_OPERATIONS_REPORT_FAIL]: getOperationsReportFail,

    [Types.GET_WS3_REPORT_REQUEST]: getWs3ReportRequest,
    [Types.GET_WS3_REPORT_SUCCESS]: getWs3ReportSuccess,
    [Types.GET_WS3_REPORT_FAIL]: getWs3ReportFail,

    [Types.GET_WS_REPORT_PIGS_COUNT_REQUEST]: getWsReportPigsCountRequest,
    [Types.GET_WS_REPORT_PIGS_COUNT_SUCCESS]: getWsReportPigsCountSuccess,
    [Types.GET_WS_REPORT_PIGS_COUNT_FAIL]: getWsReportPigsCountFail,

    [Types.GET_WS_REPORT_REQUEST]: getWsReportRequest,
    [Types.GET_WS_REPORT_SUCCESS]: getWsReportSuccess,
    [Types.GET_WS_REPORT_FAIL]: getWsReportFail,
})
