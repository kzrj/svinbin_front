import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getInfoWs3 = () => {
        return axios.get(endpoints.GET_INFO_WS3)
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getBalancesByToursWs3 = () => {
        return axios.get(endpoints.GET_BALANCES_BY_TOURS)
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    return {
        getInfoWs3,
        getBalancesByToursWs3
    }
}

export default {
    create
}