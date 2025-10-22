import { configureStore } from '@reduxjs/toolkit';
import { dataApi } from '@/features/api';
import filtersReducer from '@/features/filtersSlice';

export const store = configureStore({
    reducer: {
        [dataApi.reducerPath]: dataApi.reducer,
        filters: filtersReducer,
    },
    middleware: (gDM) => gDM().concat(dataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;