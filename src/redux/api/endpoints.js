export const url = 'http://92.53.104.136';
// export const url = 'http://188.225.72.13';
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

    // init endpoints
    INIT_ADD_NEW_SEMINATED_TO_WS1: `${apiUrl}/sows/add_new_seminated_to_ws1/`,

    // new born piglets
    GET_NEWBORN_PIGLETS: `${apiUrl}/workshopthree/newbornpiglets/`,
    MERGE_NEWBORN: `${apiUrl}/workshopthree/newbornpiglets/create_nomad_group_from_merge/`,
    create_gilt: (id) => `${apiUrl}/workshopthree/newbornpiglets/${id}/create_gilt/`,
    cullingNewbornPiglets: (id) => `${apiUrl}/workshopthree/newbornpiglets/${id}/culling_piglets/`,
    cullingGiltNewbornPiglets: (id) => `${apiUrl}/workshopthree/newbornpiglets/${id}/culling_gilts/`,
    recountNewbornPiglets: (id) => `${apiUrl}/workshopthree/newbornpiglets/${id}/recount/`,

    // workshop rest
    GET_INFO_WS3: `${apiUrl}/workshopthree/wsinfo/info/`,
    GET_BALANCES_BY_TOURS: `${apiUrl}/workshopthree/wsinfo/balances_by_tours/`,
    IMPORT_SEMINATIONS_FROM_FARM: `${apiUrl}/workshoponetwo/sows/import_seminations_from_farm/`,

    // nomad piglets
    GET_NOMADS_PIGLETS: `${apiUrl}/nomadpiglets/`,
    weighingPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/weighing_piglets/`,
    cullingPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/culling_piglets/`,
    cullingGiltPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/culling_gilts/`,
    moveGroupFromCellToCell: () => `${apiUrl}/nomadpiglets/move_group_from_cell_to_cell/`,
    moveToPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/move_to/`,
    moveToCellPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/move_one_group_to_cell/`,

    // staff users
    GET_USERS: `${apiUrl}/users/`,

    // tours
    GET_TOURS: `${apiUrl}/tours/`,
}