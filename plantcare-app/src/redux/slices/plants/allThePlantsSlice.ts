// Slice to store all the plants in the app
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plant } from '@/types/plant';
import { RootState } from '@/redux/store';

// Définition de l'interface du state de la slice
interface AllThePlantsState {
    value: Plant[];
}

// Initialisation du state avec un tableau vide
const initialState: AllThePlantsState = {
    value: [],
};

export const allThePlantsSlice = createSlice({
    name: 'allThePlants',
    initialState,
    reducers: {

        // Action to set the plants in the state
        setPlants: (state, action: PayloadAction<Plant[]>) => {
            state.value = action.payload;
        },
        // Action to delete a plant from the state
        deletePlant: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(plant => plant.id !== action.payload);
        },
        // Action to add a new plant to the state
        addPlant: (state, action: PayloadAction<Plant>) => {
            state.value.push(action.payload);
        },
        // Action to update specific fields of a plant in the state
        updatePlant: (state, action: PayloadAction<{ id: number; changes: Partial<Plant> }>) => {
            const { id, changes } = action.payload;
            const index = state.value.findIndex(plant => plant.id === id);
            if (index !== -1) {
                state.value[index] = {
                    ...state.value[index],
                    ...changes,
                };
            }
        },
        // Action to clear all plants from the state
        clearPlants: (state) => {
            state.value = [];
        },
    }
});

export const { setPlants, deletePlant, addPlant, updatePlant, clearPlants } = allThePlantsSlice.actions;
// Selector to get all plants
export const selectAllPlants = (state: RootState): Plant[] => state.allThePlants.value;
// Export the reducer to be used in the store
export default allThePlantsSlice.reducer;