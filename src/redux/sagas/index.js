import { takeEvery, all, takeLatest } from "redux-saga/effects";

/* -------------- API -------------- */
import AuthApi from "../api/authApi";
import LocationsApi from '../api/locationsApi';
import ToursApi from '../api/toursApi';
import ReportsApi from '../api/reportsApi';
import SowsApi from '../api/sowsApi';
import PigletsApi from '../api/pigletsApi';
import UsersApi from '../api/usersApi';
import WsRestApi from '../api/wsRestApi';
/* ------------- Types ------------- */
import { AuthTypes } from "../redux-sauce/auth";
import { LocationsTypes } from '../redux-sauce/locations';
import { SectionsTypes } from '../redux-sauce/sections';
import { ToursTypes } from '../redux-sauce/tours';
import { ReportsTypes } from '../redux-sauce/reports';
import { SowsTypes } from '../redux-sauce/sows';
import { PigletsTypes } from '../redux-sauce/piglets';
import { WsDataTypes } from '../redux-sauce/wsData';

/* ------------- Sagas ------------- */
import { logIn, logOut, checkToken, signUp, checkAuth } from "./authSagas";
import { getLocations, getLocationsAdditional } from './locationsSagas';
import { getSections, getSectionsAdditional, } from './sectionsSagas';
import { getTours } from './toursSagas';
import * as reportsSaga from './reportsSagas';
import * as sowsSaga from './sowsSagas';
import * as pigletsSaga from './pigletsSagas';
import * as wsDataSaga from './wsDataSagas';

const authApi = AuthApi.create();
const locationsApi = LocationsApi.create();
const toursApi = ToursApi.create();
const reportsApi = ReportsApi.create();
const sowsApi = SowsApi.create();
const pigletsApi = PigletsApi.create();
const usersApi = UsersApi.create();
const wsRestApi = WsRestApi.create();

