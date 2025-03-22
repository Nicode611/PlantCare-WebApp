import { configureStore } from '@reduxjs/toolkit'

// Slices
import modalReducer from "./slices/modalSlice" // State for modals opening
import selectPlantReducer from "./slices/plants/selectPlantSlice" // State for selected plant
import updatePlantsReducer from "./slices/plants/updatePlantsSlice" // State for get the plants when updated

const store = configureStore({
    reducer : {
        modal: modalReducer,
        selectPlant: selectPlantReducer,
        updatePlants: updatePlantsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;