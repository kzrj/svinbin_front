import { takeEvery, all, takeLatest } from "redux-saga/effects";

/* -------------- API -------------- */
import AuthApi from "../api/authApi";
import LocationsApi from '../api/locationsApi';
import SowsApi from '../api/sowsApi';
import NomadPigletsApi from '../api/nomadPigletsApi';
/* ------------- Types ------------- */
import { AuthTypes } from "../redux-sauce/auth";
import { LocationsTypes } from '../redux-sauce/locations';
import { SowsTypes } from '../redux-sauce/sows';
import { NomadPigletsTypes } from '../redux-sauce/nomadPiglets';

import { Ws1Types } from '../redux-sauce/ws1';
import { Ws2Types } from '../redux-sauce/ws2';
import { Ws4Types } from '../redux-sauce/ws4';
import { Ws8Types } from '../redux-sauce/ws8';
import { Ws5Types } from '../redux-sauce/ws5';
import { Ws6Types } from '../redux-sauce/ws6';
import { Ws7Types } from '../redux-sauce/ws7';
/* ------------- Sagas ------------- */
import { logIn, logOut, checkToken, signUp, checkAuth } from "./authSagas";
import { getLocations } from './locationsSagas';
import * as sowsSaga from './sowsSagas';
import * as nomadPigletsSaga from './nomadPigletsSagas';
import * as ws1Saga from './ws1Sagas';
import * as ws2Saga from './ws2Sagas';
import * as ws4Saga from './ws4Sagas';
import * as ws8Saga from './ws8Sagas';
import * as ws5Saga from './ws5Sagas';
import * as ws6Saga from './ws6Sagas';
import * as ws7Saga from './ws7Sagas';

