import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Slices
import modalReducer from "./slices/modalSlice" // State for modals opening
import selectPlantReducer from "./slices/plants/selectPlantSlice" // State for selected plant
import updatePlantsReducer from "./slices/plants/updatePlantsSlice" // State to get the plants when updated
import taskReducer from "./slices/tasks/tasksSlice" // State for tasks

const selectPlantPersistConfig = {
    key: 'selectPlant',
    storage,
};

const persistedSelectPlantReducer = persistReducer(selectPlantPersistConfig, selectPlantReducer);

const store = configureStore({
    reducer : {
        modal: modalReducer,
        selectPlant: persistedSelectPlantReducer,
        updatePlants: updatePlantsReducer,
        tasks: taskReducer,
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