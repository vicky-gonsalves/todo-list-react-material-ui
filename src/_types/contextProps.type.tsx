import { State } from './state.type';

export interface ContextProps {
  state: State;
  dispatch: ({ type }: { type: string }) => void;
}
