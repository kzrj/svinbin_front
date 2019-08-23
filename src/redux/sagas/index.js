import { takeEvery, all, takeLatest } from "redux-saga/effects";

/* -------------- API -------------- */
import AuthApi from "../api/authApi";
import LocationsApi from '../api/locationsApi';
import SowsApi from '../api/sowsApi';
import NomadPigletsApi from '../api/nomadPigletsApi';
import UsersApi from '../api/usersApi';
/* ------------- Types ------------- */
import { AuthTypes } from "../redux-sauce/auth";
import { LocationsTypes } from '../redux-sauce/locations';
import { SowsTypes } from '../redux-sauce/sows';
import { NomadPigletsTypes } from '../redux-sauce/nomadPiglets';

import { Ws1Types } from '../redux-sauce/ws1';
import { Ws2Types } from '../redux-sauce/ws2';
import { Ws3Types } from '../redux-sauce/ws3';
import { Ws4Types } from '../redux-sauce/ws4';
import { Ws8Types } from '../redux-sauce/ws8';
import { Ws5Types } from '../redux-sauce/ws5';
import { Ws6Types } from '../redux-sauce/ws6';
import { Ws7Types } from '../redux-sauce/ws7';
import { Ws75Types } from '../redux-sauce/ws75';
/* ------------- Sagas ------------- */
import { logIn, logOut, checkToken, signUp, checkAuth } from "./authSagas";
import { getLocations } from './locationsSagas';
import * as sowsSaga from './sowsSagas';
import * as nomadPigletsSaga from './nomadPigletsSagas';
import * as ws1Saga from './ws1Sagas';
import * as ws2Saga from './ws2Sagas';
import * as ws3Saga from './ws3Sagas';
import * as ws4Saga from './ws4Sagas';
import * as ws8Saga from './ws8Sagas';
import * as ws5Saga from './ws5Sagas';
import * as ws6Saga from './ws6Sagas';
import * as ws7Saga from './ws7Sagas';
import * as ws75Saga from './ws75Sagas';

const authApi = AuthApi.create();
const locationsApi = LocationsApi.create();
const sowsApi = SowsApi.create();
const nomadPigletsApi = NomadPigletsApi.create();
const usersApi = UsersApi.create();

