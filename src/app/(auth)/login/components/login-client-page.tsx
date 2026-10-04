"use client";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { GoogleSignInButton } from "./google-sign-in-button";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { signIn } from "next-auth/react";
import { ArrowUpRight, Command, MoveUpRight } from "lucide-react";

const LoginClientPage = () => {
  const [loading, setLoading] = useState(false);
  const { theme, setTheme, isDark } = useTheme();

  function handleSignIn() {
    if (loading) return;
    setLoading(true);
    void signIn("google").catch(() => {
      setLoading(false);
    });
  }

  return (
    <main className={`${isDark ? "dark" : ""} min-h-screen bg-gray-100 text-gray-950 transition-colors duration-200 dark:bg-black dark:text-gray-100 motion-reduce:transition-none`}>
      <div className="grid min-h-screen lg:grid-cols-[minmax(20rem,0.9fr)_minmax(30rem,1.1fr)]">
        <section className="relative hidden overflow-hidden border-r border-gray-800 bg-black px-8 py-8 text-gray-100 lg:flex lg:flex-col xl:px-12">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-md border border-gray-700 bg-gray-900 text-sm font-semibold">M</span>
            <span className="text-sm font-semibold tracking-tight">Momentum</span>
          </div>

          <div className="relative z-10 mt-auto max-w-md pb-12">
            <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-500">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Client operations
            </p>
            <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
              Keep every opportunity in motion.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              A focused workspace for leads, follow-ups, conversations, and the
              work that comes next.
            </p>

            <div className="mt-10 max-w-sm border border-gray-800 bg-gray-950">
              <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 text-xs text-gray-500">
                <span className="flex items-center gap-2"><Command className="size-3.5" aria-hidden="true" />Today</span>
                <span>3 follow-ups</span>
              </div>
              <div className="space-y-1 p-2">
                {["Amanda Wright", "Daniel Okafor", "Quamar Graham"].map((name, index) => (
                  <div key={name} className="flex items-center gap-3 px-2 py-2.5 text-xs">
                    <span className={`size-1.5 rounded-full ${index === 0 ? "bg-amber-500" : "bg-gray-600"}`} />
                    <span className="flex-1 text-gray-300">{name}</span>
                    <MoveUpRight className="size-3.5 text-gray-600" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600">© Momentum</p>
        </section>

        <section className="flex min-h-screen flex-col border-gray-200 bg-white px-6 py-6 dark:border-gray-800 dark:bg-gray-950 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:hidden">
              <span className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-gray-950 text-sm font-semibold text-white dark:border-gray-700">M</span>
              <span className="text-sm font-semibold tracking-tight">Momentum</span>
            </div>
            <div className="ml-auto">
              <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center py-16 lg:py-8">
            <div className="w-full max-w-sm">
              <div className="mb-8">
                <p className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Welcome back
                </p>
                <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  Sign in to Momentum
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Pick up where you left off and keep your pipeline moving.
                </p>
              </div>

              <GoogleSignInButton loading={loading} onClick={handleSignIn} />
              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
                Secure authentication powered by Google.
              </p>

              <div className="mt-10 border-t border-gray-200 pt-5 dark:border-gray-800">
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-500">
                  By continuing, you agree to Momentum&apos;s{" "}
                  <span className="text-gray-800 dark:text-gray-300">Terms of Service</span>{" "}
                  and <span className="text-gray-800 dark:text-gray-300">Privacy Policy</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span>Made for independent work.</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginClientPage;
