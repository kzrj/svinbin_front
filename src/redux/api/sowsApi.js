import axios from 'axios';
import endpoints from './endpoints';

const create = () => {

    const getSows = () => {
        const params = new URLSearchParams();

        return axios.get(endpoints.GET_SOWS, { params })
        .then(response => response.data)
        .catch(err => {
            throw new Error(err)
        })
    }
    return {
        getSows,
    }

}

export default {
    create
}