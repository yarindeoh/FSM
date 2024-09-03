import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createFSM } from './fsm';
import { FSMConfig } from './types';

describe('FSM Deterministic transitions', () => {
  let fsm: ReturnType<typeof createFSM>;

  beforeEach(() => {
    fsm = createFSM();
  });

  it(`GIVEN FSM is initialized
      WHEN no configuration is set
      THEN the state should remain empty`, () => {
    expect(fsm.getState()).toEqual('');
  });

  it(`GIVEN FSM with no configuration
      WHEN transitioning with an undefined event
      THEN error for the undefined state should be logged`, () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementation(() => {});
    fsm.transition('success');
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'state "" is not defined in the FSM'
    );
    consoleErrorMock.mockRestore();
  });

  it(`GIVEN FSM is in a defined state
      WHEN transitioning with an undefined event
      THEN state should not change and log a warning`, () => {
    const config: FSMConfig = {
      initialState: 'idle',
      type: 'Deterministic',
      states: [
        { name: 'idle', on: { success: ['active'] } },
        { name: 'active', on: {} },
      ],
    };

    fsm.setConfig(config);
    const consoleWarnMock = vi
      .spyOn(console, 'warn')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementation(() => {});
    fsm.transition('failure');
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'nextStates "undefined" is not defined for state -> idle'
    );
    consoleWarnMock.mockRestore();
  });

  it(`GIVEN FSM with empty states configuration
      WHEN transitioning from the initial state
      THEN state should stay in initial`, () => {
    const config: FSMConfig = {
      initialState: 'idle',
      type: 'Deterministic',
      states: [],
    };

    fsm.setConfig(config);
    expect(fsm.getState()).toBe('idle');
    fsm.transition('success');
    expect(fsm.getState()).toBe('idle');
  });

  it(`GIVEN FSM is configured with states
      WHEN the internal state is modified directly
      THEN transitions should not be affected by the modification`, () => {
    const config: FSMConfig = {
      initialState: 'idle',
      type: 'Deterministic',
      states: [
        { name: 'idle', on: { success: ['active'] } },
        { name: 'active', on: { success: ['test'] } },
        { name: 'done', on: {} },
      ],
    };

    fsm.setConfig(config);
    fsm.transition('success');
    expect(fsm.getState()).toBe('active');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fsmInternal = fsm as any;
    expect(
      fsmInternal.states?.set('test', { on: { success: ['newState'] } })
    ).toBeUndefined();

    fsm.transition('success');
    expect(fsm.getState()).toBe('test');
    fsm.transition('success');
    expect(fsm.getState()).not.toBe('newState');
    fsm.setConfig(config);
    fsm.transition('success');
    expect(fsm.getState()).toBe('active');
  });

  it(`GIVEN FSM has an updated configuration
      WHEN setConfig is called
      THEN FSM should reset and transition correctly based on the new config`, () => {
    const initialConfig: FSMConfig = {
      initialState: 'idle',
      type: 'Deterministic',
      states: [
        { name: 'idle', on: { success: ['active'] } },
        { name: 'active', on: {} },
      ],
    };

    const newConfig: FSMConfig = {
      initialState: 'start',
      type: 'Deterministic',
      states: [
        { name: 'start', on: { success: ['end'] } },
        { name: 'end', on: {} },
      ],
    };

    fsm.setConfig(initialConfig);
    fsm.transition('success');
    expect(fsm.getState()).toBe('active');

    fsm.setConfig(newConfig);
    expect(fsm.getState()).toBe('start');
    fsm.transition('success');
    expect(fsm.getState()).toBe('end');
  });

  it(`GIVEN FSM is in a deterministic state
      WHEN transitioning through events
      THEN only one state should be active at a time`, () => {
    const config: FSMConfig = {
      initialState: 'idle',
      type: 'Deterministic',
      states: [
        { name: 'idle', on: { success: ['active'] } },
        { name: 'active', on: { success: ['done'] } },
        { name: 'done', on: {} },
      ],
    };

    fsm.setConfig(config);
    expect(fsm.getState()).toBe('idle');
    fsm.transition('success');
    expect(fsm.getState()).toBe('active');
    fsm.transition('success');
    expect(fsm.getState()).toBe('done');
  });

  it(`GIVEN FSM has multiple states and events
      WHEN transitioning through events
      THEN states should transitioned from start and end in a final state`, () => {
    const config: FSMConfig = {
      initialState: 'idle',
      type: 'Deterministic',
      states: [
        { name: 'idle', on: { success: ['active'] } },
        { name: 'active', on: { success: ['done'], failure: ['error'] } },
        { name: 'done', on: {} },
        { name: 'error', on: {} },
      ],
    };

    fsm.setConfig(config);
    fsm.transition('success');
    expect(fsm.getState()).toBe('active');
    fsm.transition('success');
    expect(fsm.getState()).toBe('done');
    fsm.transition('success');
    expect(fsm.getState()).toBe('done');
  });
});

describe('FSM Non-Deterministic Transitions', () => {
  const nonDeterministicConfig: FSMConfig = {
    initialState: 'start',
    type: 'Non-deterministic',
    states: [
      {
        name: 'start',
        on: { success: ['middle1', 'middle2'], failure: ['error'] },
      },
      { name: 'middle1', on: { success: ['end'], failure: ['error'] } },
      { name: 'middle2', on: { success: ['end'], failure: ['error'] } },
      { name: 'error', on: {} },
      { name: 'end', on: {} },
    ],
  };
  let fsm: ReturnType<typeof createFSM>;

  beforeEach(() => {
    fsm = createFSM();
  });

  it(`GIVEN FSM is in a non-deterministic state
      WHEN transitioning with a 'success' event
      THEN it should transition to second possible event`, () => {
    fsm.setConfig(nonDeterministicConfig);

    fsm.transition('success');
    const stateAfterSuccess = fsm.getState();
    expect(['middle1', 'middle2']).toContain(stateAfterSuccess);

    fsm.transition('success');
    expect(fsm.getState()).toBe('end');

    fsm.setConfig(nonDeterministicConfig);
    fsm.transition('success');
    const stateAfterResetSuccess = fsm.getState();
    expect(['middle1', 'middle2']).toContain(stateAfterResetSuccess);

    fsm.transition('success');
    expect(fsm.getState()).toBe('end');
  });

  it(`GIVEN FSM is in a non-deterministic state
      WHEN transitioning with a 'failure' event
      THEN it should always transition to the 'error' state`, () => {
    fsm.setConfig(nonDeterministicConfig);

    fsm.transition('failure');
    expect(fsm.getState()).toBe('error');

    fsm.setConfig(nonDeterministicConfig);
    fsm.transition('failure');
    expect(fsm.getState()).toBe('error');
  });
});
