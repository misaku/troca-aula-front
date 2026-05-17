'use client';

import api from '@/api.service';
import {
  Teacher,
  EnrollmentRequest,
  LinkTeacherRequest,
} from '@/types/teacher';

export const teacherService = {
  async getLinkedTeachers(schoolId: string): Promise<Teacher[]> {
    const response = await api.get('/users', {
      params: { schoolId, profileId: 4 },
    });
    return response.data?.data ?? response.data;
  },

  async getAvailableTeachers(): Promise<Teacher[]> {
    const response = await api.get('/users', {
      params: { profileId: 4 },
    });
    const data = response.data?.data ?? response.data;
    return data.filter((teacher: Teacher) => !teacher.schoolId);
  },

  async linkTeacher(userId: string, schoolId: string): Promise<Teacher> {
    const payload: LinkTeacherRequest = { schoolId };
    const response = await api.patch(`/users/${userId}`, payload);
    return response.data?.data ?? response.data;
  },

  async unlinkTeacher(userId: string): Promise<Teacher> {
    const payload: LinkTeacherRequest = { schoolId: null };
    const response = await api.patch(`/users/${userId}`, payload);
    return response.data?.data ?? response.data;
  },

  async getEnrollmentRequests(
    schoolId: string,
    status?: string
  ): Promise<EnrollmentRequest[]> {
    const params: Record<string, string> = {};
    if (status) params.status = status;

    const response = await api.get('/enrollment-requests', { params });
    return response.data?.data ?? response.data;
  },

  async updateEnrollmentStatus(
    enrollmentId: string,
    status: 'APPROVED' | 'REJECTED'
  ): Promise<EnrollmentRequest> {
    const endpoint = status === 'APPROVED' ? 'approve' : 'reject';
    const response = await api.patch(
      `/enrollment-requests/${enrollmentId}/${endpoint}`,
    );
    return response.data?.data ?? response.data;
  },
};

export default teacherService;
