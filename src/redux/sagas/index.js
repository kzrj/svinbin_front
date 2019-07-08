import { takeEvery, all, takeLatest } from "redux-saga/effects";

/* -------------- API -------------- */
import LocationsApi from '../api/locationsApi';
import SowsApi from '../api/sowsApi';
/* ------------- Types ------------- */
import { LocationsTypes } from '../redux-sauce/locations';
import { SowsTypes } from '../redux-sauce/sows';
/* ------------- Sagas ------------- */
// import { logIn, logOut, checkToken, signUp, checkAuth } from "./authSagas";
import { getLocations } from './locationsSagas';
import { getSows } from './sowsSagas';

const locationsApi = LocationsApi.create();
const sowsApi = SowsApi.create();

export default function* root() {
  yield all([
    takeEvery(LocationsTypes.GET_LOCATIONS_REQUEST, getLocations, locationsApi),
    takeEvery(SowsTypes.GET_SOWS_REQUEST, getSows, sowsApi),    
  ]);
}
