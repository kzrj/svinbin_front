import { takeEvery, all, takeLatest } from "redux-saga/effects";

/* -------------- API -------------- */
import AuthApi from "../api/authApi";
import LocationsApi from '../api/locationsApi';
import ToursApi from '../api/toursApi';
import SowsApi from '../api/sowsApi';
import NomadPigletsApi from '../api/nomadPigletsApi';
import NewbornPigletsApi from '../api/newbornPigletsApi';
import UsersApi from '../api/usersApi';
import WsRestApi from '../api/wsRestApi';
/* ------------- Types ------------- */
import { AuthTypes } from "../redux-sauce/auth";
import { LocationsTypes } from '../redux-sauce/locations';
import { SectionsTypes } from '../redux-sauce/sections';
import { ToursTypes } from '../redux-sauce/tours';
import { SowsTypes } from '../redux-sauce/sows';
import { NomadPigletsTypes } from '../redux-sauce/nomadPiglets';
import { NewbornPigletsTypes } from '../redux-sauce/newbornPiglets';

import { WsDataTypes } from '../redux-sauce/wsData';
import { Ws4Types } from '../redux-sauce/ws4';
import { Ws8Types } from '../redux-sauce/ws8';
import { Ws5Types } from '../redux-sauce/ws5';
import { Ws6Types } from '../redux-sauce/ws6';
import { Ws7Types } from '../redux-sauce/ws7';
import { Ws75Types } from '../redux-sauce/ws75';
/* ------------- Sagas ------------- */
import { logIn, logOut, checkToken, signUp, checkAuth } from "./authSagas";
import { getLocations, getLocationsAdditional } from './locationsSagas';
import { getSections, getSectionsAdditional, } from './sectionsSagas';
import { getTours } from './toursSagas';
import * as sowsSaga from './sowsSagas';
import * as nomadPigletsSaga from './nomadPigletsSagas';
import * as newbornPigletsSaga from './newbornPigletsSagas';
import * as wsDataSaga from './wsDataSagas';
import * as ws4Saga from './ws4Sagas';
import * as ws8Saga from './ws8Sagas';
import * as ws5Saga from './ws5Sagas';
import * as ws6Saga from './ws6Sagas';
import * as ws7Saga from './ws7Sagas';
import * as ws75Saga from './ws75Sagas';

