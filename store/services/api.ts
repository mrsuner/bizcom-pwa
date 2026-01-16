import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query base API for future integration
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  }),
  tagTypes: ["User", "Company", "KYC"],
  endpoints: () => ({}),
});
