"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle, Clock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn("admin-credentials", {
        email: email.trim().toLowerCase(),
        password,
        panel: "admin",
        redirect: false,
      });

      if (result?.error) {
        if (result.error.includes("Too many login attempts")) {
          setError(result.error);
        } else {
          setError("Invalid email or password. Please try again.");
        }
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="relative h-12 w-44 mb-2">
          <Image
            src="/images/logo.png"
            alt="Rock One Square"
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className="text-white/30 text-xs uppercase tracking-widest">Admin Portal</p>
      </div>

      {/* Card */}
      <div className="p-8 border border-white/5 rounded-sm bg-[#0a0f1e] shadow-xl shadow-black/40">
        <h1 className="text-white text-lg font-medium mb-1">Administrator Sign In</h1>
        <p className="text-white/40 text-xs mb-5">
          Enter your credentials to access the management portal.
        </p>

        {(reason === "timeout" || reason === "expired") && (
          <div className="flex items-start gap-2.5 p-3 mb-4 border border-amber-500/30 rounded-sm bg-amber-500/10">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-300 text-xs leading-relaxed">
              {reason === "expired"
                ? "Your session has expired (24-hour maximum reached). Please sign in again."
                : "Your session expired due to inactivity. Please sign in again."}
            </p>
          </div>
        )}

        {reason === "unauthorized" && (
          <div className="flex items-start gap-2.5 p-3 mb-4 border border-red-500/30 rounded-sm bg-red-500/10">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-xs leading-relaxed">
              Access denied. Please log in with authorized credentials.
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2.5 p-3 mb-4 border border-red-500/30 rounded-sm bg-red-500/10">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-xs leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-white/60 text-xs mb-1.5 font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-sm text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] transition-colors"
              placeholder="admin@rockonesquare.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white/60 text-xs mb-1.5 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-3 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-sm text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] transition-colors"
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="admin-submit"
            disabled={loading}
            className="w-full py-3 bg-[#c9a84c] text-[#0a0f1e] font-semibold text-sm rounded-sm hover:bg-[#e4c870] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-white/20 text-xs">Rock One Square · Authorized Personnel Only</p>
        <a
          href="/superadmin/login"
          className="text-white/20 text-xs hover:text-white/40 transition-colors"
        >
          Super Admin →
        </a>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#060a14] flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-white/40 text-xs">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
