import { ReactNode } from "react";

export function SideSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className="border-t border-gray-200 pt-5 first:border-t-0 first:pt-0 dark:border-gray-800"
    >
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function SideField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
