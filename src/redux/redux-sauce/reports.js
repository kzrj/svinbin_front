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

    operations: []
})

/* ------------- Selectors ------------- */

export const TourReportsSelectors = {
    getTourReports: state => state.tourReportslist,
    getDirReport: state => state.dirReport,
    getPigsCountReport: state => state.pigsCount,
    getOperationsReport: state => state.operations,
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
    return state.merge({ reportsFetching: true, operations: []})
}

export const getOperationsReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        operations: payload })
}

export const getOperationsReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, operations: [] })
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
})
