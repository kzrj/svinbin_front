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

    const ws3TransferSowAndPiglets = payload => {
        const { from_location, to_location } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.WS3_TRANSFER_SOW_AND_PIGLETS;

        const formData = new FormData();
        formData.append("from_location", from_location);
        formData.append("to_location", to_location);
        
        return axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    headers: { 'content-type': 'multipart/form-data', 'Authorization': `JWT ${token}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getWs3GiltJournal = () => {
        const token = localStorage.getItem('token') || '';

        return axios({
                    method: 'get',
                    url: endpoints.WS3_GILT_JOURNAL,
                    headers: { 'content-type': 'multipart/form-data', 'Authorization': `JWT ${token}` }
        })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    return {
        getInfoWs3,
        getBalancesByToursWs3,
        ws3TransferSowAndPiglets,
        getWs3GiltJournal
    }
}

export default {
    create
}