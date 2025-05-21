import axios from "axios";
import {toast} from "react-toastify";

const api = axios.create({baseURL: 'http://localhost:5000'})


api.interceptors.response.use((success) => {
    return success;
}, (error) => {
    console.log({error});
    toast.error(error.response.data.message.join('\n'));
    throw error;
})

export default api;
