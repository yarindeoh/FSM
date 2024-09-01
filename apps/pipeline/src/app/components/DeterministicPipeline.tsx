import React from 'react';
import { useFSM } from '../FSM/useFSM';
import { Pipeline } from './Pipeline';
import { FSMConfig } from '../FSM/types';

const deterministicConfig: FSMConfig = {
  initialState: 'verification',
  states: new Map([
    ['verification', { on: { success: () => ['quality'] } }],
    [
      'quality',
      { on: { success: () => ['build'], failure: () => ['review'] } },
    ],
    [
      'build',
      { on: { success: () => ['publish'], failure: () => ['review'] } },
    ],
    [
      'publish',
      { on: { success: () => ['deploy'], failure: () => ['review'] } },
    ],
    ['deploy', { on: { success: () => ['done'], failure: () => ['review'] } }],
    ['review', { on: { success: () => ['done'] } }],
  ]),
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
