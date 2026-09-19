"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { supabase } from "@/utils/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(`로그인 실패: ${error.message}`);
      setIsSubmitting(false);
      return;
    }

    router.replace("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-6 py-12 text-zinc-900">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-emerald-950/10">
        <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-emerald-700">
          peTox
        </p>
        <h1 className="text-3xl font-bold">로그인</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          나의 사용 시간과 절제 목표를 확인하세요.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          <label className="block text-sm font-medium">
            이메일
            <input
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
            />
          </label>

          <label className="block text-sm font-medium">
            비밀번호
            <input
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
            />
          </label>

          <button
            className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "로그인 중…" : "로그인"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-rose-600" role="alert">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-zinc-600">
          계정이 없나요?{" "}
          <Link className="font-semibold text-emerald-700 underline" href="/signup">
            회원가입
          </Link>
        </p>
      </section>
    </main>
  );
}
