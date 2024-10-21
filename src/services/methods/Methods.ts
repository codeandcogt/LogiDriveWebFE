import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../env/env";
import { ApiResponse } from "@/interface";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequest = async <T>(
  request: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await request;
    return {
      code: response.data.code,
      message: response.data.message || "Success",
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      code: error.response?.status || 500,
      message:
        error.response?.data?.message || error.message || "An error occurred",
      data: null as T,
    };
  }
};

export const get = async <T>(url: string): Promise<ApiResponse<T>> =>
  handleRequest<T>(api.get<ApiResponse<T>>(url));

export const post = async <T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> => handleRequest<T>(api.post<ApiResponse<T>>(url, data));

export const put = async <T>(url: string, data: any): Promise<ApiResponse<T>> =>
  handleRequest<T>(api.put<ApiResponse<T>>(url, data));

export const patch = async <T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> => handleRequest<T>(api.patch<ApiResponse<T>>(url, data));

export const remove = async <T>(url: string): Promise<ApiResponse<T>> =>
  handleRequest<T>(api.delete<ApiResponse<T>>(url));