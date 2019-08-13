import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getSows = (filters) => {
        const params = createUrlParamsFromFilters(filters);

        return axios.get(endpoints.GET_SOWS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getSow = id => {
        const token = localStorage.getItem('token') || '';
        const url = endpoints.getSow(id);

        return axios({
                    method: 'get',
                    url: url,
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

    const seminationSow = payload => {
        const { id, week, seminationEmployeeId } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.seminationSow(id);

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

    // const sowsMoveMany = payload => {
    //     const { id, sows } = payload;
    //     const token = localStorage.getItem('token') || '';

    //     const formData = new FormData();
    //     formData.append("sows", sows);
        
    //     return axios({
    //                 method: 'post',
    //                 url: endpoints.SOWS_MOVE_MANY,
    //                 data: formData,
    //                 headers: { 'content-type': 'multipart/form-data', 'Authorization': `JWT ${token}` }
    //     })
    //     .then(response => {
    //         return response.data
    //     })
    //     .catch(err => {
    //         const error = new Error(err);
    //         error.data = parseErrorData(err);
    //         throw error;
    //     })
    // }

    const sowFarrow = payload => {
        const { id, week, alive_quantity, dead_quantity, mummy_quantity } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.sowFarrow(id);

        const formData = new FormData();
        formData.append("week", week);
        formData.append("alive_quantity", alive_quantity);
        formData.append("dead_quantity", dead_quantity);
        formData.append("mummy_quantity", mummy_quantity);
        
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

    const getSowsByTours = (filters) => {
        const params = createUrlParamsFromFilters(filters);

        return axios.get(endpoints.GET_SOWS_BY_TOURS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const setSow = sow => sow

    return {
        getSows,
        getSow,
        seminationSow,
        ultrasoundSow,
        cullingSow,
        sowMoveTo,
        // sowsMoveMany,
        sowFarrow,
        getSowsByTours,
        setSow
    }

}

export default {
    create
}