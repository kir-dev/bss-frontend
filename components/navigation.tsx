"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <header className="bg-background w-screen border-b border-border">
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex h-16 items-center gap-4">
          <BssLogo
            className="mx-2 shrink-0 hover:cursor-pointer"
            onClick={() => router.push("/")}
          />

          {/* Navigation Links */}
          <nav className="hidden flex-1 items-center justify-center space-x-8 md:flex">
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

          {/* Search and Theme Toggle */}
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden flex-col items-start gap-2 lg:flex">
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
              className="relative"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Moon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Megnyitás"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs gap-6 p-6">
                <SheetTitle className="sr-only">Navigációs menü</SheetTitle>
                <BssLogo
                  className="h-9 w-auto shrink-0 hover:cursor-pointer"
                  onClick={() => router.push("/")}
                />

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="global-search-mobile"
                      className="text-sm font-medium"
                    >
                      Keresés
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        id="global-search-mobile"
                        placeholder="Placeholder text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-12 pr-10"
                      />
                      <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {NAV_ITEMS.map((item) => {
                      const isActive = item.matchPaths.some((path) => {
                        if (path === "/") {
                          return pathname === "/";
                        }

                        return (
                          pathname === path || pathname?.startsWith(`${path}/`)
                        );
                      });

                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "text-lg font-medium",
                              isActive
                                ? "text-bss-inv"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
