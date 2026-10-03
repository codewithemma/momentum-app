"use client";
import { useTheme } from "@/hooks/use-theme";
import { OptionGrid } from "./option-grid";
import { useState } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { CompletionState } from "./state";
import { OnboardingProgress } from "./onboarding-progress";
import {
  CHANNEL_OPTIONS,
  SOURCE_OPTIONS,
  TOTAL_STEPS,
  WORK_OPTIONS,
} from "./data";
import { useCompleteOnboarding } from "@/hooks/mutate/use-auth";
import { toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

const OnboardingClientPage = () => {
  const { mutate, isPending } = useCompleteOnboarding();
  const { theme, setTheme, isDark } = useTheme();
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<string | null>(null);
  const [clientSources, setClientSources] = useState<string[]>([]);
  const [referralSource, setReferralSource] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const selected =
    step === 1 ? role : step === 2 ? clientSources : referralSource;
  const canContinue = step === 2 ? clientSources.length > 0 : Boolean(selected);

  function toggleSingle(current: string | null, value: string) {
    return current === value ? null : value;
  }

  function handleContinue() {
    if (!canContinue) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function handleBack() {
    setShowHint(false);
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleFinish() {
    if (!canContinue) {
      setShowHint(true);
      return;
    }
    setShowHint(false);
    mutate(
      {
        role: role!,
        clientSources: clientSources,
        referralSource: referralSource!,
      },
      {
        onSuccess: () => {
          setFinished(true);
        },
        onError: (error) => {
          toast({
            variant: "error",
            message:
              error.response?.data?.message ??
              "An error occurred while completing onboarding.",
          });
        },
      },
    );
  }

  const hint =
    step === 2 ? "Pick at least one to continue." : "Choose one to continue.";
  return (
    <main
      className={`${isDark ? "dark" : ""} min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 motion-reduce:transition-none`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-6 sm:px-10 lg:py-10">
        <header className="flex items-center justify-between">
          <Wordmark />
          <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
        </header>

        {finished ? (
          <CompletionState />
        ) : (
          <div className="flex flex-1 flex-col justify-center py-12 lg:py-16">
            <div className="mx-auto w-full max-w-xl">
              <div className="mb-10 flex justify-center">
                <OnboardingProgress current={step} total={TOTAL_STEPS} />
              </div>

              <div key={step} className="animate-step-in">
                {step === 1 && (
                  <section aria-labelledby="step-1-heading">
                    <h1
                      id="step-1-heading"
                      className="text-2xl font-semibold leading-tight sm:text-3xl"
                    >
                      What kind of work do you do?
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      This helps us shape Momentum around how you work.
                    </p>
                    <OptionGrid
                      label="What kind of work do you do?"
                      options={WORK_OPTIONS}
                      multi={false}
                      isSelected={(v) => role === v}
                      onToggle={(v) => {
                        setRole((current) => toggleSingle(current, v));
                        setShowHint(false);
                      }}
                      columns="sm:grid-cols-3"
                    />
                  </section>
                )}

                {step === 2 && (
                  <section aria-labelledby="step-2-heading">
                    <h1
                      id="step-2-heading"
                      className="text-2xl font-semibold leading-tight sm:text-3xl"
                    >
                      Where do your clients usually come from?
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      Pick all the ways you currently find potential clients.
                    </p>
                    <OptionGrid
                      label="Where do your clients usually come from?"
                      options={CHANNEL_OPTIONS}
                      multi
                      isSelected={(v) => clientSources.includes(v)}
                      onToggle={(v) => {
                        setClientSources((current) =>
                          current.includes(v)
                            ? current.filter((c) => c !== v)
                            : [...current, v],
                        );
                        setShowHint(false);
                      }}
                      columns="sm:grid-cols-2"
                    />
                  </section>
                )}

                {step === 3 && (
                  <section aria-labelledby="step-3-heading">
                    <h1
                      id="step-3-heading"
                      className="text-2xl font-semibold leading-tight sm:text-3xl"
                    >
                      How did you find Momentum?
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      We’re curious what brought you here.
                    </p>
                    <OptionGrid
                      label="How did you find Momentum?"
                      options={SOURCE_OPTIONS}
                      multi={false}
                      isSelected={(v) => referralSource === v}
                      onToggle={(v) => {
                        setReferralSource((current) =>
                          toggleSingle(current, v),
                        );
                        setShowHint(false);
                      }}
                      columns="sm:grid-cols-2"
                    />
                  </section>
                )}

                <div className="mt-4 min-h-5" aria-live="polite">
                  {showHint && !canContinue && (
                    <p className="text-sm text-red-500">{hint}</p>
                  )}
                </div>

                <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex min-h-12 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none border-gray-200 bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-100 sm:w-auto"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={
                      step === TOTAL_STEPS ? handleFinish : handleContinue
                    }
                    className="inline-flex min-h-12 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none border-blue-600 bg-blue-600 text-white hover:border-blue-500 hover:bg-blue-500 active:bg-blue-700 w-full sm:w-auto"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Finishing setup...
                      </span>
                    ) : (
                      <>{step === TOTAL_STEPS ? "Finish" : "Continue"}</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-5">
          <p className="text-xs text-gray-500 dark:text-gray-400">© Momentum</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Made for independent work.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default OnboardingClientPage;
