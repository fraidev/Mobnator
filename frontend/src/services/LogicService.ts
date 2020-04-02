let state: stateType = {
    people: [],
    driver: null,
    navigator: null
}
export type Person = {
    id: number,
    name: string
}

export type stateType = {
    people: Person[];
    driver: Person | null;
    navigator: Person | null;
}

const saveState = () => {
    window.localStorage.setItem('MobsterState', JSON.stringify(state));
}

const addPerson = (person: Person) => {
    state.people.push(person);
    saveState();
}

const setPeople = (people: Person[]) => {
    state.people = people;
    saveState();
}

const getPeople = () => {
    return state.people;
}

const init = () => {
    let mobsterStateJson = window.localStorage.getItem('MobsterState');
    if (mobsterStateJson != null) {
        state = JSON.parse(mobsterStateJson) as stateType;
    }
}
init();

const LogicService = {
    init,
    getPeople,
    addPerson,
    setPeople,
    state
}

export default LogicService;
