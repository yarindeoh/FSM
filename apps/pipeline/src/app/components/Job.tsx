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
  gap: 10px;
  justify-content: center;
  align-items: center;
  background-color: #151b23;
  border-radius: 6px;
  color: ${({ isCurrent }) => (isCurrent ? 'white' : '#91989F')};
  border: 1px solid
    ${({ isCurrent }) => (isCurrent ? 'white' : '#3d444d')};
  pointer-events: ${({ isCurrent }) => (isCurrent ? 'auto' : 'none')};
`;
