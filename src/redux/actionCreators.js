import { ACTION_ADD_NOTE, ACTION_UPDATE_NOTE } from "./actions"

export const addNote = (id, title, content) => {
    return {
        type: ACTION_ADD_NOTE,
        note: {
            id,
            title,
            content
        }
    }
}

export const updateNote = (id, title, content) => {
    return {
        type: ACTION_UPDATE_NOTE,
        note: {
            id,
            title,
            content
        }
    }
}