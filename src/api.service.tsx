import axios from "axios";
import {toast} from "react-toastify";

const api = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'})

api.interceptors.request.use((config) => {
    if (typeof document !== 'undefined') {
        const token = document.cookie.match(/token=([^;]+)/)?.[1];
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use((success) => {
    return success;
}, (error) => {
    console.log({error});
    const message = error?.response?.data?.message;
    if (Array.isArray(message)) {
        toast.error(message.join('\n'));
    } else if (typeof message === 'string') {
        toast.error(message);
    } else {
        toast.error('Erro inesperado na requisicao');
    }
    throw error;
})

export default api;
