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
      className="border-t border-gray-200 pt-6 first:border-t-0 first:pt-0 dark:border-gray-800"
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
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
      <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
