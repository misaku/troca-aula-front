# Quickstart: Director Teacher Management

## Prerequisites

- Node.js 22.x
- pnpm
- Backend com endpoints de usuários e enrollment requests disponíveis
- Usuário logado com perfil de Diretor (profileId=2)

## Setup

1. **Instalar dependências**:
   ```bash
   pnpm install
   ```

2. **Verificar variáveis de ambiente**:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

## Implementation Steps

### Step 1: Teacher Service

Criar `src/services/teacher.service.tsx`:

```typescript
import api from '@/api.service';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  schoolId: string | null;
  profileId: number;
  subject: { id: string; name: string } | null;
  totalSubstitutions: number;
}

export interface EnrollmentRequest {
  id: string;
  userId: string;
  schoolId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedAt: string;
  user: Teacher;
}

export const teacherService = {
  async getLinkedTeachers(schoolId: string): Promise<Teacher[]> {
    const response = await api.get(`/users?schoolId=${schoolId}&profileId=4`);
    return response.data;
  },

  async getAvailableTeachers(): Promise<Teacher[]> {
    const response = await api.get('/users?profileId=4');
    return response.data;
  },

  async linkTeacher(userId: string, schoolId: string): Promise<Teacher> {
    const response = await api.patch(`/users/${userId}`, { schoolId });
    return response.data;
  },

  async unlinkTeacher(userId: string): Promise<Teacher> {
    const response = await api.patch(`/users/${userId}`, { schoolId: null });
    return response.data;
  },

  async getEnrollmentRequests(schoolId: string, status?: string): Promise<EnrollmentRequest[]> {
    const params = new URLSearchParams({ schoolId });
    if (status) params.append('status', status);
    const response = await api.get(`/enrollment-requests?${params}`);
    return response.data;
  },

  async updateEnrollmentStatus(requestId: string, status: 'APPROVED' | 'REJECTED'): Promise<EnrollmentRequest> {
    const response = await api.patch(`/enrollment-requests/${requestId}`, { status });
    return response.data;
  },
};
```

### Step 2: Teacher Hook

Criar `src/hooks/useTeachers.ts`:

```typescript
import { useState, useCallback } from 'react';
import { teacherService, Teacher, EnrollmentRequest } from '@/services/teacher.service';

export function useTeachers(schoolId: string) {
  const [linkedTeachers, setLinkedTeachers] = useState<Teacher[]>([]);
  const [availableTeachers, setAvailableTeachers] = useState<Teacher[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLinkedTeachers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await teacherService.getLinkedTeachers(schoolId);
      setLinkedTeachers(data);
    } catch (err) {
      setError('Erro ao carregar professores');
    } finally {
      setIsLoading(false);
    }
  }, [schoolId]);

  const fetchAvailableTeachers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await teacherService.getAvailableTeachers();
      setAvailableTeachers(data);
    } catch (err) {
      setError('Erro ao carregar professores disponíveis');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const linkTeacher = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      await teacherService.linkTeacher(userId, schoolId);
      await fetchLinkedTeachers();
    } catch (err) {
      setError('Erro ao vincular professor');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [schoolId, fetchLinkedTeachers]);

  const unlinkTeacher = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      await teacherService.unlinkTeacher(userId);
      await fetchLinkedTeachers();
    } catch (err) {
      setError('Erro ao desvincular professor');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchLinkedTeachers]);

  const fetchEnrollments = useCallback(async (status?: string) => {
    setIsLoading(true);
    try {
      const data = await teacherService.getEnrollmentRequests(schoolId, status);
      setEnrollments(data);
    } catch (err) {
      setError('Erro ao carregar candidaturas');
    } finally {
      setIsLoading(false);
    }
  }, [schoolId]);

  const updateEnrollmentStatus = useCallback(async (requestId: string, status: 'APPROVED' | 'REJECTED') => {
    setIsLoading(true);
    try {
      await teacherService.updateEnrollmentStatus(requestId, status);
      await fetchEnrollments('PENDING');
    } catch (err) {
      setError('Erro ao atualizar candidatura');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchEnrollments]);

  return {
    linkedTeachers,
    availableTeachers,
    enrollments,
    isLoading,
    error,
    fetchLinkedTeachers,
    fetchAvailableTeachers,
    linkTeacher,
    unlinkTeacher,
    fetchEnrollments,
    updateEnrollmentStatus,
  };
}
```

### Step 3: Teachers Page

Criar `src/app/master/professores/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useUserHook } from '@/user/useUserHook';
import { useTeachers } from '@/hooks/useTeachers';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #1351B4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: #0c326f; }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  background: ${props => props.$active ? '#1351B4' : '#f5f5f5'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function ProfessoresPage() {
  const { user } = useUserHook();
  const schoolId = user?.schoolId;
  const [activeTab, setActiveTab] = useState<'teachers' | 'enrollments'>('teachers');
  
  const {
    linkedTeachers,
    enrollments,
    isLoading,
    fetchLinkedTeachers,
    fetchEnrollments,
    linkTeacher,
    unlinkTeacher,
    updateEnrollmentStatus,
  } = useTeachers(schoolId || '');

  useEffect(() => {
    if (schoolId) {
      if (activeTab === 'teachers') {
        fetchLinkedTeachers();
      } else {
        fetchEnrollments();
      }
    }
  }, [schoolId, activeTab, fetchLinkedTeachers, fetchEnrollments]);

  return (
    <Container>
      <PageTitle>Gestão de Professores</PageTitle>
      
      <TabContainer>
        <Tab $active={activeTab === 'teachers'} onClick={() => setActiveTab('teachers')}>
          Professores
        </Tab>
        <Tab $active={activeTab === 'enrollments'} onClick={() => setActiveTab('enrollments')}>
          Candidaturas
        </Tab>
      </TabContainer>

      {activeTab === 'teachers' && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Disciplina</th>
                <th>Substituições</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {linkedTeachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.subject?.name || '-'}</td>
                  <td>{teacher.totalSubstitutions}</td>
                  <td>
                    <Button onClick={() => unlinkTeacher(teacher.id)}>Desvincular</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {activeTab === 'enrollments' && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Candidato</th>
                <th>Email</th>
                <th>Disciplina</th>
                <th>Histórico</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {enrollments
                .filter(e => e.status === 'PENDING')
                .map(enrollment => (
                  <tr key={enrollment.id}>
                    <td>{enrollment.user.name}</td>
                    <td>{enrollment.user.email}</td>
                    <td>{enrollment.user.subject?.name || '-'}</td>
                    <td>{enrollment.user.totalSubstitutions} substituições</td>
                    <td>
                      <Button onClick={() => updateEnrollmentStatus(enrollment.id, 'APPROVED')}>
                        Aprovar
                      </Button>
                      <Button onClick={() => updateEnrollmentStatus(enrollment.id, 'REJECTED')} style={{ marginLeft: 8, background: '#d32f2f' }}>
                        Rejeitar
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
```

## Testing

```bash
# Run tests
pnpm test

# Build check
pnpm build
```

## Verification Checklist

- [ ] Lista de professores vinculados à escola carrega corretamente
- [ ] Botão desvincular remove professor da lista
- [ ] Botão vincular abre modal para selecionar professor disponível
- [ ] Lista de candidaturas pendentes exibe corretamente
- [ ] Aprovar candidatura atualiza status e lista
- [ ] Rejeitar candidatura atualiza status e lista
- [ ] Tests passam
- [ ] Build passa sem erros