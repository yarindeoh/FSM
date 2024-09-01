import React from 'react';
import styled from 'styled-components';
import { JobProps } from '../FSM/types';
import { StyledIconFailure, StyledIconSuccess } from './StyledIcon';

export const Job = ({
  isCurrent,
  displayName,
  onSuccess,
  onFailure,
  onTransition,
}: JobProps) => (
  <StyledJob
    isCurrent={isCurrent}
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

const StyledJob = styled.div<{ isCurrent: boolean }>`
  min-width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.primary};
  border-radius: ${(props) => props.theme.border.radius};
  color: ${({ isCurrent, theme }) => (isCurrent ? theme.color.info : theme.color.contrastLow )};
  border: 1px solid
    ${({ isCurrent, theme }) => (isCurrent ? theme.color.info : theme.border.color)};
  pointer-events: ${({ isCurrent }) => (isCurrent ? 'auto' : 'none')};
`;
