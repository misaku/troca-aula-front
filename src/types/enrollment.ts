export type EnrollmentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface EnrollmentRequest {
  id: number;
  classId: number;
  userId: number;
  status: EnrollmentStatus;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface Class {
  id: number;
  subjectId: number;
  subjectName?: string;
  date: string;
  available: boolean;
  schoolId?: number;
}

export interface CreateEnrollmentRequest {
  classId: number;
}

export interface EnrollmentListParams {
  userId?: number;
  status?: EnrollmentStatus;
  schoolId?: number;
}

export interface EnrollmentActionResponse {
  data: EnrollmentRequest;
}

export interface EnrollmentListResponse {
  data: EnrollmentRequest[];
}

export interface ApiError {
  message: string;
  code?: string;
}