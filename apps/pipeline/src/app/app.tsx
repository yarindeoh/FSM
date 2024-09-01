import styled from 'styled-components';
import React, { useCallback, useMemo, useState } from 'react';

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

export type View = {
  displayName: 'Code Verification' | 'Code Quality' | 'Build' | 'Publish' | 'Deploy';
  step: number;
  on: {
    next: () => string;
    prev?: () => string;
  };
};

export const mapNameToView: Record<string, View> = {
  verification: {
    displayName: 'Code Verification',
    step: 0,
    on: {
      next: () => 'quality',
    },
  },
  quality: {
    displayName: 'Code Quality',
    step: 1,
    on: {
      next: () => 'build',
      prev: () => 'verification',
    },
  },
  build: {
    displayName: 'Build',
    step: 2,
    on: {
      next: () => 'publish',
      prev: () => 'quality',
    },
  },
  publish: {
    displayName: 'Publish',
    step: 3,
    on: {
      next: () => 'deploy',
      prev: () => 'build',
    },
  },
  deploy: {
    displayName: 'Deploy',
    step: 4,
    on: {
      next: () => 'verification',
      prev: () => 'publish',
    },
  },
};

export function App() {
  const initialState = useMemo(() => mapNameToView['verification'], []);
  const [currentJob, setCurrentJob] = useState(initialState);

  const onTransition = useCallback(() => {
    const sourceState = currentJob.on.next();
    setCurrentJob(mapNameToView[sourceState]);
  }, [currentJob]);

  // console.log(currentJob.step, 'currentJob');

  return (
    <StyledApp>
      <h1>CI Pipeline</h1>
      <StyledJobsWrapper>
        {Object.values(mapNameToView).map((step, index) => (
          <StyledJob isCurrent={step.step === currentJob.step} key={`${step.displayName}_${index}`}>
            <div>{step.displayName}</div>
          </StyledJob>
        ))}
      </StyledJobsWrapper>
      <button onClick={onTransition}>Transition</button>
    </StyledApp>
  );
}

export default App;
