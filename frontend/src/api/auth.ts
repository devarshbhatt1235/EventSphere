import api from './axios';
import { User } from '../types';

export const register = async (userData: Partial<User>) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const login = async (credentials: Pick<User, 'email' | 'password'>) => {
  const response = await api.post('/api/users/login', credentials);
  return response.data;
};