export interface Subject {
  id: string;
  name: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  schoolId?: string | null;
  profileId: number;
  subject?: Subject | null;
  totalSubstitutions: number;
}

export type EnrollmentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface TeacherCandidate {
  id: string;
  name: string;
  email: string;
  subject?: Subject | null;
  totalSubstitutions: number;
}

export interface EnrollmentRequest {
  id: string;
  userId: string;
  schoolId: string;
  status: EnrollmentStatus;
  appliedAt: string;
  user?: TeacherCandidate;
}

export interface LinkTeacherRequest {
  schoolId: string | null;
}

export interface UpdateEnrollmentStatusRequest {
  status: EnrollmentStatus;
}
