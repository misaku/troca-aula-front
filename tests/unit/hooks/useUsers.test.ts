import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useUsers } from '@/hooks/useUsers';
import { masterService } from '@/services/master.service';

vi.mock('@/services/master.service', () => ({
  masterService: {
    getUsers: vi.fn(),
    createUser: vi.fn(),
    unlinkUser: vi.fn(),
  },
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockUsers = [
  { id: 1, name: 'Diretor A', email: 'diretor@a.com', phone: '1199999', schoolId: 1, profileId: 2, createdAt: '2026-01-01' },
  { id: 2, name: 'Diretor B', email: 'diretor@b.com', phone: '1188888', schoolId: 2, profileId: 2, createdAt: '2026-01-02' },
];

describe('useUsers Hook - US3', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load directors (profileId=2) on mount', async () => {
    vi.mocked(masterService.getUsers).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUsers(2));

    await waitFor(() => expect(result.current.users).toEqual(mockUsers));
    expect(masterService.getUsers).toHaveBeenCalledWith(2, undefined);
  });

  it('should load administrators (profileId=3) on mount', async () => {
    vi.mocked(masterService.getUsers).mockResolvedValue([]);

    const { result } = renderHook(() => useUsers(3));

    await waitFor(() => expect(result.current.users).toEqual([]));
    expect(masterService.getUsers).toHaveBeenCalledWith(3, undefined);
  });

  it('should create a new director', async () => {
    const newUser = { name: 'Novo Diretor', email: 'novo@diretor.com', schoolId: 1, profileId: 2 };
    vi.mocked(masterService.createUser).mockResolvedValue({
      id: 3,
      ...newUser,
      phone: null,
      createdAt: '2026-01-03',
    });

    const { result } = renderHook(() => useUsers(2));

    await act(async () => {
      await result.current.createUser(newUser);
    });

    expect(masterService.createUser).toHaveBeenCalledWith(newUser);
  });

  it('should unlink a director from school', async () => {
    vi.mocked(masterService.unlinkUser).mockResolvedValue({
      id: 1,
      name: 'Diretor A',
      email: 'diretor@a.com',
      phone: '1199999',
      schoolId: null,
      profileId: 2,
      createdAt: '2026-01-01',
    });

    const { result } = renderHook(() => useUsers(2));

    await act(async () => {
      await result.current.unlinkUser(1);
    });

    expect(masterService.unlinkUser).toHaveBeenCalledWith(1);
  });

  it('should handle loading state', () => {
    vi.mocked(masterService.getUsers).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useUsers(2));

    expect(result.current.loading).toBe(true);
  });
});