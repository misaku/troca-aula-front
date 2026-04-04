import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUserHook } from './useUserHook';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

describe('useUserHook', () => {
    const mockRouter = {
        push: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useRouter as any).mockReturnValue(mockRouter);
        global.fetch = vi.fn();
    });

    it('fetches user data on mount successfully', async () => {
        const mockUser = { id: 1, name: 'Test User' };
        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockUser,
        });

        const { result } = renderHook(() => useUserHook());

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.user).toEqual(mockUser);
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/me', { credentials: 'include' });
    });

    it('sets user to null if fetch fails', async () => {
        (global.fetch as any).mockResolvedValue({
            ok: false,
        });

        const { result } = renderHook(() => useUserHook());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.user).toBeNull();
    });

    it('sets user to null if fetch throws error', async () => {
        (global.fetch as any).mockRejectedValue(new Error('Fetch error'));
        console.error = vi.fn();

        const { result } = renderHook(() => useUserHook());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.user).toBeNull();
        expect(console.error).toHaveBeenCalled();
    });

    it('logs out successfully', async () => {
        (global.fetch as any).mockResolvedValue({ ok: true, json: async () => ({}) });

        const { result } = renderHook(() => useUserHook());
        
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await act(async () => {
            await result.current.logout();
        });

        expect(global.fetch).toHaveBeenCalledWith('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        expect(result.current.user).toBeNull();
        expect(mockRouter.push).toHaveBeenCalledWith('/');
    });

    it('handles logout error', async () => {
        (global.fetch as any).mockImplementation((url: string) => {
            if (url === '/api/auth/logout') {
                return Promise.reject(new Error('Logout failed'));
            }
            return Promise.resolve({ ok: true, json: async () => ({}) });
        });
        console.error = vi.fn();

        const { result } = renderHook(() => useUserHook());
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        await act(async () => {
            await result.current.logout();
        });

        expect(console.error).toHaveBeenCalledWith('Erro ao fazer logout:', expect.any(Error));
    });

    it('can refresh user data', async () => {
        const mockUser = { id: 1, name: 'Test User' };
        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockUser,
        });

        const { result } = renderHook(() => useUserHook());
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({ ...mockUser, refreshed: true }),
        });

        await act(async () => {
            await result.current.refreshUserData();
        });

        expect(result.current.user).toEqual({ ...mockUser, refreshed: true });
    });
});
