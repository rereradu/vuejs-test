import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosRequestConfig: AxiosRequestConfig = {
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {},
};

export const axiosInstance = axios.create(axiosRequestConfig);