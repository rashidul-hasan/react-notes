import { createStore } from "redux";
import reducers from "./reducers";
import {saveState} from "../lib/statePersistor";

const store = createStore(reducers);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;