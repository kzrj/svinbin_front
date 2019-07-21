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

    const cullingGiltPiglets = payload => {
        const { id, culling_type, reason } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingGiltPiglets(id);

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

    const moveGroupFromCellToCell = payload => {
        const { id, from_location, to_location, quantity, gilt_quantity } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.moveGroupFromCellToCell();

        const formData = new FormData();
        formData.append("from_location", from_location);
        formData.append("to_location", to_location);
        formData.append("quantity", quantity);
        formData.append("gilt_quantity", gilt_quantity);
        
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

    const moveToPiglets = payload => {
        const { id, to_location, quantity, gilt_quantity } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.moveToPiglets(id);

        const formData = new FormData();
        formData.append("to_location", to_location);
        formData.append("quantity", quantity);
        formData.append("gilt_quantity", gilt_quantity);
        
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
        cullingPiglets,
        cullingGiltPiglets,
        moveGroupFromCellToCell,
        moveToPiglets,
    }

}

export default {
    create
}