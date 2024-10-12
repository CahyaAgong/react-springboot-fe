// src/axiosHelper.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CONNECTION } from '../constants';

const BASE_URL = `${CONNECTION.BASE_URL}:${CONNECTION.PORT}`;

// Membuat instance Axios
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
      if (error.response) {
          // console.error('Error Response:', error.response.data);
          return Promise.reject(error.response.data);
      } else if (error.request) {
          // console.error('Error Request:', error.request);
          return Promise.reject({ message: 'No response received' });
      } else {
          // console.error('Error Message:', error.message);
          return Promise.reject({ message: error.message });
      }
  }
);

// Helper function untuk melakukan GET request
export const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
};

// Helper function untuk melakukan POST request
export const postRequest = async <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
};

// Helper function untuk melakukan PUT request
export const putRequest = async <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
};

// Helper function untuk melakukan DELETE request
export const deleteRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
};

export default axiosInstance;
