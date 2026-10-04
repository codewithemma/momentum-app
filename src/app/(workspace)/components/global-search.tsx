"use client";

import { useSearchLeads } from "@/hooks/query/use-leads";
import { routes } from "@/libs/routes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ArrowRight, Command, Search, X } from "lucide-react";
import { STATUS_LABELS } from "../leads/[id]/components/extras";

type PaletteAction = {
  label: string;
  description: string;
  href: string;
};

const actions: PaletteAction[] = [
  { label: "Dashboard", description: "Workspace overview", href: routes.dashboard.home },
  { label: "Leads", description: "View all leads", href: routes.leads.main },
  { label: "Pipeline", description: "Manage opportunities", href: "/pipeline" },
  { label: "Settings", description: "Workspace preferences", href: "/settings" },
];

export function GlobalSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query.trim(), 250);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, isLoading, isError } = useSearchLeads(debouncedQuery);

  const results = useMemo(() => data?.leads ?? [], [data?.leads]);
  const entries = query.trim() ? results : actions;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  const navigate = useCallback((href: string) => {
    close();
    router.push(href);
  }, [close, router]);

  useEffect(() => {
    const openPalette = (event?: Event) => {
      triggerRef.current =
        event instanceof CustomEvent && event.detail instanceof HTMLElement
          ? event.detail
          : null;
      setOpen(true);
    };
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("momentum:open-search", openPalette);
    window.addEventListener("keydown", onShortcut);
    return () => {
      window.removeEventListener("momentum:open-search", openPalette);
      window.removeEventListener("keydown", onShortcut);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((index) => Math.min(index + 1, Math.max(entries.length - 1, 0)));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((index) => Math.max(index - 1, 0));
      } else if (event.key === "Enter" && entries[selectedIndex]) {
        event.preventDefault();
        navigate(query.trim() ? routes.leads.leadById(results[selectedIndex].id) : actions[selectedIndex].href);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, entries, selectedIndex, query, results, navigate, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm sm:pt-[18vh]" role="dialog" aria-modal="true" aria-label="Global search">
      <button type="button" aria-label="Close search" className="absolute inset-0 cursor-default" onClick={close} />
      <div className="relative w-full max-w-xl overflow-hidden border border-gray-700 bg-gray-950 text-gray-100 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-gray-800 px-4">
          <Search className="size-4 shrink-0 text-gray-500" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search leads or jump to..."
            aria-label="Search leads or navigate"
            className="min-h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-hidden placeholder:text-gray-500"
          />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-gray-500 hover:text-gray-200"><X className="size-4" /></button>}
          <kbd className="hidden items-center gap-1 border border-gray-700 px-1.5 py-0.5 text-[10px] text-gray-500 sm:flex"><Command className="size-3" />K</kbd>
        </div>

        <div className="max-h-[min(24rem,55vh)] overflow-y-auto p-2">
          {!query.trim() ? (
            <>
              <p className="px-2 pb-2 pt-1 text-[10px] font-medium uppercase tracking-widest text-gray-600">Jump to</p>
              {actions.map((action, index) => (
                <button key={action.href} type="button" onClick={() => navigate(action.href)} className={resultClass(index === selectedIndex)}>
                  <span><span className="block text-sm font-medium">{action.label}</span><span className="block text-xs text-gray-500">{action.description}</span></span>
                  <ArrowRight className="size-4 text-gray-600" aria-hidden="true" />
                </button>
              ))}
            </>
          ) : isLoading ? (
            <div className="flex min-h-24 items-center justify-center gap-2 text-xs text-gray-500"><span className="size-3.5 animate-spin rounded-full border-2 border-gray-700 border-t-gray-200" />Searching leads...</div>
          ) : isError ? (
            <div className="px-3 py-8 text-center text-sm text-gray-400"><p>Something went wrong</p><p className="mt-1 text-xs text-gray-600">Try searching again.</p></div>
          ) : results.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-gray-400">No leads found</div>
          ) : (
            results.map((lead, index) => (
              <button key={lead.id} type="button" onClick={() => navigate(routes.leads.leadById(lead.id))} className={resultClass(index === selectedIndex)}>
                <span className="min-w-0 text-left"><span className="block truncate text-sm font-medium text-gray-100">{lead.name}</span><span className="block truncate text-xs text-gray-500">{lead.company || lead.email || "No company"}</span></span>
                <span className="shrink-0 text-xs text-gray-500">{STATUS_LABELS[lead.status]}</span>
              </button>
            ))
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-gray-800 px-4 py-2 text-[10px] text-gray-600"><span>↑↓ Navigate</span><span>↵ Open</span><span>Esc Close</span></div>
      </div>
    </div>
  );
}

function resultClass(selected: boolean) {
  return `flex min-h-12 w-full items-center justify-between gap-4 border px-3 py-2 text-left transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-500 ${selected ? "border-gray-700 bg-gray-900" : "border-transparent hover:bg-gray-900"}`;
}
