# Prompts de Implementação - Pendências do Frontend

Este documento contém prompts detalhados para cada pendência do projeto Troca-Aula.

---

## PROMPT 1: Área do Master (Administração Global)

### Contexto
O sistema precisa de uma área administrativa completa para o usuário Master gerenciar todo o sistema. O Master é o usuário com privilégios totais, capaz de gerenciar escolas, diretores e administradores.

### Regras de Negócio

1. **Perfis de Usuário no Sistema**:
   - MASTER (ID 1): Pode tudo
   - DIRETOR (ID 2): Pertence a uma escola específica
   - ADMIN (ID 3): Pertence a uma escola específica
   - PROFESSOR (ID 4): Pertence a uma escola específica

2. **Gestão de Escolas**:
   - Uma escola tem: nome, substitutionLimitPerDay (limite de horas de substituições por dia)
   - Escola pode ter múltiplos diretores e administradores vinculados

3. **Gestão de Usuários**:
   - Master pode criar diretores e administradores
   - Cada usuário deve ter: name, email, phone, password, profileId, schoolId
   - Ao criar um diretor/admin, deve informar a escola (schoolId)

4. **Relacionamento Usuário-Escola-Perfil**:
   - Um usuário pode ter múltiplos vínculos (UsersProfilesSchools)
   - Cada vínculo tem: userId, profileId, schoolId, approvedAt

### Layout Esperado

```
/master (nova rota)
├── Header: Logo + "Área Administrativa" + Perfil: Master + Sair
├── Sidebar/Nav:
│   ├── Dashboard (estatísticas globais)
│   ├── Escolas (CRUD)
│   ├── Diretores (CRUD)
│   └── Administradores (CRUD)
└── Conteúdo principal
```

**Dashboard Global** (cards):
- Total de Escolas cadastradas
- Total de Aulas Vagas ativas
- Total de Substituições este mês
- Gráfico de substituições por escola

**Lista de Escolas** (table):
- Colunas: Nome, Limite Semestral, Ações
- Botões: Editar, Excluir, Ver Professores
- Botão: "+ Nova Escola"

**Lista de Diretores/Admins** (table):
- Colunas: Nome, Email, Escola Vinculada, Ações
- Botões: Editar, Desvincular, "+ Novo Diretor"

### Endpoints a Consumir

```typescript
// Escolas
GET /schools          // Lista todas as escolas
POST /schools        // Cria escola { name, substitutionLimitPerSemester? }
GET /schools/:id     // Detalha escola
PATCH /schools/:id   // Atualiza escola
DELETE /schools/:id  // Exclui escola

// Usuários (filtros por perfil)
GET /users?profileId=2              // Lista diretores
GET /users?profileId=3              // Lista administradores
GET /users?schoolId=1               // Lista usuários de uma escola
POST /users                         // Cria usuário
PATCH /users/:id                   // Atualiza usuário
DELETE /users/:id                  // Remove usuário (soft delete)

// Profiles
GET /profiles                      // Lista perfis disponíveis
```

### Comportamento

1. **Proteção de Rotas**: Apenas usuários com profileId=1 podem acessar /master
2. **Carregamento**: Mostrar skeleton/loading enquanto carrega dados
3. **Feedback**: Toast de sucesso ao criar/editar/excluir
4. **Validação**: Formulário com validação (nome obrigatório, email válido, etc)
5. **Confirmação**: Modal de confirmação ao excluir escola/usuário
6. **Tratamento de Erros**: Mostrar mensagens de erro da API

### Estrutura de Arquivos Sugerida

```
src/app/master/
├── page.tsx              // Layout principal
├── dashboard/
│   └── page.tsx          // Dashboard com estatísticas
├── escolas/
│   ├── page.tsx          // Lista de escolas
│   └── [id]/
│       └── page.tsx      // Detalhe/editar escola
├── diretores/
│   └── page.tsx          // Lista e criar diretores
└── administradores/
    └── page.tsx          // Lista e criar administradores
```

### Critérios de Aceite

