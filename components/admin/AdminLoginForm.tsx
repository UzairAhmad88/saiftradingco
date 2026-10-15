"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { signInAction } from "@/lib/auth/actions";
import { Eye, EyeOff, Lock, AlertCircle, ShieldCheck } from "lucide-react";

export interface AdminLoginFormProps {
  safeNext: string;
}

export function AdminLoginForm({ safeNext }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side quick check
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("next", safeNext);

    startTransition(async () => {
      const result = await signInAction(null, formData);

      if (result.success && result.redirectTo) {
        router.push(result.redirectTo);
        router.refresh();
      } else {
        setErrorMessage(
          result.error ||
            "Unable to sign in. Please check your email and password and try again."
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Admin authentication form"
      className="space-y-6"
    >
      {/* Accessible Error Alert Banner */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 bg-[#1A0A0A] border border-[#DC2626]/50 text-xs text-[#E5E5E5] flex items-start gap-3"
        >
          <AlertCircle
            className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="space-y-1">
            <span className="font-medium text-[#EF4444] block">
              Authentication Notice
            </span>
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="admin-email"
          className="block text-xs uppercase tracking-[0.18em] font-medium text-[#E5E5DF] select-none"
        >
          Administrator Email <span className="text-[#9CCB63]" aria-hidden="true">*</span>
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@saiftradingco.com"
          disabled={isPending}
          style={{ color: "#F5F5F0", backgroundColor: "#0A0A0A" }}
          className="w-full h-11 px-4 text-sm font-sans bg-[#0A0A0A] text-[#F5F5F0] placeholder-[#666660] border border-[#2A2A28] rounded-[4px] transition-all duration-200 hover:border-[#3E3E3A] focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63] disabled:opacity-50 disabled:cursor-not-allowed caret-[#9CCB63]"
        />
      </div>

      {/* Password Field with Accessible Show/Hide Toggle */}
      <div className="space-y-2">
        <label
          htmlFor="admin-password"
          className="block text-xs uppercase tracking-[0.18em] font-medium text-[#E5E5DF] select-none"
        >
          Password <span className="text-[#9CCB63]" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            disabled={isPending}
            style={{ color: "#F5F5F0", backgroundColor: "#0A0A0A" }}
            className="w-full h-11 pl-4 pr-12 text-sm font-sans bg-[#0A0A0A] text-[#F5F5F0] placeholder-[#666660] border border-[#2A2A28] rounded-[4px] transition-all duration-200 hover:border-[#3E3E3A] focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63] disabled:opacity-50 disabled:cursor-not-allowed caret-[#9CCB63]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A94] hover:text-[#F5F5F0] p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63] rounded-[4px]"
            title={showPassword ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Hidden Safe Redirect Path */}
      <input type="hidden" name="next" value={safeNext} />

      {/* Security Assurance Pill */}
      <div className="flex items-center gap-2 text-[11px] text-[#9A9A94] pt-1">
        <Lock className="w-3.5 h-3.5 text-[#9CCB63]" aria-hidden="true" />
        <span>End-to-end encrypted administrative credentials</span>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2"
      >
        <ShieldCheck className="w-4 h-4" aria-hidden="true" />
        <span>{isPending ? "Signing In..." : "Sign In"}</span>
      </Button>
    </form>
  );
}
