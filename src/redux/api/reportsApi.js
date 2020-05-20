import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getTourReports = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_TOUR_REPORTS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getDirReport = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_DIR_REPORT, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getPigsCountReport = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_PIGS_COUNT_REPORT, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }
    
    return {
        getTourReports,
        getDirReport,
        getPigsCountReport
    }
}

export default {
    create
}