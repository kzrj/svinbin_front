import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getLocations = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_LOCATIONS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getSections = (filters) => {
        const params = createUrlParamsFromFilters(filters);

        return axios.get(endpoints.GET_LOCATIONS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    return {
        getLocations,
        getSections
    }

}

export default {
    create
}