import { createSlice } from "@reduxjs/toolkit";

export const updatePlantsSlice = createSlice({

    name : 'updatePlant',
    initialState : {
        value : false
    },
    reducers : {
        update : ( state ) => {
            state.value = !state.value
        },
    }

})

export const { update } = updatePlantsSlice.actions
export default updatePlantsSlice.reducer