import { describe, it, expect, vi, beforeEach } from 'vitest';
import { teacherService } from '../../src/services/teacher.service';

vi.mock('../../src/api.service', () => ({
  __esModule: true,
  default: {
    get: vi.fn(),
    patch: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
  },
}));

import apiService from '../../src/api.service';

const mockApi = apiService as unknown as {
  get: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
};

describe('teacherService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getLinkedTeachers', () => {
    it('should return list of teachers linked to a school', async () => {
      const mockTeachers = [
        {
          id: 'user-1',
          name: 'João Silva',
          email: 'joao@escola.com',
          schoolId: 'school-1',
          profileId: 4,
          subject: { id: 'subj-1', name: 'Matemática' },
          totalSubstitutions: 15,
        },
      ];
      mockApi.get = vi.fn().mockResolvedValue({ data: mockTeachers });

      const result = await teacherService.getLinkedTeachers('school-1');

      expect(mockApi.get).toHaveBeenCalledWith('/users', {
        params: { schoolId: 'school-1', profileId: 4 },
      });
      expect(result).toEqual(mockTeachers);
    });

    it('should return empty array when no teachers are linked', async () => {
      mockApi.get = vi.fn().mockResolvedValue({ data: [] });

      const result = await teacherService.getLinkedTeachers('school-1');

      expect(result).toEqual([]);
    });

    it('should throw error when API call fails', async () => {
      mockApi.get = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(teacherService.getLinkedTeachers('school-1')).rejects.toThrow(
        'Network error'
      );
    });
  });

  describe('getAvailableTeachers', () => {
    it('should return list of teachers not linked to any school', async () => {
      const mockTeachers = [
        {
          id: 'user-2',
          name: 'Maria Santos',
          email: 'maria@email.com',
          schoolId: null,
          profileId: 4,
          subject: { id: 'subj-2', name: 'Física' },
          totalSubstitutions: 8,
        },
        {
          id: 'user-3',
          name: 'Pedro Oliveira',
          email: 'pedro@email.com',
          schoolId: 'school-2',
          profileId: 4,
          subject: { id: 'subj-3', name: 'Química' },
          totalSubstitutions: 12,
        },
      ];
      mockApi.get = vi.fn().mockResolvedValue({ data: mockTeachers });

      const result = await teacherService.getAvailableTeachers();

      expect(mockApi.get).toHaveBeenCalledWith('/users', {
        params: { profileId: 4 },
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('user-2');
    });

    it('should return empty array when all teachers are linked', async () => {
      const mockTeachers = [
        {
          id: 'user-1',
          name: 'João Silva',
          email: 'joao@escola.com',
          schoolId: 'school-1',
          profileId: 4,
          totalSubstitutions: 15,
        },
      ];
      mockApi.get = vi.fn().mockResolvedValue({ data: mockTeachers });

      const result = await teacherService.getAvailableTeachers();

      expect(result).toEqual([]);
    });

    it('should throw error when API call fails', async () => {
      mockApi.get = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(teacherService.getAvailableTeachers()).rejects.toThrow(
        'Network error'
      );
    });
  });

  describe('linkTeacher', () => {
    it('should link a teacher to a school', async () => {
      const mockResponse = {
        id: 'user-1',
        name: 'João Silva',
        schoolId: 'school-1',
        profileId: 4,
      };
      mockApi.patch = vi.fn().mockResolvedValue({ data: mockResponse });

      const result = await teacherService.linkTeacher('user-1', 'school-1');

      expect(mockApi.patch).toHaveBeenCalledWith('/users/user-1', {
        schoolId: 'school-1',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when user not found', async () => {
      mockApi.patch = vi.fn().mockRejectedValue({
        response: { status: 404, data: { message: 'User not found' } },
      });

      await expect(
        teacherService.linkTeacher('invalid-user', 'school-1')
      ).rejects.toThrow();
    });
  });

  describe('unlinkTeacher', () => {
    it('should unlink a teacher from school', async () => {
      const mockResponse = {
        id: 'user-1',
        name: 'João Silva',
        schoolId: null,
        profileId: 4,
      };
      mockApi.patch = vi.fn().mockResolvedValue({ data: mockResponse });

      const result = await teacherService.unlinkTeacher('user-1');

      expect(mockApi.patch).toHaveBeenCalledWith('/users/user-1', {
        schoolId: null,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when API call fails', async () => {
      mockApi.patch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(teacherService.unlinkTeacher('user-1')).rejects.toThrow(
        'Network error'
      );
    });
  });

  describe('getEnrollmentRequests', () => {
    it('should return enrollment requests for a school', async () => {
      const mockEnrollments = [
        {
          id: 'enr-1',
          userId: 'user-1',
          schoolId: 'school-1',
          status: 'PENDING',
          appliedAt: '2026-05-17T10:00:00Z',
          user: {
            id: 'user-1',
            name: 'Maria Santos',
            email: 'maria@email.com',
            subject: { id: 'subj-2', name: 'Física' },
            totalSubstitutions: 8,
          },
        },
      ];
      mockApi.get = vi.fn().mockResolvedValue({ data: mockEnrollments });

      const result = await teacherService.getEnrollmentRequests('school-1');

      expect(mockApi.get).toHaveBeenCalledWith('/enrollment-requests', {
        params: { schoolId: 'school-1' },
      });
      expect(result).toEqual(mockEnrollments);
    });

    it('should filter by status when provided', async () => {
      mockApi.get = vi.fn().mockResolvedValue({ data: [] });

      await teacherService.getEnrollmentRequests('school-1', 'PENDING');

      expect(mockApi.get).toHaveBeenCalledWith('/enrollment-requests', {
        params: { schoolId: 'school-1', status: 'PENDING' },
      });
    });

    it('should throw error when API call fails', async () => {
      mockApi.get = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(
        teacherService.getEnrollmentRequests('school-1')
      ).rejects.toThrow('Network error');
    });
  });

  describe('updateEnrollmentStatus', () => {
    it('should approve an enrollment request', async () => {
      const mockResponse = {
        id: 'enr-1',
        userId: 'user-1',
        schoolId: 'school-1',
        status: 'APPROVED',
        appliedAt: '2026-05-17T10:00:00Z',
      };
      mockApi.patch = vi.fn().mockResolvedValue({ data: mockResponse });

      const result = await teacherService.updateEnrollmentStatus(
        'enr-1',
        'APPROVED'
      );

      expect(mockApi.patch).toHaveBeenCalledWith('/enrollment-requests/enr-1', {
        status: 'APPROVED',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should reject an enrollment request', async () => {
      const mockResponse = {
        id: 'enr-1',
        userId: 'user-1',
        schoolId: 'school-1',
        status: 'REJECTED',
        appliedAt: '2026-05-17T10:00:00Z',
      };
      mockApi.patch = vi.fn().mockResolvedValue({ data: mockResponse });

      const result = await teacherService.updateEnrollmentStatus(
        'enr-1',
        'REJECTED'
      );

      expect(mockApi.patch).toHaveBeenCalledWith('/enrollment-requests/enr-1', {
        status: 'REJECTED',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when enrollment not found', async () => {
      mockApi.patch = vi.fn().mockRejectedValue({
        response: { status: 404, data: { message: 'Enrollment not found' } },
      });

      await expect(
        teacherService.updateEnrollmentStatus('invalid-id', 'APPROVED')
      ).rejects.toThrow();
    });
  });
});
