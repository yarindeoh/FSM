import { FSMConfig, Event } from './types';

export function createFSM(config: FSMConfig) {
  let currentState = config.initialState;
  let states = new Map(
    config.states.map((state) => [state.name, { on: state.on }])
  ); // Create Map of states to prevent external mutations

  const transition = (event: Event): void => {
    const currentStateConfig = states.get(currentState);

    if (!currentStateConfig) {
      console.error(`State "${currentState}" is not defined in the FSM`);
      return;
    }

    const nextStates = currentStateConfig.on?.[event];
    if (!nextStates) {
      console.warn(
        `nextStates "${nextStates}" is not defined for state -> ${currentState}`
      );
      return;
    }

    // For simplicity, pick the first state if multiple states are available
    currentState = nextStates.length > 1 ? nextStates[1] : nextStates[0];
  };

  const getState = (): string => currentState;

  const setConfig = (newConfig: FSMConfig): void => {
    currentState = newConfig.initialState;
    states = new Map(
      config.states.map((state) => [state.name, { on: state.on }])
    ); // to avoid external mutations
  };

  return {
    getState,
    transition,
    setConfig,
  };
}