- [ ] Apenas Master acessa a área
- [ ] CRUD completo de escolas funcionando
- [ ] CRUD completo de diretores funcionando
- [ ] CRUD completo de administradores funcionando
- [ ] Dashboard mostrando estatísticas globais
- [ ] Validação de formulários funcionando
- [ ] Confirmação antes de excluir
- [ ] Feedback visual (toasts) em todas as ações

---

## PROMPT 2: Fluxo de Candidaturas (Enrollment Requests)

### Contexto
O frontend atualmente usa `PATCH /classes/:id` para aceitar/aprovar aulas, mas deveria usar o fluxo correto de enrollment requests. Este é o fluxo formal de candidaturas do sistema.

### Regras de Negócio

1. **Fluxo de Candidatura**:
   - Professor visualiza aulas disponíveis (`available=true`)
   - Professor se candidata: `POST /enrollment-requests` com classId
   - Status inicial: PENDING (aguardando aprovação)
   - Diretor/Admin visualiza candidaturas pendentes
   - Diretor/Admin aprova (`PATCH .../approve`) ou rejeita (`PATCH .../reject`)
   - Professor pode cancelar própria candidatura (`PATCH .../cancel`)

2. **Validações do Backend** (ao candidatar-se):
   - Aula deve existir e estar disponível (available=true)
   - Professor não pode ter conflito de horário
   - Professor não pode ter atingido o limite de substituições
   - Professor deve estar vinculado à escola da aula

3. **Status de Candidatura**:
   - PENDING: Aguardando aprovação
   - APPROVED: Aprovada (professor confirmado como substituto)
   - REJECTED: Rejeitada pelo diretor/admin
   - CANCELLED: Cancelada pelo candidato

4. **Regras de Aprovação/Rejeição**:
   - Apenas DIRETOR ou ADMIN da escola podem aprovar/rejeitar
   - Apenas candidaturas com status PENDING podem ser procesadas
   - Ao aprovar, a aula deixa de estar disponível (available=false)

### Endpoints a Consumir

```typescript
// Candidaturas
GET /enrollment-requests                           // Lista todas (com filtros)
GET /enrollment-requests?status=PENDING           // Lista pendentes
GET /enrollment-requests?classId=1                 // Lista de uma aula específica
GET /enrollment-requests?userId=1                 // Lista de um professor específico
POST /enrollment-requests                          // Cria candidatura { classId }
PATCH /enrollment-requests/:id/approve            // Aprova candidatura
PATCH /enrollment-requests/:id/reject             // Rejeita candidatura
PATCH /enrollment-requests/:id/cancel             // Cancela candidatura

// Aulas disponíveis
GET /classes?available=true                       // Lista aulas vagas
```

### Comportamento - Professor

**Na lista de aulas disponíveis**:
1. Cada aula mostra botão "Candidatar-se"
2. Ao clicar, faz POST /enrollment-requests com classId
3. Se sucesso: toast "Candidatura enviada com sucesso", atualiza lista
4. Se erro: toast com mensagem do erro (ex: "Limite atingido", "Conflito de horário")

**Na aba "Minhas Aulas"**:
1. Lista de aulas onde o professor se candidatou/aprovou
2. Para aulas PENDING: botão "Cancelar"
3. Ao cancelar: PATCH /enrollment-requests/:id/cancel

### Comportamento - Diretor/Admin

**Nova aba "Candidaturas" no dashboard**:
1. Lista de candidaturas com status PENDING
2. Cada item mostra: nome do professor, disciplina, escola, data
3. Botões: "Aprovar" e "Rejeitar"
4. Ao aprovar: PATCH .../approve → toast sucesso → atualiza lista
5. Ao rejeitar: PATCH .../reject → toast sucesso → atualiza lista
6. Campo para informar motivo da rejeição (opcional)

### Layout - Página de Candidaturas (Diretor/Admin)

```tsx
// Estrutura esperada
<Tabs>
  <Tab label="Pendentes">Lista de PENDING</Tab>
  <Tab label="Aprovadas">Lista de APPROVED</Tab>
  <Tab label="Rejeitadas">Lista de REJECTED</Tab>
</Tabs>

// Item da lista:
<Card>
  <ProfessorInfo nome={pro.nome} foto={pro.foto} />
  <AulaInfo disciplina={dis.nome} data={aula.data} />
  <Actions>
    <Button onClick={aprovar}>Aprovar</Button>
    <Button onClick={rejeitar}>Rejeitar</Button>
  </Actions>
</Card>
```

