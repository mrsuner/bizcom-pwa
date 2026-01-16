"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailInput } from "@/lib/validations/auth";
import { OtpInput } from "@/components/auth/OtpInput";
import { ProgressSteps } from "@/components/auth/ProgressSteps";

const MOCK_OTP = "123456";

export default function RegisterStep1Page() {
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEmail(data.email);
    // Save email to sessionStorage for next steps
    sessionStorage.setItem("registration", JSON.stringify({ email: data.email }));
    setStep("otp");
    setIsLoading(false);
    alert(`OTP sent to ${data.email}. Use test OTP: ${MOCK_OTP}`);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setOtpError("");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (otp === MOCK_OTP) {
      // OTP verified, proceed to password step
      router.push("/register/password");
    } else {
      setOtpError("Invalid OTP. Please try again. (Hint: Use 123456)");
    }
    setIsLoading(false);
  };

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
