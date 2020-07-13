
export type GlobalState = {
    started: boolean;
    firstStarted: boolean;
    people: Person[];
    config: ConfigParameters;
}

export type ConfigParameters = {
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
