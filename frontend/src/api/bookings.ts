import api from './axios';
import { EventBookingForm } from '../types';

export const createBooking = async (bookingData: EventBookingForm) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getUserBookings = async (userId: string) => {
  const response = await api.get(`/bookings/user/${userId}`);
  return response.data;
};

export const updateBooking = async (id: string, bookingData: Partial<EventBookingForm>) => {
  const response = await api.put(`/bookings/${id}`, bookingData);
  return response.data;
};

export const deleteBooking = async (id: string) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};