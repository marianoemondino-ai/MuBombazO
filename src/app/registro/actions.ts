"use server";

import { registerAccount } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export type RegisterState = {
  error?: string;
};

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const id = String(formData.get("id") || "");
  const password = String(formData.get("password") || "");
  const password2 = String(formData.get("password2") || "");
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");

  if (password !== password2) {
    return { error: "Las contrasenas no coinciden." };
  }

  const result = await registerAccount({ id, password, name, email });

  if (!result.ok) {
    const messages: Record<string, string> = {
      id_taken: "Ese nombre de cuenta ya esta en uso.",
      invalid:
        "Datos invalidos: el usuario debe tener 4-10 caracteres alfanumericos y la contrasena 4-10 caracteres.",
      server_error: "Error del servidor, intenta de nuevo mas tarde.",
    };
    return { error: messages[result.error] };
  }

  await createSession({ accountId: id });
  redirect("/cuenta");
}
