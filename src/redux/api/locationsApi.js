import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getLocations = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_LOCATIONS, { params })
        .then(response => response.data)
        .catch(err => {
            throw new Error(err)
        })
    }
    return {
        getLocations,
    }

}

export default {
    create
}