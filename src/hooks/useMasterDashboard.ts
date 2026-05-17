import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { masterService } from '@/services/master.service';
import type { DashboardStats } from '@/types/master';

export function useMasterDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSchools: 0,
    totalClassesAvailable: 0,
    totalSubstitutionsThisMonth: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await masterService.getDashboardStats();
      setStats(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar estatísticas';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}