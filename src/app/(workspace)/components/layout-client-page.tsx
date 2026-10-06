"use client";
import React from "react";
import { ThemeContext, useLocalTheme } from "@/hooks/use-theme";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SidebarContent } from "./sidebar-content";
import { GlobalSearch } from "./global-search";
import { NotificationBell } from "./notification-bell";

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
        className={`${isDark ? "dark" : ""} min-h-screen bg-gray-100 text-gray-950 dark:bg-black dark:text-gray-100`}
      >
        <GlobalSearch />
        <div className="fixed right-6 top-4 z-40 hidden lg:block">
          <NotificationBell />
        </div>
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:block">
          <SidebarContent isActive={isActive} themeState={themeState} />
        </aside>

        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 lg:hidden">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            <span className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-gray-950 text-sm font-semibold text-white dark:border-gray-700">
              M
            </span>
            <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              Momentum
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <NotificationBell />
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-md text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 motion-reduce:transition-none"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
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
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <div
              id="mobile-nav"
              className="relative h-full w-72 max-w-full border-r border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950"
            >
              <button
                type="button"
                aria-label="Close navigation"
                autoFocus
                onClick={() => setDrawerOpen(false)}
                className="absolute right-3 top-4 inline-flex size-9 items-center justify-center rounded-md text-gray-500 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 motion-reduce:transition-none"
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
