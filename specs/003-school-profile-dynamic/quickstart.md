# Quickstart: School Selection by User Profile

## Overview

Esta funcionalidade modifica o formulário de criação de aula no dashboard para exibir o campo escola de forma diferente conforme o perfil do usuário.

## Integration Scenarios

### 1. Usuário Master (profileId = 1)

```tsx
// Carrega todas as escolas
const { schools, loading } = useSchools();

// Renderiza dropdown
<Select 
  options={schools.map(s => ({ value: s.id, label: s.name }))}
  onChange={(id) => setSchoolId(id)}
/>
```

### 2. Usuário Diretor (profileId = 2)

```tsx
// Usa schoolId do usuário logado
const { user } = useUserHook();

// Renderiza campo disabled
<input 
  type="text" 
  value={user?.school?.name} 
  disabled 
/>
// schoolId enviado automaticamente no submit
```

### 3. Usuário Professor (profileId = 3)

```tsx
// Redirect para outra página ou oculta formulário
if (user?.profileId === 3) {
  router.push('/dashboard');
}
```

## Dependencies

- `masterService.getSchools()` - lista escolas (já existe)
- `useUserHook()` - dados usuário logado (já existe)
- `useState` e `useEffect` - state management

## Files to Modify

1. `src/app/dashboard/page.tsx` - modificar formulário de criação de aula
2. Opcional: criar `src/components/SchoolSelect.tsx` component

---

**Version**: 1.0.0