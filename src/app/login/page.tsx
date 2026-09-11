"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Ingresar</h1>
      <p className="mt-2 text-sm text-muted">Accede a tu cuenta de MuBombazo.</p>

      <form action={formAction} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm text-muted">Usuario</span>
          <input
            name="id"
            type="text"
            maxLength={10}
            required
            className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Contrasena</span>
          <input
            name="password"
            type="password"
            maxLength={10}
            required
            className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </label>

        {state.error && (
          <p className="rounded-md border border-danger/40 bg-danger/10 px-4 py-2 text-sm text-danger">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-accent px-4 py-3 text-sm font-semibold text-background hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        No tenes cuenta?{" "}
        <Link href="/registro" className="text-accent hover:underline">
          Registrate aca
        </Link>
      </p>
    </div>
  );
}
