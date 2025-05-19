import axios from "axios";
import {toast} from "react-toastify";

const api = axios.create({baseURL: 'http://localhost:5000'})
api.interceptors.response.use((success) => {
    return {...success, error: false };
}, (error) => {
    toast.error(error.response.data.message);
    return {error: true};
})
export const useApi = () => {
    return {api};
}
