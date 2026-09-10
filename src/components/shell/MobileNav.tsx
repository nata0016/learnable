"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const tabs = [
  { label: "Learn", href: "/learn" },
  { label: "Browse", href: "/browse" },
  { label: "Progress", href: "/progress" },
  { label: "Me", href: "/account" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface md:hidden"
    >
      <ul className="flex items-stretch justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-xs font-medium",
                  isActive ? "text-teal" : "text-muted"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isActive ? "bg-teal" : "bg-transparent"
                  )}
                />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
