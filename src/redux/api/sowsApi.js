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
        const { farm_id, week, date, seminator1, boar1, seminator2, boar2, } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.DOUBLE_SEMINATION;

        const formData = new FormData();
        formData.append("farm_id", farm_id);
        formData.append("week", week);
        formData.append("date", date+'T12:00');
        formData.append("seminator1", seminator1);
        formData.append("boar1", boar1);
        formData.append("seminator2", seminator2);
        formData.append("boar2", boar2);
        
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
        const { id, culling_type, reason, weight } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingSow(id);

        const formData = new FormData();
        formData.append("culling_type", culling_type);
        formData.append("reason", reason);
        formData.append("weight", weight);
        
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

    const cullingSowWs3 = payload => {
        const { id, culling_type, reason, weight } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingSowWs3(id);

        const formData = new FormData();
        formData.append("culling_type", culling_type);
        formData.append("reason", reason);
        formData.append("weight", weight);
        
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

    const sowsMoveManyWs3 = payload => {
        const { sows, to_location } = payload;
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        sows.map(sow => formData.append("sows", sow))
        formData.append("to_location", to_location);
        
        return axios({
                    method: 'post',
                    url: endpoints.SOWS_MOVE_MANY_WS3,
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
        const { id, alive_quantity, dead_quantity, mummy_quantity, date } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.sowFarrow(id);

        const formData = new FormData();
        formData.append("alive_quantity", alive_quantity);
        formData.append("dead_quantity", dead_quantity);
        formData.append("mummy_quantity", mummy_quantity);

        let today = new Date();
        let hour = today.getHours();
        let min = today.getMinutes();
        formData.append("date", date + 'T' + hour + ':' + min );
        
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

    const abortionSowWs3 = payload => {
        const { id } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.abortionSowWs3(id);

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

    const massInitTransfer = payload => {
        const { sows, week } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.MASS_INIT_TRANSFER;

        const formData = new FormData();
        sows.map(sow => formData.append("sows", sow))
        formData.append("week", week);
        
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

    const importSeminationsFromFarm = payload => {
        const { file } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.IMPORT_SEMINATIONS_FROM_FARM;

        const formData = new FormData();
        formData.append("file", file);
        
        return axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    headers: { 
                        'content-type': 'multipart/form-data',
                        'Authorization': `JWT ${token}` 
                    }
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

    const markAsNurse = payload => {
        const { id, piglets_tour } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.markAsNurse(id);

        const formData = new FormData();
        if (piglets_tour) {
            formData.append("piglets_tour", piglets_tour)
        }

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

    const createBoar = payload => {
        const { farm_id, birth_id, breed } = payload;
        const token = localStorage.getItem('token') || '';

        const formData = new FormData();
        formData.append("birth_id", birth_id);
        formData.append("farm_id", farm_id);
        formData.append("breed", breed);

        return axios({
                    method: 'post',
                    url: endpoints.CREATE_NEW_BOAR,
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

    const cullingBoar = payload => {
        const { id, culling_type, reason, weight } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.cullingBoar(id);

        const formData = new FormData();
        formData.append("culling_type", culling_type);
        formData.append("reason", reason);
        formData.append("weight", weight);
        
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

    const getBoarBreed = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_BOAR_BREED, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const semenBoar = payload => {
        const { id, a, b, d, final_motility_score, date, f_denom } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.semenBoar(id);

        const formData = new FormData();
        formData.append("a", a);
        formData.append("b", b);
        formData.append("d", d);
        formData.append("f_denom", f_denom);
        formData.append("final_motility_score", final_motility_score);
        formData.append("date", date);

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

    const getSemenBoarList = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_SEMEN_BOAR_LIST, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const setSow = sow => {
        return sow
    }

    const massCulling = payload => {
        const { sows, culling_type, reason, weight } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.MASS_CULLING;

        const formData = new FormData();
        sows.map(sow => formData.append("sows", sow))
        formData.append("culling_type", culling_type);
        formData.append("reason", reason);
        formData.append("weight", weight);
        
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

    const createGilt = payload => {
        const { id, date, birth_id } = payload;
        const token = localStorage.getItem('token') || '';
        const url = endpoints.createGilt(id);

        const formData = new FormData();
        formData.append("date", date);
        formData.append("birth_id", birth_id);

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
        cullingSowWs3,
        sowMoveTo,
        sowsMoveMany,
        sowsMoveManyWs3,
        sowFarrow,
        getSowsByTours,
        getSowsByToursWs2,
        createNewSow,
        createNewNonameSow,
        massSemination,
        massUltrasound,
        abortionSow,
        abortionSowWs3,
        massInitTransfer,
        markAsNurse,
        importSeminationsFromFarm,
        setSow,
        massCulling,
        createGilt,

        // boars
        createBoar,
        getBoars,
        cullingBoar,
        getBoarBreed,
        semenBoar,
        getSemenBoarList,

        // init endpoints
        addNewSeminatedToWs1
    }

}

export default {
    create
}