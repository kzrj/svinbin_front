import axios from 'axios';
import endpoints from './endpoints';
import { parseErrorData, createUrlParamsFromFilters } from './utils';

const create = () => {

    const getTourReports = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_TOUR_REPORTS, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getDirReport = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_DIR_REPORT, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getPigsCountReport = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_PIGS_COUNT_REPORT, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getOperationsReport = payload => {
        const token = localStorage.getItem('token') || '';
        return axios({
                    method: 'post',
                    url: endpoints.GET_OPERATIONS_REPORT,
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

    const getWs3Report = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_WS3_REPORT, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getWs3ReportAsExcel = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_WS3_REPORT_AS_EXCEL, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }

    const getWsReportPigsCount = (filters) => {
        const params = createUrlParamsFromFilters(filters);
        return axios.get(endpoints.GET_WS_REPORT_PIGS_COUNT, { params })
        .then(response => response.data)
        .catch(err => {
            const error = new Error(err);
            error.data = parseErrorData(err);
            throw error;
        })
    }
    
    return {
        getTourReports,
        getDirReport,
        getPigsCountReport,
        getOperationsReport,
        getWs3Report,
        getWs3ReportAsExcel,
        getWsReportPigsCount
    }
}

export default {
    create
}