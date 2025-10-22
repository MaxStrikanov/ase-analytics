import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Filters } from '@/types';

const initialState: Filters = {
    dateFrom: null,
    dateTo: null,
    objects: [],
    workTypes: [],
    cumulative: false,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDateFrom: (s, a: PayloadAction<string | null>) => { s.dateFrom = a.payload; },
        setDateTo: (s, a: PayloadAction<string | null>) => { s.dateTo = a.payload; },
        setObjects: (s, a: PayloadAction<string[]>) => { s.objects = a.payload; },
        setWorkTypes: (s, a: PayloadAction<string[]>) => { s.workTypes = a.payload; },
        setCumulative: (s, a: PayloadAction<boolean>) => { s.cumulative = a.payload; },
        resetFilters: () => initialState,
    }
});

export const { setDateFrom, setDateTo, setObjects, setWorkTypes, setCumulative, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;