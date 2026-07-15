"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarClock, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const NAV_LINKS = [
  { href: "/slots", label: "Slots" },
  { href: "/my-bookings", label: "My bookings" },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) return null;

  function handleLogout() {
    logout();
    toast.success("Logged out");
    setMenuOpen(false);
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/slots" className="flex items-center gap-2 text-ink-900">
          <CalendarClock className="h-5 w-5 text-signal-500" aria-hidden />
          <span className="text-sm font-semibold tracking-tight">Slotline</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-ink-900 text-white"
                    : "text-ink-600 hover:bg-ink-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          {user && (
            <span className="max-w-[10rem] truncate text-sm text-ink-400">
              {user.name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-ink-400"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log out
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink-800 sm:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-ink-100 bg-white px-4 py-3 sm:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active ? "bg-ink-900 text-white" : "text-ink-600 hover:bg-ink-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2.5 text-sm font-medium text-ink-800"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Log out {user ? `(${user.name})` : ""}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
