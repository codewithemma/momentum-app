import type { ReactNode } from "react";

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-4 dark:border-gray-800">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">{title}</h2>
      {action}
    </div>
  );
}

export function EmptyRow({ text }: { text: string }) {
  return <p className="px-5 py-12 text-center text-sm text-gray-500 dark:text-gray-400">{text}</p>;
}
