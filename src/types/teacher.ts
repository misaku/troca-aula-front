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

export type EnrollmentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | string;

export interface TeacherCandidate {
  id: string;
  name: string;
  email: string;
  subject?: Subject | null;
  totalSubstitutions: number;
}

export interface EnrollmentRequest {
  id: string;
  professorId?: string;
  classId?: string;
  userId?: string;
  schoolId?: string;
  status: EnrollmentStatus;
  createdAt?: string;
  appliedAt?: string;
  professor?: TeacherCandidate;
  user?: TeacherCandidate;
}

export interface LinkTeacherRequest {
  schoolId: string | null;
}

export interface UpdateEnrollmentStatusRequest {
  status: EnrollmentStatus;
}
