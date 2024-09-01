import React from 'react';
import { useFSM } from '../FSM/useFSM';
import { Pipeline } from './Pipeline';
import { FSMConfig } from '../FSM/types';

const deterministicConfig: FSMConfig = {
  initialState: 'verification',
  states: [
    { name: 'verification', on: { success: ['quality'] } },
    { name: 'quality', on: { success: ['build'], failure: ['review'] } },
    { name: 'build', on: { success: ['publish'], failure: ['review'] } },
    { name: 'publish', on: { success: ['deploy'], failure: ['review'] } },
    { name: 'deploy', on: { success: ['done'], failure: ['review'] } },
    { name: 'review', on: { success: ['done'] } },
  ],
};

export const DeterministicPipeline = () => {
  const { state, onTransition } = useFSM(deterministicConfig);

  return (
    <Pipeline
      type="Deterministic"
      state={state}
      onTransition={onTransition}
      states={deterministicConfig.states}
    />
  );
};
