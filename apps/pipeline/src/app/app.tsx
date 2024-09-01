import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';

export type View = {
  displayName:
    | 'Code Verification'
    | 'Code Quality'
    | 'Build'
    | 'Publish'
    | 'Deploy';
  step: number;
};

export const mapNameToView: Record<number, View> = [
  {
    displayName: 'Code Verification',
    step: 0,
  },
  {
    displayName: 'Code Quality',
    step: 1,
  },
  {
    displayName: 'Build',
    step: 2,
  },
  {
    displayName: 'Publish',
    step: 3,
  },
  {
    displayName: 'Deploy',
    step: 4,
  },
];

export function App() {
  const [currentJob, setCurrentJob] = useState(mapNameToView[0]);

  const onTransition = useCallback(() => {
    setCurrentJob( mapNameToView[currentJob?.step + 1]);
  }, [currentJob]);

  useEffect(() => {
    setTimeout(() => {
      onTransition();
    }, 2500)
  }, [onTransition])


  return (
    <StyledApp>
      <h1>CI Pipeline</h1>
      <StyledJobsWrapper>
        {Object.values(mapNameToView).map((step, index) => (
          <StyledJob
            isCurrent={step.step === currentJob?.step}
            key={`${step.displayName}_${index}`}
          >
            <div>{step.displayName}</div>
          </StyledJob>
        ))}
      </StyledJobsWrapper>
      <button onClick={onTransition}>Transition</button>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const StyledJobsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const StyledJob = styled.div<{ isCurrent: boolean }>`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isCurrent }) => (isCurrent ? 'red' : 'aliceblue')};
`;
