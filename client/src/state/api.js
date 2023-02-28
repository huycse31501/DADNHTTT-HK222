import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Area", "Tree", "Watering", "Stats", "Gardener", "Dashboard"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `/https://dadn-hapa-222.onrender.com/general/user/${id}`,
            providesTags: ["User"],
        }),
        getArea: build.query({
            query: () => `/https://dadn-hapa-222.onrender.com/client/areas`,
            providesTags: ["Area"],
        }),
        getTree: build.query({
            query: ({ search }) => ({
                url: "/https://dadn-hapa-222.onrender.com/client/trees",
                method: "GET",
                params: { search },
              }),
            providesTags: ["Tree"],
        }),
        getWatering: build.query({
            query: ({ search }) => ({
                url: "/https://dadn-hapa-222.onrender.com/client/waterings",
                method: "GET",
                params: { search },
              }),
            providesTags: ["Watering"],
        }),
        getStats: build.query({
            query: () => `stats/stats`,
            providesTags: ["Stats"],
        }),
        getGardener: build.query({
            query: ({ search }) => ({
                url: "/https://dadn-hapa-222.onrender.com/client/gardeners",
                method: "GET",
                params: { search },
              }),
            providesTags: ["Gardener"],
        }),
        getDashboard: build.query({
            query: () => `/https://dadn-hapa-222.onrender.com/general/dashboard`,
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetAreaQuery,
    useGetTreeQuery,
    useGetWateringQuery,
    useGetStatsQuery,
    useGetGardenerQuery,
    useGetDashboardQuery,
} = api;