### Critérios de Aceite

- [ ] Professor consegue candidatar-se usando POST correto
- [ ] Professor consegue cancelar própria candidatura
- [ ] Diretor/Admin consegue aprovar candidatura
- [ ] Diretor/Admin consegue rejeitar candidatura
- [ ] Candidaturas PENDING aparecem para Diretor/Admin
- [ ] Erros de validação são exibidos corretamente (limite, conflito)
- [ ] Atualização da lista após cada ação

---

## PROMPT 3: Seletor de Escola Dinâmico

### Contexto
O formulário de criação de aula usa `schoolId = 1` hardcoded. Precisa ser dinâmico baseado no perfil do usuário logado.

### Regras de Negócio

1. **Lógica por Perfil**:
   - MASTER: Pode selecionar qualquer escola (dropdown com todas)
   - DIRETOR: Vê apenas a escola vinculada ao seu perfil
   - ADMIN: Vê apenas a escola vinculada ao seu perfil
   - PROFESSOR: Vê a escola no readonly (não cria aulas)

2. **Endpoints**:
   - GET /schools - Lista todas as escolas (para Master)
   - GET /auth/me - Retorna schoolId vinculado ao usuário

### Comportamento

```tsx
// No formulário de criar aula:

// Se MASTER: input select com todas as escolas
<Select options={escolas} onChange={setSchoolId} />

// Se DIRETOR/ADMIN: input disabled mostrando o nome da escola
<input value={user.escola?.nome} disabled />

// Se PROFESSOR: não mostra o campo escola (não pode criar)
```

### Endpoints

```typescript
GET /schools                      // Lista escolas (para Master)
GET /auth/me                      // Retorna { ..., schoolId, profileId }
```

### Critérios de Aceite

- [ ] Master vê dropdown com todas as escolas
- [ ] Diretor/Admin vê escola fixada (disabled)
- [ ] Professor não vê campo de escola (não cria aulas)
- [ ] Ao selecionar escola, o ID correto é enviado no payload

---

## PROMPT 4: Controle de Limite de Substituições

### Contexto
O frontend não exibe o limite de substituições do professor nem trata erros quando atinge o limite.

### Regras de Negócio

1. **Limite por Escola**:
   - Cada escola pode ter `substitutionLimitPerSemester` configurado
   - Se não configurado, não há limite

2. **Erro do Backend**:
   - Quando professor atinge o limite, API retorna erro 400
   - Mensagem: "Limite de substituições atingido para hoje (X horas limite)"

3. **Cálculo do Contador**:
   - Contagem de horas de aulas com status APPROVED no dia atual

### Layout - Dashboard do Professor

**Área "Meu Status"** (sidebar ou header):
```
🟢 Substituições hoje: 3 horas de 4
```
- Se não tem limite: "Sem limite definido"
- Se perto do limite (80%): "🟡 Atenção: 3.2 de 4 horas"
- Se atingiu: "🔴 Limite atingido"

### Comportamento

1. **Ao carregar dashboard do professor**:
- Buscar limite da escola: GET /schools/{id} → substitutionLimitPerDay

- Contar horas de substituições do professor no dia

- Se atingiu limite: bloquear candidatura + mostrar toast de erro

- Se API retornar erro de limite, exibir toast específico
- Mensagem: "Não é possível se candidatar. Limite de horas de substituições atingido para hoje."

### Endpoints

```typescript
GET /schools/:id                    // Retorna substitutionLimitPerSemester
GET /enrollment-requests?userId=X&status=APPROVED&data=hoje  // Contagem de horas
```

### Critérios de Aceite

- [ ] Exibe "X de Y" no dashboard do professor
- [ ] Trata erro 400 de limite com mensagem clara
- [ ] Alerta quando próximo (80%)
- [ ] Funciona independente de ter limite ou não

