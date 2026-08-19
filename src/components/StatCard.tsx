'use client';

import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const Value = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #1e3a5f;
`;

interface StatCardProps {
  label: string;
  value: number | string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Card>
  );
}