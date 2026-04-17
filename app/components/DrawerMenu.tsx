"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/", external: false },
  { label: "Import Character", href: "/import-", external: false },
  { label: "About this Project", href: "/about", external: false },
  {
    label: "About Starot",
    href: "https://www.starotrpg.com/about",
    external: true,
  },
];

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 opacity-60"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function DrawerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex flex-col justify-center gap-1.5 w-8 h-8 text-gold/75 hover:text-gold transition-colors"
      >
        <span className="block h-px w-5 bg-current" />
        <span className="block h-px w-5 bg-current" />
        <span className="block h-px w-3 bg-current" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-60 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer panel */}
      {open && (
        <div className="fixed inset-y-0 left-0 z-70 w-64 bg-dark-green border-r border-gold/15 flex flex-col animate-slide-in-left">
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-gold/15">
            <span className="text-gold/50 text-[10px] tracking-[0.3em] uppercase">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-gold/50 hover:text-gold transition-colors text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_LINKS.map(({ label, href, external }) => (
              <Link
                key={href}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-gold/65 text-sm hover:text-gold hover:bg-gold/5 transition-colors"
              >
                {label}
                {external && <ExternalIcon />}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
