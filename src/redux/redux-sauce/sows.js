import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getSowsRequest: ['payload'],
    getSowsFail: ['error'],
    getSowsSuccess: ['payload'],

    getSowRequest: ['payload'],
    getSowFail: ['error'],
    getSowSuccess: ['payload'],

    seminationSowRequest: ['payload'],
    seminationSowFail: ['error'],
    seminationSowSuccess: ['payload'],

    ultrasoundSowRequest: ['payload'],
    ultrasoundSowFail: ['error'],
    ultrasoundSowSuccess: ['payload'],

    cullingSowRequest: ['payload'],
    cullingSowFail: ['error'],
    cullingSowSuccess: ['payload'],

    cullingSowWs3Request: ['payload'],
    cullingSowWs3Fail: ['error'],
    cullingSowWs3Success: ['payload'],

    sowMoveToRequest: ['payload'],
    sowMoveToFail: ['error'],
    sowMoveToSuccess: ['payload'],

    sowsMoveManyRequest: ['payload'],
    sowsMoveManyFail: ['error'],
    sowsMoveManySuccess: ['payload'],

    sowsMoveManyWs3Request: ['payload'],
    sowsMoveManyWs3Fail: ['error'],
    sowsMoveManyWs3Success: ['payload'],

    sowFarrowRequest: ['payload'],
    sowFarrowFail: ['error'],
    sowFarrowSuccess: ['payload'],

    createNewSowRequest: ['payload'],
    createNewSowFail: ['error'],
    createNewSowSuccess: ['payload'],

    createNewNonameSowRequest: ['payload'],
    createNewNonameSowFail: ['error'],
    createNewNonameSowSuccess: ['payload'],

    addNewSeminatedToWs1Request: ['payload'],
    addNewSeminatedToWs1Fail: ['error'],
    addNewSeminatedToWs1Success: ['payload'],

    massSeminationRequest: ['payload'],
    massSeminationFail: ['error'],
    massSeminationSuccess: ['payload'],

    massUltrasoundRequest: ['payload'],
    massUltrasoundFail: ['error'],
    massUltrasoundSuccess: ['payload'],

    massCullingRequest: ['payload'],
    massCullingFail: ['error'],
    massCullingSuccess: ['payload'],

    abortionSowRequest: ['payload'],
    abortionSowFail: ['error'],
    abortionSowSuccess: ['payload'],

    abortionSowWs3Request: ['payload'],
    abortionSowWs3Fail: ['error'],
    abortionSowWs3Success: ['payload'],

    massInitTransferRequest: ['payload'],
    massInitTransferFail: ['error'],
    massInitTransferSuccess: ['payload'],

    markAsNurseRequest: ['payload'],
    markAsNurseFail: ['error'],
    markAsNurseSuccess: ['payload'],

    setSow: ['sow'],

    resetSow: ['payload'],

    sowsResetErrorsAndMessages: null,

    // boars
    getBoarsRequest: ['payload'],
    getBoarsFail: ['error'],
    getBoarsSuccess: ['payload'],

    createBoarRequest: ['payload'],
    createBoarFail: ['error'],
    createBoarSuccess: ['payload'],

    cullingBoarRequest: ['payload'],
    cullingBoarFail: ['error'],
    cullingBoarSuccess: ['payload'],

    getBoarBreedRequest: ['payload'],
    getBoarBreedFail: ['error'],
    getBoarBreedSuccess: ['payload'],

    semenBoarRequest: ['payload'],
    semenBoarFail: ['error'],
    semenBoarSuccess: ['payload'],

    getSemenBoarListRequest: ['payload'],
    getSemenBoarListFail: ['error'],
    getSemenBoarListSuccess: ['payload'],

    createGiltRequest: ['payload'],
    createGiltFail: ['error'],
    createGiltSuccess: ['payload'],
})

