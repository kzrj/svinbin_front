//  export const url = 'http://92.53.104.136';
export const url = 'http://46.229.212.205';
export const apiUrl = `${url}/api`;

export default {
    JWT_AUTH: `${apiUrl}/jwt/api-token-auth/`,
    JWT_CHECK_TOKEN: `${apiUrl}/jwt/api-token-verify/`,
    SIGNUP: `${apiUrl}/users/`,

    // locations
    GET_LOCATIONS: `${apiUrl}/locations/`,
    GET_SECTIONS: `${apiUrl}/sections/`,
    
    // sows
    GET_SOWS: `${apiUrl}/sows/`,
    GET_BOARS: `${apiUrl}/boars/`,
    getSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/`,
    seminationSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/semination/`,
    ultrasoundSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/ultrasound/`,
    ultrasoundV2Sow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/ultrasoundv2/`,
    cullingSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/culling/`,
    sowMoveTo: (id) => `${apiUrl}/workshoponetwo/sows/${id}/move_to/`,
    SOWS_MOVE_MANY: `${apiUrl}/workshoponetwo/sows/move_many/`,
    CREATE_NEW_SOW: `${apiUrl}/workshoponetwo/sows/create_new/`,
    CREATE_NEW_NONAME_SOW: `${apiUrl}/workshoponetwo/sows/create_new_without_farm_id/`,
    GET_SOWS_BY_TOURS: `${apiUrl}/workshoponetwo/sows/sows_by_tours/`,
    GET_SOWS_BY_TOURS_WS2: `${apiUrl}/workshoponetwo/sows/sows_by_tours_ws2/`,
    MASS_SEMINATION: `${apiUrl}/workshoponetwo/sows/mass_semination/`,
    MASS_ULTRASOUND: `${apiUrl}/workshoponetwo/sows/mass_ultrasound/`,
    abortionSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/abortion/`,
    MASS_INIT_TRANSFER: `${apiUrl}/workshoponetwo/sows/mass_init_and_transfer/`,
    sowFarrow: (id) => `${apiUrl}/workshopthree/sows/${id}/sow_farrow/`,
    markAsNurse: (id) => `${apiUrl}/workshopthree/sows/${id}/mark_as_nurse/`,
    createGilt: (id) => `${apiUrl}/workshopthree/sows/${id}/create_gilt/`,

    // init endpoints
    INIT_ADD_NEW_SEMINATED_TO_WS1: `${apiUrl}/sows/add_new_seminated_to_ws1/`,

    // piglets
    GET_PIGLETS: `${apiUrl}/piglets/`,
    MERGE_FROM_LIST_PIGLETS: `${apiUrl}/piglets/create_from_merging_list_and_move_to_ws4/`,
    MERGE_FROM_INIT_LIST_PIGLETS: `${apiUrl}/piglets/merge_init_list_and_move_merged_to_ws4/`,
    cullingPiglets: (id) => `${apiUrl}/piglets/${id}/culling/`,
    weighingPiglets: (id) => `${apiUrl}/piglets/${id}/weighing_piglets_split_return/`,
    recountWeighingPiglets: (id) => `${apiUrl}/piglets/${id}/recount_and_weighing_piglets/`,
    movePiglets: (id) => `${apiUrl}/piglets/${id}/move_piglets/`,
    moveGiltsToWs1: (id) => `${apiUrl}/piglets/${id}/move_gilts_to_ws1/`,
    markAsGilts: (id) => `${apiUrl}/piglets/${id}/mark_as_gilts/`,
    INIT_PIGLETS: `${apiUrl}/piglets/init_piglets_from_farrow/`,
    recount_piglets: (id) => `${apiUrl}/piglets/${id}/recount_piglets/`,

    // staff users
    GET_USERS: `${apiUrl}/users/`,

    // tours
    GET_TOURS: `${apiUrl}/tours/`,

    // workshop rest
    GET_INFO_WS3: `${apiUrl}/workshopthree/wsinfo/info/`,
    GET_BALANCES_BY_TOURS: `${apiUrl}/workshopthree/wsinfo/balances_by_tours/`,
    IMPORT_SEMINATIONS_FROM_FARM: `${apiUrl}/workshoponetwo/sows/import_seminations_from_farm/`,
}