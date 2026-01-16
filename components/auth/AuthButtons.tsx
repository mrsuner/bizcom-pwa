import Link from "next/link";
import { User } from "lucide-react";

export function AuthButtons() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body items-center text-center">
        <div className="avatar placeholder mb-2">
          <div className="bg-primary text-primary-content rounded-full w-20">
            <User size={40} />
          </div>
        </div>
        <h2 className="card-title">Guest User</h2>
        <p className="text-sm text-base-content/60">
          Sign in to access your profile
        </p>
        <div className="card-actions mt-4 flex-col gap-2 w-full">
          <Link href="/signin" className="btn btn-primary w-full">
            Sign In
          </Link>
          <Link href="/register" className="btn btn-outline btn-primary w-full">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