export const SowsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    list: [],
    queryCount: null,
    errorList: null,

    sow: null,
    tours_info: [],
    sowSingleFetching: false,
    errorSingle: null,

    seminationSow: null,
    ultrasoundSow: null,
    cullingSow: null,
    sowEvent: null,
    createdSow: null,
    createdNonameSow: null,
    nonameSowsCount: null,
    eventFetching: false,
    eventError: null,

    boars: [],
    boar: null,
    breeds: [],
    semenBoarList: [],

    initData: null,

    message: '',
})

/* ------------- Selectors ------------- */

export const SowsSelectors = {
    getSows: state => state.Sows.list,
    getSow: state => state.Sows.sow,
    setSow: state => state.Sows.sow,
    seminationSow: state => state.Sows.sow,
    ultrasoundSow: state => state.Sows.sow,
    cullingSow: state => state.Sows.sow,
    cullingSowWs3: state => state.Sows.sow,
    sowMoveTo: state => state.Sows.sow,
    sowsMoveMany: state => state.Sows.sow,
    sowFarrow: state => state.Sows.sow,
    createNewSow: state => state.sows.createdSow,
    createNewNonameSow: state => state.sows.createdSowNoname,
    createNewNonameSow: state => state.sows.nonameSowsCount,
    addNewSeminatedToWs1: state => state.sows.initData,
    abortionsSow: state => state.sows.sow,
    createGilt: state => state.sows.message,

    //boar
    getBoars: state => state.sows.boars,
    createBoar: state => state.sows.boar,
    cullingBoar: state => state.sows.boar,
    semenBoar: state => state.sows.boar,
    getSemenBoarList: state => state.sows.semenBoarList,
}

/* ------------- Reducers ------------- */
// Get list
export const getSowsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, list: [], queryCount: 0 })
}

export const getSowsSuccess = (state, { payload }) => {
    let sow = null
    if (payload.results.length > 0) sow = payload.results[0]
    return state.merge({ fetching: false, errorList: null, list: payload.results, sow: sow,
        queryCount: payload.count })
}

export const getSowsFail = (state, { error }) => {
    return state.merge({ fetching: false, errorList: error, list: [], queryCount: null })
}

// Get one
export const getSowRequest = (state, { payload }) => {
    return state.merge({ sowSingleFetching: true, })
}

export const getSowSuccess = (state, { payload }) => {
    return state.merge({ sowSingleFetching: false, errorSingle: null, sow: payload.sow,
         tours_info: payload.tours_info})
}

export const getSowFail = (state, { error }) => {
    return state.merge({ sowSingleFetching: false, errorSingle: error, sow: null, tours_info: [] })
}

export const resetSow = (state, { payload }) => {
    return state.merge({ sow: null, })
}

// Semination
export const seminationSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const seminationSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, 
        sow: payload.sow, sowEvent: payload.semination, message: payload.message })
}

export const seminationSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Ultrasound
export const ultrasoundSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const ultrasoundSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, sow: payload.sow, sowEvent: payload.ultrasound, message: payload.message })
}

export const ultrasoundSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Culling
export const cullingSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const cullingSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, sow: payload.sow, sowEvent: payload.culling,
         message: payload.message })
}

export const cullingSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Culling ws3
export const cullingSowWs3Request = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const cullingSowWs3Success = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, sow: payload.sow, sowEvent: payload.culling, message: payload.message })
}

export const cullingSowWs3Fail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Move to
export const sowMoveToRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const sowMoveToSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null,
         sow: payload.sow, sowEvent: payload.transaction, message: payload.message })
}

export const sowMoveToFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Move many
export const sowsMoveManyRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const sowsMoveManySuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null,
         sowEvent: payload.transaction_ids, message: payload.message })
}

export const sowsMoveManyFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Move many ws3
export const sowsMoveManyWs3Request = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const sowsMoveManyWs3Success = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null,
         sowEvent: payload.transaction_ids, message: payload.message })
}

