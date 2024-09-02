import React from 'react';
import styled from 'styled-components';
import { OnTransition } from '@react-monorepo/fsm';
import { StyledIconFailure, StyledIconSuccess } from './StyledIcon';

export interface JobProps {
  isCurrent: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  displayName: string;
  onSuccess?: string[];
  onFailure?: string[];
  onTransition: OnTransition;
}

export const Job = ({
  isCurrent,
  displayName,
  onSuccess,
  onFailure,
  onTransition,
  isSuccess,
  isError,
}: JobProps) => (
  <StyledJob
    isCurrent={isCurrent}
    isSuccess={isSuccess}
    isError={isError}
    data-testid={isCurrent ? 'current' : 'non-current'}
  >
    <div>{displayName.toUpperCase()}</div>
    <StyledActionBar>
      {onSuccess && (
        <StyledButton onClick={() => onTransition('success')}>
          <StyledIconSuccess data-testid="success" />
        </StyledButton>
      )}
      {onFailure && (
        <StyledButton onClick={() => onTransition('failure')}>
          <StyledIconFailure data-testid="failure" />
        </StyledButton>
      )}
    </StyledActionBar>
  </StyledJob>
);

const StyledActionBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledJob = styled.div<{
  isCurrent: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}>`
  min-width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.primary};
  border-radius: ${(props) => props.theme.border.radius};
  color: ${({ isCurrent, theme }) =>
    isCurrent ? theme.color.info : theme.color.contrastLow};
  border: 1px solid
    ${({ isCurrent, theme, isSuccess, isError }) =>
      isSuccess
        ? theme.color.success
        : isError
        ? theme.color.failure
        : isCurrent
        ? theme.color.info
        : theme.border.color};
  pointer-events: ${({ isCurrent }) => (isCurrent ? 'auto' : 'none')};
`;
