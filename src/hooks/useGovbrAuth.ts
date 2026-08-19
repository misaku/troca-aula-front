'use client';

import { useState, useCallback } from 'react';
import { authService } from '@/services/auth.service';
import { UserDTO } from '@/types/auth';

interface UseGovbrAuthReturn {
  isLoading: boolean;
  error: string | null;
  loginWithGovbr: (code: string) => Promise<{ user: UserDTO; token: string } | null>;
  logout: () => void;
}

export function useGovbrAuth(): UseGovbrAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithGovbr = useCallback(async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const redirectUri = `${window.location.origin}/auth/govbr-callback`;
      const response = await authService.loginWithGovbr(code, redirectUri);

      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      return { user: response.user, token: response.token };
    } catch (err: unknown) {
      const message = err instanceof Error 
        ? err.message 
        : 'Falha na autenticação Gov.br. Tente novamente ou use login tradicional.';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }, []);

  return { isLoading, error, loginWithGovbr, logout };
}

export default useGovbrAuth;