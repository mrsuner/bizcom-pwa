"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { emailSchema, type EmailInput } from "@/lib/validations/auth";
import { OtpInput } from "./OtpInput";

const MOCK_OTP = "123456";

export function OtpSignInForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
  });

  const handleSendOtp = async (data: EmailInput) => {
    setIsLoading(true);
    // Mock send OTP - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEmail(data.email);
    setStep("otp");
    setIsLoading(false);
    // Show toast/alert that OTP was sent
    alert(`OTP sent to ${data.email}. Use test OTP: ${MOCK_OTP}`);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setOtpError("");

    // Mock verify OTP
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (otp === MOCK_OTP) {
      console.log("Sign in with OTP:", { email, otp });
      router.push("/");
    } else {
      setOtpError("Invalid OTP. Please try again. (Hint: Use 123456)");
    }
    setIsLoading(false);
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
          disabled={isLoading}
        />

        <button
          type="button"
          onClick={handleVerifyOtp}
          disabled={isLoading || otp.length !== 6}
          className="btn btn-primary w-full mt-4"
        >
          {isLoading ? <span className="loading loading-spinner loading-sm" /> : "Verify & Sign In"}
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
        {isLoading ? <span className="loading loading-spinner loading-sm" /> : "Send OTP"}
      </button>
    </form>
  );
}
