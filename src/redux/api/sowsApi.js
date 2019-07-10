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

    const seminationSow = payload => {
        const { id, week, seminationEmployeeId } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.seminationSow(id);
        console.log('oppa');
        console.log(token);
        console.log(url);

        const formData = new FormData();
        formData.append("week", week);
        formData.append("seminationEmployeeId", seminationEmployeeId);
        
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

    const ultrasoundSow = payload => {
        const { id, week, result } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.ultrasoundSow(id);

        const formData = new FormData();
        formData.append("week", week);
        formData.append("result", result);
        
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

    const cullingSow = payload => {
        const { id, culling_type, reason } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingSow(id);

        const formData = new FormData();
        formData.append("culling_type", culling_type);
        formData.append("reason", reason);
        
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

    const sowMoveTo = payload => {
        const { id, location } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.sowMoveTo(id);

        const formData = new FormData();
        formData.append("location", location);
        
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
        getSows,
        seminationSow,
        ultrasoundSow,
        cullingSow,
        sowMoveTo
    }

}

export default {
    create
}