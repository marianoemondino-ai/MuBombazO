"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type RegisterState } from "./actions";

const initialState: RegisterState = {};

export default function RegistroPage() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Crear Cuenta</h1>
      <p className="mt-2 text-sm text-muted">
        La cuenta que crees aca es la misma con la que entras al juego.
      </p>

      <form action={formAction} className="mt-8 space-y-4">
        <Field label="Usuario" name="id" maxLength={10} required />
        <Field label="Nombre" name="name" maxLength={10} />
        <Field label="Email" name="email" type="email" />
        <Field label="Contrasena" name="password" type="password" maxLength={10} required />
        <Field label="Repetir Contrasena" name="password2" type="password" maxLength={10} required />

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
          {pending ? "Creando cuenta..." : "Crear Cuenta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Ya tenes cuenta?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Ingresa aca
        </Link>
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  maxLength,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  maxLength?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <input
        name={name}
        type={type}
        maxLength={maxLength}
        required={required}
        className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
