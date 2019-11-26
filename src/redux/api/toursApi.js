import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getTours = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_TOURS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    
    return {
        getTours,
    }
}

export default {
    create
}