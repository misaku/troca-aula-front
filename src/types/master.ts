export interface School {
  id: number;
  name: string;
  substitutionLimitPerSemester: number | null;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  schoolId: number | null;
  profileId: number;
  createdAt: string;
}

export interface CreateSchoolRequest {
  name: string;
  substitutionLimitPerSemester?: number;
}

export interface UpdateSchoolRequest {
  name?: string;
  substitutionLimitPerSemester?: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  schoolId: number;
  profileId: number;
}

export interface DashboardStats {
  totalSchools: number;
  totalClassesAvailable: number;
  totalSubstitutionsThisMonth: number;
}

export interface SchoolsPageState {
  schools: School[];
  loading: boolean;
  error: string | null;
  formModal: {
    open: boolean;
    mode: 'create' | 'edit';
    data: School | null;
  };
}

export interface UsersPageState {
  users: User[];
  loading: boolean;
  error: string | null;
  filters: {
    profileId: 2 | 3;
    schoolId?: number;
  };
  formModal: {
    open: boolean;
    mode: 'create' | 'edit';
    data: User | null;
  };
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiState<T> {
  data: T | null;
  status: RequestStatus;
  error: string | null;
}
