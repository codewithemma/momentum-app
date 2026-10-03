interface WordmarkProps {
  className?: string;
  showMark?: boolean;
}

export function Wordmark({ className, showMark = true }: WordmarkProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      {showMark && (
        <span
          aria-hidden="true"
          className="relative flex size-9 items-center justify-center rounded-md bg-blue-600 text-base font-bold text-white"
        >
          M
        </span>
      )}
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Momentum
      </span>
    </div>
  );
}
