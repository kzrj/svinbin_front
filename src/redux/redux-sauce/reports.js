import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {} from '../../components/utils'
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

    getRecountBalanceRequest: ['payload'],
    getRecountBalanceFail: ['error'],
    getRecountBalanceSuccess: ['payload'],

    getWsPopulationRequest: ['payload'],
    getWsPopulationFail: ['error'],
    getWsPopulationSuccess: ['payload'],

    getToursV2ReportRequest: ['payload'],
    getToursV2ReportFail: ['error'],
    getToursV2ReportSuccess: ['payload'],

    getTourV2ReportRequest: ['payload'],
    getTourV2ReportFail: ['error'],
    getTourV2ReportSuccess: ['payload'],

    getWs12ReportRequest: ['payload'],
    getWs12ReportFail: ['error'],
    getWs12ReportSuccess: ['payload'],
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

    ws12Report: {},

    wsReport: {},

    wsReportPigsCount: {},

    operations: [],
    operations_add_data: {},

    recountData: {},

    wsAndSectionsPopulation: {},

    toursV2Reportlist: [],

    toursV2DataReportlist: [],

    tourV2Detail: null,
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
    getWs12Report: state => state.ws12Report,
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

export const getRecountBalanceRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, recountData: {} })
}

export const getRecountBalanceSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        recountData: payload })
}

export const getRecountBalanceFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, recountData: {} })
}

export const getWsPopulationRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, wsAndSectionsPopulation: {} })
}

export const getWsPopulationSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        wsAndSectionsPopulation: payload })
}

export const getWsPopulationFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, wsAndSectionsPopulation: {} })
}

// tours v2 list
export const getToursV2ReportRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, toursV2Reportlist: [] })
}

export const getToursV2ReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        toursV2Reportlist: payload })
}

export const getToursV2ReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, toursV2Reportlist: [] })
}

// tours v2 data to list
export const getTourV2ReportRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, tourV2Detail: null,})
}

export const getTourV2ReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        tourV2Detail: payload })
}

export const getTourV2ReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error,})
}

// ws12 report
export const getWs12ReportRequest = (state, { payload }) => {
    return state.merge({ reportsFetching: true, ws12Report: {} })
}

export const getWs12ReportSuccess = (state, { payload }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: null,
        ws12Report: payload })
}

export const getWs12ReportFail = (state, { error }) => {
    return state.merge({ reportsFetching: false, reportsErrorFetching: error, ws12Report: {} })
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

    [Types.GET_RECOUNT_BALANCE_REQUEST]: getRecountBalanceRequest,
    [Types.GET_RECOUNT_BALANCE_SUCCESS]: getRecountBalanceSuccess,
    [Types.GET_RECOUNT_BALANCE_FAIL]: getRecountBalanceFail,

    [Types.GET_WS_POPULATION_REQUEST]: getWsPopulationRequest,
    [Types.GET_WS_POPULATION_SUCCESS]: getWsPopulationSuccess,
    [Types.GET_WS_POPULATION_FAIL]: getWsPopulationFail,

    [Types.GET_TOURS_V2_REPORT_REQUEST]: getToursV2ReportRequest,
    [Types.GET_TOURS_V2_REPORT_SUCCESS]: getToursV2ReportSuccess,
    [Types.GET_TOURS_V2_REPORT_FAIL]: getToursV2ReportFail,

    [Types.GET_TOUR_V2_REPORT_REQUEST]: getTourV2ReportRequest,
    [Types.GET_TOUR_V2_REPORT_SUCCESS]: getTourV2ReportSuccess,
    [Types.GET_TOUR_V2_REPORT_FAIL]: getTourV2ReportFail,

    [Types.GET_WS12_REPORT_REQUEST]: getWs12ReportRequest,
    [Types.GET_WS12_REPORT_SUCCESS]: getWs12ReportSuccess,
    [Types.GET_WS12_REPORT_FAIL]: getWs12ReportFail,
})
