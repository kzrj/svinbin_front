export const url = 'http://92.53.104.136';
// export const url = 'http://46.229.212.205';
export const apiUrl = `${url}/api`;

export default {
    JWT_AUTH: `${apiUrl}/jwt/api-token-auth/`,
    JWT_CHECK_TOKEN: `${apiUrl}/jwt/api-token-verify/`,
    SIGNUP: `${apiUrl}/users/`,

    // locations
    GET_LOCATIONS: `${apiUrl}/locations/`,
    GET_WS_POPULATION: `${apiUrl}/locations/ws3_and_sections/`,
    GET_SECTIONS: `${apiUrl}/sections/`,
    
    // sows
    GET_SOWS: `${apiUrl}/sows/`,
    sowMoveTo: (id) => `${apiUrl}/sows/${id}/move_to/`,
    
    getSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/`,
    SOW_BY_FARM_ID: `${apiUrl}/workshoponetwo/sows/retrieve_by_farm_id/`,
    DOUBLE_SEMINATION: `${apiUrl}/workshoponetwo/sows/double_semination/`,
    ultrasoundSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/ultrasound/`,
    ultrasoundV2Sow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/ultrasoundv2/`,
    cullingSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/culling/`,
    SOWS_MOVE_MANY: `${apiUrl}/workshoponetwo/sows/move_many/`,
    CREATE_NEW_SOW: `${apiUrl}/workshoponetwo/sows/create_new/`,
    CREATE_NEW_NONAME_SOW: `${apiUrl}/workshoponetwo/sows/create_new_without_farm_id/`,
    GET_SOWS_BY_TOURS: `${apiUrl}/workshoponetwo/sows/sows_by_tours/`,
    GET_SOWS_BY_TOURS_WS2: `${apiUrl}/workshoponetwo/sows/sows_by_tours_ws2/`,
    MASS_SEMINATION: `${apiUrl}/workshoponetwo/sows/mass_semination/`,
    MASS_ULTRASOUND: `${apiUrl}/workshoponetwo/sows/mass_ultrasound/`,
    MASS_CULLING: `${apiUrl}/workshoponetwo/sows/mass_culling/`,
    abortionSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/abortion/`,
    MASS_INIT_TRANSFER: `${apiUrl}/workshoponetwo/sows/mass_init_and_transfer/`,

    sowFarrow: (id) => `${apiUrl}/workshopthree/sows/${id}/sow_farrow/`,
    markAsNurse: (id) => `${apiUrl}/workshopthree/sows/${id}/mark_as_nurse/`,
    cullingSowWs3: (id) => `${apiUrl}/workshopthree/sows/${id}/culling/`,
    abortionSowWs3: (id) => `${apiUrl}/workshopthree/sows/${id}/abortion/`,
    SOWS_MOVE_MANY_WS3: `${apiUrl}/workshopthree/sows/move_many/`,
    createGilt: (id) => `${apiUrl}/workshopthree/sows/${id}/mark_as_gilt/`,

    // boars
    GET_BOARS: `${apiUrl}/boars/`,
    CREATE_NEW_BOAR: `${apiUrl}/boars/`,
    cullingBoar: (id) => `${apiUrl}/boars/${id}/culling/`,
    GET_BOAR_BREED: `${apiUrl}/boar_breed/`,
    semenBoar: (id) => `${apiUrl}/boars/${id}/semen_boar/`,
    GET_SEMEN_BOAR_LIST: `${apiUrl}/boar_events/semen/`,

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
    moveGiltsToWs12: (id) => `${apiUrl}/piglets/${id}/move_gilts_to_12/`,
    // createGilt: (id) => `${apiUrl}/piglets/${id}/create_gilt/`,

    // staff users
    GET_USERS: `${apiUrl}/users/`,

    // tours
    GET_TOURS: `${apiUrl}/tours/`,

    // workshop rest
    IMPORT_SEMINATIONS_FROM_FARM: `${apiUrl}/workshoponetwo/sows/import_seminations_from_farm/`,
    WS3_TRANSFER_SOW_AND_PIGLETS: `${apiUrl}/workshopthree/sows/transfer_sow_and_piglets/`,
    WS3_GILT_JOURNAL: `${apiUrl}/workshopthree/reports/mark_as_gilts_journal/`,

    // reports
    GET_TOUR_REPORTS:  `${apiUrl}/reports/tours/`,
    GET_DIR_REPORT: `${apiUrl}/reports/director/`,
    GET_PIGS_COUNT_REPORT: `${apiUrl}/reports/pigs_count/`,
    GET_OPERATIONS_REPORT: `${apiUrl}/reports/operations/`,
    GET_WS3_REPORT: `${apiUrl}/reports/director/ws3_report/`,
    GET_WS3_REPORT_AS_EXCEL: `${apiUrl}/reports/director/get_ws3_report_excel/`,
    GET_WS_REPORT_PIGS_COUNT: `${apiUrl}/reports/director/ws_report_count/`,
    GET_WS_REPORT: `${apiUrl}/reports/director/ws_report/`,
    get_ws_report_as_excel: (ws_number) => `${apiUrl}/reports/director/get_ws_report_excel/?ws_number=${ws_number}`,

    GET_RECOUNT_BALANCE: `${apiUrl}/reports/recounts/ws_balance/`,
    GET_TOURS_WITH_WEIGHTS: `${apiUrl}/reports/tours_v2/`,
    get_tour_with_weight: (id) => `${apiUrl}/reports/tours_v2/${id}/weights_data/`,
}