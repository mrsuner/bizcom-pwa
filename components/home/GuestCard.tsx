import Link from "next/link";
import { User, LogIn } from "lucide-react";

export function GuestCard() {
  return (
    <div className="card bg-gradient-to-br from-burgundy via-rose-dark to-rose-light text-white shadow-xl overflow-hidden relative">
      <div className="card-body p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar placeholder">
            <div className="bg-white/20 text-white rounded-full w-12">
              <User size={24} />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Welcome to BizCom</h2>
            <p className="text-sm text-white/80">Sign in to get started</p>
          </div>
        </div>

        <p className="text-sm text-white/80 mb-4">
          Access your account to view balances, manage companies, and more.
        </p>

        <div className="flex gap-2">
          <Link
            href="/signin"
            className="btn btn-sm bg-white/20 border-0 text-white hover:bg-white/30 flex-1"
          >
            <LogIn size={16} />
            Sign In
          </Link>
          <Link
            href="/register"
            className="btn btn-sm bg-white text-burgundy border-0 hover:bg-white/90 flex-1"
          >
            Register
          </Link>
        </div>

        {/* Decorative B watermark */}
        <div className="absolute -right-4 -bottom-4 text-[140px] font-bold text-white/10 select-none pointer-events-none leading-none">
          B
        </div>
      </div>
    </div>
  );
}
