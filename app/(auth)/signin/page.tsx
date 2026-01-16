"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SignInForm } from "@/components/auth/SignInForm";
import { OtpSignInForm } from "@/components/auth/OtpSignInForm";

type SignInMethod = "password" | "otp";

export default function SignInPage() {
  const [method, setMethod] = useState<SignInMethod>("password");

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 bg-white border-b">
        <Link href="/" className="btn btn-ghost btn-circle btn-sm">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-semibold">Sign In</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          {/* Method Tabs */}
          <div className="tabs tabs-boxed bg-base-100 p-1 mb-6">
            <button
              type="button"
              className={`tab flex-1 ${method === "password" ? "tab-active" : ""}`}
              onClick={() => setMethod("password")}
            >
              Password
            </button>
            <button
              type="button"
              className={`tab flex-1 ${method === "otp" ? "tab-active" : ""}`}
              onClick={() => setMethod("otp")}
            >
              OTP
            </button>
          </div>

          {/* Form */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              {method === "password" ? <SignInForm /> : <OtpSignInForm />}
            </div>
          </div>

          {/* Footer Link */}
          <p className="text-center mt-6 text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
