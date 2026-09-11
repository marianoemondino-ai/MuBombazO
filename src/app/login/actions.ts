"use server";

import { verifyLogin } from "@/lib/auth";
import { createSession, destroySession } from "@/lib/session";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const id = String(formData.get("id") || "").trim();
  const password = String(formData.get("password") || "");

  const ok = await verifyLogin(id, password);
  if (!ok) {
    return { error: "Usuario o contrasena incorrectos." };
  }

  await createSession({ accountId: id });
  redirect("/cuenta");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
