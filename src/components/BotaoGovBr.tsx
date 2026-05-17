'use client';

import React from 'react';
import styled from 'styled-components';
import { authService } from '@/services/auth.service';

const BotaoContainer = styled.button`
  && {
    background-color: #1351B4; 
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0c326f; 
    }
  }
`;

export function BotaoGovBr() {
  const handleClick = async () => {
    try {
      const { url } = await authService.getGovbrAuthUrl();
      window.location.href = url;
    } catch (error) {
      console.error('Erro ao iniciar autenticação Gov.br', error);
    }
  };

  return (
    <BotaoContainer onClick={handleClick} aria-label="Entrar com Gov.br">
      Entrar com gov.br
    </BotaoContainer>
  );
}