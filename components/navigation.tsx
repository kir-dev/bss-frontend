"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import BssLogo from "./icons/bss-logo";

type NavItem = {
  href: string;
  label: string;
  matchPaths: string[];
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/videos",
    label: "Videók",
    matchPaths: ["/videos", "/video"],
  },
  {
    href: "/events",
    label: "Események",
    matchPaths: ["/events"],
  },
  {
    href: "/tags",
    label: "Tagok",
    matchPaths: ["/tags"],
  },
  {
    href: "/courses",
    label: "Tanfolyamok",
    matchPaths: ["/courses", "/tanfolyamok"],
  },
  {
    href: "/about",
    label: "Mivel foglalkozunk?",
    matchPaths: ["/about"],
  },
];

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="bg-background border-b border-border">
      <div className="px-20 mx-auto">
        <div className="flex items-center justify-between h-16">
          <BssLogo
            className="mx-2 hover:cursor-pointer"
            onClick={() => router.push("/")}
          />

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = item.matchPaths.some((path) => {
                if (path === "/") {
                  return pathname === "/";
                }

                return pathname === path || pathname?.startsWith(`${path}/`);
              });

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors font-medium",
                    isActive
                      ? "text-bss-inv hover:text-orange-600"
                      : "text-bss hover:text-bss-inv"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* <div className="w-full"></div> */}
          {/* Search and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden w-[356px] flex-col items-start gap-2 md:flex">
              <div className="relative w-72">
                <Input
                  type="text"
                  id="global-search"
                  placeholder="Placeholder text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12  pr-10"
                />
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground " />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Moon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
