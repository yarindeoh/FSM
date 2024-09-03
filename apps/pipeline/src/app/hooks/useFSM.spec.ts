import { renderHook, act } from '@testing-library/react';
import { useFSM } from './useFSM';
import {FSMConfig} from "@react-monorepo/fsm";

describe('useFSM Hook', () => {
  it(`GIVEN  useFSM is initialized
      WHEN the hook is rendered
      THEN initial state should be empty`, () => {
    const { result } = renderHook(() => useFSM());

    expect(result.current.state).toBe('');
  });

  it(`GIVEN config is set to idle
      WHEN transitioning on success
      THEN state should be active`, () => {
    const { result } = renderHook(() => useFSM());

    const config: FSMConfig = {
      initialState: 'idle',
      type: 'Deterministic',
      states: [
        { name: 'idle', on: { success: ['active'] } },
        { name: 'active', on: {} },
      ],
    };

    act(() => {
      result.current.setConfig(config);
      result.current.onTransition('success');
    });

    expect(result.current.state).toBe('active');
  });

  it(`GIVEN an initial configuration and a new configuration
      WHEN setConfig is called for both configurations and onTransition is triggered
      THEN the hook should correctly reflect the state from the new configuration`, () => {
    const { result } = renderHook(() => useFSM());

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

    act(() => {
      result.current.setConfig(initialConfig);
      result.current.onTransition('success');
      result.current.setConfig(newConfig);
    });

    expect(result.current.state).toBe('start');
    act(() => {
      result.current.onTransition('success');
    });
    expect(result.current.state).toBe('end');
  });
});

