import { FSMConfig, Event } from './types';

export function createFSM(config: FSMConfig) {
  let currentState = config.initialState;
  let states = new Map(config.states); // Clone the states map to prevent external mutations

  const transition = (event: Event): void => {
    const currentStateConfig = states.get(currentState);

    if (!currentStateConfig) {
      console.error(`State "${currentState}" is not defined in the FSM`);
      return;
    }

    const eventHandler = currentStateConfig.on?.[event];
    if (!eventHandler) {
      console.warn(
        `Event "${event}" is not defined for state -> ${currentState}`
      );
      return;
    }

    const nextStates = [...eventHandler()] ?? [];
    // For simplicity, pick the first state if multiple states are available
    currentState = nextStates.length > 1 ? nextStates[1] : nextStates[0];
  };

  const getState = (): string => currentState;

  const setConfig = (newConfig: FSMConfig): void => {
    currentState = newConfig.initialState;
    states = new Map(newConfig.states); // to avoid external mutations
  };

  return {
    getState,
    transition,
    setConfig,
  };
}
