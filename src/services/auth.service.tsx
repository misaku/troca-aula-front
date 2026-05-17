'use client';

import api from '@/api.service';
import { GovbrAuthUrlResponse, GovbrLoginResponse } from '@/types/auth';

export const authService = {
  async getGovbrAuthUrl(): Promise<GovbrAuthUrlResponse> {
    const response = await api.get('/auth/govbr-auth-url');
    return response.data;
  },

  async loginWithGovbr(code: string, redirectUri: string): Promise<GovbrLoginResponse> {
    const response = await api.post('/auth/login-govbr', {
      code,
      redirect_uri: redirectUri,
    });
    return response.data;
  },
};

export default authService;