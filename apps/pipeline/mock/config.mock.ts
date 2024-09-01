import { defineMock } from 'vite-plugin-mock-dev-server';

export default defineMock({
  url: '/api/config?pipelineId=1',
  delay: 500,
  body: {
    config: {
      initialState: 'verification',
      states: [
        { name: 'verification', on: { success: ['quality'] } },
        { name: 'quality', on: { success: ['build'], failure: ['review'] } },
        { name: 'build', on: { success: ['publish'], failure: ['review'] } },
        { name: 'publish', on: { success: ['deploy'], failure: ['review'] } },
        { name: 'deploy', on: { success: ['done'], failure: ['review'] } },
        { name: 'review', on: { success: ['done'] } },
      ],
    },
  },
});
