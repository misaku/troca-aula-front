import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMaster } from '@/hooks/useMaster';
import { useUserHook } from '@/user/useUserHook';

vi.mock('@/user/useUserHook', () => ({
  useUserHook: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('Route Protection - US1', () => {
  const mockRouter = { push: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should allow access when user profileId is 1 (Master)', () => {
    vi.mocked(useUserHook).mockReturnValue({
      user: { profileId: 1, name: 'Master User' },
      isLoading: false,
    });

    const { result } = renderHook(() => useMaster());

    expect(result.current.isMaster).toBe(true);
  });

  it('should block access when user profileId is 2 (Diretor)', () => {
    vi.mocked(useUserHook).mockReturnValue({
      user: { profileId: 2, name: 'Diretor' },
      isLoading: false,
    });

    const { result } = renderHook(() => useMaster());

    expect(result.current.isMaster).toBe(false);
  });

  it('should block access when user profileId is 3 (Admin)', () => {
    vi.mocked(useUserHook).mockReturnValue({
      user: { profileId: 3, name: 'Admin' },
      isLoading: false,
    });

    const { result } = renderHook(() => useMaster());

    expect(result.current.isMaster).toBe(false);
  });

  it('should block access when user profileId is 4 (Professor)', () => {
    vi.mocked(useUserHook).mockReturnValue({
      user: { profileId: 4, name: 'Professor' },
      isLoading: false,
    });

    const { result } = renderHook(() => useMaster());

    expect(result.current.isMaster).toBe(false);
  });

  it('should block access when user is null', () => {
    vi.mocked(useUserHook).mockReturnValue({
      user: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useMaster());

    expect(result.current.isMaster).toBe(false);
  });

  it('should return loading state when checking access', () => {
    vi.mocked(useUserHook).mockReturnValue({
      user: null,
      isLoading: true,
    });

    const { result } = renderHook(() => useMaster());

    expect(result.current.isLoading).toBe(true);
  });
});