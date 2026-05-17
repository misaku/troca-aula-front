# Quickstart: Substitution Limit Display and Enforcement

## Overview

Esta funcionalidade exibe o contador de substituições no dashboard do professor e bloqueia candidaturas quando o limite é atingido.

## Integration Scenarios

### 1. Exibir contador no dashboard

```tsx
// Criar hook useSubstitutionLimit
const { current, limit, percentage, loading } = useSubstitutionLimit(user?.id, user?.schoolId);

// Renderizar
<div className={`status-${status}`}>
  {limit ? `${current} de ${limit}` : 'Sem limite definido'}
</div>
```

### 2. Alerta visual

```tsx
const getStatus = (percentage) => {
  if (percentage >= 100) return 'blocked';   // 🔴
  if (percentage >= 80) return 'warning';     // 🟡
  return 'normal';                            // 🟢
};
```

### 3. Bloquear candidatura

```tsx
// Na página de classes - verificar antes de candidatar
const canApply = current < limit && limit !== null;
<button disabled={!canApply}>Candidatar-se</button>
```

### 4. Tratar erro da API

```tsx
// No enrollment service - interceptar erro
if (error.response?.status === 400 && error.response?.data?.message?.includes('limite')) {
  toast.error('Não é possível se candidatar. Limite de substituições atingido para este semestre.');
}
```

## Dependencies

- `masterService.getSchool(id)` - obter limite da escola
- `enrollmentService.getEnrollments({userId, status: 'APPROVED'})` - contar substituições
- `useUserHook()` - dados do usuário (id, schoolId)
- `react-toastify` - exibir mensagens de erro

## Files to Create

1. `src/hooks/useSubstitutionLimit.ts` - Hook para gerenciar limite
2. `src/components/SubstitutionCounter.tsx` - Componente de display
3. Modificar `src/app/dashboard/page.tsx` - Adicionar contador
4. Modificar `src/app/classes/page.tsx` - Adicionar verificação antes de candidatar

---

**Version**: 1.0.0