import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Row } from '@/types';

export const dataApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getRows: builder.query<Row[], void>({
            query: () => 'data.json',
            transformResponse: (rows: Row[]) =>
                rows.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        }),
    }),
});

export const { useGetRowsQuery } = dataApi;