import axios from 'axios';
import type {
  EnrollmentRequest,
  CreateEnrollmentRequest,
  EnrollmentListParams,
  EnrollmentActionResponse,
  EnrollmentListResponse,
  Class
} from '@/types/enrollment';

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

export const enrollmentService = {
  getAvailableClasses: async (): Promise<Class[]> => {
    const response = await api.get('/classes?available=true');
    return response.data.data;
  },

  getEnrollments: async (params?: EnrollmentListParams): Promise<EnrollmentRequest[]> => {
    const queryParams = new URLSearchParams();
    if (params?.userId) queryParams.append('userId', params.userId.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.schoolId) queryParams.append('schoolId', params.schoolId.toString());
    const response = await api.get<EnrollmentListResponse>(`/enrollment-requests?${queryParams.toString()}`);
    return response.data.data;
  },

  getEnrollment: async (id: number): Promise<EnrollmentRequest> => {
    const response = await api.get<{ data: EnrollmentRequest }>(`/enrollment-requests/${id}`);
    return response.data.data;
  },

  createEnrollment: async (data: CreateEnrollmentRequest): Promise<EnrollmentRequest> => {
    const response = await api.post<{ data: EnrollmentRequest }>('/enrollment-requests', data);
    return response.data.data;
  },

  approveEnrollment: async (id: number): Promise<EnrollmentRequest> => {
    const response = await api.patch<EnrollmentActionResponse>(`/enrollment-requests/${id}/approve`);
    return response.data.data;
  },

  rejectEnrollment: async (id: number, reason?: string): Promise<EnrollmentRequest> => {
    const response = await api.patch<EnrollmentActionResponse>(`/enrollment-requests/${id}/reject`, {
      rejectionReason: reason,
    });
    return response.data.data;
  },

  cancelEnrollment: async (id: number): Promise<EnrollmentRequest> => {
    const response = await api.patch<EnrollmentActionResponse>(`/enrollment-requests/${id}/cancel`);
    return response.data.data;
  },
};