export const sowsMoveManyWs3Fail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Sow Farrow
export const sowFarrowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const sowFarrowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null,
         sow: payload.sow, sowEvent: payload.farrow, message: payload.message })
}

export const sowFarrowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Get create new
export const createNewSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true, createdSow: null, eventError: null })
}

export const createNewSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, createdSow: payload.sow,
        message: payload.message })
}

export const createNewSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error, createdSow: null })
}

// Get create new noname
export const createNewNonameSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true, createdNonameSow: null, nonameSowsCount: null })
}

export const createNewNonameSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, createdNonameSow: payload.sow, 
        nonameSowsCount: payload.noname_sows_count, message: payload.message })
}

export const createNewNonameSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error, createdNonameSow: null, nonameSowsCount: null })
}

// Sow addNewSeminatedToWs1
export const addNewSeminatedToWs1Request = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const addNewSeminatedToWs1Success = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, initData: payload, message: payload.message })
}

export const addNewSeminatedToWs1Fail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Mass semination
export const massSeminationRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const massSeminationSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, message: payload.message })
}

export const massSeminationFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Mass ultrasound
export const massUltrasoundRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const massUltrasoundSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, message: payload.message })
}

export const massUltrasoundFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Mass culling
export const massCullingRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const massCullingSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, message: payload.message })
}

export const massCullingFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// AbortionSow
export const abortionSowRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true, })
}

export const abortionSowSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, sow: payload.sow, message: payload.message })
}

export const abortionSowFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// AbortionSowWs3
export const abortionSowWs3Request = (state, { payload }) => {
    return state.merge({ eventFetching: true, })
}

export const abortionSowWs3Success = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, sow: payload, message: payload.message })
}

export const abortionSowWs3Fail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error, sow: null })
}


// Mass init and transfer
export const massInitTransferRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const massInitTransferSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, message: payload.message})
}

export const massInitTransferFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error, message: null })
}

// Mark as nurse
export const markAsNurseRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const markAsNurseSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, sow: payload.sow,
        sowEvent: payload.farrow, message: payload.message })
}

export const markAsNurseFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// resetErrorsAndMessages
export const sowsResetErrorsAndMessages = (state) => {
    return state.merge({ fetching: false, eventError: null, errorList: null, eventFetching: null, message: '' })
  }

// setSow
export const setSow = (state, { sow }) => {
    return state.merge({ sow: sow })
}

// Get boars list
export const getBoarsRequest = (state, { payload }) => {
    return state.merge({ fetching: true, boars: [] })
}

export const getBoarsSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, errorList: null, boars: payload, })
}

export const getBoarsFail = (state, { error }) => {
    return state.merge({ fetching: false, errorList: error, boars: [] })
}

// Get create new
export const createBoarRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true, boar: null, eventError: null })
}

export const createBoarSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, boar: payload.boar,
        message: payload.message })
}

export const createBoarFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error, boar: null })
}

// Culling boar
export const cullingBoarRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const cullingBoarSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, boar: payload.boar, message: payload.message })
}

export const cullingBoarFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// Get boars breed list
export const getBoarBreedRequest = (state, { payload }) => {
    return state.merge({ fetching: true, breeds: [] })
}

export const getBoarBreedSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, errorList: null, breeds: payload, })
}

export const getBoarBreedFail = (state, { error }) => {
    return state.merge({ fetching: false, errorList: error, breeds: [] })
}

// semen boar
export const semenBoarRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const semenBoarSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, boar: payload.boar, message: payload.message })
}

export const semenBoarFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}

// semen boar list
export const getSemenBoarListRequest = (state, { payload }) => {
    return state.merge({ fetching: true })
}

export const getSemenBoarListSuccess = (state, { payload }) => {
    return state.merge({ fetching: false, errorList: null, semenBoarList: payload })
}

export const getSemenBoarListFail = (state, { error }) => {
    // console.log(error)
    return state.merge({ fetching: false, errorList: error })
}

