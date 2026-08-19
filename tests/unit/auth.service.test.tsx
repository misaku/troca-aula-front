import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../../src/services/auth.service';

vi.mock('../../src/api.service', () => ({
  __esModule: true,
  default: {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
  },
}));

import apiService from '../../src/api.service';

const mockApi = apiService as unknown as { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getGovbrAuthUrl', () => {
    it('should return auth URL and state from API', async () => {
      const mockResponse = {
        data: {
          url: 'https://autenticacao.gov.br/authorize?client_id=xxx',
          state: 'abc123-state',
        },
      };
      mockApi.get = vi.fn().mockResolvedValue(mockResponse);

      const result = await authService.getGovbrAuthUrl();

      expect(mockApi.get).toHaveBeenCalledWith('/auth/govbr-auth-url');
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error when API fails', async () => {
      mockApi.get = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(authService.getGovbrAuthUrl()).rejects.toThrow('Network error');
    });
  });

  describe('loginWithGovbr', () => {
    it('should exchange code for token and user data', async () => {
      const mockResponse = {
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 'user-123',
            name: 'João Silva',
            email: 'joao.silva@exemplo.gov.br',
            cpf: '12345678901',
            roles: ['teacher'],
          },
          expires_in: 3600,
        },
      };
      mockApi.post = vi.fn().mockResolvedValue(mockResponse);

      const result = await authService.loginWithGovbr('auth-code', 'http://localhost:3000/auth/govbr-callback');

      expect(mockApi.post).toHaveBeenCalledWith('/auth/login-govbr', {
        code: 'auth-code',
        redirect_uri: 'http://localhost:3000/auth/govbr-callback',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error when code is invalid or expired', async () => {
      mockApi.post = vi.fn().mockRejectedValue({
        response: { status: 400, data: { message: 'Código expirado' } },
      });

      await expect(
        authService.loginWithGovbr('expired-code', 'http://localhost:3000/auth/govbr-callback')
      ).rejects.toThrow();
    });
  });
});