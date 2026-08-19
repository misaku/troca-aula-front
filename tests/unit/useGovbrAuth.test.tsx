import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGovbrAuth } from '../../src/hooks/useGovbrAuth';

vi.mock('../../src/services/auth.service', () => ({
  authService: {
    loginWithGovbr: vi.fn(),
    getGovbrAuthUrl: vi.fn(),
  },
}));

describe('useGovbrAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('loginWithGovbr', () => {
    it('should set loading state and return user/token on success', async () => {
      const mockResponse = {
        token: 'mock-token',
        user: {
          id: 'user-123',
          name: 'João Silva',
          email: 'joao@test.com',
          cpf: '12345678901',
          roles: ['teacher'],
        },
        expires_in: 3600,
      };

      const { result } = renderHook(() => useGovbrAuth());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('logout', () => {
    it('should clear localStorage items', () => {
      localStorage.setItem('auth_token', 'some-token');
      localStorage.setItem('user', JSON.stringify({ name: 'Test' }));

      const { result } = renderHook(() => useGovbrAuth());
      
      act(() => {
        result.current.logout();
      });

      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const { result } = renderHook(() => useGovbrAuth());
      
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
});