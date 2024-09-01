import { Job } from './Job';
import React from 'react';
import { PipelineProps } from '../FSM/types';
import styled from 'styled-components';

export const Pipeline = ({
  type,
  onTransition,
  state,
  states,
}: PipelineProps) => {

  return (
    <StyledPipelineWrapper data-testid={type}>
      <StyledPipelineHeader>{type} Manual Pipeline</StyledPipelineHeader>
      <StyledJobsWrapper>
        {states.map((step, index) => (
          <div key={`${step}_${index}`}>
            <Job
              isCurrent={step.name === state}
              displayName={`${step.name}`}
              onSuccess={step.on?.success}
              onFailure={step.on?.failure}
              onTransition={onTransition}
            />
          </div>
        ))}
      </StyledJobsWrapper>
      {state === 'done' && <div>Pipeline is DONE!</div>}
    </StyledPipelineWrapper>
  );
};

const StyledPipelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  margin: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.color.secondary};
  height: 300px;
  border: 1px solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radius};
`;

export const StyledJobsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledPipelineHeader = styled.div`
  font-size: ${(props) => props.theme.font.lg};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;
