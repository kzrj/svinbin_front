import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getNomadPiglets = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_NOMADS_PIGLETS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const weighingPiglets = payload => {
        const { id, total_weight, place } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.weighingPiglets(id);

        const formData = new FormData();
        formData.append("total_weight", total_weight);
        formData.append("place", place);
        
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

    return {
        getNomadPiglets,
        weighingPiglets,
    }

}

export default {
    create
}