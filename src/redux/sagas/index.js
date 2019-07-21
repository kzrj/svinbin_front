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
/* ------------- Sagas ------------- */
import { logIn, logOut, checkToken, signUp, checkAuth } from "./authSagas";
import { getLocations } from './locationsSagas';
import * as sowsSaga from './sowsSagas';
import * as nomadPigletsSaga from './nomadPigletsSagas';

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
  ]);
}
