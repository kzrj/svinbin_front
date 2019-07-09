import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getSows = (filters) => {
        const params = createUrlParamsFromFilters(filters);

        return axios.get(endpoints.GET_SOWS, { params })
        .then(response => response.data)
        .catch(err => {
            throw new Error(err)
        })
    }
    return {
        getSows,
    }

    const seminationSow = payload => {
        const { id, week, seminationEmployeeId } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.seminationSow(id);

        const formData = new FormData();
        formData.append("week", week);
        formData.append("seminationEmployeeId", seminationEmployeeId);
        
        return axios({
                    method: 'post',
                    url: endpoints.CREATE_LIESENCE,
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

}

export default {
    create
}