export default function* root() {
  yield all([
    takeEvery(AuthTypes.LOGIN_REQUEST, logIn, authApi),
    takeEvery(AuthTypes.SIGNUP_REQUEST, signUp, authApi),
    takeEvery(AuthTypes.LOGOUT_REQUEST, logOut, authApi),
    takeEvery(AuthTypes.CHECK_TOKEN_REQUEST, checkToken, authApi),
    takeEvery(AuthTypes.SIGNUP_REQUEST, signUp, authApi),
    takeLatest(AuthTypes.CHECK_AUTH_REQUEST, checkAuth, authApi),
    
    takeEvery(LocationsTypes.GET_LOCATIONS_REQUEST, getLocations, locationsApi),

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

    takeEvery(NomadPigletsTypes.GET_NOMAD_PIGLETS_REQUEST, nomadPigletsSaga.getNomadPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.WEIGHING_PIGLETS_REQUEST, nomadPigletsSaga.weighingPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.CULLING_PIGLETS_REQUEST, nomadPigletsSaga.cullingPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.CULLING_GILT_PIGLETS_REQUEST, nomadPigletsSaga.cullingGiltPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.MOVE_GROUP_FROM_CELL_TO_CELL_REQUEST, nomadPigletsSaga.moveGroupFromCellToCell, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.MOVE_TO_PIGLETS_REQUEST, nomadPigletsSaga.moveToPiglets, nomadPigletsApi),

    takeEvery(Ws1Types.GET_SEMINATION_SOWS_REQUEST, ws1Saga.getSeminationSows, sowsApi),
    takeEvery(Ws1Types.GET_ULTRASOUND_SOWS_REQUEST, ws1Saga.getUltrasoundSows, sowsApi),
    takeEvery(Ws1Types.GET_ULTRASOUND_V2_SOWS_WS1_REQUEST, ws1Saga.getUltrasoundV2SowsWs1, sowsApi),
    takeEvery(Ws1Types.GET_CULLING_SOWS_WS1_REQUEST, ws1Saga.getCullingSowsWs1, sowsApi),
    takeEvery(Ws1Types.GET_SEMINATION_SOW_REQUEST, ws1Saga.getSeminationSow, sowsApi),
    takeEvery(Ws1Types.GET_ULTRASOUND_SOW_REQUEST, ws1Saga.getUltrasoundSow, sowsApi),
    takeEvery(Ws1Types.GET_ULTRASOUND_V2_SOW_WS1_REQUEST, ws1Saga.getUltrasoundV2SowWs1, sowsApi),
    takeEvery(Ws1Types.GET_CULLING_SOW_WS1_REQUEST, ws1Saga.getCullingSowWs1, sowsApi),
    takeEvery(Ws1Types.SEMINATION_SOW_WS1_REQUEST, ws1Saga.seminationSowWs1, sowsApi),
    takeEvery(Ws1Types.ULTRASOUND_SOW_WS1_REQUEST, ws1Saga.ultrasoundSowWs1, sowsApi),
    takeEvery(Ws1Types.ULTRASOUND_V2_SOW_WS1_REQUEST, ws1Saga.ultrasoundV2SowWs1, sowsApi),
    takeEvery(Ws1Types.CULLING_SOW_WS1_REQUEST, ws1Saga.cullingSowWs1, sowsApi),
    takeEvery(Ws1Types.GET_SOWS_BY_TOURS_REQUEST, ws1Saga.getSowsByTours, sowsApi),
    takeEvery(Ws1Types.GET_SEMINATORS_REQUEST, ws1Saga.getSeminators, usersApi),
    takeEvery(Ws1Types.CREATE_NEW_SOW_WS1_REQUEST, ws1Saga.createNewSowWs1, sowsApi),
    // takeEvery(Ws1Types.SET_SEMINATION_SOW, ws1Saga.setSeminationSow(), null),

    takeEvery(Ws2Types.GET_CULLING_SOWS_WS2_REQUEST, ws2Saga.getCullingSowsWs2, sowsApi),
    takeEvery(Ws2Types.GET_CULLING_SOW_WS2_REQUEST, ws2Saga.getCullingSowWs2, sowsApi),
    takeEvery(Ws2Types.CULLING_SOW_WS2_REQUEST, ws2Saga.cullingSowWs2, sowsApi),
    takeEvery(Ws2Types.GET_SOWS_BY_TOURS_WS2_REQUEST, ws2Saga.getSowsByToursWs2, sowsApi),
    takeEvery(Ws2Types.GET_ULTRASOUND_V2_SOWS_WS2_REQUEST, ws2Saga.getUltrasoundV2SowsWs2, sowsApi),
    takeEvery(Ws2Types.GET_ULTRASOUND_V2_SOW_WS2_REQUEST, ws2Saga.getUltrasoundV2SowWs2, sowsApi),
    takeEvery(Ws2Types.ULTRASOUND_V2_SOW_WS2_REQUEST, ws2Saga.ultrasoundV2SowWs2, sowsApi),

    takeEvery(Ws3Types.GET_INCOME_SOWS_WS3_REQUEST, ws3Saga.getIncomeSowsWs3, sowsApi),
    takeEvery(Ws3Types.GET_INCOME_SOW_WS3_REQUEST, ws3Saga.getIncomeSowWs3, sowsApi),
    takeEvery(Ws3Types.GET_SECTIONS_WS3_REQUEST, ws3Saga.getSectionsWs3, locationsApi),
    takeEvery(Ws3Types.GET_SOW_INCOME_TAB_LOCATIONS_WS3_REQUEST, ws3Saga.getSowIncomeTabLocationsWs3, locationsApi),
    takeEvery(Ws3Types.GET_SOW_INNER_TRANSFER_TAB_LOCATIONS1_WS3_REQUEST, ws3Saga.getSowInnerTransferTabLocations1Ws3, locationsApi),
    takeEvery(Ws3Types.GET_SOW_INNER_TRANSFER_TAB_LOCATIONS2_WS3_REQUEST, ws3Saga.getSowInnerTransferTabLocations2Ws3, locationsApi),
    takeEvery(Ws3Types.GET_SOW_FARROW_TAB_LOCATIONS_WS3_REQUEST, ws3Saga.getSowFarrowTabLocationsWs3, locationsApi),
    takeEvery(Ws3Types.GET_SOW_WEANING_TAB_LOCATIONS_WS3_REQUEST, ws3Saga.getSowWeaningTabLocationsWs3, locationsApi),

    takeEvery(Ws4Types.GET_NOMAD_PIGLETS_WS4_REQUEST, ws4Saga.getNomadPigletsWs4, nomadPigletsApi),
    takeEvery(Ws4Types.GET_SECTIONS_WS4_REQUEST, ws4Saga.getSectionsWs4, locationsApi),
    takeEvery(Ws4Types.GET_INCOME_TAB_LOCATIONS_WS4_REQUEST, ws4Saga.getIncomeTabLocationsWs4, locationsApi),
    takeEvery(Ws4Types.SETLLE_PIGLETS_WS4_REQUEST, ws4Saga.setllePigletsWs4, nomadPigletsApi),
    takeEvery(Ws4Types.GET_TRANSFER_PIGLETS_WS4_REQUEST, ws4Saga.getTransferPigletsWs4, nomadPigletsApi),
    takeEvery(Ws4Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_WS4_REQUEST, ws4Saga.getInnerTransferTabLocations1Ws4, locationsApi),
    takeEvery(Ws4Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_WS4_REQUEST, ws4Saga.getInnerTransferTabLocations2Ws4, locationsApi),

    takeEvery(Ws8Types.GET_NOMAD_PIGLETS_WS8_REQUEST, ws8Saga.getNomadPigletsWs8, nomadPigletsApi),
    takeEvery(Ws8Types.GET_SECTIONS_REQUEST, ws8Saga.getSections, locationsApi),
    takeEvery(Ws8Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws8Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws8Types.SETLLE_PIGLETS_REQUEST, ws8Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws8Types.GET_TRANSFER_PIGLETS_REQUEST, ws8Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws8Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws8Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws8Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws8Saga.getInnerTransferTabLocations2, locationsApi),

    takeEvery(Ws5Types.GET_NOMAD_PIGLETS_WS5_REQUEST, ws5Saga.getNomadPigletsWs5, nomadPigletsApi),
    takeEvery(Ws5Types.GET_SECTIONS_REQUEST, ws5Saga.getSections, locationsApi),
    takeEvery(Ws5Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws5Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws5Types.SETLLE_PIGLETS_REQUEST, ws5Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws5Types.GET_TRANSFER_PIGLETS_REQUEST, ws5Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws5Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws5Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws5Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws5Saga.getInnerTransferTabLocations2, locationsApi),

    // takeEvery(Ws6Types.GET_NOMAD_PIGLETS_REQUEST, ws6Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws6Types.GET_SECTIONS_REQUEST, ws6Saga.getSections, locationsApi),
    takeEvery(Ws6Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws6Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws6Types.SETLLE_PIGLETS_REQUEST, ws6Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws6Types.GET_TRANSFER_PIGLETS_REQUEST, ws6Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws6Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws6Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws6Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws6Saga.getInnerTransferTabLocations2, locationsApi),

    // takeEvery(Ws7Types.GET_NOMAD_PIGLETS_REQUEST, ws7Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws7Types.GET_SECTIONS_REQUEST, ws7Saga.getSections, locationsApi),
    takeEvery(Ws7Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws7Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws7Types.SETLLE_PIGLETS_REQUEST, ws7Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws7Types.GET_TRANSFER_PIGLETS_REQUEST, ws7Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws7Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws7Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws7Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws7Saga.getInnerTransferTabLocations2, locationsApi),

    // takeEvery(Ws75Types.GET_NOMAD_PIGLETS_REQUEST, ws75Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws75Types.SETLLE_PIGLETS_REQUEST, ws75Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws75Types.GET_LOCATIONS_REQUEST, ws75Saga.getLocations, locationsApi),
  ]);
}
