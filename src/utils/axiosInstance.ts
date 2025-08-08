// src/utils/axiosInstance.ts
import axios from 'axios';
import store from '../redux/store';
import { refreshAccessToken, logout } from '../redux/authSlice';
import { refreshToken as fetchRefreshToken } from '../services/auth.api';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const axiosInstance = axios.create({
    baseURL: 'https://be-warehouse-production.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach token to each request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle response + refresh token on 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error?.response?.status;

        // Bắt cả 401 và 403 để tự động refresh token
        if ((status === 401 || status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log('[Axios] Gặp lỗi', status, ', bắt đầu refresh token...');

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(axiosInstance(originalRequest));
                        },
                        reject: (err: any) => reject(err),
                    });
                });
            }

            isRefreshing = true;
            const refreshToken = localStorage.getItem('refreshToken');
            console.log('[Axios] Đang gọi API refresh-token với refreshToken:', refreshToken);

            try {
                const res = await fetchRefreshToken(refreshToken || '');
                const newAccessToken = res.accessToken;
                console.log('[Axios] Refresh token thành công, accessToken mới:', newAccessToken);

                // update localStorage và store
                localStorage.setItem('accessToken', newAccessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                store.dispatch(refreshAccessToken({ accessToken: newAccessToken }));

                // Gán lại header cho request gốc
                if (!originalRequest.headers) {
                    originalRequest.headers = {};
                }
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                return axiosInstance(originalRequest);
            } catch (refreshErr) {
                console.error('[Axios] Refresh token thất bại:', refreshErr);
                processQueue(refreshErr, null);
                store.dispatch(logout());
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
