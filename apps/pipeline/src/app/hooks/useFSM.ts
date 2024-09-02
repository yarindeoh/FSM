import { useState, useRef, useCallback } from 'react';
import type { FSMConfig, Event } from '@react-monorepo/fsm';
import { createFSM } from '@react-monorepo/fsm';

export const useFSM = () => {
  const fsmRef = useRef(createFSM());
  const [state, setState] = useState(fsmRef.current.getState());

  const setConfig = useCallback((config: FSMConfig) => {
    fsmRef.current.setConfig(config);
    setState(fsmRef.current.getState()); // Update state after setting new config
  }, []);

  const onTransition = useCallback((event: Event) => {
    fsmRef.current.transition(event);
    setState(fsmRef.current.getState());
  }, []);

  return { state, onTransition, setConfig };
};
