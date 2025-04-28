
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { Task } from "@/types/task";


// Définition de l'interface du state de la slice
interface TaskState {
    value: Task[];
}

// Initialisation du state avec le type défini
const initialState: TaskState = {
    value: [],
};

export const taskSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {
        add : (state, action: PayloadAction<Task[]>) => {
            state.value = action.payload
        },
        deleteAll : (state) => {
            state.value = []
        }
    }

})

export const { add, deleteAll } = taskSlice.actions
export default taskSlice.reducer