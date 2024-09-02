// FSM types
export type FSMState = string;

export type StateConfig = {
  on: {
    success?: string[];
    failure?: string[];
  };
};

export type States = { name: string; on: StateConfig['on'] }[];

export type FSMConfig = {
  initialState: FSMState;
  states: States;
  type: "Deterministic" | "Non-deterministic";
};

export type Event = 'success' | 'failure';

export type Action = {
  type: Event;
};

export type OnTransition = (event: Event) => void;
