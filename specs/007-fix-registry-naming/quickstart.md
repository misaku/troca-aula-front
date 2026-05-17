# Quickstart: Fix Registry Nomenclature

## Overview

Esta é uma refatoração de nomenclatura. Não há novas funcionalidades ou mudanças de comportamento.

## Development

1. Verificar as ocorrências de `registred` no código:
   ```bash
   grep -rn "registred" src/
   ```

2. Após a refatoração, confirmar que não há mais ocorrências:
   ```bash
   grep -rn "registred" src/
   # Deve retornar vazio
   ```

3. Executar testes para validar:
   ```bash
   pnpm test
   ```

4. Executar build para validar:
   ```bash
   pnpm build
   ```

## Files Changed

- `src/app/dashboard/page.tsx` - 7 ocorrências de `registred*` → `enrolled*`
- `src/app/dashboard/page.test.tsx` - 4 ocorrências de `registred*` → `enrolled*`
