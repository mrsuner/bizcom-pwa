"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailInput } from "@/lib/validations/auth";
import { OtpInput } from "@/components/auth/OtpInput";
import { ProgressSteps } from "@/components/auth/ProgressSteps";
import {
  useLazyGetCsrfCookieQuery,
  useObtainRegistrationOtpMutation,
  useVerifyRegistrationOtpMutation,
} from "@/store/services/api";
import { useAppDispatch } from "@/store/hooks";
import { setRegistrationEmail } from "@/store/slices/authSlice";

export default function RegisterStep1Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [apiError, setApiError] = useState("");

  const [getCsrfCookie] = useLazyGetCsrfCookieQuery();
  const [obtainOtp, { isLoading: isObtaining }] =
    useObtainRegistrationOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] =
    useVerifyRegistrationOtpMutation();

  const isLoading = isObtaining || isVerifying;

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
      // First, get CSRF cookie for Sanctum SPA authentication
      await getCsrfCookie().unwrap();
      await obtainOtp({ email: data.email }).unwrap();
      setEmail(data.email);
      dispatch(setRegistrationEmail(data.email));
      setStep("otp");
    } catch (error) {
      const err = error as { data?: { meta?: { message?: string } } };
      setApiError(
        err.data?.meta?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  const handleVerifyOtp = useCallback(async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter 6-digit OTP");
      return;
    }

    setOtpError("");
    setApiError("");

    try {
      // Session cookie is set automatically by Sanctum after successful verification
      await verifyOtp({ email, otp }).unwrap();
      router.push("/register/password");
    } catch (error) {
      const err = error as { data?: { meta?: { message?: string } } };
      setOtpError(
        err.data?.meta?.message || "Invalid OTP. Please try again."
      );
    }
  }, [otp, email, verifyOtp, router]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 bg-white border-b">
        <Link href="/signin" className="btn btn-ghost btn-circle btn-sm">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-semibold">Create Account</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <ProgressSteps currentStep={1} />

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center justify-center mb-2">
                Verify Your Email
              </h2>

              {step === "email" ? (
                <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-4">
                  <p className="text-gray-600 text-center text-sm mb-4">
                    We&apos;ll send a verification code to your email
                  </p>

                  {apiError && (
                    <div className="alert alert-error text-sm">
                      <span>{apiError}</span>
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
                    disabled={isLoading}
                    className="btn btn-primary w-full"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      "Send Verification Code"
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-gray-600 text-sm">
                      Enter the 6-digit code sent to
                    </p>
                    <p className="font-medium">{email}</p>
                  </div>

                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    onComplete={handleVerifyOtp}
                    error={otpError}
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isLoading || otp.length !== 6}
                    className="btn btn-primary w-full mt-4"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      "Verify & Continue"
                    )}
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
              )}
            </div>
          </div>

          {/* Footer Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