const authApi = AuthApi.create();
const locationsApi = LocationsApi.create();
const toursApi = ToursApi.create();
const sowsApi = SowsApi.create();
const nomadPigletsApi = NomadPigletsApi.create();
const newbornPigletsApi = NewbornPigletsApi.create();
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
    takeEvery(SowsTypes.SET_SOW, sowsSaga.setSow),

    // INIT SOWS
    takeEvery(SowsTypes.ADD_NEW_SEMINATED_TO_WS1_REQUEST, sowsSaga.addNewSeminatedToWs1, sowsApi),

    takeEvery(NomadPigletsTypes.GET_NOMAD_PIGLETS_REQUEST, nomadPigletsSaga.getNomadPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.WEIGHING_PIGLETS_REQUEST, nomadPigletsSaga.weighingPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.CULLING_PIGLETS_REQUEST, nomadPigletsSaga.cullingPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.CULLING_GILT_PIGLETS_REQUEST, nomadPigletsSaga.cullingGiltPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.MOVE_GROUP_FROM_CELL_TO_CELL_REQUEST, nomadPigletsSaga.moveGroupFromCellToCell, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.MOVE_TO_PIGLETS_REQUEST, nomadPigletsSaga.moveToPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.MOVE_TO_CELL_PIGLETS_REQUEST, nomadPigletsSaga.moveToCellPiglets, nomadPigletsApi),

    takeEvery(NewbornPigletsTypes.GET_NEWBORN_PIGLETS_REQUEST, newbornPigletsSaga.getNewbornPiglets, newbornPigletsApi),
    takeEvery(NewbornPigletsTypes.MERGE_NEWBORN_PIGLETS_REQUEST, newbornPigletsSaga.mergeNewbornPiglets, newbornPigletsApi),
    takeEvery(NewbornPigletsTypes.CREATE_GILT_REQUEST, newbornPigletsSaga.createGilt, newbornPigletsApi),
    takeEvery(NewbornPigletsTypes.CULLING_NEWBORN_PIGLETS_REQUEST, newbornPigletsSaga.cullingNewbornPiglets, newbornPigletsApi),
    takeEvery(NewbornPigletsTypes.CULLING_GILT_NEWBORN_PIGLETS_REQUEST, newbornPigletsSaga.cullingGiltNewbornPiglets, newbornPigletsApi),
    takeEvery(NewbornPigletsTypes.RECOUNT_NEWBORN_PIGLETS_REQUEST, newbornPigletsSaga.recountNewbornPiglets, newbornPigletsApi),

    takeEvery(WsDataTypes.GET_SEMINATORS_REQUEST, wsDataSaga.getSeminators, usersApi),
    takeEvery(WsDataTypes.IMPORT_SEMINATIONS_FROM_FARM_REQUEST, wsDataSaga.importSeminationsFromFarm, sowsApi),
    takeEvery(WsDataTypes.GET_INFO_WS3_REQUEST, wsDataSaga.getInfoWs3, wsRestApi),
    takeEvery(WsDataTypes.GET_BALANCES_BY_TOURS_WS3_REQUEST, wsDataSaga.getBalancesByToursWs3, wsRestApi),

    takeEvery(Ws4Types.GET_NOMAD_PIGLETS_WS4_REQUEST, ws4Saga.getNomadPigletsWs4, nomadPigletsApi),
    // takeEvery(Ws4Types.GET_SECTIONS_WS4_REQUEST, ws4Saga.getSectionsWs4, locationsApi),
    takeEvery(Ws4Types.GET_INCOME_TAB_LOCATIONS_WS4_REQUEST, ws4Saga.getIncomeTabLocationsWs4, locationsApi),
    takeEvery(Ws4Types.SETLLE_PIGLETS_WS4_REQUEST, ws4Saga.setllePigletsWs4, nomadPigletsApi),
    takeEvery(Ws4Types.GET_TRANSFER_PIGLETS_WS4_REQUEST, ws4Saga.getTransferPigletsWs4, nomadPigletsApi),
    takeEvery(Ws4Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_WS4_REQUEST, ws4Saga.getInnerTransferTabLocations1Ws4, locationsApi),
    takeEvery(Ws4Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_WS4_REQUEST, ws4Saga.getInnerTransferTabLocations2Ws4, locationsApi),

    takeEvery(Ws8Types.GET_NOMAD_PIGLETS_WS8_REQUEST, ws8Saga.getNomadPigletsWs8, nomadPigletsApi),
    // takeEvery(Ws8Types.GET_SECTIONS_REQUEST, ws8Saga.getSections, locationsApi),
    takeEvery(Ws8Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws8Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws8Types.SETLLE_PIGLETS_REQUEST, ws8Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws8Types.GET_TRANSFER_PIGLETS_REQUEST, ws8Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws8Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws8Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws8Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws8Saga.getInnerTransferTabLocations2, locationsApi),

    takeEvery(Ws5Types.GET_NOMAD_PIGLETS_WS5_REQUEST, ws5Saga.getNomadPigletsWs5, nomadPigletsApi),
    // takeEvery(Ws5Types.GET_SECTIONS_REQUEST, ws5Saga.getSections, locationsApi),
    takeEvery(Ws5Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws5Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws5Types.SETLLE_PIGLETS_REQUEST, ws5Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws5Types.GET_TRANSFER_PIGLETS_REQUEST, ws5Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws5Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws5Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws5Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws5Saga.getInnerTransferTabLocations2, locationsApi),

    // takeEvery(Ws6Types.GET_NOMAD_PIGLETS_REQUEST, ws6Saga.getNomadPiglets, nomadPigletsApi),
    // takeEvery(Ws6Types.GET_SECTIONS_REQUEST, ws6Saga.getSections, locationsApi),
    takeEvery(Ws6Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws6Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws6Types.SETLLE_PIGLETS_REQUEST, ws6Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws6Types.GET_TRANSFER_PIGLETS_REQUEST, ws6Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws6Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws6Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws6Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws6Saga.getInnerTransferTabLocations2, locationsApi),

    // takeEvery(Ws7Types.GET_NOMAD_PIGLETS_REQUEST, ws7Saga.getNomadPiglets, nomadPigletsApi),
    // takeEvery(Ws7Types.GET_SECTIONS_REQUEST, ws7Saga.getSections, locationsApi),
    takeEvery(Ws7Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws7Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws7Types.SETLLE_PIGLETS_REQUEST, ws7Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws7Types.GET_TRANSFER_PIGLETS_REQUEST, ws7Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws7Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws7Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws7Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws7Saga.getInnerTransferTabLocations2, locationsApi),

    // takeEvery(Ws75Types.GET_NOMAD_PIGLETS_REQUEST, ws75Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws75Types.SETLLE_PIGLETS_REQUEST, ws75Saga.setllePiglets, nomadPigletsApi),
    // takeEvery(Ws75Types.GET_LOCATIONS_REQUEST, ws75Saga.getLocations, locationsApi),
  ]);
}
