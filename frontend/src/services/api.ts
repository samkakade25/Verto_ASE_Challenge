import axios from 'axios';
import type {Employee, GetEmployeesResponse } from '../types/employee';


const API_URL = import.meta.env.VITE_API_URL;


export const getEmployees = async (): Promise<GetEmployeesResponse> => {
    const response = await axios.get<GetEmployeesResponse>(API_URL);
    return response.data;
}

export const createEmployee = async (data: Omit<Employee, 'id'>): Promise<Employee> => {
    const response = await axios.post(API_URL, data);
    return response.data;
  };
  
  export const updateEmployee = async (id: number, data: Partial<Employee>): Promise<Employee> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  };
  
  export const deleteEmployee = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  };