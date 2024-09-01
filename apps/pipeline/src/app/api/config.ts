import { FSMConfig } from '../FSM/types';

export const staticConfig: FSMConfig = {
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

export const customFetch = async (fetchUrl: string): Promise<Response> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (fetchUrl === '/api/config?pipelineId=1') {
        resolve({
          ok: true,
          json: async () => staticConfig,
        } as Response);
      }
    }, 2000);
  });
};
