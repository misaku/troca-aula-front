'use client';
import { useState, useEffect, useCallback } from 'react';
import { enrollmentService } from '@/services/enrollment.service';
import type { EnrollmentRequest, EnrollmentListParams, Class } from '@/types/enrollment';

interface UseEnrollmentsResult {
  enrollments: EnrollmentRequest[];
  classes: Class[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useEnrollments = (params?: EnrollmentListParams): UseEnrollmentsResult => {
  const [enrollments, setEnrollments] = useState<EnrollmentRequest[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [enrollmentsData, classesData] = await Promise.all([
        params ? enrollmentService.getEnrollments(params) : Promise.resolve([]),
        enrollmentService.getAvailableClasses(),
      ]);
      
      setEnrollments(enrollmentsData);
      setClasses(classesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [params?.professorId, params?.userId, params?.status, params?.schoolId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    enrollments,
    classes,
    loading,
    error,
    refetch: fetchData,
  };
};
