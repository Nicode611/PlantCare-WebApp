import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveSectionState {
  activeSection: string;
}

const initialState: ActiveSectionState = {
  activeSection: "dashboard",
};

export const activeSection = createSlice({
    name: 'activeSection',
    initialState,
    reducers: {
        changeSection: (
            state,
            action: PayloadAction<string>
        ) => {
            state.activeSection = action.payload;
        }
    }
})

export const { changeSection } = activeSection.actions
export default activeSection.reducer