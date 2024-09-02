import { Job } from './Job';
import React from 'react';
import styled, { css } from 'styled-components';
import { FSMState, OnTransition, States } from '@react-monorepo/fsm';

export interface PipelineProps {
  type?: string;
  state?: FSMState;
  onTransition: OnTransition;
  states?: States;
  error: Error | null;
  isLoading: boolean;
}

export const Pipeline = ({
  type,
  onTransition,
  state,
  states,
  error,
  isLoading,
}: PipelineProps) => {
  return (
    <StyledPipelineWrapper data-testid={type}>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {states && (
        <>
          <StyledPipelineHeader>{type} Manual Pipeline</StyledPipelineHeader>
          <StyledJobsWrapper>
            {states.map((step, index) => (
              <div key={`${step}_${index}`}>
                <Job
                  isCurrent={step.name === state}
                  isSuccess={state === 'done'}
                  isError={state === 'error'}
                  displayName={`${step.name}`}
                  onSuccess={step.on?.success}
                  onFailure={step.on?.failure}
                  onTransition={onTransition}
                />
              </div>
            ))}
          </StyledJobsWrapper>
        </>
      )}
    </StyledPipelineWrapper>
  );
};

export const StyledRow = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  margin: ${(props) => props.theme.spacing.lg};
  border: 1px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radius};
`;

export const StyledPipelineWrapper = styled.div`
  ${StyledRow};
  background-color: ${(props) => props.theme.color.secondary};
  display: flex;
`;

export const StyledJobsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const StyledPipelineHeader = styled.div`
  font-size: ${(props) => props.theme.font.lg};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;
