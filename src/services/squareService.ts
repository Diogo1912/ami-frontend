import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://ami-backend.railway.app/api' 
    : 'http://localhost:8000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Square {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSquareData {
  x: number;
  y: number;
  size: number;
  color: string;
}

export interface UpdateSquareData {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}

export const squareService = {
  async getAll(): Promise<Square[]> {
    const response = await api.get('/squares/');
    return response.data;
  },

  async create(data: CreateSquareData): Promise<Square> {
    const response = await api.post('/squares/', data);
    return response.data;
  },

  async update(id: number, data: UpdateSquareData): Promise<Square> {
    const response = await api.patch(`/squares/${id}/`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/squares/${id}/`);
  },

  async getHealthCheck(): Promise<{ status: string }> {
    const response = await api.get('/health/');
    return response.data;
  },
};