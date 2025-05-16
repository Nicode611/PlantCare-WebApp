import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

// Slices
import modalReducer from "./slices/modalSlice" // State for modals opening
import selectPlantReducer from "./slices/plants/selectPlantSlice" // State for selected plant
import updatePlantsReducer from "./slices/plants/updatePlantsSlice" // State to get the plants when updated
import taskReducer from "./slices/tasks/tasksSlice" // State for tasks
import activeSectionReducer from "./slices/activeSection";

const selectPlantPersistConfig = {
    key: 'selectPlant',
    storage: sessionStorage,
};

const persistedSelectPlantReducer = persistReducer(selectPlantPersistConfig, selectPlantReducer);

const store = configureStore({
    reducer : {
        modal: modalReducer,
        selectPlant: persistedSelectPlantReducer,
        updatePlants: updatePlantsReducer,
        tasks: taskReducer,
        activeSection: activeSectionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;