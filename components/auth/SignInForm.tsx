"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signInEmailPasswordSchema, type SignInEmailPasswordInput } from "@/lib/validations/auth";
import { OtpInput } from "./OtpInput";
import {
  useLazyGetCsrfCookieQuery,
  useLoginMutation,
  useVerifyLoginOtpMutation,
  useLazyGetMeQuery,
} from "@/store/services/api";
import { login as loginAction } from "@/store/slices/authSlice";
import type { User } from "@/types";

export function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [apiError, setApiError] = useState("");

  const [getCsrfCookie] = useLazyGetCsrfCookieQuery();
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [verifyOtpMutation, { isLoading: isVerifyLoading }] = useVerifyLoginOtpMutation();
  const [getMe] = useLazyGetMeQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInEmailPasswordInput>({
    resolver: zodResolver(signInEmailPasswordSchema),
  });

  const onSubmit = async (data: SignInEmailPasswordInput) => {
    setApiError("");
    try {
      // Get CSRF cookie first
      await getCsrfCookie().unwrap();

      // Call login API
      await loginMutation({ email: data.email, password: data.password }).unwrap();

      // Success - save credentials and switch to OTP step
      setCredentials({ email: data.email, password: data.password });
      setStep("otp");
    } catch (error) {
      // Handle API errors
      const apiError = error as { data?: { meta?: { message?: string } } };
      setApiError(apiError?.data?.meta?.message || "Invalid credentials");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter 6-digit OTP");
      return;
    }

    if (!credentials) {
      setOtpError("Session expired. Please start over.");
      return;
    }

    setOtpError("");
    try {
      // Verify OTP with credentials
      await verifyOtpMutation({
        email: credentials.email,
        password: credentials.password,
        otp,
      }).unwrap();

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

  const handleBack = () => {
    setStep("credentials");
    setOtp("");
    setOtpError("");
  };

  // OTP Verification Step
  if (step === "otp") {
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Enter the 6-digit code sent to
          </p>
          <p className="font-medium">{credentials?.email}</p>
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
          onClick={handleBack}
          className="btn btn-ghost w-full"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </button>
      </div>
    );
  }

  // Credentials Step
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter your password"
            className={`input input-bordered w-full pr-10 ${errors.password ? "input-error" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-error text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoginLoading}
        className="btn btn-primary w-full"
      >
        {isLoginLoading ? <span className="loading loading-spinner loading-sm" /> : "Sign In"}
      </button>
    </form>
  );
}
