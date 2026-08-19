import api from '@/api.service';
import type { School, User, CreateSchoolRequest, UpdateSchoolRequest, CreateUserRequest, DashboardStats } from '@/types/master';

export const masterService = {
  getSchools: async (): Promise<School[]> => {
    const response = await api.get('/schools');
    return response.data?.data ?? response.data;
  },

  getSchool: async (id: number): Promise<School> => {
    const response = await api.get(`/schools/${id}`);
    return response.data?.data ?? response.data;
  },

  createSchool: async (data: CreateSchoolRequest): Promise<School> => {
    const response = await api.post('/schools', data);
    return response.data?.data ?? response.data;
  },

  updateSchool: async (id: number, data: UpdateSchoolRequest): Promise<School> => {
    const response = await api.patch(`/schools/${id}`, data);
    return response.data?.data ?? response.data;
  },

  deleteSchool: async (id: number): Promise<void> => {
    await api.delete(`/schools/${id}`);
  },

  getUsers: async (profileId?: number, schoolId?: number): Promise<User[]> => {
    const params = new URLSearchParams();
    if (profileId) params.append('profileId', profileId.toString());
    if (schoolId) params.append('schoolId', schoolId.toString());
    const response = await api.get(`/users?${params.toString()}`);
    return response.data?.data ?? response.data;
  },

  createUser: async (data: CreateUserRequest): Promise<User> => {
    const response = await api.post('/users', data);
    return response.data?.data ?? response.data;
  },

  updateUser: async (id: number, data: Partial<CreateUserRequest>): Promise<User> => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data?.data ?? response.data;
  },

  unlinkUser: async (id: number): Promise<User> => {
    const response = await api.patch(`/users/${id}`, { schoolId: null });
    return response.data?.data ?? response.data;
  },

  getClassesAvailable: async (): Promise<number> => {
    const response = await api.get('/classes?available=true');
    const data = response.data?.data ?? response.data;
    return data.length;
  },

  getSubstitutionsThisMonth: async (): Promise<number> => {
    const now = new Date();
    const month = now.toISOString().slice(0, 7);
    const response = await api.get('/enrollment-requests?status=APPROVED');
    const items = response.data?.data ?? response.data;
    return items.filter((item: { createdAt: string }) =>
      item.createdAt.startsWith(month),
    ).length;
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
