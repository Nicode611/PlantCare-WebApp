import { configureStore } from '@reduxjs/toolkit'

// Slices
import modalReducer from "./slices/modalSlice"
import selectPlantReducer from "./slices/selectPlantSlice"

const store = configureStore({
    reducer : {
        modal: modalReducer,
        selectPlant: selectPlantReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;