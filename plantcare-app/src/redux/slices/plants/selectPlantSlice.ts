
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { Plant } from "@/types/plant";


// Définition de l'interface du state de la slice
interface SelectPlantState {
    value: Plant | null;
}

// Initialisation du state avec le type défini
const initialState: SelectPlantState = {
    value: null,
};

export const selectPlantSlice = createSlice({
    name : 'selectPlant',
    initialState,
    reducers : {
        select : (state, action: PayloadAction<Plant>) => {
            state.value = action.payload
        },
        unselect : (state) => {
            state.value = null
        }
    }

})

export const { select, unselect } = selectPlantSlice.actions
export default selectPlantSlice.reducer