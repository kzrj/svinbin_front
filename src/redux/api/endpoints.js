export const url = 'http://92.53.104.136';
// export const url = 'http://188.225.32.77';
export const apiUrl = `${url}/api`;

export default {
    JWT_AUTH: `${apiUrl}/jwt/api-token-auth/`,
    JWT_CHECK_TOKEN: `${apiUrl}/jwt/api-token-verify/`,
    SIGNUP: `${apiUrl}/users/`,

    GET_LOCATIONS: `${apiUrl}/locations/`,
    GET_SECTIONS: `${apiUrl}/sections/`,
    
    GET_SOWS: `${apiUrl}/sows/`,
    getSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/`,
    seminationSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/semination/`,
    ultrasoundSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/ultrasound/`,
    ultrasoundV2Sow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/ultrasoundv2/`,
    cullingSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/culling/`,
    sowMoveTo: (id) => `${apiUrl}/workshoponetwo/sows/${id}/move_to/`,
    SOWS_MOVE_MANY: `${apiUrl}/workshoponetwo/sows/move_many/`,
    CREATE_NEW_SOW: `${apiUrl}/workshoponetwo/sows/create_new/`,
    CREATE_NEW_NONAME_SOW: `${apiUrl}/workshoponetwo/sows/create_new_without_farm_id/`,
    sowFarrow: (id) => `${apiUrl}/workshopthree/sows/${id}/sow_farrow/`,
    GET_SOWS_BY_TOURS: `${apiUrl}/workshoponetwo/sows/sows_by_tours/`,
    GET_SOWS_BY_TOURS_WS2: `${apiUrl}/workshoponetwo/sows/sows_by_tours_ws2/`,
    GET_BOARS: `${apiUrl}/boars/`,
    MASS_SEMINATION: `${apiUrl}/workshoponetwo/sows/mass_semination/`,
    MASS_ULTRASOUND: `${apiUrl}/workshoponetwo/sows/mass_ultrasound/`,
    abortionSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/abortion/`,

    // init endpoints
    INIT_ADD_NEW_SEMINATED_TO_WS1: `${apiUrl}/sows/add_new_seminated_to_ws1/`,

    GET_NEWBORN_PIGLETS: `${apiUrl}/workshopthree/newbornpiglets/`,
    MERGE_NEWBORN: `${apiUrl}/workshopthree/newbornpiglets/create_nomad_group_from_merge/`,
    create_gilt: (id) => `${apiUrl}/workshopthree/newbornpiglets/${id}/create_gilt/`,
    cullingNewbornPiglets: (id) => `${apiUrl}/workshopthree/newbornpiglets/${id}/culling_piglets/`,
    cullingGiltNewbornPiglets: (id) => `${apiUrl}/workshopthree/newbornpiglets/${id}/culling_gilts/`,

    GET_NOMADS_PIGLETS: `${apiUrl}/nomadpiglets/`,
    weighingPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/weighing_piglets/`,
    cullingPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/culling_piglets/`,
    cullingGiltPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/culling_gilts/`,
    moveGroupFromCellToCell: () => `${apiUrl}/nomadpiglets/move_group_from_cell_to_cell/`,
    moveToPiglets: (id) => `${apiUrl}/nomadpiglets/${id}/move_to/`,

    GET_USERS: `${apiUrl}/users/`,

    GET_TOURS: `${apiUrl}/tours/`,
}