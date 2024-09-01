import { useState, useRef, useCallback } from 'react';
import { FSMConfig, Event } from './types';
import { createFSM } from './FSM';

export const useFSM = (initialConfig: FSMConfig) => {
  const fsmRef = useRef(createFSM(initialConfig));
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
