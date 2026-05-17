'use client';
import styled from 'styled-components';

interface SubstitutionCounterProps {
  current: number;
  limit: number | null;
  percentage: number;
  loading?: boolean;
}

const Container = styled.div<{ $status: 'normal' | 'warning' | 'blocked' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'blocked': return '#fee';
      case 'warning': return '#fef3cd';
      default: return '#d4edda';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'blocked': return '#721c24';
      case 'warning': return '#856404';
      default: return '#155724';
    }
  }};
  border: 1px solid ${({ $status }) => {
    switch ($status) {
      case 'blocked': return '#f5c6cb';
      case 'warning': return '#ffeeba';
      default: return '#c3e6cb';
    }
  }};
`;

const Icon = styled.span`
  font-size: 16px;
`;

const Message = styled.span`
  white-space: nowrap;
`;

const LoadingText = styled.span`
  color: #666;
  font-style: italic;
`;

const getStatus = (percentage: number, limit: number | null): 'normal' | 'warning' | 'blocked' => {
  if (limit === null) return 'normal';
  if (percentage >= 100) return 'blocked';
  if (percentage >= 80) return 'warning';
  return 'normal';
};

const getIcon = (status: 'normal' | 'warning' | 'blocked'): string => {
  switch (status) {
    case 'blocked': return '🔴';
    case 'warning': return '🟡';
    default: return '🟢';
  }
};

const getMessage = (current: number, limit: number | null, percentage: number, status: 'normal' | 'warning' | 'blocked'): string => {
  if (limit === null) {
    return 'Sem limite definido';
  }
  
  if (status === 'blocked') {
    return `Limite atingido (${current} de ${limit})`;
  }
  
  if (status === 'warning') {
    return `Atenção: ${current} de ${limit}`;
  }
  
  return `${current} de ${limit}`;
};

export const SubstitutionCounter = ({ current, limit, percentage, loading }: SubstitutionCounterProps) => {
  if (loading) {
    return (
      <Container $status="normal">
        <LoadingText>Carregando...</LoadingText>
      </Container>
    );
  }

  const status = getStatus(percentage, limit);
  const icon = getIcon(status);
  const message = getMessage(current, limit, percentage, status);

  return (
    <Container $status={status}>
      <Icon>{icon}</Icon>
      <Message>{message}</Message>
    </Container>
  );
};