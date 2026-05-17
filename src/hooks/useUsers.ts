import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { masterService } from '@/services/master.service';
import type { User, CreateUserRequest } from '@/types/master';

export function useUsers(profileId: 2 | 3, schoolId?: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await masterService.getUsers(profileId, schoolId);
      setUsers(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar usuários';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [profileId, schoolId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (data: CreateUserRequest) => {
    try {
      const newUser = await masterService.createUser(data);
      setUsers((prev) => [...prev, newUser]);
      toast.success(`${profileId === 2 ? 'Diretor' : 'Administrador'} criado com sucesso`);
      return newUser;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao criar usuário';
      toast.error(message);
      throw err;
    }
  };

  const unlinkUser = async (userId: number) => {
    try {
      const updated = await masterService.unlinkUser(userId);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      toast.success('Vínculo removido com sucesso');
      return updated;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao desvincular usuário';
      toast.error(message);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    unlinkUser,
    refetch: fetchUsers,
  };
}