---

## PROMPT 5: Login Gov.br

### Contexto
O botão Gov.br existe mas a integração não funciona completamente. Precisa finalizar a integração OAuth2/OpenID Connect.

### Regras de Negócio

1. **Fluxo OAuth2 Gov.br**:
   - Usuário clica em "Entrar com Gov.br"
   - Redireciona para página de autenticação Gov.br
   - Gov.br retorna código de autorização
   - Frontend troca código por token
   - Token é usado para autenticação no sistema

2. **Fallback**:
   - Se Gov.br não funcionar, usar login tradicional (email/senha)

### Endpoints

```typescript
POST /auth/login-govbr         // Recebe code, retorna JWT
GET /auth/govbr-auth-url       // Retorna URL de redirect Gov.br
```

### Comportamento

```tsx
// Na página de login:
<Button onClick={() => window.location.href = govbrUrl}>
  Entrar com Gov.br
</Button>

// Callback (página /auth/govbr-callback):
const code = searchParams.get('code');
const response = await api.post('/auth/login-govbr', { code });
// Salvar token e redirecionar para dashboard
```

### Critérios de Aceite

- [ ] Botão Gov.br redireciona para página de autenticação
- [ ] Após autenticação, retorna para dashboard
- [ ] Se falhar, mostra erro e permite login tradicional

---

## PROMPT 6: Área do Diretor/Admin Expandida

### Contexto
A área do Diretor e Admin precisa de funcionalidades adicionais para gestão de professores e visualização de candidaturas.

### Regras de Negócio

1. **Vincular Professores** (Diretor):
   - Listar professores não vinculados à escola
   - Selecionar e vincular
   - Cada vínculo tem: userId, schoolId, profileId=4

2. **Visualizar Candidaturas**:
   - Ver lista de candidaturas da escola
   - Filtrar por status

3. **Dados do Professor** (para aprovação):
   - Nome, email
   - Disciplina que leciona
   - Histórico de substituições

### Endpoints

```typescript
// Professores da escola
GET /users?schoolId=1&profileId=4    // Professores vinculados

// Vincular professor
POST /users                           // Criar usuário + vincular
// ou
PATCH /users/:id                      // Atualizar schoolId

// Candidaturas da escola
GET /enrollment-requests?schoolId=1   // Todas da escola
GET /enrollment-requests?status=PENDING  // Pendentes
```

### Layout - Aba "Professores" (Diretor)

```tsx
// Lista de professores vinculados
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
    {professores.map(p => (
      <tr>
        <td>{p.name}</td>
        <td>{p.email}</td>
        <td>{p.subject.name}</td>
        <td>{p.totalSubstitutions}</td>
        <td>
          <Button onClick={desvincular}>Desvincular</Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

<Button>+ Vincular Professor</Button>
```

### Critérios de Aceite

- [ ] Lista de professores vinculados à escola
- [ ] Botão para desvincular professor
- [ ] Botão para vincular novo professor
- [ ] Lista de candidaturas pendentes da escola
- [ ] Detalhes do candidato visíveis ao aprovar

---

## PROMPT 7: Correção de Nomenclatura de Campos

### Contexto
O frontend usa `registredById` mas a API usa `enrolledById`. Precisa padronizar.

### Alterações Necessárias

```tsx
// Antes (incorreto):
item?.registredById
item?.registredBy?.name

// Depois (correto):
item?.enrolledById
item?.enrolledBy?.name
```

### Arquivos a Verificar

- `src/app/dashboard/page.tsx`
- `src/app/page.tsx` (se aplicável)
- Qualquer outro arquivo que use `registred`

### Critérios de Aceite

- [ ] Todos os campos `registredById` substituídos por `enrolledById`
- [ ] Todos os campos `registredBy` substituídos por `enrolledBy`
- [ ] Código continua funcionando corretamente

---

**Última atualização**: 2026-05-16

**Ordem de implementação sugerida**:
1. Área do Master
2. Fluxo de Candidaturas
3. Seletor de Escola
4. Controle de Limite
5. Área do Diretor Expandida
6. Login Gov.br
7. Correção de nomenclatura