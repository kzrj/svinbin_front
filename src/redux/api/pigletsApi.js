import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getPiglets = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_PIGLETS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const mergeFromListPiglets = payload => {
        const token = localStorage.getItem('token') || '';
        return axios({
                    method: 'post',
                    url: endpoints.MERGE_FROM_LIST_PIGLETS,
                    data: payload,
                    headers: { 'content-type': 'application/JSON', 'Authorization': `JWT ${token}` }
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

    const cullingPiglets = payload => {
        const { id, culling_type, reason } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingPiglets(id);

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

    const movePiglets = payload => {
        const { id, to_location, new_amount, merge } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.movePiglets(id);

        const formData = new FormData();
        formData.append("to_location", to_location);
        formData.append("new_amount", new_amount);
        formData.append("merge", merge);
        
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
        getPiglets,
        mergeFromListPiglets,
        cullingPiglets,
        weighingPiglets,
        movePiglets
    }
}

export default {
    create
}