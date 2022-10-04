import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeader = {
    'x-rapidapi-host': process.env.REACT_APP_HOST,
    'x-rapidapi-key': process.env.REACT_APP_API_KEY
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
         query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
    })
})

export const {
    useGetCoinsQuery,
    useGetCoinsDetailsQuery,
    useGetCoinHistoryQuery
} = cryptoApi;