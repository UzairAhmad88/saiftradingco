"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
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
      <FormField id="admin-email" label="Administrator Email" required>
        <Input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@saiftradingco.com"
          disabled={isPending}
          className="bg-[#0A0A0A]"
        />
      </FormField>

      {/* Password Field with Accessible Show/Hide Toggle */}
      <FormField id="admin-password" label="Password" required>
        <div className="relative">
          <Input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            disabled={isPending}
            className="pr-12 bg-[#0A0A0A]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A94] hover:text-[#F5F5F0] p-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63] rounded-[4px]"
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
      </FormField>

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
