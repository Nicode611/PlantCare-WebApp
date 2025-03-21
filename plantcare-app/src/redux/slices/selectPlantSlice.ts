
import { createSlice } from "@reduxjs/toolkit";

export const selectPlantSlice = createSlice({

    name : 'selectPlant',
    initialState : {
        value : null
    },
    reducers : {
        select : (state, action) => {
            state.value = action.payload
        },
        unselect : (state) => {
            state.value = null
        }
    }

})

export const { select, unselect } = selectPlantSlice.actions
export default selectPlantSlice.reducer