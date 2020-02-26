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

    const mergeFromInitListPiglets = payload => {
        const token = localStorage.getItem('token') || '';
        return axios({
                    method: 'post',
                    url: endpoints.MERGE_FROM_INIT_LIST_PIGLETS,
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
        const { id, culling_type, reason, is_it_gilt } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingPiglets(id);

        const formData = new FormData();
        formData.append("culling_type", culling_type);
        formData.append("reason", reason);
        formData.append("is_it_gilt", is_it_gilt);
        
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
        const { id, total_weight, place, new_amount, to_location } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.weighingPiglets(id);

        const formData = new FormData();
        formData.append("total_weight", total_weight);
        formData.append("place", place);
        formData.append("new_amount", new_amount);
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

    const recountWeighingPiglets = payload => {
        const { id, total_weight, place, new_quantity } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.recountWeighingPiglets(id);

        const formData = new FormData();
        formData.append("total_weight", total_weight);
        formData.append("place", place);
        formData.append("new_quantity", new_quantity);
        
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
        const { id, to_location, new_amount, merge, gilts_contains } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.movePiglets(id);

        const formData = new FormData();
        formData.append("to_location", to_location);
        if (new_amount)
            formData.append("new_amount", new_amount);
        formData.append("merge", merge);
        formData.append("gilts_contains", gilts_contains);

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

    const markAsGilts = payload => {
        const { id } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.markAsGilts(id);

        const formData = new FormData();
        
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

    const moveGiltsToWs1 = payload => {
        const { id, to_location, new_amount } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.moveGiltsToWs1(id);

        const formData = new FormData();
        formData.append("to_location", to_location);
        if (new_amount)
            formData.append("new_amount", new_amount);

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
        mergeFromInitListPiglets,
        cullingPiglets,
        weighingPiglets,
        recountWeighingPiglets,
        movePiglets,
        markAsGilts,
        moveGiltsToWs1
    }
}

export default {
    create
}