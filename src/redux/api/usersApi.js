import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getSemenators = (filters) => {
        // const params = createUrlParamsFromFilters(filters);
        const params = { is_seminator: true }
        return axios.get(endpoints.GET_USERS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }
    return {
        getSemenators,
    }
}

export default {
    create
}