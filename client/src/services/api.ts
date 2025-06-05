import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8000/api/v1";

let navigate: ((path: string) => void) | null = null;

export const setNavigator = (navigateFunction: (path: string) => void) => {
    navigate = navigateFunction;
};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401 && navigate) {
            AuthService.logout();
            navigate("/login");
        }
        return Promise.reject(error);
    }
);

export default api;
