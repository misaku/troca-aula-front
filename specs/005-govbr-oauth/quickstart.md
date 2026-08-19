# Quickstart: Gov.br OAuth2 Integration

## Prerequisites

- Node.js 22.x
- pnpm
- Backend com endpoints `/auth/govbr-auth-url` e `/auth/login-govbr` disponíveis
- URL de callback registrada no Gov.br

## Setup

1. **Instalar dependências** (se necessário):
   ```bash
   pnpm install
   ```

2. **Verificar variáveis de ambiente**:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

## Implementation Steps

### Step 1: Auth Service

Criar `src/services/auth.service.tsx`:

```typescript
import { api } from '@/api.service';

export interface GovbrAuthUrlResponse {
  url: string;
  state: string;
}

export interface GovbrLoginRequest {
  code: string;
  redirect_uri: string;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  roles: string[];
}

export interface GovbrLoginResponse {
  token: string;
  user: UserDTO;
  expires_in: number;
}

export const authService = {
  async getGovbrAuthUrl(): Promise<GovbrAuthUrlResponse> {
    const response = await api.get('/auth/govbr-auth-url');
    return response.data;
  },

  async loginWithGovbr(code: string, redirectUri: string): Promise<GovbrLoginResponse> {
    const response = await api.post('/auth/login-govbr', {
      code,
      redirect_uri: redirectUri,
    });
    return response.data;
  },
};
```

### Step 2: Auth Hook

Criar `src/hooks/useGovbrAuth.ts`:

```typescript
import { useState, useCallback } from 'react';
import { authService } from '@/services/auth.service';

export function useGovbrAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithGovbr = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const redirectUri = `${window.location.origin}/auth/govbr-callback`;
      const response = await authService.loginWithGovbr(code, redirectUri);
      
      // Salvar token em cookie httpOnly (backend deve setar)
      // ou localStorage como fallback
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (err) {
      setError('Falha na autenticação Gov.br. Tente novamente ou use login tradicional.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }, []);

  return { loginWithGovbr, logout, loading, error };
}
```

### Step 3: Callback Page

Criar `src/app/auth/govbr-callback/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGovbrAuth } from '@/hooks/useGovbrAuth';

export default function GovbrCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loginWithGovbr, loading, error } = useGovbrAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setStatus('error');
      return;
    }

    if (code) {
      loginWithGovbr(code)
        .then(() => {
          setStatus('success');
          setTimeout(() => router.push('/dashboard'), 1000);
        })
        .catch(() => setStatus('error'));
    } else {
      setStatus('error');
    }
  }, [searchParams, loginWithGovbr, router]);

  if (loading || status === 'loading') {
    return <div>Autenticando com Gov.br...</div>;
  }

  if (status === 'error') {
    return (
      <div>
        <h1>Falha na autenticação</h1>
        <p>{error || 'Não foi possível autenticar com Gov.br.'}</p>
        <a href="/">Voltar para login</a>
      </div>
    );
  }

  return <div>Autenticado com sucesso! Redirecionando...</div>;
}
```

### Step 4: Update Button

Atualizar `src/components/BotaoGovBr.tsx`:

```typescript
'use client';

import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { BotaoContainer } from './BotaoGovBr.styles';

export default function BotaoGovBr() {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const { url } = await authService.getGovbrAuthUrl();
      window.location.href = url;
    } catch (error) {
      console.error('Erro ao iniciar autenticação Gov.br', error);
    }
  };

  return (
    <BotaoContainer onClick={handleClick}>
      Entrar com Gov.br
    </BotaoContainer>
  );
}
```

## Testing

```bash
# Run unit tests
pnpm test

# Run specific auth tests
pnpm test auth.service.test.tsx
pnpm test useGovbrAuth.test.tsx

# Build check
pnpm build
```

## Verification Checklist

- [ ] Botão Gov.br redireciona para URL de autenticação
- [ ] Após autenticação Gov.br, código é recebido na callback page
- [ ] Código é trocado por token JWT com backend
- [ ] Token é salvo e usuário é redirecionado para dashboard
- [ ] Se falhar, mensagem de erro é exibida e login tradicional permanece disponível
- [ ] Testes unitários passam para authService e useGovbrAuth
- [ ] build passa sem erros