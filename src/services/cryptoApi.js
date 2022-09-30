import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeader = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '587dc0f481msh1831f8dff610f17p105fefjsn199bf591ac68'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com'
const createRequest = (url) => ({url, headers: cryptoApiHeader})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCoinsDetails: builder.query({
            query:(coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCoinHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`)
        })
    })
})

export const {
    useGetCoinsQuery,
    useGetCoinsDetailsQuery,
    useGetCoinHistoryQuery
} = cryptoApi;