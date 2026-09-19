"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      if (error) {
        setMessage(`로그인 상태를 확인하지 못했습니다: ${error.message}`);
      }

      setUser(currentUser);
      setIsLoading(false);
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    setMessage("");
    setIsSigningOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(`로그아웃 실패: ${error.message}`);
      setIsSigningOut(false);
      return;
    }

    setUser(null);
    setIsSigningOut(false);
  }

  return (
    <main className="min-h-screen bg-emerald-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <p className="text-lg font-bold tracking-[0.2em]">peTox</p>
          {user && (
            <button
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-60"
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? "로그아웃 중…" : "로그아웃"}
            </button>
          )}
        </header>

        <section className="flex flex-1 flex-col justify-center py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
            Short-form detox companion
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-7xl">
            보는 시간은 줄이고,
            <br />
            나를 키우는 시간은 늘리세요.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-emerald-100/80">
            peTox는 숏폼 사용 시간을 자각하고 줄일 수 있도록,
            목표 시간과 캐릭터를 통해 절제를 돕는 서비스입니다.
          </p>

          <div className="mt-10 min-h-28">
            {isLoading ? (
              <p className="text-emerald-200">로그인 상태를 확인하는 중…</p>
            ) : user ? (
              <div className="inline-flex flex-col gap-2 rounded-2xl bg-white/10 px-6 py-5 ring-1 ring-white/15">
                <span className="text-sm text-emerald-200">로그인된 사용자</span>
                <strong className="text-lg">{user.email}</strong>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  className="rounded-xl bg-emerald-300 px-6 py-3 text-center font-bold text-emerald-950 transition hover:bg-emerald-200"
                  href="/signup"
                >
                  회원가입
                </Link>
                <Link
                  className="rounded-xl border border-white/30 px-6 py-3 text-center font-bold transition hover:bg-white/10"
                  href="/login"
                >
                  로그인
                </Link>
              </div>
            )}
          </div>

          {message && (
            <p className="mt-4 text-sm text-rose-300" role="alert">
              {message}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
