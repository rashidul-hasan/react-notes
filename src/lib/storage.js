const LOCAL_STORAGE_KEY = "notes";

export function findAll() {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if( raw === null ){
        return [];
    }

    return JSON.parse(raw);
}

export function store(note) {
    let old = localStorage.getItem(LOCAL_STORAGE_KEY);
    if( old === null ){
        old = [];
    } else {
        old = JSON.parse(old);
    }

    // if already present, update otherwise add new
    const i = old.findIndex(_item => _item.id === note.id);
    if (i > -1) old[i] = note;
    else old.push(note);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(old));
}

export function findOne(noteId) {
    let notes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if( notes === null ){
        return {};
    }
    notes = JSON.parse(notes);
    return notes.filter( item => {
        return item.id === noteId;
    });
}