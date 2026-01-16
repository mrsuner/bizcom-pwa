"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileInput } from "@/lib/validations/auth";
import { ProgressSteps } from "@/components/auth/ProgressSteps";
import { CountrySelect } from "@/components/auth/CountrySelect";

export default function RegisterStep3Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phoneDialCode: "+65", // Default to Singapore
    },
  });

  const handleComplete = async (data: ProfileInput) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get existing registration data
    const existing = JSON.parse(sessionStorage.getItem("registration") || "{}");
    const fullData = { ...existing, ...data };

    console.log("Registration complete:", fullData);

    // Clear registration data
    sessionStorage.removeItem("registration");

    setIsLoading(false);
    alert("Registration successful! Redirecting to sign in...");
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 bg-white border-b">
        <Link href="/register/password" className="btn btn-ghost btn-circle btn-sm">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-semibold">Create Account</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 pb-8">
        <div className="max-w-md mx-auto">
          <ProgressSteps currentStep={3} />

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center justify-center mb-2">
                Personal Information
              </h2>
              <p className="text-gray-600 text-center text-sm mb-4">
                Tell us a bit about yourself
              </p>

              <form onSubmit={handleSubmit(handleComplete)} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
                      placeholder="John"
                      className={`input input-bordered w-full ${errors.firstName ? "input-error" : ""}`}
                    />
                    {errors.firstName && (
                      <p className="text-error text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      {...register("middleName")}
                      placeholder="(Optional)"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Doe"
                    className={`input input-bordered w-full ${errors.lastName ? "input-error" : ""}`}
                  />
                  {errors.lastName && (
                    <p className="text-error text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <select
                    {...register("gender")}
                    className={`select select-bordered w-full ${errors.gender ? "select-error" : ""}`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-error text-sm mt-1">{errors.gender.message}</p>
                  )}
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality *
                  </label>
                  <Controller
                    name="nationality"
                    control={control}
                    render={({ field }) => (
                      <CountrySelect
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select nationality"
                        error={errors.nationality?.message}
                        mode="nationality"
                      />
                    )}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <div className="w-28">
                      <Controller
                        name="phoneDialCode"
                        control={control}
                        render={({ field }) => (
                          <CountrySelect
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="+65"
                            error={errors.phoneDialCode?.message}
                            mode="dialCode"
                          />
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="tel"
                        {...register("phoneNumber")}
                        placeholder="9123 4567"
                        className={`input input-bordered w-full ${errors.phoneNumber ? "input-error" : ""}`}
                      />
                    </div>
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-error text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full mt-6"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
