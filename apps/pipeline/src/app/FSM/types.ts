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
};

export type Event = 'success' | 'failure';

export type Action = {
  type: Event;
};

// component types
export type OnTransition = (event: Event) => void;

export interface PipelineProps {
  type: string;
  state?: FSMState;
  onTransition: OnTransition;
  states: States;
}

export interface JobProps {
  isCurrent: boolean;
  displayName: string;
  onSuccess?: string[];
  onFailure?: string[];
  onTransition: OnTransition;
}