const authApi = AuthApi.create();
const locationsApi = LocationsApi.create();
const sowsApi = SowsApi.create();
const nomadPigletsApi = NomadPigletsApi.create();

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
    takeEvery(SowsTypes.ULTRASOUND_SOW_REQUEST, sowsSaga.ultrasoundSow, sowsApi),
    takeEvery(SowsTypes.CULLING_SOW_REQUEST, sowsSaga.cullingSow, sowsApi),
    takeEvery(SowsTypes.SOW_MOVE_TO_REQUEST, sowsSaga.sowMoveTo, sowsApi),
    takeEvery(SowsTypes.SOW_FARROW_REQUEST, sowsSaga.sowFarrow, sowsApi),

    takeEvery(NomadPigletsTypes.GET_NOMAD_PIGLETS_REQUEST, nomadPigletsSaga.getNomadPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.WEIGHING_PIGLETS_REQUEST, nomadPigletsSaga.weighingPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.CULLING_PIGLETS_REQUEST, nomadPigletsSaga.cullingPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.CULLING_GILT_PIGLETS_REQUEST, nomadPigletsSaga.cullingGiltPiglets, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.MOVE_GROUP_FROM_CELL_TO_CELL_REQUEST, nomadPigletsSaga.moveGroupFromCellToCell, nomadPigletsApi),
    takeEvery(NomadPigletsTypes.MOVE_TO_PIGLETS_REQUEST, nomadPigletsSaga.moveToPiglets, nomadPigletsApi),

    takeEvery(Ws1Types.GET_SEMINATION_SOWS_REQUEST, ws1Saga.getSeminationSows, sowsApi),
    takeEvery(Ws1Types.GET_ULTRASOUND_SOWS_REQUEST, ws1Saga.getUltrasoundSows, sowsApi),
    takeEvery(Ws1Types.GET_CULLING_SOWS_REQUEST, ws1Saga.getCullingSows, sowsApi),
    takeEvery(Ws1Types.GET_SEMINATION_SOW_REQUEST, ws1Saga.getSeminationSow, sowsApi),
    takeEvery(Ws1Types.GET_ULTRASOUND_SOW_REQUEST, ws1Saga.getUltrasoundSow, sowsApi),
    takeEvery(Ws1Types.GET_CULLING_SOW_REQUEST, ws1Saga.getCullingSow, sowsApi),
    takeEvery(Ws1Types.SEMINATION_SOW_REQUEST, ws1Saga.seminationSow, sowsApi),
    takeEvery(Ws1Types.ULTRASOUND_SOW_REQUEST, ws1Saga.ultrasoundSow, sowsApi),
    takeEvery(Ws1Types.CULLING_SOW_REQUEST, ws1Saga.cullingSow, sowsApi),
    takeEvery(Ws1Types.GET_SOWS_BY_TOURS_REQUEST, ws1Saga.getSowsByTours, sowsApi),

    takeEvery(Ws2Types.GET_CULLING_SOWS_REQUEST, ws2Saga.getCullingSows, sowsApi),
    takeEvery(Ws2Types.GET_CULLING_SOW_REQUEST, ws2Saga.getCullingSow, sowsApi),
    takeEvery(Ws2Types.CULLING_SOW_REQUEST, ws2Saga.cullingSow, sowsApi),

    takeEvery(Ws4Types.GET_NOMAD_PIGLETS_REQUEST, ws4Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws4Types.GET_SECTIONS_REQUEST, ws4Saga.getSections, locationsApi),
    takeEvery(Ws4Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws4Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws4Types.SETLLE_PIGLETS_REQUEST, ws4Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws4Types.GET_TRANSFER_PIGLETS_REQUEST, ws4Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws4Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws4Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws4Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws4Saga.getInnerTransferTabLocations2, locationsApi),

    takeEvery(Ws8Types.GET_NOMAD_PIGLETS_REQUEST, ws8Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws8Types.GET_SECTIONS_REQUEST, ws8Saga.getSections, locationsApi),
    takeEvery(Ws8Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws8Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws8Types.SETLLE_PIGLETS_REQUEST, ws8Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws8Types.GET_TRANSFER_PIGLETS_REQUEST, ws8Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws8Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws8Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws8Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws8Saga.getInnerTransferTabLocations2, locationsApi),

    takeEvery(Ws5Types.GET_NOMAD_PIGLETS_REQUEST, ws5Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws5Types.GET_SECTIONS_REQUEST, ws5Saga.getSections, locationsApi),
    takeEvery(Ws5Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws5Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws5Types.SETLLE_PIGLETS_REQUEST, ws5Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws5Types.GET_TRANSFER_PIGLETS_REQUEST, ws5Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws5Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws5Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws5Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws5Saga.getInnerTransferTabLocations2, locationsApi),

    takeEvery(Ws6Types.GET_NOMAD_PIGLETS_REQUEST, ws6Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws6Types.GET_SECTIONS_REQUEST, ws6Saga.getSections, locationsApi),
    takeEvery(Ws6Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws6Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws6Types.SETLLE_PIGLETS_REQUEST, ws6Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws6Types.GET_TRANSFER_PIGLETS_REQUEST, ws6Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws6Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws6Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws6Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws6Saga.getInnerTransferTabLocations2, locationsApi),

    takeEvery(Ws7Types.GET_NOMAD_PIGLETS_REQUEST, ws7Saga.getNomadPiglets, nomadPigletsApi),
    takeEvery(Ws7Types.GET_SECTIONS_REQUEST, ws7Saga.getSections, locationsApi),
    takeEvery(Ws7Types.GET_INCOME_TAB_LOCATIONS_REQUEST, ws7Saga.getIncomeTabLocations, locationsApi),
    takeEvery(Ws7Types.SETLLE_PIGLETS_REQUEST, ws7Saga.setllePiglets, nomadPigletsApi),
    takeEvery(Ws7Types.GET_TRANSFER_PIGLETS_REQUEST, ws7Saga.getTransferPiglets, nomadPigletsApi),
    takeEvery(Ws7Types.GET_INNER_TRANSFER_TAB_LOCATIONS1_REQUEST, ws7Saga.getInnerTransferTabLocations1, locationsApi),
    takeEvery(Ws7Types.GET_INNER_TRANSFER_TAB_LOCATIONS2_REQUEST, ws7Saga.getInnerTransferTabLocations2, locationsApi),
  ]);
}
