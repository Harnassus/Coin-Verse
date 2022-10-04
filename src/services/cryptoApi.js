import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeader = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'c337e572b9mshb09d468f0a7e055p1e8fa9jsnacc0410a1ed5'
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