// create gilt
export const createGiltRequest = (state, { payload }) => {
    return state.merge({ eventFetching: true })
}

export const createGiltSuccess = (state, { payload }) => {
    return state.merge({ eventFetching: false, eventError: null, message: payload.message })
}

export const createGiltFail = (state, { error }) => {
    return state.merge({ eventFetching: false, eventError: error })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SOWS_REQUEST]: getSowsRequest,
    [Types.GET_SOWS_SUCCESS]: getSowsSuccess,
    [Types.GET_SOWS_FAIL]: getSowsFail,

    [Types.GET_SOW_REQUEST]: getSowRequest,
    [Types.GET_SOW_SUCCESS]: getSowSuccess,
    [Types.GET_SOW_FAIL]: getSowFail,

    [Types.SEMINATION_SOW_REQUEST]: seminationSowRequest,
    [Types.SEMINATION_SOW_SUCCESS]: seminationSowSuccess,
    [Types.SEMINATION_SOW_FAIL]: seminationSowFail,

    [Types.ULTRASOUND_SOW_REQUEST]: ultrasoundSowRequest,
    [Types.ULTRASOUND_SOW_SUCCESS]: ultrasoundSowSuccess,
    [Types.ULTRASOUND_SOW_FAIL]: ultrasoundSowFail,

    [Types.CULLING_SOW_REQUEST]: cullingSowRequest,
    [Types.CULLING_SOW_SUCCESS]: cullingSowSuccess,
    [Types.CULLING_SOW_FAIL]: cullingSowFail,

    [Types.CULLING_SOW_WS3_REQUEST]: cullingSowWs3Request,
    [Types.CULLING_SOW_WS3_SUCCESS]: cullingSowWs3Success,
    [Types.CULLING_SOW_WS3_FAIL]: cullingSowWs3Fail,

    [Types.SOW_MOVE_TO_REQUEST]: sowMoveToRequest,
    [Types.SOW_MOVE_TO_SUCCESS]: sowMoveToSuccess,
    [Types.SOW_MOVE_TO_FAIL]: sowMoveToFail,

    [Types.SOWS_MOVE_MANY_REQUEST]: sowsMoveManyRequest,
    [Types.SOWS_MOVE_MANY_SUCCESS]: sowsMoveManySuccess,
    [Types.SOWS_MOVE_MANY_FAIL]: sowsMoveManyFail,

    [Types.SOWS_MOVE_MANY_WS3_REQUEST]: sowsMoveManyWs3Request,
    [Types.SOWS_MOVE_MANY_WS3_SUCCESS]: sowsMoveManyWs3Success,
    [Types.SOWS_MOVE_MANY_WS3_FAIL]: sowsMoveManyWs3Fail,

    [Types.SOW_FARROW_REQUEST]: sowFarrowRequest,
    [Types.SOW_FARROW_SUCCESS]: sowFarrowSuccess,
    [Types.SOW_FARROW_FAIL]: sowFarrowFail,

    [Types.CREATE_NEW_SOW_REQUEST]: createNewSowRequest,
    [Types.CREATE_NEW_SOW_SUCCESS]: createNewSowSuccess,
    [Types.CREATE_NEW_SOW_FAIL]: createNewSowFail,

    [Types.CREATE_NEW_NONAME_SOW_REQUEST]: createNewNonameSowRequest,
    [Types.CREATE_NEW_NONAME_SOW_SUCCESS]: createNewNonameSowSuccess,
    [Types.CREATE_NEW_NONAME_SOW_FAIL]: createNewNonameSowFail,

    [Types.ADD_NEW_SEMINATED_TO_WS1_REQUEST]: addNewSeminatedToWs1Request,
    [Types.ADD_NEW_SEMINATED_TO_WS1_SUCCESS]: addNewSeminatedToWs1Success,
    [Types.ADD_NEW_SEMINATED_TO_WS1_FAIL]: addNewSeminatedToWs1Fail,

    [Types.MASS_SEMINATION_REQUEST]: massSeminationRequest,
    [Types.MASS_SEMINATION_SUCCESS]: massSeminationSuccess,
    [Types.MASS_SEMINATION_FAIL]: massSeminationFail,

    [Types.MASS_ULTRASOUND_REQUEST]: massUltrasoundRequest,
    [Types.MASS_ULTRASOUND_SUCCESS]: massUltrasoundSuccess,
    [Types.MASS_ULTRASOUND_FAIL]: massUltrasoundFail,

    [Types.MASS_CULLING_REQUEST]: massCullingRequest,
    [Types.MASS_CULLING_SUCCESS]: massCullingSuccess,
    [Types.MASS_CULLING_FAIL]: massCullingFail,

    [Types.ABORTION_SOW_REQUEST]: abortionSowRequest,
    [Types.ABORTION_SOW_SUCCESS]: abortionSowSuccess,
    [Types.ABORTION_SOW_FAIL]: abortionSowFail,

    [Types.ABORTION_SOW_WS3_REQUEST]: abortionSowWs3Request,
    [Types.ABORTION_SOW_WS3_SUCCESS]: abortionSowWs3Success,
    [Types.ABORTION_SOW_WS3_FAIL]: abortionSowWs3Fail,

    [Types.MASS_INIT_TRANSFER_REQUEST]: massInitTransferRequest,
    [Types.MASS_INIT_TRANSFER_SUCCESS]: massInitTransferSuccess,
    [Types.MASS_INIT_TRANSFER_FAIL]: massInitTransferFail,

    [Types.MARK_AS_NURSE_REQUEST]: markAsNurseRequest,
    [Types.MARK_AS_NURSE_SUCCESS]: markAsNurseSuccess,
    [Types.MARK_AS_NURSE_FAIL]: markAsNurseFail,

    [Types.SET_SOW]: setSow,
    [Types.RESET_SOW]: resetSow,

    [Types.SOWS_RESET_ERRORS_AND_MESSAGES]: sowsResetErrorsAndMessages,

    // boar
    [Types.GET_BOARS_REQUEST]: getBoarsRequest,
    [Types.GET_BOARS_SUCCESS]: getBoarsSuccess,
    [Types.GET_BOARS_FAIL]: getBoarsFail,

    [Types.CREATE_BOAR_REQUEST]: createBoarRequest,
    [Types.CREATE_BOAR_SUCCESS]: createBoarSuccess,
    [Types.CREATE_BOAR_FAIL]: createBoarFail,

    [Types.CULLING_BOAR_REQUEST]: cullingBoarRequest,
    [Types.CULLING_BOAR_SUCCESS]: cullingBoarSuccess,
    [Types.CULLING_BOAR_FAIL]: cullingBoarFail,

    [Types.GET_BOAR_BREED_REQUEST]: getBoarBreedRequest,
    [Types.GET_BOAR_BREED_SUCCESS]: getBoarBreedSuccess,
    [Types.GET_BOAR_BREED_FAIL]: getBoarBreedFail,

    [Types.SEMEN_BOAR_REQUEST]: semenBoarRequest,
    [Types.SEMEN_BOAR_SUCCESS]: semenBoarSuccess,
    [Types.SEMEN_BOAR_FAIL]: semenBoarFail,

    [Types.GET_SEMEN_BOAR_LIST_REQUEST]: getSemenBoarListRequest,
    [Types.GET_SEMEN_BOAR_LIST_SUCCESS]: getSemenBoarListSuccess,
    [Types.GET_SEMEN_BOAR_LIST_FAIL]: getSemenBoarListFail,

    [Types.CREATE_GILT_REQUEST]: createGiltRequest,
    [Types.CREATE_GILT_SUCCESS]: createGiltSuccess,
    [Types.CREATE_GILT_FAIL]: createGiltFail,
})