export default function* root() {
  yield all([
    takeEvery(AuthTypes.LOGIN_REQUEST, logIn, authApi),
    takeEvery(AuthTypes.SIGNUP_REQUEST, signUp, authApi),
    takeEvery(AuthTypes.LOGOUT_REQUEST, logOut, authApi),
    takeEvery(AuthTypes.CHECK_TOKEN_REQUEST, checkToken, authApi),
    takeEvery(AuthTypes.SIGNUP_REQUEST, signUp, authApi),
    takeLatest(AuthTypes.CHECK_AUTH_REQUEST, checkAuth, authApi),
    
    takeEvery(LocationsTypes.GET_LOCATIONS_REQUEST, getLocations, locationsApi),
    takeEvery(LocationsTypes.GET_LOCATIONS_ADDITIONAL_REQUEST, getLocationsAdditional, locationsApi),
    takeEvery(SectionsTypes.GET_SECTIONS_REQUEST, getSections, locationsApi),
    takeEvery(SectionsTypes.GET_SECTIONS_ADDITIONAL_REQUEST, getSectionsAdditional, locationsApi),

    takeEvery(ToursTypes.GET_TOURS_REQUEST, getTours, toursApi),
    takeEvery(ReportsTypes.GET_TOUR_REPORTS_REQUEST, reportsSaga.getTourReports, reportsApi),
    takeEvery(ReportsTypes.GET_DIR_REPORT_REQUEST, reportsSaga.getDirReport, reportsApi),
    takeEvery(ReportsTypes.GET_PIGS_COUNT_REPORT_REQUEST, reportsSaga.getPigsCountReport, reportsApi),
    takeEvery(ReportsTypes.GET_OPERATIONS_REPORT_REQUEST, reportsSaga.getOperationsReport, reportsApi),
    takeEvery(ReportsTypes.GET_WS3_REPORT_REQUEST, reportsSaga.getWs3Report, reportsApi),
    takeEvery(ReportsTypes.GET_WS_REPORT_PIGS_COUNT_REQUEST, reportsSaga.getWsReportPigsCount, reportsApi),

    takeEvery(SowsTypes.GET_SOWS_REQUEST, sowsSaga.getSows, sowsApi),
    takeEvery(SowsTypes.GET_SOW_REQUEST, sowsSaga.getSow, sowsApi),
    takeEvery(SowsTypes.SEMINATION_SOW_REQUEST, sowsSaga.seminationSow, sowsApi),
    // takeEvery(SowsTypes.ULTRASOUND_SOW_REQUEST, sowsSaga.ultrasoundSow, sowsApi),
    takeEvery(SowsTypes.CULLING_SOW_REQUEST, sowsSaga.cullingSow, sowsApi),
    takeEvery(SowsTypes.SOW_MOVE_TO_REQUEST, sowsSaga.sowMoveTo, sowsApi),
    takeEvery(SowsTypes.SOWS_MOVE_MANY_REQUEST, sowsSaga.sowsMoveMany, sowsApi),
    takeEvery(SowsTypes.SOW_FARROW_REQUEST, sowsSaga.sowFarrow, sowsApi),
    takeEvery(SowsTypes.CREATE_NEW_SOW_REQUEST, sowsSaga.createNewSow, sowsApi),
    takeEvery(SowsTypes.CREATE_NEW_NONAME_SOW_REQUEST, sowsSaga.createNewNonameSow, sowsApi),
    takeEvery(SowsTypes.GET_BOARS_REQUEST, sowsSaga.getBoars, sowsApi),
    takeEvery(SowsTypes.MASS_SEMINATION_REQUEST, sowsSaga.massSemination, sowsApi),
    takeEvery(SowsTypes.MASS_ULTRASOUND_REQUEST, sowsSaga.massUltrasound, sowsApi),
    takeEvery(SowsTypes.ABORTION_SOW_REQUEST, sowsSaga.abortionSow, sowsApi),
    takeEvery(SowsTypes.MASS_INIT_TRANSFER_REQUEST, sowsSaga.massInitTransfer, sowsApi),
    takeEvery(SowsTypes.MARK_AS_NURSE_REQUEST, sowsSaga.markAsNurse, sowsApi),

    // INIT SOWS
    takeEvery(SowsTypes.ADD_NEW_SEMINATED_TO_WS1_REQUEST, sowsSaga.addNewSeminatedToWs1, sowsApi),

    takeEvery(PigletsTypes.GET_PIGLETS_REQUEST, pigletsSaga.getPiglets, pigletsApi),
    takeEvery(PigletsTypes.MERGE_FROM_LIST_PIGLETS_REQUEST, pigletsSaga.mergeFromListPiglets, pigletsApi),
    takeEvery(PigletsTypes.MERGE_FROM_INIT_LIST_PIGLETS_REQUEST, pigletsSaga.mergeFromInitListPiglets, pigletsApi),
    takeEvery(PigletsTypes.CULLING_PIGLETS_REQUEST, pigletsSaga.cullingPiglets, pigletsApi),
    takeEvery(PigletsTypes.WEIGHING_PIGLETS_REQUEST, pigletsSaga.weighingPiglets, pigletsApi),
    takeEvery(PigletsTypes.RECOUNT_WEIGHING_PIGLETS_REQUEST, pigletsSaga.recountWeighingPiglets, pigletsApi),
    takeEvery(PigletsTypes.MOVE_PIGLETS_REQUEST, pigletsSaga.movePiglets, pigletsApi),
    takeEvery(PigletsTypes.MOVE_GILTS_TO_WS1_REQUEST, pigletsSaga.moveGiltsToWs1, pigletsApi),
    takeEvery(PigletsTypes.MARK_AS_GILTS_REQUEST, pigletsSaga.markAsGilts, pigletsApi),
    takeEvery(PigletsTypes.INIT_PIGLETS_REQUEST, pigletsSaga.initPiglets, pigletsApi),
    takeEvery(PigletsTypes.RECOUNT_PIGLETS_REQUEST, pigletsSaga.recountPiglets, pigletsApi),
    takeEvery(PigletsTypes.MOVE_GILTS_TO_WS75_REQUEST, pigletsSaga.moveGiltsToWs75, pigletsApi),
    takeEvery(PigletsTypes.CREATE_GILT_REQUEST, pigletsSaga.createGilt, pigletsApi),

    takeEvery(WsDataTypes.GET_SEMINATORS_REQUEST, wsDataSaga.getSeminators, usersApi),
    takeEvery(WsDataTypes.IMPORT_SEMINATIONS_FROM_FARM_REQUEST, wsDataSaga.importSeminationsFromFarm, sowsApi),
    takeEvery(WsDataTypes.GET_INFO_WS3_REQUEST, wsDataSaga.getInfoWs3, wsRestApi),
    takeEvery(WsDataTypes.GET_BALANCES_BY_TOURS_WS3_REQUEST, wsDataSaga.getBalancesByToursWs3, wsRestApi),

  ]);
}
