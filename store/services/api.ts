import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "@/lib/utils/cookie";
import type { Payment, PaginatedResponse, UserBalance, UserFilesResponse, UserFileDetailResponse, AnnouncementApi } from "@/types";

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

// Login request types
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginVerifyOtpRequest {
  email: string;
  password: string;
  otp: string;
}

interface PasswordlessOtpObtainRequest {
  email: string;
}

interface PasswordlessOtpVerifyRequest {
  email: string;
  otp: string;
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

interface BalanceConversionRequest {
  from_currency: string;
  to_currency: string;
  amount: string;
}

interface BalanceConversionResponse {
  from_balance: {
    currency_code: string;
    previous_balance: string;
    new_balance: string;
  };
  to_balance: {
    currency_code: string;
    previous_balance: string;
    new_balance: string;
  };
}

interface GetMyFilesParams {
  page?: number;
  paginate?: number;
}

interface GetAnnouncementsParams {
  per_page?: number;
}

interface AnnouncementsListResponse {
  data: AnnouncementApi[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
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
  tagTypes: ["User", "Company", "KYC", "Payment", "File"],
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

    // Login endpoints (password-based with OTP verification)
    login: builder.mutation<ApiResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    verifyLoginOtp: builder.mutation<ApiResponse<VerifyOtpResponse>, LoginVerifyOtpRequest>({
      query: (body) => ({
        url: "/verify-otp",
        method: "POST",
        body,
      }),
    }),

    // Passwordless OTP login endpoints
    obtainPasswordlessOtp: builder.mutation<ApiResponse, PasswordlessOtpObtainRequest>({
      query: (body) => ({
        url: "/login/otp/obtain",
        method: "POST",
        body,
      }),
    }),
    verifyPasswordlessOtp: builder.mutation<ApiResponse<VerifyOtpResponse>, PasswordlessOtpVerifyRequest>({
      query: (body) => ({
        url: "/login/otp/verify",
        method: "POST",
        body,
      }),
    }),

    // Logout endpoint
    logout: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
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
    uploadPaymentReceipt: builder.mutation<
      ApiResponse<{ payment_id: number; file_id: number }>,
      FormData
    >({
      query: (formData) => ({
        url: "/me/payments",
        method: "POST",
        body: formData,
        // Don't set Content-Type, let browser auto-set multipart/form-data with boundary
      }),
      invalidatesTags: ["Payment", "User"], // Refresh payment list and user balance
    }),
    convertBalance: builder.mutation<
      ApiResponse<BalanceConversionResponse>,
      BalanceConversionRequest
    >({
      query: (body) => ({
        url: "/me/balances/conversion",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // Refresh user data to get updated balances
    }),

    // File endpoints
    getMyFiles: builder.query<ApiResponse<UserFilesResponse>, GetMyFilesParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.paginate) queryParams.append("paginate", params.paginate.toString());
        const queryString = queryParams.toString();
        return `/me/files${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result?.data?.files
          ? [
              ...result.data.files.map(({ id }) => ({ type: "File" as const, id })),
              { type: "File", id: "LIST" },
            ]
          : [{ type: "File", id: "LIST" }],
    }),
    getFileDetails: builder.query<ApiResponse<UserFileDetailResponse>, number>({
      query: (id) => `/me/files/${id}`,
      providesTags: (_result, _error, id) => [{ type: "File", id }],
    }),
    uploadFile: builder.mutation<ApiResponse<{ file_id: number }>, FormData>({
      query: (formData) => ({
        url: "/me/files",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "File", id: "LIST" }],
    }),
    deleteFile: builder.mutation<ApiResponse, number>({
      query: (id) => ({
        url: `/me/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "File", id },
        { type: "File", id: "LIST" },
      ],
    }),

    // Public endpoints (no auth required)
    getAnnouncements: builder.query<AnnouncementsListResponse, GetAnnouncementsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.per_page) queryParams.append("per_page", params.per_page.toString());
        const queryString = queryParams.toString();
        return `/announcements${queryString ? `?${queryString}` : ""}`;
      },
    }),
  }),
});

export const {
  useLazyGetCsrfCookieQuery,
  useObtainRegistrationOtpMutation,
  useVerifyRegistrationOtpMutation,
  useLoginMutation,
  useVerifyLoginOtpMutation,
  useObtainPasswordlessOtpMutation,
  useVerifyPasswordlessOtpMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useGetMyPaymentsQuery,
  useGetPaymentQuery,
  useUploadPaymentReceiptMutation,
  useConvertBalanceMutation,
  useGetMyFilesQuery,
  useGetFileDetailsQuery,
  useLazyGetFileDetailsQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
  useGetAnnouncementsQuery,
} = api;
