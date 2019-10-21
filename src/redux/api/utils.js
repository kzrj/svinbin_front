
export const parseErrorData = (error) => {

    if (error && typeof error.response !== 'undefined') {
        return { 
            status: error.response.status, 
            statusText: error.response.statusText, 
            message: error.response.data.message }
    } else {
        return { 
         status: 'Connection Error',
         statusText: 'An error occurred while sending your data!',
         message: 'An error occurred while sending your data!' }
    }
}

export const createUrlParamsFromFilters = (filters) => {
    const params = new URLSearchParams()

    if (filters != null) Object.keys(filters).forEach(key => {
            if (filters[key] !== null && !(filters[key] instanceof Array)) 
                params.append(key, filters[key])
            if (filters[key] !== null && filters[key] instanceof Array){
                delete params[key]
                filters[key].map(value => {
                    if (value !== '')
                        params.append(key, value)
                    return null
                })
            }
        })
    return params
}