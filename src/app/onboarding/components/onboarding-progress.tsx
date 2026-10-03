interface ProgressProps {
  current: number;
  total: number;
}

export function OnboardingProgress({ current, total }: ProgressProps) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div
      role="group"
      aria-label={`Step ${current} of ${total}`}
      className="flex items-center gap-2"
    >
      {steps.map((step, index) => {
        const state =
          step < current ? "done" : step === current ? "current" : "upcoming";
        return (
          <div key={step} className="flex items-center gap-2">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="h-px w-6 bg-gray-200 dark:bg-gray-800"
              />
            )}
            <span
              aria-hidden="true"
              className={`flex size-6 items-center justify-center rounded-full border text-xs font-medium transition-colors duration-150 ${
                state === "current"
                  ? "border-blue-600 bg-blue-600 text-white"
                  : state === "done"
                    ? "border-blue-600/40 dark:border-blue-500/40 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500"
                    : "border-gray-200 dark:border-gray-800 bg-transparent text-gray-500 dark:text-gray-400"
              }`}
            >
              {step}
            </span>
            <span className="sr-only">
              {state === "current"
                ? `Current step: ${step}`
                : state === "done"
                  ? `Completed step: ${step}`
                  : `Upcoming step: ${step}`}
            </span>
          </div>
        );
      })}
      <span className="sr-only" aria-live="polite">
        Step {current} of {total}
      </span>
    </div>
  );
}
