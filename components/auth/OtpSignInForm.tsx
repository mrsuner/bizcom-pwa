"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { emailSchema, type EmailInput } from "@/lib/validations/auth";
import { OtpInput } from "./OtpInput";
import {
  useLazyGetCsrfCookieQuery,
  useObtainPasswordlessOtpMutation,
  useVerifyPasswordlessOtpMutation,
  useLazyGetMeQuery,
} from "@/store/services/api";
import { login as loginAction } from "@/store/slices/authSlice";
import type { User } from "@/types";

export function OtpSignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [apiError, setApiError] = useState("");

  const [getCsrfCookie] = useLazyGetCsrfCookieQuery();
  const [obtainOtp, { isLoading: isSendingOtp }] = useObtainPasswordlessOtpMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyPasswordlessOtpMutation();
  const [getMe] = useLazyGetMeQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
  });

  const handleSendOtp = async (data: EmailInput) => {
    setApiError("");
    try {
      // Get CSRF cookie first
      await getCsrfCookie().unwrap();

      // Request OTP
      await obtainOtp({ email: data.email }).unwrap();

      // Success - save email and switch to OTP step
      setEmail(data.email);
      setStep("otp");
    } catch (error) {
      // Handle API errors
      const apiError = error as { data?: { meta?: { message?: string } } };
      setApiError(apiError?.data?.meta?.message || "No account found with this email address.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter 6-digit OTP");
      return;
    }

    setOtpError("");
    try {
      // Verify OTP
      await verifyOtp({ email, otp }).unwrap();

      // Get user data and dispatch login action
      const meResponse = await getMe().unwrap();
      if (meResponse.data) {
        dispatch(loginAction({ user: meResponse.data as User }));
      }

      // Redirect to home
      router.push("/");
    } catch (error) {
      const apiError = error as { data?: { meta?: { message?: string } } };
      setOtpError(apiError?.data?.meta?.message || "Invalid or expired OTP");
    }
  };

  if (step === "otp") {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Enter the 6-digit code sent to
          </p>
          <p className="font-medium">{email}</p>
        </div>

        <OtpInput
          value={otp}
          onChange={setOtp}
          onComplete={handleVerifyOtp}
          error={otpError}
          disabled={isVerifyLoading}
        />

        <button
          type="button"
          onClick={handleVerifyOtp}
          disabled={isVerifyLoading || otp.length !== 6}
          className="btn btn-primary w-full mt-4"
        >
          {isVerifyLoading ? <span className="loading loading-spinner loading-sm" /> : "Verify & Sign In"}
        </button>

        <button
          type="button"
          onClick={() => {
            setStep("email");
            setOtp("");
            setOtpError("");
          }}
          className="btn btn-ghost w-full"
        >
          Change Email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-4">
      {apiError && (
        <div className="alert alert-error text-sm">
          {apiError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
        />
        {errors.email && (
          <p className="text-error text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSendingOtp}
        className="btn btn-primary w-full"
      >
        {isSendingOtp ? <span className="loading loading-spinner loading-sm" /> : "Send OTP"}
      </button>
    </form>
  );
}
