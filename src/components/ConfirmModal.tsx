'use client';

import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
`;

const Message = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: 2px solid #4a90d9;
    outline-offset: 2px;
  }
`;

const CancelButton = styled(Button)`
  background: white;
  border: 1px solid #ddd;
  color: #666;

  &:hover {
    background: #f5f5f5;
  }
`;

const ConfirmButton = styled(Button)`
  background: #c62828;
  border: none;
  color: white;

  &:hover {
    background: #d32f2f;
  }
`;

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <Overlay onClick={onCancel}>
      <Modal onClick={(e) => e.stopPropagation()} role="alertdialog" aria-labelledby="modal-title" aria-describedby="modal-message">
        <Title id="modal-title">{title}</Title>
        <Message id="modal-message">{message}</Message>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
          <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
}