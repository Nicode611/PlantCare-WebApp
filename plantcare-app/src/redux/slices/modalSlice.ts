import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        activeModal: null as string | null,
        modalProps: {} as Record<string, unknown>,
    },
    reducers: {
        open: (
            state,
            action: PayloadAction<{ modal: string; props?: Record<string, unknown> }>
        ) => {
            state.activeModal = action.payload.modal;
            state.modalProps = action.payload.props ?? {};
        },
        close: (state) => {
            state.activeModal = null;
            state.modalProps = {};
        },
    }
})

export const { open, close } = modalSlice.actions
export default modalSlice.reducer