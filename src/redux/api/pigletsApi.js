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
        // const { piglets_groups, part_number } = payload;
        const token = localStorage.getItem('token') || '';

        // const formData = new FormData();
        // piglets_groups.map(group => formData.append("piglets_groups", group))
        // formData.append("part_number", part_number)
        
        return axios({
                    method: 'post',
                    url: endpoints.MERGE_FROM_LIST_PIGLETS,
                    data: payload,
                    headers: { 'content-type': 'multipart/JSON', 'Authorization': `JWT ${token}` }
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
        mergeFromListPiglets
    }

}

export default {
    create
}