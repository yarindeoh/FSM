// FSM types
export type FSMState = string;

export type StateConfig = {
  on: {
    success?: () => string[];
    failure?: () => string[];
  };
};

export type FSMConfig = {
  initialState: FSMState;
  states: Map<string, StateConfig>;
};

export type Event = 'success' | 'failure';

export type Action = {
  type: Event;
};

// component types
export type OnTransition = (event: Event) => void;

export interface PipelineProps {
  type: string;
  state: FSMState;
  onTransition: OnTransition;
  states: Map<string, StateConfig>;
}

export interface JobProps {
  isCurrent: boolean;
  displayName: string;
  onSuccess?: () => void;
  onFailure?: () => void;
  onTransition: OnTransition;
}
