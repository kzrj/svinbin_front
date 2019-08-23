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

    GET_NOMADS_PIGLETS: `${apiUrl}/workshopfour/piglets/`,
    weighingPiglets: (id) => `${apiUrl}/workshopfour/piglets/${id}/weighing_piglets/`,
    cullingPiglets: (id) => `${apiUrl}/workshopfour/piglets/${id}/culling_piglets/`,
    cullingGiltPiglets: (id) => `${apiUrl}/workshopfour/piglets/${id}/culling_gilts/`,
    moveGroupFromCellToCell: () => `${apiUrl}/workshopfour/piglets/move_group_from_cell_to_cell/`,
    moveToPiglets: (id) => `${apiUrl}/workshopfour/piglets/${id}/move_to/`,

    GET_USERS: `${apiUrl}/users/`,
}