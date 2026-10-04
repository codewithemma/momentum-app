"use client";
import { useTheme } from "@/hooks/use-theme";
import { OptionGrid } from "./option-grid";
import { useState } from "react";
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
import { ArrowRight, Check, Loader2 } from "lucide-react";

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
    <main className={`${isDark ? "dark" : ""} min-h-screen bg-gray-100 text-gray-950 transition-colors duration-200 dark:bg-black dark:text-gray-100 motion-reduce:transition-none`}>
      <div className="grid min-h-screen lg:grid-cols-[minmax(20rem,0.8fr)_minmax(32rem,1.2fr)]">
        <aside className="hidden bg-black px-8 py-8 text-gray-100 lg:flex lg:flex-col xl:px-12">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-md border border-gray-700 bg-gray-900 text-sm font-semibold">M</span>
            <span className="text-sm font-semibold tracking-tight">Momentum</span>
          </div>

          <div className="mt-auto max-w-sm pb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
              Workspace setup
            </p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
              Make Momentum fit the way you work.
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-gray-400">
              A few quick details help us shape your pipeline and outreach
              workspace around your workflow.
            </p>

            <div className="mt-10 space-y-1 border-t border-gray-800 pt-4">
              {["Your work", "Client sources", "How you found us"].map(
                (label, index) => {
                  const stepNumber = index + 1;
                  const complete = stepNumber < step;
                  const current = stepNumber === step;
                  return (
                    <div
                      key={label}
                      className={`flex items-center gap-3 px-2 py-3 text-sm ${
                        current ? "text-white" : "text-gray-600"
                      }`}
                    >
                      <span
                        className={`flex size-6 items-center justify-center rounded-full border text-xs ${
                          complete
                            ? "border-emerald-700 bg-emerald-950 text-emerald-400"
                            : current
                              ? "border-gray-500 bg-gray-800 text-white"
                              : "border-gray-800 text-gray-600"
                        }`}
                      >
                        {complete ? <Check className="size-3.5" /> : stepNumber}
                      </span>
                      {label}
                    </div>
                  );
                },
              )}
            </div>
          </div>
          <p className="text-xs text-gray-600">© Momentum</p>
        </aside>

        <div className="flex min-h-screen flex-col bg-white px-6 py-6 dark:bg-gray-950 sm:px-10 lg:px-16">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:hidden">
              <span className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-gray-950 text-sm font-semibold text-white dark:border-gray-700">M</span>
              <span className="text-sm font-semibold tracking-tight">Momentum</span>
            </div>
            <div className="ml-auto">
              <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
            </div>
          </header>

          {finished ? (
            <CompletionState />
          ) : (
            <div className="flex flex-1 flex-col justify-center py-12 lg:py-16">
            <div className="mx-auto w-full max-w-xl">
              <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-5 dark:border-gray-800">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500">
                    Getting started
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Step {step} of {TOTAL_STEPS}
                  </p>
                </div>
                <OnboardingProgress current={step} total={TOTAL_STEPS} />
              </div>

              <div key={step} className="animate-step-in">
                {step === 1 && (
                  <section aria-labelledby="step-1-heading">
                    <h1
                      id="step-1-heading"
                      className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
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
                      className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
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
                      className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
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
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {hint}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-gray-300 bg-transparent px-4 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-100 dark:focus-visible:ring-offset-gray-950 sm:w-auto"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={
                      step === TOTAL_STEPS ? handleFinish : handleContinue
                    }
                    disabled={isPending}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-950 bg-gray-950 px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-gray-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-300 dark:focus-visible:ring-offset-gray-950 sm:w-auto"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Finishing setup...
                      </span>
                    ) : (
                      <>
                        {step === TOTAL_STEPS ? "Finish setup" : "Continue"}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}

          <footer className="flex items-center justify-between border-t border-gray-200 pt-5 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
            <span>© Momentum</span>
            <span>Made for independent work.</span>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default OnboardingClientPage;
