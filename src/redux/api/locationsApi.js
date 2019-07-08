import axios from 'axios';
import endpoints from './endpoints';

const create = () => {

    const getLocations = () => {
        const params = new URLSearchParams();
        console.log(params)
        // console.log(payload)
        return axios.get(endpoints.GET_LOCATIONS, { params })
        .then(response => response.data)
        .catch(err => {
            throw new Error(err)
        })
    }
    return {
        getLocations,
    }

}

export default {
    create
}