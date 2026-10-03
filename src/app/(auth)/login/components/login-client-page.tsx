"use client";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { GoogleSignInButton } from "./google-sign-in-button";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Wordmark } from "../../../../components/ui/wordmark";
import { signIn } from "next-auth/react";

const LoginClientPage = () => {
  const [loading, setLoading] = useState(false);
  const { theme, setTheme, isDark } = useTheme();

  function handleSignIn() {
    if (loading) return;
    setLoading(true);
    signIn("google");
  }

  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 motion-reduce:transition-none`}
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        <section className="relative flex min-h-64 flex-col overflow-hidden border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 px-6 py-7 sm:px-10 lg:min-h-screen lg:w-1/2 lg:border-b-0 lg:border-r lg:px-14 lg:py-10">
          <Wordmark className="relative z-10" />

          <div className="relative z-10 mt-auto hidden max-w-lg pb-16 lg:block">
            <div className="mb-10 flex items-center gap-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              <span className="size-2 rounded-full bg-blue-600" />
              Your workspace for what’s next
            </div>
            <h2 className="max-w-md text-4xl font-semibold leading-tight xl:text-5xl">
              Find the work. Keep it moving.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Your client acquisition workspace for keeping track of the people,
              conversations, and opportunities that could become your next
              project.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 hidden w-72 border-l border-gray-200/70 dark:border-gray-800/70 lg:block"
          >
            <div className="h-24 border-b border-gray-200/70 dark:border-gray-800/70" />
            <div className="h-24 border-b border-gray-200/70 dark:border-gray-800/70" />
            <div className="h-24 border-b border-gray-200/70 dark:border-gray-800/70" />
            <div className="h-24" />
          </div>
          <p className="relative z-10 mt-auto hidden text-xs text-gray-500 dark:text-gray-400 lg:block">
            © Momentum
          </p>

          <div className="relative z-10 mt-auto pt-14 lg:hidden">
            <p className="text-xs font-medium uppercase text-blue-600 dark:text-blue-500">
              Your next move starts here
            </p>
            <p className="mt-3 max-w-sm text-2xl font-semibold leading-snug">
              Keep every opportunity moving.
            </p>
          </div>
        </section>

        <section className="flex flex-1 flex-col px-6 py-6 sm:px-10 lg:w-1/2 lg:px-14 lg:py-10">
          <div className="flex justify-end">
            <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
          </div>

          <div className="flex flex-1 items-center justify-center py-14 lg:py-8">
            <div className="w-full max-w-sm">
              <div className="mb-9 flex items-center gap-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                <span className="h-px w-8 bg-blue-600" />
                Welcome back
              </div>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Keep your pipeline moving.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                One place to track potential clients, follow up on
                conversations, and turn outreach into opportunities.
              </p>

              <div className="mt-10">
                <GoogleSignInButton loading={loading} onClick={handleSignIn} />
                <p className="mt-4 text-center text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  Continue securely with your Google account.
                </p>
              </div>

              <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6">
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  By continuing, you agree to Momentum’s{" "}
                  <span className="text-gray-900 dark:text-gray-100">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-gray-900 dark:text-gray-100">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
          <p className="text-right text-xs text-gray-500 dark:text-gray-400">
            Made for independent work.
          </p>
        </section>
      </div>
    </main>
  );
};

export default LoginClientPage;
