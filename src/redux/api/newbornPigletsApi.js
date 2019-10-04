import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getNewbornPiglets = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_NEWBORN_PIGLETS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const mergeNewbornPiglets = payload => {
        const { piglets_groups, part_number } = payload;
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        piglets_groups.map(group => formData.append("piglets_groups", group))
        formData.append("part_number", part_number)
        
        return axios({
                    method: 'post',
                    url: endpoints.MERGE_NEWBORN,
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

    const createGilt = payload => {
        const { id, birth_id } = payload;
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append("birth_id", birth_id)
        
        return axios({
                    method: 'post',
                    url: endpoints.create_gilt(id),
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

    const cullingNewbornPiglets = payload => {
        const { id, culling_type, culling_reason } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingNewbornPiglets(id);

        const formData = new FormData();
        formData.append("culling_type", culling_type);
        formData.append("reason", culling_reason);
        
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

    const cullingGiltNewbornPiglets = payload => {
        const { id, culling_type, culling_reason } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingGiltNewbornPiglets(id);

        const formData = new FormData();
        formData.append("culling_type", culling_type);
        formData.append("reason", culling_reason);
        
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

    const recountNewbornPiglets = payload => {
        const { id, quantity } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.recountNewbornPiglets(id);

        const formData = new FormData();
        formData.append("quantity", quantity);
        
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
        getNewbornPiglets,
        mergeNewbornPiglets,
        createGilt,
        cullingNewbornPiglets,
        cullingGiltNewbornPiglets,
        recountNewbornPiglets
    }

}

export default {
    create
}