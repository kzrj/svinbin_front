import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getSows = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        console.log(params)

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
        const { id, week, seminationEmployeeId, boar } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.seminationSow(id);

        const formData = new FormData();
        formData.append("week", week);
        formData.append("seminationEmployeeId", seminationEmployeeId);
        formData.append("boar", boar);
        
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
        const { id, result } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.ultrasoundSow(id);

        const formData = new FormData();
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

    const ultrasoundV2Sow = payload => {
        const { id, result } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.ultrasoundV2Sow(id);

        const formData = new FormData();
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

    const sowsMoveMany = payload => {
        const { sows, to_location } = payload;
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        sows.map(sow => formData.append("sows", sow))
        formData.append("to_location", to_location);
        
        return axios({
                    method: 'post',
                    url: endpoints.SOWS_MOVE_MANY,
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

    const sowFarrow = payload => {
        const { id, alive_quantity, dead_quantity, mummy_quantity } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.sowFarrow(id);

        const formData = new FormData();
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

    const getSowsByToursWs2 = (filters) => {
        const params = createUrlParamsFromFilters(filters);

        return axios.get(endpoints.GET_SOWS_BY_TOURS_WS2, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const createNewSow = payload => {
        const { farmId } = payload;
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append("farm_id", farmId);
        
        return axios({
                    method: 'post',
                    url: endpoints.CREATE_NEW_SOW,
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

    const createNewNonameSow = payload => {
        const token = localStorage.getItem('token') || '';
        const formData = new FormData();
        return axios({
                    method: 'post',
                    url: endpoints.CREATE_NEW_NONAME_SOW,
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

    const getBoars = (filters) => {
        const params = createUrlParamsFromFilters(filters);

        return axios.get(endpoints.GET_BOARS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const addNewSeminatedToWs1 = payload => {
        const { farm_id, week, boar } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.INIT_ADD_NEW_SEMINATED_TO_WS1;

        const formData = new FormData();
        formData.append("farm_id", farm_id);
        formData.append("week", week);
        formData.append("boar", boar);
        
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

    const massSemination = payload => {
        const { sows, week, seminationEmployee, boar } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.MASS_SEMINATION;

        const formData = new FormData();
        sows.map(sow => formData.append("sows", sow))
        formData.append("week", week);
        formData.append("semination_employee", seminationEmployee);
        formData.append("boar", boar);
        
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

    const massUltrasound = payload => {
        const { sows, days, result } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.MASS_ULTRASOUND;

        const formData = new FormData();
        sows.map(sow => formData.append("sows", sow))
        formData.append("days", days);
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

    const abortionSow = payload => {
        const { id } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.abortionSow(id);

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


    return {
        getSows,
        getSow,
        seminationSow,
        ultrasoundSow,
        ultrasoundV2Sow,
        cullingSow,
        sowMoveTo,
        sowsMoveMany,
        sowFarrow,
        getSowsByTours,
        getSowsByToursWs2,
        createNewSow,
        createNewNonameSow,
        getBoars,
        massSemination,
        massUltrasound,
        abortionSow,

        // init endpoints
        addNewSeminatedToWs1
        // setSow
    }

}

export default {
    create
}