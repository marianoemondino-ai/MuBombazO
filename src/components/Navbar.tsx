"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/descargas", label: "Descargas" },
  { href: "/ranking", label: "Ranking" },
  { href: "/invasiones", label: "Invasiones" },
  { href: "/progresion", label: "Progresion" },
  { href: "/battlepass", label: "Battle Pass" },
  { href: "/donaciones", label: "Donaciones" },
];

export default function Navbar({ loggedIn }: { loggedIn: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-glow">
          MU<span className="text-accent">BOMBAZO</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {loggedIn ? (
            <Link
              href="/cuenta"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
            >
              Mi Cuenta
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-background hover:brightness-110"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-md border border-border p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <span className="block h-0.5 w-5 bg-foreground" />
          <span className="mt-1 block h-0.5 w-5 bg-foreground" />
          <span className="mt-1 block h-0.5 w-5 bg-foreground" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 lg:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-border pt-3">
            {loggedIn ? (
              <Link
                href="/cuenta"
                className="flex-1 rounded-md border border-border px-4 py-2 text-center text-sm font-medium"
              >
                Mi Cuenta
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex-1 rounded-md border border-border px-4 py-2 text-center text-sm font-medium"
                >
                  Ingresar
                </Link>
                <Link
                  href="/registro"
                  className="flex-1 rounded-md bg-accent px-4 py-2 text-center text-sm font-semibold text-background"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
