'use client';

import styled from 'styled-components';
import { useMasterDashboard } from '@/hooks/useMasterDashboard';
import { StatCard } from '@/components/StatCard';

const PageContainer = styled.div`
  padding: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 48px;
  color: #666;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 48px;
  color: #c62828;
`;

export default function DashboardPage() {
  const { stats, loading, error } = useMasterDashboard();

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>Dashboard</PageTitle>
        <LoadingState>Carregando estatísticas...</LoadingState>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <PageTitle>Dashboard</PageTitle>
        <ErrorState>{error}</ErrorState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Dashboard</PageTitle>
      <StatsGrid>
        <StatCard label="Total de Escolas" value={stats.totalSchools} />
        <StatCard label="Aulas Vagas" value={stats.totalClassesAvailable} />
        <StatCard label="Substituições este mês" value={stats.totalSubstitutionsThisMonth} />
      </StatsGrid>
    </PageContainer>
  );
}