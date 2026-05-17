'use client';

import React from 'react';
import styled from 'styled-components';

// Usamos o && para forçar que o nosso estilo mande mais que o do page.tsx
const BotaoContainer = styled.button`
  && {
    background-color: #1351B4; 
    color: #FFFFFF;
    border: none;
    border-radius: 5px; /* Deixei 5px para combinar com os outros campos da tela */
    padding: 12px 24px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 10px; /* Um espacinho para descolar do botão Cadastrar */
    transition: background-color 0.2s;

    &:hover {
      background-color: #0c326f; 
    }
  }
`;

export function BotaoGovBr() {
  return (
    <BotaoContainer onClick={() => alert('Em breve: Redirecionamento para o Gov.br!')}>
      Entrar com gov.br
    </BotaoContainer>
  );
}