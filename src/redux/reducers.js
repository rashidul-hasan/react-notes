import { loadState } from "../lib/statePersistor";
import { ACTION_ADD_NOTE, ACTION_UPDATE_NOTE } from "./actions";

const initialState = loadState();

export default (state = initialState, action) => {

    const {notes} = state;
    
    switch(action.type){
        case ACTION_ADD_NOTE: 
            
            return Object.assign({}, state, {
                notes: [action.note, ...notes]
            });

        case ACTION_UPDATE_NOTE: 
        
            const editedNotes = notes.map( i => {
                if(i.id === action.note.id){
                    return action.note;
                }
                return i;
            })
            return Object.assign({}, state, {
                notes: editedNotes
            });

        default:
            return state;
    }
}