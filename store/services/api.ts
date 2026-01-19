import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "@/lib/utils/cookie";
import type { Payment, PaginatedResponse, UserBalance } from "@/types";

// API Response types
interface ApiMeta {
  code: number;
  message: string;
}

interface ApiResponse<T = unknown> {
  meta: ApiMeta;
  data?: T;
}

interface ObtainOtpRequest {
  email: string;
}

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  user: {
    id: number;
    email: string;
  };
}

interface UpdatePasswordRequest {
  password: string;
  password_confirmation: string;
}

interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other";
  nationality: string;
  phone_dial_code: string;
  phone_number: string;
}

interface GetMyPaymentsParams {
  page?: number;
  per_page?: number;
  status?: Payment["status"];
}

interface MeResponse {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_number: string | null;
  phone_dial_code: string | null;
  entity_id: number | null;
  entity?: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    gender: string | null;
    nationality: string | null;
    phone_number: string | null;
    phone_dial_code: string | null;
  };
  roles: Array<{ name: string }>;
  balances?: UserBalance[];
}

// RTK Query base API - Cookie-based authentication for Sanctum SPA
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    credentials: "include", // Enable cookie sending for Sanctum SPA
    prepareHeaders: (headers) => {
      // Read XSRF-TOKEN from cookie and set as header for CSRF protection
      const xsrfToken = getCookie("XSRF-TOKEN");
      if (xsrfToken) {
        headers.set("X-XSRF-TOKEN", decodeURIComponent(xsrfToken));
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Company", "KYC", "Payment"],
  endpoints: (builder) => ({
    // CSRF Cookie endpoint - must be called before any authenticated requests
    // Note: This endpoint is at the root, not under /api, so we need the full URL
    getCsrfCookie: builder.query<void, void>({
      query: () => {
        // Get the base URL without /api suffix for sanctum endpoint
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const baseUrl = apiUrl.replace(/\/api\/?$/, "");
        return {
          url: `${baseUrl}/sanctum/csrf-cookie`,
          method: "GET",
        };
      },
    }),
    // Registration endpoints
    obtainRegistrationOtp: builder.mutation<ApiResponse, ObtainOtpRequest>({
      query: (body) => ({
        url: "/register/emails/otp/obtain",
        method: "POST",
        body,
      }),
    }),
    verifyRegistrationOtp: builder.mutation<
      ApiResponse<VerifyOtpResponse>,
      VerifyOtpRequest
    >({
      query: (body) => ({
        url: "/register/emails/otp/verify",
        method: "POST",
        body,
      }),
    }),

    // Me endpoints
    getMe: builder.query<ApiResponse<MeResponse>, void>({
      query: () => "/me?with=balances",
      providesTags: ["User"],
    }),
    updatePassword: builder.mutation<ApiResponse, UpdatePasswordRequest>({
      query: (body) => ({
        url: "/me/password",
        method: "POST",
        body,
      }),
    }),
    updateProfile: builder.mutation<ApiResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Payment endpoints
    getMyPayments: builder.query<PaginatedResponse<Payment>, GetMyPaymentsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.per_page) queryParams.append("per_page", params.per_page.toString());
        if (params?.status) queryParams.append("status", params.status);
        const queryString = queryParams.toString();
        return `/me/payments${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Payment" as const, id })),
              { type: "Payment", id: "LIST" },
            ]
          : [{ type: "Payment", id: "LIST" }],
    }),
    getPayment: builder.query<ApiResponse<Payment>, number>({
      query: (id) => `/me/payments/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Payment", id }],
    }),
  }),
});

export const {
  useLazyGetCsrfCookieQuery,
  useObtainRegistrationOtpMutation,
  useVerifyRegistrationOtpMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useGetMyPaymentsQuery,
  useGetPaymentQuery,
} = api;
