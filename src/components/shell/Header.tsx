"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "Learn", href: "/learn" },
  { label: "Browse", href: "/browse" },
  { label: "Progress", href: "/progress" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-bold text-ink">
          Learn<span className="text-teal">Able</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-sm font-semibold transition-colors hover:text-teal",
                      isActive ? "text-teal" : "text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/preferences"
            aria-label="Accessibility preferences"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-tint"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
              <path d="M5 8.5c2.2 1 4.6 1.5 7 1.5s4.8-.5 7-1.5" />
              <path d="M12 10v4" />
              <path d="M9 21l2.2-6.5h1.6L15 21" />
              <path d="M8.5 13.5 12 12l3.5 1.5" />
            </svg>
          </Link>

          <Link
            href="/account"
            aria-label="Account"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-semibold text-white hover:bg-deep"
          >
            A
          </Link>
        </div>
      </div>
    </header>
  );
}
