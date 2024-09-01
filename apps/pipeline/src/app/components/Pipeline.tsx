import { Job } from './Job';
import React, { useMemo } from 'react';
import { PipelineProps } from '../FSM/types';
import styled from 'styled-components';

export const Pipeline = ({
  type,
  onTransition,
  state,
  states,
}: PipelineProps) => {
  const statesView = useMemo(
    () => Array.from(states, ([name, value]) => ({ name, value })),
    [states]
  );

  return (
    <StyledPipelineWrapper data-testid={type}>
      <StyledPipelineHeader>{type} Manual Pipeline</StyledPipelineHeader>
      <StyledJobsWrapper>
        {statesView.map((step, index) => (
          <div key={`${step}_${index}`}>
            <Job
              isCurrent={step.name === state}
              displayName={`${step.name}`}
              onSuccess={step.value.on?.success}
              onFailure={step.value.on?.failure}
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
  background-color: #010409;
  height: 300px;
  border: 1px solid #3d444d;
  border-radius: 6px;
`;

export const StyledJobsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledPipelineHeader = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;
