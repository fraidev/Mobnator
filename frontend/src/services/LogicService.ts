const state: stateType = {
    people: [],
    driver: null,
    navigator: null,
    lastId: 0
}
export type People = {
    id: number,
    name: string
}

export type stateType = {
    lastId: number,
    people: People[];
    driver: People | null;
    navigator: People | null;
}

const addPerson = (name: string) => {
    state.lastId++;

    state.people.push({ id: state.lastId, name: name })
}

const setPeople = (people: People[]) => {
    state.lastId++;

    state.people = people;
}

const getPeople = () => {
    return state.people;
}

const LogicService = {
    getPeople,
    addPerson,
    setPeople
}

export default LogicService;
