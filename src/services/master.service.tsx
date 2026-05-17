import axios from 'axios';
import type { School, User, CreateSchoolRequest, UpdateSchoolRequest, CreateUserRequest, DashboardStats } from '@/types/master';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = document.cookie.match(/token=([^;]+)/)?.[1];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const masterService = {
  getSchools: async (): Promise<School[]> => {
    const response = await api.get('/schools');
    return response.data.data;
  },

  getSchool: async (id: number): Promise<School> => {
    const response = await api.get(`/schools/${id}`);
    return response.data.data;
  },

  createSchool: async (data: CreateSchoolRequest): Promise<School> => {
    const response = await api.post('/schools', data);
    return response.data.data;
  },

  updateSchool: async (id: number, data: UpdateSchoolRequest): Promise<School> => {
    const response = await api.patch(`/schools/${id}`, data);
    return response.data.data;
  },

  deleteSchool: async (id: number): Promise<void> => {
    await api.delete(`/schools/${id}`);
  },

  getUsers: async (profileId?: number, schoolId?: number): Promise<User[]> => {
    const params = new URLSearchParams();
    if (profileId) params.append('profileId', profileId.toString());
    if (schoolId) params.append('schoolId', schoolId.toString());
    const response = await api.get(`/users?${params.toString()}`);
    return response.data.data;
  },

  createUser: async (data: CreateUserRequest): Promise<User> => {
    const response = await api.post('/users', data);
    return response.data.data;
  },

  updateUser: async (id: number, data: Partial<CreateUserRequest>): Promise<User> => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data.data;
  },

  unlinkUser: async (id: number): Promise<User> => {
    const response = await api.patch(`/users/${id}`, { schoolId: null });
    return response.data.data;
  },

  getClassesAvailable: async (): Promise<number> => {
    const response = await api.get('/classes?available=true');
    return response.data.data.length;
  },

  getSubstitutionsThisMonth: async (): Promise<number> => {
    const now = new Date();
    const month = now.toISOString().slice(0, 7);
    const response = await api.get(`/enrollment-requests?status=APPROVED&mes=${month}`);
    return response.data.data.length;
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const [schools, classesAvailable, substitutions] = await Promise.all([
      masterService.getSchools(),
      masterService.getClassesAvailable(),
      masterService.getSubstitutionsThisMonth(),
    ]);

    return {
      totalSchools: schools.length,
      totalClassesAvailable: classesAvailable,
      totalSubstitutionsThisMonth: substitutions,
    };
  },
};