'use client';
import { useState, useCallback } from 'react';
import { enrollmentService } from '@/services/enrollment.service';
import type { EnrollmentRequest, CreateEnrollmentRequest } from '@/types/enrollment';

interface UseEnrollmentMutationsResult {
  createEnrollment: (data: CreateEnrollmentRequest) => Promise<EnrollmentRequest>;
  approveEnrollment: (id: number) => Promise<EnrollmentRequest>;
  rejectEnrollment: (id: number, reason?: string) => Promise<EnrollmentRequest>;
  cancelEnrollment: (id: number) => Promise<EnrollmentRequest>;
  loading: boolean;
  error: string | null;
}

export const useEnrollmentMutations = (): UseEnrollmentMutationsResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEnrollment = useCallback(async (data: CreateEnrollmentRequest): Promise<EnrollmentRequest> => {
    setLoading(true);
    setError(null);
    try {
      const result = await enrollmentService.createEnrollment(data);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar candidatura';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const approveEnrollment = useCallback(async (id: number): Promise<EnrollmentRequest> => {
    setLoading(true);
    setError(null);
    try {
      const result = await enrollmentService.approveEnrollment(id);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao aprovar candidatura';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const rejectEnrollment = useCallback(async (id: number, reason?: string): Promise<EnrollmentRequest> => {
    setLoading(true);
    setError(null);
    try {
      const result = await enrollmentService.rejectEnrollment(id, reason);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao rejeitar candidatura';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelEnrollment = useCallback(async (id: number): Promise<EnrollmentRequest> => {
    setLoading(true);
    setError(null);
    try {
      const result = await enrollmentService.cancelEnrollment(id);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao cancelar candidatura';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createEnrollment,
    approveEnrollment,
    rejectEnrollment,
    cancelEnrollment,
    loading,
    error,
  };
};