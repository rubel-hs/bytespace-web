"use client";

import Logo from "@/components/Logo";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavigationLink = { name: string; url: string };

const isCurrentRoute = (pathname: string, href: string) =>
  href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

const BagIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="size-6 fill-none stroke-current stroke-[1.5]"
  >
    <path d="M5 8.5h14l-1 12H6l-1-12Z" />
    <path d="M9 9V6a3 3 0 0 1 6 0v3" />
  </svg>
);

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { main: primaryNavigation, utility: utilityNavigation, cart } = menu as {
    main: NavigationLink[];
    utility: NavigationLink[];
    cart: { url: string };
  };

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const updateHeaderBackground = () => setHasScrolled(window.scrollY > 300);

    updateHeaderBackground();
    window.addEventListener("scroll", updateHeaderBackground, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderBackground);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 bg-transparent text-[#f5f5f6] transition-[height] duration-300 ease-out ${
        hasScrolled ? "h-20" : "h-[120px]"
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 bg-[#242528]/90 shadow-lg backdrop-blur-md transition-transform duration-300 ease-out ${
          hasScrolled ? "translate-y-0" : "-translate-y-full"
        }`}
      />
      <nav
        aria-label="Primary navigation"
        className="relative z-10 mx-auto flex h-full max-w-[1196px] items-center px-6 lg:px-0"
      >
        <Logo />

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="header-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className="ml-auto inline-flex size-10 items-center justify-center lg:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-6 bg-current transition ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-6 bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>

        <div
          id="header-navigation"
          className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 ${hasScrolled ? "top-20" : "top-[120px]"} flex-col gap-8 bg-[#242528] px-6 py-8 shadow-lg lg:static lg:ml-auto lg:flex lg:flex-row lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          <ul className="flex flex-col gap-5 lg:absolute lg:left-1/2 lg:flex-row lg:gap-6 lg:-translate-x-1/2">
            {primaryNavigation.map(({ name, url }) => (
              <li key={url}>
                <Link
                  href={url}
                  className={`block text-base leading-6 transition-colors hover:text-[#d4fb20] ${
                    isCurrentRoute(pathname, url)
                      ? "font-medium text-[#f5f5f6]"
                      : "font-normal text-[#f5f5f6]"
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-6 lg:ml-auto">
            {utilityNavigation.map(({ name, url }) => (
              <li key={url}>
                <Link
                  href={url}
                  className="text-base leading-6 transition-colors hover:text-[#d4fb20]"
                >
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={cart.url}
                aria-label="Shopping bag"
                className="flex size-6 items-center justify-center transition-colors hover:text-[#d4fb20]"
              >
                <BagIcon />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
