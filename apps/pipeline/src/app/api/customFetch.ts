import type { FSMConfig } from '@react-monorepo/fsm';

export const staticDeterministicConfig: FSMConfig = {
  initialState: 'verification',
  type: 'Deterministic',
  states: [
    { name: 'verification', on: { success: ['quality'] } },
    { name: 'quality', on: { success: ['build'], failure: ['review'] } },
    { name: 'build', on: { success: ['publish'], failure: ['review'] } },
    { name: 'publish', on: { success: ['deploy'], failure: ['review'] } },
    { name: 'deploy', on: { success: ['done'], failure: ['review'] } },
    { name: 'review', on: { success: ['error'] } },
  ],
};

export const staticNonDeterministicConfig: FSMConfig = {
  initialState: 'verification',
  type: 'Non-deterministic',
  states: [
    {
      name: 'verification',
      on: { success: ['quality shard1', 'quality shard2', 'quality shard3'] },
    },
    { name: 'quality shard1', on: { success: ['build'], failure: ['review'] } },
    { name: 'quality shard2', on: { success: ['build'], failure: ['review'] } },
    { name: 'quality shard3', on: { success: ['build'], failure: ['review'] } },
    { name: 'build', on: { success: ['publish'], failure: ['review'] } },
    { name: 'publish', on: { success: ['deploy'], failure: ['review'] } },
    { name: 'deploy', on: { success: ['done'], failure: ['review'] } },
    { name: 'review', on: { success: ['error'] } },
  ],
};

export const customFetch = async (fetchUrl: string): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fetchUrl === '/api/config?pipelineId=1') {
        resolve({
          ok: true,
          json: async () => staticDeterministicConfig,
        } as Response);
      } else if (fetchUrl === '/api/config?pipelineId=2') {
        resolve({
          ok: true,
          json: async () => staticNonDeterministicConfig,
        } as Response);
      } else if (fetchUrl === '/api/config?pipelineId=3') {
        reject(new Error('No pipeline found'));
      }
    }, 100);
  });
};
