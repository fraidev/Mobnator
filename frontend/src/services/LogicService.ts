import { GlobalState } from "../models/types";

const saveGlobalState = (state: GlobalState) => {
    return window.localStorage.setItem('MobsterState', JSON.stringify(state));
}
const getGlobalState = () => {
    const stateJSON = window.localStorage.getItem('MobsterState');
    if (stateJSON) {
        return JSON.parse(stateJSON) as GlobalState;
    }
    return null;
}

const GlobalStateRepository = {
    saveState: saveGlobalState,
    getState: getGlobalState
}

export default GlobalStateRepository;
