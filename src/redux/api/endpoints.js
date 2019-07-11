export const url = 'http://92.53.104.136';
export const apiUrl = `${url}/api`;

export default {
    JWT_AUTH: `${apiUrl}/jwt/api-token-auth/`,
    JWT_CHECK_TOKEN: `${apiUrl}/jwt/api-token-verify/`,
    SIGNUP: `${apiUrl}/users/`,

    GET_LOCATIONS: `${apiUrl}/locations/`,
    
    GET_SOWS: `${apiUrl}/sows/`,
    seminationSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/semination/`,
    ultrasoundSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/ultrasound/`,
    cullingSow: (id) => `${apiUrl}/workshoponetwo/sows/${id}/culling/`,
    sowMoveTo: (id) => `${apiUrl}/workshoponetwo/sows/${id}/move_to/`,
    // SOWS_MOVE_MANY: `${apiUrl}/workshoponetwo/sows/move_many/`,
    sowFarrow: (id) => `${apiUrl}/workshopthree/sows/${id}/sow_farrow/`,

    GET_NOMADS_PIGLETS: `${apiUrl}/workshopfour/piglets/`,
    weighingPiglets: (id) => `${apiUrl}/workshopfour/piglets/${id}/weighing_piglets/`
    
}