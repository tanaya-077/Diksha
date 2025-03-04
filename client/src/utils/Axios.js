import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Sending access token in the header
Axios.interceptors.request.use(
    async(config) => {
        const accessToken = localStorage.getItem('accesstoken');
        
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token refresh
Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async(error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await Axios.post('/api/user/refresh-token', {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                });

                const newAccessToken = response.data.data.accessToken;
                localStorage.setItem('accesstoken', newAccessToken);
                
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return Axios(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accesstoken');
                localStorage.removeItem('refreshToken');
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default Axios;