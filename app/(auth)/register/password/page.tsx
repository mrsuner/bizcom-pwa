"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, type PasswordInput } from "@/lib/validations/auth";
import { ProgressSteps } from "@/components/auth/ProgressSteps";
import { useUpdatePasswordMutation } from "@/store/services/api";

export default function RegisterStep2Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
  });

  const handleContinue = async (data: PasswordInput) => {
    if (!data.password) {
      // If no password provided, skip to profile
      router.push("/register/profile");
      return;
    }

    setApiError("");
    try {
      await updatePassword({
        password: data.password,
        password_confirmation: data.confirmPassword || data.password,
      }).unwrap();
      router.push("/register/profile");
    } catch (error) {
      const err = error as { data?: { meta?: { message?: string } } };
      setApiError(
        err.data?.meta?.message || "Failed to set password. Please try again."
      );
    }
  };

  const handleSkip = () => {
    router.push("/register/profile");
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 bg-white border-b">
        <Link href="/register" className="btn btn-ghost btn-circle btn-sm">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-semibold">Create Account</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <ProgressSteps currentStep={2} />

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center justify-center mb-2">
                Set Password
              </h2>
              <p className="text-gray-600 text-center text-sm mb-4">
                Create a password for your account (optional)
              </p>

              <form onSubmit={handleSubmit(handleContinue)} className="space-y-4">
                {apiError && (
                  <div className="alert alert-error text-sm">
                    <span>{apiError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Enter password (optional)"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      placeholder="Confirm your password"
                      className={`input input-bordered w-full pr-10 ${errors.confirmPassword ? "input-error" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="btn btn-outline flex-1"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary flex-1"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
