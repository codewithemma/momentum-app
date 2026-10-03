"use client";
import React from "react";
import { ThemeContext, useLocalTheme } from "@/hooks/use-theme";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import { Menu, X } from "lucide-react";
import { SidebarContent } from "./sidebar-content";

const LayoutClientPage = ({ children }: { children: React.ReactNode }) => {
  const themeState = useLocalTheme();
  const { isDark } = themeState;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(`${to}/`);
  return (
    <ThemeContext.Provider value={themeState}>
      <div
        className={`${isDark ? "dark" : ""} min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100`}
      >
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:block">
          <SidebarContent isActive={isActive} themeState={themeState} />
        </aside>

        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 lg:hidden">
          <Link
            href="/dashboard"
            className="rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Wordmark />
          </Link>
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-md text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 motion-reduce:transition-none"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <button
              type="button"
              aria-label="Close navigation"
              tabIndex={-1}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-gray-950/60"
            />
            <div
              id="mobile-nav"
              className="relative h-full w-72 max-w-full border-r border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
            >
              <button
                type="button"
                aria-label="Close navigation"
                autoFocus
                onClick={() => setDrawerOpen(false)}
                className="absolute right-3 top-4 inline-flex size-9 items-center justify-center rounded-md text-gray-500 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 motion-reduce:transition-none"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
              <SidebarContent isActive={isActive} themeState={themeState} />
            </div>
          </div>
        )}

        <div className="lg:pl-60">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};

export default LayoutClientPage;
