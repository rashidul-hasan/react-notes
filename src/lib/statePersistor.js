const initialState = {
    notes: []
}

export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
};

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return initialState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return initialState;
    }
}; 