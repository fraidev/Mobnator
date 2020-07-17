
export type GlobalState = {
  // started: boolean;
  mode: 'paused' | 'running' | 'waiting';
  firstStarted: boolean;
  people: Person[];
  config: ConfigParameters;
}

export type ConfigParameters = {
  breakDate: number,
  roundDate: number,
  roundMinutes: number,
  breakMinutes: number,
  roundCount: number,
  pastRounds: number,
  break: boolean,
}

export type Person = {
  id: string,
  name: string,
  isDriver: boolean,
  isNavigator: boolean
}
