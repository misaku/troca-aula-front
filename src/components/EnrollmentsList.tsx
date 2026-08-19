'use client';
import styled from 'styled-components';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useEnrollmentMutations } from '@/hooks/useEnrollment';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useState } from 'react';
import type { EnrollmentStatus } from '@/types/enrollment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TabHeader = styled.div`
  display: flex;
  background-color: #f4f4f4;
  width: 100%;
  height: 50px;
  border-radius: 5px 5px 0 0;

  button {
    border: none;
    background-color: transparent;
    padding: 10px 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-transform: uppercase;
    cursor: pointer;
    color: #989a9a;
    font-size: 12px;

    &:hover {
      background-color: #dff4f4;
      color: #509BA1;
    }

    &.active {
      background-color: #fff;
      color: #509BA1;
    }
  }
`;

const EnrollmentsTable = styled.table`
  width: 100%;
  text-align: left;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;

  thead {
    background-color: #6EC3C9;
  }

  th {
    padding: 10px;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
  }

  tbody {
    tr:nth-child(even) {
      background-color: #f4f4f4;
    }
  }

  td {
    padding: 10px;
    font-size: 14px;
  }
`;

const StatusBadge = styled.span<{ $status: EnrollmentStatus }>`
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 12px;
  text-transform: uppercase;
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'PENDING': return '#f0ad4e';
      case 'APPROVED': return '#5cb85c';
      case 'REJECTED': return '#d9534f';
      case 'CANCELLED': return '#999';
      default: return '#ccc';
    }
  }};
  color: #fff;
`;

const ActionButton = styled.button<{ $variant?: 'approve' | 'reject' }>`
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 5px;
  background-color: ${({ $variant }) => $variant === 'approve' ? '#5cb85c' : '#d9534f'};

  &:hover {
    background-color: ${({ $variant }) => $variant === 'approve' ? '#449d44' : '#c9302c'};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Loading = styled.div`
  color: #509BA1;
  text-align: center;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  color: #f00;
  text-align: center;
  padding: 20px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #989a9a;
`;

const FILTER_OPTIONS: { label: string; value: EnrollmentStatus | 'ALL' }[] = [
  { label: 'Pendentes', value: 'PENDING' },
  { label: 'Aprovadas', value: 'APPROVED' },
  { label: 'Rejeitadas', value: 'REJECTED' },
];

interface EnrollmentsListProps {
  schoolId?: number;
}

export function EnrollmentsList({ schoolId }: EnrollmentsListProps) {
  const [filter, setFilter] = useState<EnrollmentStatus | 'ALL'>('PENDING');
  
  const { enrollments, loading, error, refetch } = useEnrollments(
    { status: filter === 'ALL' ? undefined : filter, schoolId }
  );
  const { approveEnrollment, rejectEnrollment, loading: processing } = useEnrollmentMutations();

  const handleApprove = async (enrollmentId: number) => {
    try {
      await approveEnrollment(enrollmentId);
      toast.success('Candidatura aprovada com sucesso!');
      refetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao aprovar candidatura';
      toast.error(message);
    }
  };

  const handleReject = async (enrollmentId: number) => {
    const reason = prompt('Motivo da rejeição (opcional):');
    try {
      await rejectEnrollment(enrollmentId, reason || undefined);
      toast.success('Candidatura rejeitada!');
      refetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao rejeitar candidatura';
      toast.error(message);
    }
  };

  if (loading) {
    return <Loading>Carregando candidaturas...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <TabHeader>
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={filter === option.value ? 'active' : ''}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </TabHeader>

      {enrollments.length === 0 ? (
        <EmptyState>
          Nenhuma candidatura {filter !== 'ALL' ? filter.toLowerCase() : ''} encontrada.
        </EmptyState>
      ) : (
        <EnrollmentsTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Professor</th>
              <th>Aula ID</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>#{enrollment.id}</td>
                <td>Professor #{enrollment.professorId}</td>
                <td>#{enrollment.classId}</td>
                <td>
                  <StatusBadge $status={enrollment.status}>
                    {enrollment.status === 'PENDING' && 'Pendente'}
                    {enrollment.status === 'APPROVED' && 'Aprovada'}
                    {enrollment.status === 'REJECTED' && 'Rejeitada'}
                    {enrollment.status === 'CANCELLED' && 'Cancelada'}
                  </StatusBadge>
                </td>
                <td>{format(new Date(enrollment.createdAt), 'dd/MM/yyyy HH:mm')}</td>
                <td>
                  {enrollment.status === 'PENDING' && (
                    <>
                      <ActionButton
                        $variant="approve"
                        onClick={() => handleApprove(enrollment.id)}
                        disabled={processing}
                      >
                        Aprovar
                      </ActionButton>
                      <ActionButton
                        $variant="reject"
                        onClick={() => handleReject(enrollment.id)}
                        disabled={processing}
                      >
                        Rejeitar
                      </ActionButton>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </EnrollmentsTable>
      )}
    </Container>
  );
}
